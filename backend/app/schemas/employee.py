from pydantic import BaseModel, EmailStr, Field


class EmployeeCreate(BaseModel):
    employee_id: str 
    full_name: str 
    email: EmailStr
    department: str


class EmployeeResponse(EmployeeCreate):
    id: str