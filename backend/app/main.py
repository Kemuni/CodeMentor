from contextlib import asynccontextmanager

import uvicorn
from fastapi import FastAPI
from fastapi.exceptions import RequestValidationError
from starlette.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.errors.handlers import general_exception_handler, pydantic_validation_exception_handler
from app.routers import routers_list


@asynccontextmanager
async def lifespan(_: FastAPI):
    yield


def init_app() -> FastAPI:
    application = FastAPI(
        lifespan=lifespan,
        title="CodeMentor API",
        description="API service for CodeMentor website",
    )

    application.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Register exception handlers
    application.add_exception_handler(RequestValidationError, pydantic_validation_exception_handler)
    application.add_exception_handler(Exception, general_exception_handler)

    # Register routers
    for router in routers_list:
        application.include_router(router)

    return application

def main() -> None:
    uvicorn.run(
        "app.main:app",
        host="127.0.0.1",
        port=8000,
        reload=settings.ENVIRONMENT == "local",
        workers=1,
    )

app = init_app()

if __name__ == "__main__":
    main()
