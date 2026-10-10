from functools import lru_cache

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Server configuration loaded only from process environment or an API .env file."""

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    supabase_url: str | None = None
    supabase_jwt_audience: str = "authenticated"
    gemini_api_key: str | None = None
    gemini_model: str = "gemini-2.5-flash"
    cors_origins: str = Field(default="http://localhost:3000")

    @property
    def allowed_origins(self) -> list[str]:
        return [origin.strip().rstrip("/") for origin in self.cors_origins.split(",") if origin.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()
