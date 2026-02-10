def validate_attendance_status(status: str):
    if status not in ["Present", "Absent"]:
        raise ValueError("Status must be 'Present' or 'Absent'")