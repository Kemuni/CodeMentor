from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import selectinload
from sqlmodel import Session, select

from app.dependencies import get_current_user, get_db
from app.models import Challenge, ChallengeSolution, User
from app.schemes import APIResponse, ChallengeSolutionBody, ReadChallengeSolution
from app.utils.response import SuccessResponse

router = APIRouter(prefix="/v1", tags=["solutions"])


@router.post(
    "/challenges/{challenge_id}/solutions",
    response_model=APIResponse[ReadChallengeSolution],
    status_code=status.HTTP_201_CREATED,
)
def create_solution(
    challenge_id: int,
    body: ChallengeSolutionBody,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    challenge = db.get(Challenge, challenge_id)
    if challenge is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Challenge not found")

    solution = ChallengeSolution(
        challenge_id=challenge_id,
        user_id=current_user.id,
        **body.model_dump(),
    )
    db.add(solution)
    db.commit()
    db.refresh(solution)
    db.refresh(solution, attribute_names=["user"])
    return SuccessResponse(data={**solution.model_dump(mode="json"), "user": solution.user})


@router.get(
    "/challenges/{challenge_id}/solutions",
    response_model=APIResponse[list[ReadChallengeSolution]],
)
def list_solutions(
    challenge_id: int,
    offset: int = 0,
    limit: int = 50,
    db: Session = Depends(get_db),
):
    challenge = db.get(Challenge, challenge_id)
    if challenge is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Challenge not found")

    solutions = db.exec(
        select(ChallengeSolution)
        .where(ChallengeSolution.challenge_id == challenge_id)
        .options(selectinload(ChallengeSolution.user))
        .offset(offset)
        .limit(limit)
    ).all()
    return SuccessResponse(data=[
        {**s.model_dump(mode="json"), "user": s.user}
        for s in solutions
    ])


@router.get(
    "/solutions/{solution_id}",
    response_model=APIResponse[ReadChallengeSolution],
)
def get_solution(solution_id: int, db: Session = Depends(get_db)):
    solution = db.get(ChallengeSolution, solution_id)
    if solution is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Solution not found")
    return APIResponse(success=True, data=solution)


@router.delete(
    "/solutions/{solution_id}",
    response_model=APIResponse[None],
)
def delete_solution(
    solution_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    solution = db.get(ChallengeSolution, solution_id)
    if solution is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Solution not found")
    if solution.user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not allowed to delete this solution")

    db.delete(solution)
    db.commit()
    return APIResponse(success=True)


@router.get(
    "/users/me/solutions",
    response_model=APIResponse[list[ReadChallengeSolution]],
)
def get_my_solutions(
    offset: int = 0,
    limit: int = 50,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    solutions = db.exec(
        select(ChallengeSolution)
        .where(ChallengeSolution.user_id == current_user.id)
        .options(
            selectinload(ChallengeSolution.user),
            selectinload(ChallengeSolution.challenge),
        )
        .offset(offset)
        .limit(limit)
    ).all()
    return SuccessResponse(data=[
        {**s.model_dump(mode="json"), "user": s.user, "challenge_name": s.challenge.name}
        for s in solutions
    ])
