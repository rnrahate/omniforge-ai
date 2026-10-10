from fastapi import APIRouter

from app.schemas.health import HealthResponse
from app.services.health import get_health

router = APIRouter(prefix="/api", tags=["operational"])


@router.get("/health", response_model=HealthResponse)
async def health() -> HealthResponse:
    return get_health()
