from .healthcheck import router
from .challenges import router as challenges_router
from .tags import router as tags_router

routers_list = [
    router,
    challenges_router,
    tags_router
]