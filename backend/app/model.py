from sqlmodel import SQLModel, Field, Relationship


class ChallengeTagsLink(SQLModel, table=True):
    challenge_id: int = Field(foreign_key="challenge.id", primary_key=True)
    tag_id: int = Field(foreign_key="team.id", primary_key=True)


class Tag(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str = Field(max_length=100, unique=True)

    challenges: list["Challenge"] = Relationship(back_populates="tags", link_model=ChallengeTagsLink)


class Challenge(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str
    secret_name: str
    age: int | None = None

    tags: list["Tag"] = Relationship(back_populates="challenges", link_model=ChallengeTagsLink)
