from typing import Generic, TypeVar, Optional

from pydantic import BaseModel, Field

from app.models import ChallengeType

T = TypeVar('T')

class ErrorDetail(BaseModel):
    """Standard error detail format"""
    code: str
    message: str


class APIResponse(BaseModel, Generic[T]):
    """Standard API response format"""
    success: bool
    data: Optional[T] = None
    error: Optional[ErrorDetail] = None


class ChallengeBody(BaseModel):
    name: str = Field(max_length=100)
    is_free: bool
    type: ChallengeType
    difficulty: int = Field(gt=0, le=10)
    description: str
    image_url: str