from typing import Generic, TypeVar, Optional
from datetime import datetime

from pydantic import BaseModel, Field

from app.models import ChallengeType, Tag


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
    tags: list[str]

class TagBody(BaseModel):
    name: str


class ReadChallenge(ChallengeBody):
    tags: list[Tag]


class ReadUser(BaseModel):
    id: int
    github_id: int
    username: str
    email: Optional[str] = None
    avatar_url: Optional[str] = None
    created_at: datetime


class ChallengeSolutionBody(BaseModel):
    general_description: str
    trouble_description: str
    total_rate: int = Field(ge=1, le=10)
    total_difficulty: int = Field(ge=1, le=10)


class ReadChallengeSolution(ChallengeSolutionBody):
    id: int
    challenge_id: int
    user_id: int
    created_at: datetime
    user: ReadUser
