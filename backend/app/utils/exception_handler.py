from pydantic import ValidationError
from sqlalchemy.exc import IntegrityError
from fastapi import HTTPException
from response import ErrorResponse



def handle_exception(e: Exception) -> ErrorResponse:
    """Конвертирует любое исключение в ErrorResponse"""
    
    # Базовые значения
    code = "INTERNAL_ERROR"
    message = str(e)
    status_code = 500
    
    # Определяем тип ошибки
    if isinstance(e, IntegrityError):
        code = "DATABASE_CONFLICT"
        message = "Already exist"
        status_code = 409
    
    elif isinstance(e, ValidationError):
        code = "VALIDATION_ERROR"
        message = str(e.errors()[0].get('msg', 'Validation Error'))
        status_code = 422
    
    elif isinstance(e, HTTPException):
        # Если уже HTTP исключение
        code = f"HTTP_{e.status_code}"
        message = e.detail if e.detail else "HTTP Error"
        status_code = e.status_code
    
    else:
        # Неизвестная ошибка
        code = "UNKNOWN_ERROR"
        message = str(e)
        status_code = 500
    
    return ErrorResponse(
        code=code,
        message=message,
        status_code=status_code
    )