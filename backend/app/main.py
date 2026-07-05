from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.db.database import Base, engine
from app.models import User, Project, Task

from app.api.v1.auth import router as auth_router
from app.api.v1.tasks import router as task_router

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="TaskFlow Pro API"
)

# Add this block
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {
        "message": "TaskFlow Pro API Running"
    }

app.include_router(auth_router)
app.include_router(task_router)