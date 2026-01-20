from pydantic import BaseModel, Field
from typing import List
from datetime import date

class Subject(BaseModel):
    name: str = Field(..., description="Subject name")
    difficulty: int = Field(..., ge=1, le=5)

class StudyInput(BaseModel):
    subjects: List[Subject]
    hours_per_day: int = Field(..., ge=1, le=12)
    deadline: date

class DailyPlan(BaseModel):
    day: str
    tasks: List[str]

class StudyPlanOutput(BaseModel):
    strategy: str
    plan: List[DailyPlan]
