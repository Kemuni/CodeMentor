from typing import Annotated
import os
import uuid

from fastapi import APIRouter, status, Query, UploadFile, File
from fastapi.responses import JSONResponse
from fastapi import Depends
from sqlalchemy.orm import selectinload

from app.dependencies import get_db
from app.models import Challenge, ChallengeTagsLink, Tag
from app.schemes import ChallengeBody, APIResponse, ReadChallenge
from app.utils.response import SuccessResponse, ErrorResponse
from sqlmodel import select


router = APIRouter(prefix='/v1/challenges', tags=['challenges'])


@router.post('/', response_model=APIResponse[Challenge])
def create(challenge_body: ChallengeBody, db = Depends(get_db)):
    challenge = Challenge(**challenge_body.model_dump(exclude={"tags"}, mode='json'))
    for tag_name in challenge_body.tags:
        tag = db.scalar(select(Tag).where(Tag.name == tag_name))
        if tag is None:
            return ErrorResponse(status_code=status.HTTP_422_UNPROCESSABLE_CONTENT, message=f'Tag with name "{tag_name}" not found',code='TAG_NOT_FOUND')
        challenge.tags.append(tag)
    db.add(challenge)
    db.commit()
    db.refresh(challenge)
    return SuccessResponse(data={**challenge.model_dump(exclude={"tags"}, mode='json'), "tags": challenge.tags})


@router.put('/{challenge_id}', response_model=APIResponse[Challenge])
def update(challenge_id: int, challenge_body: ChallengeBody, db = Depends(get_db)):
    challenge_db = db.get(Challenge, challenge_id)
    if not challenge_db:
        return ErrorResponse(status_code=status.HTTP_404_NOT_FOUND, message='Challenge not found', code='CHALLENGE_NOT_FOUND')
    challenge_data = ChallengeBody(**challenge_body.model_dump(mode='json'))

    update_data = challenge_body.model_dump(exclude={"tags"}, exclude_unset=True)
    for field, value in update_data.items():
        setattr(challenge_db, field, value)


    if challenge_body.tags is not None:
        new_tags = []
        for tag_name in challenge_body.tags:
            tag = db.scalar(select(Tag).where(Tag.name == tag_name))
            if tag is None:
                return ErrorResponse(
                    status_code=status.HTTP_422_UNPROCESSABLE_CONTENT,
                    message=f'Tag with name "{tag_name}" not found',
                    code='TAG_NOT_FOUND'
                )
            new_tags.append(tag)


        challenge_db.tags.clear()
        for tag in new_tags:
            challenge_db.tags.append(tag)

    db.add(challenge_db)
    db.commit()
    db.refresh(challenge_db)
    return SuccessResponse(data={**challenge_data.model_dump(exclude={"tags"}, mode='json'), "tags": challenge_data.tags})


@router.delete('/{challenge_id}', response_model=APIResponse[Challenge])
def delete(challenge_id: int, db = Depends(get_db)):
    challenge_db = db.get(Challenge, challenge_id)
    if not challenge_db:
        return ErrorResponse(status_code=status.HTTP_404_NOT_FOUND, message='Challenge not found', code='CHALLENGE_NOT_FOUND')
    db.delete(challenge_db)
    db.commit()
    return SuccessResponse()


@router.get('/', response_model=APIResponse[list[ReadChallenge]])
def get_challenges(offset: int = 0, limit: Annotated[int, Query(le=100)] = 100, db = Depends(get_db)):
    challenges = db.exec(select(Challenge).offset(offset).limit(limit).options(selectinload(Challenge.tags))).all()

    return SuccessResponse(data=[{**i.model_dump(exclude={"tags"}, mode='json'), "tags": i.tags} for i in challenges])

@router.get('/{challenge_id}', response_model=APIResponse[ReadChallenge])
def get_challenge(challenge_id: int, db = Depends(get_db)):
    challenge_db = db.get(Challenge, challenge_id)
    if not challenge_db:
        return ErrorResponse(status_code=status.HTTP_404_NOT_FOUND, message='Challenge not found',code='CHALLENGE_NOT_FOUND')

    return SuccessResponse(data={**challenge_db.model_dump(mode='json'), "tags": challenge_db.tags})

