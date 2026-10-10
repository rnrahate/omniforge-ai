from typing import Any

from fastapi import APIRouter, Depends, HTTPException, status

from app.core.config import Settings, get_settings
from app.core.security import get_current_user
from app.schemas.content import GenerateContentRequest, GenerateContentResponse
from app.services.content_generation import GeminiContentService

router = APIRouter()


@router.get("/health", tags=["operational"])
async def health() -> dict[str, str]:
    return {"status": "ok"}


@router.post("/v1/content/generate", response_model=GenerateContentResponse, tags=["content"])
async def generate_content(
    request: GenerateContentRequest,
    _: dict[str, Any] = Depends(get_current_user),
    settings: Settings = Depends(get_settings),
) -> GenerateContentResponse:
    try:
        service = GeminiContentService(settings)
        content = service.generate(request)
    except RuntimeError as error:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail=str(error)) from error
    return GenerateContentResponse(content=content, model=service.model)
