from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import get_settings
from app.routers.health import router as health_router

settings = get_settings()

app = FastAPI(
    title="OmniForge API",
    version="0.1.0",
    description="Backend foundation for OmniForge AI.",
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=False,
    allow_methods=["GET"],
    allow_headers=["Accept"],
)
app.include_router(health_router)
