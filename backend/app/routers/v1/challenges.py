from typing import Annotated

from fastapi import APIRouter, status, Query
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