from fastapi import FastAPI

from app.db.database import Base, engine

from app.models import User, Project, Task

from app.api.v1.auth import router as auth_router

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="TaskFlow Pro API"
)

@app.get("/")
def root():
    return {
        "message": "TaskFlow Pro API Running"
    }

app.include_router(auth_router)