from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.db.database import get_db

from app.models.task import Task
from app.models.user import User

from app.schemas.task import (
    TaskCreate,
    TaskUpdate,
    TaskResponse
)

from app.api.dependencies import (
    get_current_user
)

router = APIRouter(
    prefix="/api/v1/tasks",
    tags=["Tasks"]
)


@router.post(
    "/",
    response_model=TaskResponse
)
def create_task(
    payload: TaskCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    )
):

    task = Task(
    title=payload.title,
    description=payload.description,
    priority=payload.priority,
    status=payload.status,
    owner_id=current_user.id
)

    db.add(task)

    db.commit()

    db.refresh(task)

    return task

@router.get(
    "/",
    response_model=list[TaskResponse]
)
def get_tasks(
    status: str | None = None,
    priority: str | None = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    )
):

    query = (
        db.query(Task)
        .filter(
            Task.owner_id == current_user.id
        )
    )

    if status:
        query = query.filter(
            Task.status == status
        )

    if priority:
        query = query.filter(
            Task.priority == priority
        )

    tasks = query.all()

    return tasks

@router.get("/stats")
def task_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    )
):

    total_tasks = (
        db.query(Task)
        .filter(
            Task.owner_id == current_user.id
        )
        .count()
    )

    completed_tasks = (
        db.query(Task)
        .filter(
            Task.owner_id == current_user.id,
            Task.status == "completed"
        )
        .count()
    )

    pending_tasks = (
        db.query(Task)
        .filter(
            Task.owner_id == current_user.id,
            Task.status == "pending"
        )
        .count()
    )

    return {
        "total_tasks": total_tasks,
        "completed_tasks": completed_tasks,
        "pending_tasks": pending_tasks
    }


@router.get(
    "/{task_id}",
    response_model=TaskResponse
)
def get_task(
    task_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    )
):

    task = (
        db.query(Task)
        .filter(
            Task.id == task_id,
            Task.owner_id == current_user.id
        )
        .first()
    )

    if not task:
        raise HTTPException(
            status_code=404,
            detail="Task not found"
        )

    return task

@router.put(
    "/{task_id}",
    response_model=TaskResponse
)
def update_task(
    task_id: int,
    payload: TaskUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    )
):

    task = (
        db.query(Task)
        .filter(
            Task.id == task_id,
            Task.owner_id == current_user.id
        )
        .first()
    )

    if not task:
        raise HTTPException(
            status_code=404,
            detail="Task not found"
        )

    task.title = payload.title
    task.description = payload.description
    task.status = payload.status
    task.priority = payload.priority

    db.commit()
    db.refresh(task)

    return task

@router.delete("/{task_id}")
def delete_task(
    task_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(
        get_current_user
    )
):

    task = (
        db.query(Task)
        .filter(
            Task.id == task_id,
            Task.owner_id == current_user.id
        )
        .first()
    )

    if not task:
        raise HTTPException(
            status_code=404,
            detail="Task not found"
        )

    db.delete(task)
    db.commit()

    return {
        "message": "Task deleted successfully"
    }