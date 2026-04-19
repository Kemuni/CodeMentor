from typing import Generic, TypeVar, Optional

from pydantic import BaseModel

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
