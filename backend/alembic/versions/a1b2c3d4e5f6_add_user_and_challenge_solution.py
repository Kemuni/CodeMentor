"""add_user_and_challenge_solution

Revision ID: a1b2c3d4e5f6
Revises: f33ff101ed02
Create Date: 2026-05-13 00:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

revision: str = 'a1b2c3d4e5f6'
down_revision: Union[str, None] = 'f33ff101ed02'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        'user',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('github_id', sa.Integer(), nullable=False),
        sa.Column('username', sa.String(length=150), nullable=False),
        sa.Column('email', sa.String(length=255), nullable=True),
        sa.Column('avatar_url', sa.String(), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('github_id'),
    )
    op.create_index(op.f('ix_user_github_id'), 'user', ['github_id'], unique=True)

    op.create_table(
        'challengesolution',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('challenge_id', sa.Integer(), nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('general_description', sa.String(), nullable=False),
        sa.Column('trouble_description', sa.String(), nullable=False),
        sa.Column('total_rate', sa.Integer(), nullable=False),
        sa.Column('total_difficulty', sa.Integer(), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(['challenge_id'], ['challenge.id'], ),
        sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
        sa.PrimaryKeyConstraint('id'),
    )


def downgrade() -> None:
    op.drop_table('challengesolution')
    op.drop_index(op.f('ix_user_github_id'), table_name='user')
    op.drop_table('user')
