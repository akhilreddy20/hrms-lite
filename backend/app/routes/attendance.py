from fastapi import APIRouter, HTTPException, status
from app.database import attendance_collection, employee_collection
from app.schemas.attendance import AttendanceCreate
from app.utils.validators import validate_attendance_status

router = APIRouter(prefix="/attendance", tags=["Attendance"])

@router.post("/", status_code=status.HTTP_201_CREATED)
async def mark_attendance(attendance: AttendanceCreate):
    employee = await employee_collection.find_one({"employee_id": attendance.employee_id})
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    
    try:
        validate_attendance_status(attendance.status)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    
    existing = await attendance_collection.find_one({
        "employee_id": attendance.employee_id,
        "date": str(attendance.date)  # Convert date to string for MongoDB
    })
    
    if existing:
        raise HTTPException(status_code=400, detail="Attendance already marked for this date")
    
    # Convert date to string before inserting
    attendance_data = attendance.dict()
    attendance_data["date"] = str(attendance_data["date"])
    
    result = await attendance_collection.insert_one(attendance_data)
    return {"message": "Attendance marked", "id": str(result.inserted_id)}

@router.get("/{employee_id}")
async def get_attendance_for_employee(employee_id: str):
    records = []
    async for rec in attendance_collection.find({"employee_id": employee_id}):
        rec["id"] = str(rec["_id"])
        rec.pop("_id", None)
        records.append(rec)
    
    if not records:
        return {"message": "No attendance records found", "data": []}
    
    return records