from typing import Annotated

from fastapi import APIRouter, status, Query
from fastapi import Depends

from app.dependencies import get_db
from app.models import Tag
from app.schemes import TagBody, APIResponse
from app.utils.response import SuccessResponse, ErrorResponse
from sqlmodel import select

from utils.exception_handler import handle_exception

router = APIRouter(prefix='/v1/tags', tags=['tags'])

@router.post('/create', response_model=APIResponse[Tag])
def create(tag_boddy: TagBody, db = Depends(get_db)):
    try:
        tag = Tag(**tag_boddy.model_dump(mode='json'))
        db.add(tag)
        db.commit()
        db.refresh(tag)
        return SuccessResponse(data=tag)
    except Exception as e:
        return handle_exception(e)
    
@router.put('/update/{tag_id}', response_model=APIResponse[Tag])
def update(tag_id: int, new_name: str, db = Depends(get_db)):
    tag_db = db.get(Tag, tag_id)
    if not tag_db:
        return ErrorResponse(status_code=status.HTTP_404_NOT_FOUND, message="Tag not found", code="TAG_NOT_FOUND")
    try:
        tag_db.name = new_name
        db.commit()
        db.refresh(tag_db)
        return SuccessResponse(data=tag_db)
    except Exception as e:
        return handle_exception(e)

@router.get('/', response_model=APIResponse[list[Tag]])
def get_tags(offset: int = 0, limit: Annotated[int, Query(le=100)] = 100, db = Depends(get_db)):
    tags_db = db.exec(select(Tag).offset(offset).limit(limit)).all()
    return SuccessResponse(data=tags_db)

@router.get('/{tag_id}', response_model=APIResponse[Tag])
def get(tag_id: int, db = Depends(get_db)):
    tag_db = db.get(Tag, tag_id)
    if not tag_db:
        return ErrorResponse(status_code=status.HTTP_404_NOT_FOUND, message="Tag not found", code="TAG_NOT_FOUND")
    return SuccessResponse(data=tag_db)

@router.get('/search/', response_model=APIResponse[list[Tag]])
def tags_search(tag_name: str = Query(..., min_length=1), offset: int = 0, limit: Annotated[int, Query(le=100)] = 100, db = Depends(get_db)):
    tags_db = db.exec(select(Tag).where(Tag.name.ilike(f'%{tag_name}%')).offset(offset).limit(limit)).all()
    if not tags_db:
        return ErrorResponse(status_code=status.HTTP_404_NOT_FOUND, message="Tag not found", code="TAG_NOT_FOUND")
    return SuccessResponse(data=tags_db)

@router.delete('/delete/{tag_id}', response_model=APIResponse[Tag])
def delete(tag_id: int, db = Depends(get_db)):
    tag_db = db.get(Tag, tag_id)
    if not tag_db:
        return ErrorResponse(status_code=status.HTTP_404_NOT_FOUND, message="Tag not found", code="TAG_NOT_FOUND")
    db.delete(tag_db)
    db.commit()
    return SuccessResponse()

