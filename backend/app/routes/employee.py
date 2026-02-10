from fastapi import APIRouter, HTTPException, status
from app.database import employee_collection
from app.schemas.employee import EmployeeCreate
from pydantic import ValidationError

router = APIRouter(prefix="/employees", tags=["Employees"])

@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_employee(employee: EmployeeCreate):
    print("Received data:", employee.dict())  # Add this line for debugging
    
    existing = await employee_collection.find_one({"employee_id": employee.employee_id})
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Employee with this ID already exists"
        )
    result = await employee_collection.insert_one(employee.dict())
    return {"message": "Employee created successfully", "id": str(result.inserted_id)}

@router.get("/")
async def get_all_employees():
    employees = []
    async for emp in employee_collection.find():
        emp["id"] = str(emp["_id"])
        emp.pop("_id", None)
        employees.append(emp)
    return employees

@router.delete("/{employee_id}")
async def delete_employee(employee_id: str):
    result = await employee_collection.delete_one({"employee_id": employee_id})
    if result.deleted_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Employee not found"
        )
    return {"message": "Employee deleted successfully"}