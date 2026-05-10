from typing import Annotated

from fastapi import APIRouter, status, Query
from fastapi.responses import JSONResponse
from fastapi import Depends

from app.dependencies import get_db
from app.models import Challenge, ChallengeTagsLink, Tag
from app.schemes import ChallengeBody, APIResponse
from app.utils.response import SuccessResponse, ErrorResponse
from sqlmodel import select

router = APIRouter(prefix='/v1/challenges', tags=['challenges'])


@router.post('/', response_model=APIResponse[Challenge])
def create(challenge_body: ChallengeBody, db = Depends(get_db)):
    challenge = Challenge(**challenge_body.model_dump(exclude={"tags"}, mode='json'))
    # print(db.scalar(select(Tag).where(Tag.name == challenge_body.tags[0])))
    # return SuccessResponse(data=challenge)
    # challenge_tags = challenge.tags.all()
    for tag_name in challenge_body.tags:
        tag = db.scalar(select(Tag).where(Tag.name == tag_name))
        print('ASDASD', tag_name, tag)
        if tag is None:
            return ErrorResponse(status_code=status.HTTP_422_UNPROCESSABLE_CONTENT, message=f'Tag with name "{tag_name}" not found',code='TAG_NOT_FOUND')
        challenge.tags.append(tag)
    db.add(challenge)
    db.commit()
    db.refresh(challenge)
    print(challenge)
    return SuccessResponse(data=challenge)


@router.put('/{challenge_id}', response_model=APIResponse[Challenge])
def update(challenge_id: int, challenge_body: ChallengeBody, db = Depends(get_db)):
    challenge_db = db.get(Challenge, challenge_id)
    if not challenge_db:
        return ErrorResponse(status_code=status.HTTP_404_NOT_FOUND, message='Challenge not found', code='CHALLENGE_NOT_FOUND')
    challenge_data = ChallengeBody(**challenge_body.model_dump(exclude={"tags"}, mode='json'))
    challenge_db.sqlmodel_update(challenge_data)
    db.add(challenge_db)
    db.commit()
    db.refresh(challenge_db)
    return SuccessResponse(data=challenge_data)


@router.delete('/{challenge_id}', response_model=APIResponse[Challenge])
def delete(challenge_id: int, db = Depends(get_db)):
    challenge_db = db.get(Challenge, challenge_id)
    if not challenge_db:
        return ErrorResponse(status_code=status.HTTP_404_NOT_FOUND, message='Challenge not found', code='CHALLENGE_NOT_FOUND')
    db.delete(challenge_db)
    db.commit()
    return SuccessResponse()


@router.get('/', response_model=APIResponse[list[Challenge]])
def get_challenges(offset: int = 0, limit: Annotated[int, Query(le=100)] = 100, db = Depends(get_db)):
    challenges = db.exec(select(Challenge).offset(offset).limit(limit)).all()
    return SuccessResponse(data=challenges)

@router.get('/{challenge_id}', response_model=APIResponse[Challenge])
def get_challenge(challenge_id: int, db = Depends(get_db)):
    challenge_db = db.get(Challenge, challenge_id)
    if not challenge_db:
        return ErrorResponse(status_code=status.HTTP_404_NOT_FOUND, message='Challenge not found',code='CHALLENGE_NOT_FOUND')
    challenge_data = ChallengeBody(**challenge_db.model_dump(exclude={"tags"}, mode='json'))
    return SuccessResponse(data=challenge_data)

@router.post('/{challenge_id}/tags', response_model=APIResponse[ChallengeTagsLink])
def link_with_tags(challenge_id: int, tags_link: ChallengeTagsLink, db = Depends(get_db)):
    return SuccessResponse()