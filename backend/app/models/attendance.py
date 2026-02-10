from pydantic import BaseModel
from datetime import date


class Attendance(BaseModel):
    employee_id: str
    date: date
    status: str