@router.post('/{challenge_id}/tags', response_model=APIResponse[ChallengeTagsLink])
def add_tags(challenge_id: int, tags: list[int], db = Depends(get_db)):
    challenge_db = db.get(Challenge, challenge_id)
    if not challenge_db:
        return ErrorResponse(status_code=status.HTTP_404_NOT_FOUND, message='Challenge not found', code='CHALLENGE_NOT_FOUND')
    challenge_links = []

    for tag_id in tags:
        tag = db.scalar(select(Tag).where(Tag.id == tag_id))
        if tag is None:
            return ErrorResponse(
                status_code=status.HTTP_422_UNPROCESSABLE_CONTENT,
                message=f'Tag with id "{tag_id}" not found',
                code='TAG_NOT_FOUND'
            )
        if tag in challenge_db.tags:
            return ErrorResponse(
                status_code=status.HTTP_422_UNPROCESSABLE_CONTENT,
                message=f'Tag with id "{tag_id}" already exists',
                code='TAG_ALREADY_EXISTS'
            )
        challenge_links.append(ChallengeTagsLink(challenge_id=challenge_id, tag_id=tag_id))

    db.add(*challenge_links)
    db.commit()
    db.refresh(challenge_db)

    return SuccessResponse(data={**challenge_db.model_dump(mode='json'), "tags": challenge_db.tags})


_MEDIA_DIR = os.path.join(os.path.dirname(__file__), "..", "..", "..", "media", "challenges")

ALLOWED_IMAGE_TYPES = {"image/jpeg", "image/png", "image/webp", "image/gif"}
MAX_IMAGE_SIZE = 10 * 1024 * 1024  # 10 MB


@router.post('/{challenge_id}/image', response_model=APIResponse[Challenge])
async def upload_challenge_image(challenge_id: int, file: UploadFile = File(...), db=Depends(get_db)):
    challenge_db = db.get(Challenge, challenge_id)
    if not challenge_db:
        return ErrorResponse(status_code=status.HTTP_404_NOT_FOUND, message='Challenge not found', code='CHALLENGE_NOT_FOUND')

    if file.content_type not in ALLOWED_IMAGE_TYPES:
        return ErrorResponse(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            message=f'Unsupported file type: {file.content_type}. Allowed: jpeg, png, webp, gif',
            code='INVALID_FILE_TYPE',
        )

    content = await file.read()
    if len(content) > MAX_IMAGE_SIZE:
        return ErrorResponse(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            message='File too large. Maximum size is 10 MB.',
            code='FILE_TOO_LARGE',
        )

    ext = os.path.splitext(file.filename or "image")[1] or ".jpg"
    filename = f"{uuid.uuid4().hex}{ext}"
    challenge_dir = os.path.join(_MEDIA_DIR, str(challenge_id))
    os.makedirs(challenge_dir, exist_ok=True)

    file_path = os.path.join(challenge_dir, filename)
    with open(file_path, "wb") as f:
        f.write(content)

    challenge_db.image_url = f"/media/challenges/{challenge_id}/{filename}"
    db.add(challenge_db)
    db.commit()
    db.refresh(challenge_db)

    return SuccessResponse(data=challenge_db)


@router.delete('/{challenge_id}/image', response_model=APIResponse[Challenge])
def delete_challenge_image(challenge_id: int, db=Depends(get_db)):
    challenge_db = db.get(Challenge, challenge_id)
    if not challenge_db:
        return ErrorResponse(status_code=status.HTTP_404_NOT_FOUND, message='Challenge not found', code='CHALLENGE_NOT_FOUND')

    if challenge_db.image_url:
        # image_url is like /media/challenges/{id}/filename
        # _MEDIA_DIR is backend/media/challenges
        # Strip the /media/challenges/ prefix to get relative path within _MEDIA_DIR
        prefix = "/media/challenges/"
        if challenge_db.image_url.startswith(prefix):
            rel = challenge_db.image_url[len(prefix):]  # "{id}/filename"
            abs_path = os.path.normpath(os.path.join(_MEDIA_DIR, rel))
            if os.path.isfile(abs_path):
                os.remove(abs_path)

    challenge_db.image_url = ""
    db.add(challenge_db)
    db.commit()
    db.refresh(challenge_db)

    return SuccessResponse(data=challenge_db)