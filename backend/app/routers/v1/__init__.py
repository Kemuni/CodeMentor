from .healthcheck import router
from .challenges import router as challenges_router

routers_list = [
    router,
    challenges_router
]