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


