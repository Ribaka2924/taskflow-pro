from fastapi import FastAPI

from app.db.database import Base, engine

from app.models import User, Project, Task

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="TaskFlow Pro API"
)

@app.get("/")
def root():
    return {
        "message": "TaskFlow Pro API Running"
    }