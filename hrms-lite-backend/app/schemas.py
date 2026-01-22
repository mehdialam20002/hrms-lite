from pydantic import BaseModel, EmailStr
from datetime import date
from app.models import AttendanceStatus

class EmployeeCreate(BaseModel):
    employee_id: str
    full_name: str
    email: EmailStr
    department: str

class EmployeeResponse(EmployeeCreate):
    id: int

    class Config:
        from_attributes = True

class AttendanceCreate(BaseModel):
    employee_id: int   # employees.id (PK)
    date: date
    status: AttendanceStatus

class AttendanceResponse(BaseModel):
    date: date
    status: str
