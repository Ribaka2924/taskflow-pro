from pydantic import BaseModel


class TaskCreate(BaseModel):
    title: str
    description: str | None = None
    priority: str = "medium"


class TaskUpdate(BaseModel):
    title: str
    description: str | None = None
    status: str
    priority: str


class TaskResponse(BaseModel):
    id: int
    title: str
    description: str | None
    status: str
    priority: str
    owner_id: int

    class Config:
        from_attributes = True