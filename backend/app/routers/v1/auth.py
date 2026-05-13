import httpx
from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select

from app.core.config import settings
from app.dependencies import get_current_user, get_db
from app.models import User
from app.schemes import APIResponse, ReadUser
from app.utils.security import create_access_token

router = APIRouter(prefix="/v1/auth", tags=["auth"])

_GITHUB_AUTHORIZE_URL = "https://github.com/login/oauth/authorize"
_GITHUB_TOKEN_URL = "https://github.com/login/oauth/access_token"
_GITHUB_USER_URL = "https://api.github.com/user"


@router.get("/github")
def github_login():
    params = {
        "client_id": settings.GITHUB_CLIENT_ID,
        "scope": "read:user user:email",
    }
    query = "&".join(f"{k}={v}" for k, v in params.items())
    return {"url": f"{_GITHUB_AUTHORIZE_URL}?{query}"}


@router.get("/github/callback")
def github_callback(code: str, db: Session = Depends(get_db)):
    # Exchange code for GitHub access token
    with httpx.Client() as client:
        token_resp = client.post(
            _GITHUB_TOKEN_URL,
            data={
                "client_id": settings.GITHUB_CLIENT_ID,
                "client_secret": settings.GITHUB_CLIENT_SECRET,
                "code": code,
            },
            headers={"Accept": "application/json"},
        )

    if token_resp.status_code != 200:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Failed to obtain GitHub access token",
        )

    token_data = token_resp.json()
    github_access_token: str | None = token_data.get("access_token")
    if not github_access_token:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="GitHub did not return an access token",
        )

    # Fetch GitHub user profile
    with httpx.Client() as client:
        user_resp = client.get(
            _GITHUB_USER_URL,
            headers={
                "Authorization": f"Bearer {github_access_token}",
                "Accept": "application/json",
            },
        )

    if user_resp.status_code != 200:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Failed to fetch GitHub user info",
        )

    gh_profile = user_resp.json()
    github_id: int = gh_profile["id"]
    username: str = gh_profile.get("login", "")
    email: str | None = gh_profile.get("email")
    avatar_url: str | None = gh_profile.get("avatar_url")

    # Upsert user
    user = db.exec(select(User).where(User.github_id == github_id)).first()
    if user is None:
        user = User(github_id=github_id, username=username, email=email, avatar_url=avatar_url)
        db.add(user)
    else:
        user.username = username
        user.email = email
        user.avatar_url = avatar_url
        db.add(user)

    db.commit()
    db.refresh(user)

    access_token = create_access_token({"sub": str(user.id)})
    return {"access_token": access_token, "token_type": "bearer"}


@router.get("/me", response_model=APIResponse[ReadUser])
def me(current_user: User = Depends(get_current_user)):
    return APIResponse(success=True, data=current_user)
