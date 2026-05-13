from sqlmodel import SQLModel, Field, Relationship, Column, Enum
from datetime import datetime
from enum import StrEnum

class ChallengeType(StrEnum):
    FRONTEND = "Frontend"
    BACKEND = "Backend"
    FULLSTACK = "Fullstack"



class ChallengeTagsLink(SQLModel, table=True):
    challenge_id: int = Field(foreign_key="challenge.id", primary_key=True)
    tag_id: int = Field(foreign_key="tag.id", primary_key=True)


class Tag(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str = Field(max_length=100, unique=True)

    challenges: list["Challenge"] = Relationship(back_populates="tags", link_model=ChallengeTagsLink)


class Challenge(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str = Field(max_length=100)
    is_free: bool
    type: str
    difficulty: int = Field(gt=0, le=10)
    description: str
    image_url: str
    created_at: datetime = Field(default=datetime.utcnow(), nullable=False)
    last_edited: datetime = Field(default_factory=datetime.utcnow, nullable=False, sa_column_kwargs={'onupdate': datetime.utcnow})

    tags: list["Tag"] = Relationship(back_populates="challenges", link_model=ChallengeTagsLink)
    solutions: list["ChallengeSolution"] = Relationship(back_populates="challenge")


class User(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    github_id: int = Field(unique=True, index=True)
    username: str = Field(max_length=150)
    email: str | None = Field(default=None, max_length=255)
    avatar_url: str | None = Field(default=None)
    created_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)

    solutions: list["ChallengeSolution"] = Relationship(back_populates="user")


class ChallengeSolution(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    challenge_id: int = Field(foreign_key="challenge.id")
    user_id: int = Field(foreign_key="user.id")
    general_description: str
    trouble_description: str
    total_rate: int = Field(ge=1, le=10)
    total_difficulty: int = Field(ge=1, le=10)
    created_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)

    challenge: Challenge = Relationship(back_populates="solutions")
    user: User = Relationship(back_populates="solutions")


