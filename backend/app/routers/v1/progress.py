from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import selectinload
from sqlmodel import Session, select

from app.dependencies import get_current_user, get_db
from app.models import Challenge, User, UserChallengeProgress
from app.schemes import APIResponse, ReadUserChallengeProgress
from app.utils.response import ErrorResponse, SuccessResponse

router = APIRouter(prefix="/v1", tags=["progress"])


@router.post(
    "/challenges/{challenge_id}/start",
    response_model=APIResponse[ReadUserChallengeProgress],
)
def start_challenge(
    challenge_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    challenge = db.get(Challenge, challenge_id)
    if challenge is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Challenge not found")

    existing = db.exec(
        select(UserChallengeProgress)
        .where(
            UserChallengeProgress.user_id == current_user.id,
            UserChallengeProgress.challenge_id == challenge_id,
        )
    ).first()

    if existing:
        db.refresh(existing, attribute_names=["challenge"])
        return SuccessResponse(data={**existing.model_dump(mode="json"), "challenge": {**existing.challenge.model_dump(mode="json"), "tags": existing.challenge.tags}})

    progress = UserChallengeProgress(user_id=current_user.id, challenge_id=challenge_id)
    db.add(progress)
    db.commit()
    db.refresh(progress)
    db.refresh(progress, attribute_names=["challenge"])
    return SuccessResponse(data={**progress.model_dump(mode="json"), "challenge": {**progress.challenge.model_dump(mode="json"), "tags": progress.challenge.tags}})


@router.delete(
    "/challenges/{challenge_id}/start",
    response_model=APIResponse[None],
)
def stop_challenge(
    challenge_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    progress = db.exec(
        select(UserChallengeProgress)
        .where(
            UserChallengeProgress.user_id == current_user.id,
            UserChallengeProgress.challenge_id == challenge_id,
        )
    ).first()

    if progress is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Progress record not found")

    db.delete(progress)
    db.commit()
    return APIResponse(success=True)


@router.get(
    "/users/me/challenges/in-progress",
    response_model=APIResponse[list[ReadUserChallengeProgress]],
)
def get_my_in_progress(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    records = db.exec(
        select(UserChallengeProgress)
        .where(UserChallengeProgress.user_id == current_user.id)
        .options(selectinload(UserChallengeProgress.challenge).selectinload(Challenge.tags))
    ).all()
    return SuccessResponse(data=[
        {**r.model_dump(mode="json"), "challenge": {**r.challenge.model_dump(mode="json"), "tags": r.challenge.tags}}
        for r in records
    ])
