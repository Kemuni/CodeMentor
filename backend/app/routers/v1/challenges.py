from fastapi import APIRouter, status
from fastapi.responses import JSONResponse
from fastapi import Depends

from app.dependencies import get_db
from app.models import Challenge
from app.schemes import ChallengeCreation
from app.utils.response import SuccessResponse

router = APIRouter(prefix='/v1/challenges', tags=['challenges'])


@router.post('/create')
def create(challenge_creation: ChallengeCreation, db = Depends(get_db)) -> JSONResponse:
    challenge_model = Challenge(**challenge_creation.model_dump(mode='json'))
    db.add(challenge_model)
    db.commit()
    db.refresh(challenge_model)
    return SuccessResponse(data=challenge_model)