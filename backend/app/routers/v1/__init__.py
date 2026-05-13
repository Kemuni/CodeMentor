from .healthcheck import router
from .challenges import router as challenges_router
from .tags import router as tags_router
from .auth import router as auth_router
from .solutions import router as solutions_router
from .progress import router as progress_router

routers_list = [
    router,
    challenges_router,
    tags_router,
    auth_router,
    solutions_router,
    progress_router,
]