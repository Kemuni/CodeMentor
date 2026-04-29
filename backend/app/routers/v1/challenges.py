from typing import Annotated

from fastapi import APIRouter, status, Query
from fastapi.responses import JSONResponse
from fastapi import Depends

from app.dependencies import get_db
from app.models import Challenge
from app.schemes import ChallengeBody, APIResponse
from app.utils.response import SuccessResponse, ErrorResponse
from sqlmodel import select

router = APIRouter(prefix='/v1/challenges', tags=['challenges'])


@router.post('/create', response_model=APIResponse[Challenge])
def create(challenge_body: ChallengeBody, db = Depends(get_db)):
    challenge = Challenge(**challenge_body.model_dump(mode='json'))
    db.add(challenge)
    db.commit()
    db.refresh(challenge)
    return SuccessResponse(data=challenge)


@router.put('/update/{challenge_id}', response_model=APIResponse[Challenge])
def update(challenge_id: int, challenge_body: ChallengeBody, db = Depends(get_db)):
    challenge_db = db.get(Challenge, challenge_id)
    if not challenge_db:
        return ErrorResponse(status_code=status.HTTP_404_NOT_FOUND, message='Challenge not found', code='CHALLENGE_NOT_FOUND')
    challenge_data = ChallengeBody(**challenge_body.model_dump(mode='json'))
    challenge_db.sqlmodel_update(challenge_data)
    db.add(challenge_db)
    db.commit()
    db.refresh(challenge_db)
    return SuccessResponse(data=challenge_data)


@router.delete('/delete/{challenge_id}', response_model=APIResponse[Challenge])
def delete(challenge_id: int, db = Depends(get_db)):
    challenge_db = db.get(Challenge, challenge_id)
    if not challenge_db:
        return ErrorResponse(status_code=status.HTTP_404_NOT_FOUND, message='Challenge not found', code='CHALLENGE_NOT_FOUND')
    db.delete(challenge_db)
    db.commit()
    return SuccessResponse()


@router.get('/challenges', response_model=APIResponse[list[Challenge]])
def get_challenges(offset: int = 0, limit: Annotated[int, Query(le=100)] = 100, db = Depends(get_db)):
    challenges = db.exec(select(Challenge).offset(offset).limit(limit)).all()
    return SuccessResponse(data=challenges)

@router.get('/challenges/{challenge_id}', response_model=APIResponse[Challenge])
def get_challenge(challenge_id: int, db = Depends(get_db)):
    challenge_db = db.get(Challenge, challenge_id)
    if not challenge_db:
        return ErrorResponse(status_code=status.HTTP_404_NOT_FOUND, message='Challenge not found',code='CHALLENGE_NOT_FOUND')
    challenge_data = ChallengeBody(**challenge_db.model_dump(mode='json'))
    return SuccessResponse(data=challenge_db)