import time
from collections.abc import Mapping
from typing import Any

import httpx
import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from app.core.config import Settings, get_settings

bearer_scheme = HTTPBearer(auto_error=False)
_jwks: dict[str, Any] = {}
_jwks_expires_at = 0.0


async def _get_jwks(settings: Settings) -> Mapping[str, Any]:
    """Fetch and briefly cache Supabase's public signing keys; no shared secret is used."""
    global _jwks_expires_at
    if _jwks and time.monotonic() < _jwks_expires_at:
        return _jwks

    if not settings.supabase_url:
        raise HTTPException(status_code=503, detail="Authentication is not configured.")

    url = f"{settings.supabase_url.rstrip('/')}/auth/v1/.well-known/jwks.json"
    try:
        async with httpx.AsyncClient(timeout=5.0) as client:
            response = await client.get(url)
            response.raise_for_status()
    except httpx.HTTPError as error:
        raise HTTPException(status_code=503, detail="Authentication keys are unavailable.") from error

    keys = response.json().get("keys", [])
    if not isinstance(keys, list):
        raise HTTPException(status_code=503, detail="Authentication keys are invalid.")
    _jwks.clear()
    _jwks.update({key["kid"]: key for key in keys if isinstance(key, dict) and key.get("kid")})
    _jwks_expires_at = time.monotonic() + 300
    return _jwks


async def get_current_user(
    credentials: HTTPAuthorizationCredentials | None = Depends(bearer_scheme),
    settings: Settings = Depends(get_settings),
) -> dict[str, Any]:
    if credentials is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Missing bearer token.")

    try:
        header = jwt.get_unverified_header(credentials.credentials)
        key_data = (await _get_jwks(settings)).get(header.get("kid"))
        if not key_data:
            raise ValueError("Unknown signing key")
        algorithm = key_data.get("alg", "RS256")
        if algorithm not in {"RS256", "ES256"}:
            raise ValueError("Unsupported signing algorithm")
        public_key = jwt.algorithms.get_default_algorithms()[algorithm].from_jwk(key_data)
        return jwt.decode(
            credentials.credentials,
            public_key,
            algorithms=[algorithm],
            audience=settings.supabase_jwt_audience,
            issuer=f"{settings.supabase_url.rstrip('/')}/auth/v1",
        )
    except (jwt.PyJWTError, ValueError, KeyError) as error:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid bearer token.") from error
