from enum import Enum

from pydantic import BaseModel, Field


class ContentPlatform(str, Enum):
    LINKEDIN = "linkedin"
    X = "x"
    INSTAGRAM = "instagram"
    BLOG = "blog"


class GenerateContentRequest(BaseModel):
    platform: ContentPlatform
    brief: str = Field(min_length=20, max_length=10_000)
    voice: str = Field(default="clear and practical", min_length=2, max_length=80)


class GenerateContentResponse(BaseModel):
    content: str
    model: str
