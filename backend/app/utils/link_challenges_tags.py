from app.models import ChallengeTagsLink, Challenge, Tag
from app.dependencies import get_db
from fastapi import Depends

def link_with_tag(challenge_id: int, tag_id: int, db = Depends(get_db)):
    challenge_tag_link = ChallengeTagsLink(challenge_id=challenge_id, tag_id=tag_id)
    db.add(challenge_tag_link)
    db.commit()
    db.refresh(challenge_tag_link)
    return challenge_tag_link

def link_with_tags(challenge_id: int, tags: list[int], db = Depends(get_db)):
    challenge_tag_links = []
    for tag_id in tags:
        link_with_tag(challenge_id, tag_id, db = db)