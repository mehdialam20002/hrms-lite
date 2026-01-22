from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app import schemas, crud
from app.deps import get_db
from fastapi import Query
from app.models import AttendanceStatus
from typing import Optional

router = APIRouter(prefix="/attendance", tags=["Attendance"])

@router.post("/", response_model=schemas.AttendanceResponse)
def mark_attendance(data: schemas.AttendanceCreate, db: Session = Depends(get_db)):
    return crud.mark_attendance(db, data)

# ✅ STATIC ROUTE FIRST
@router.get("/today")
def today_attendance(
    status: AttendanceStatus | None = Query(None),
    db: Session = Depends(get_db)
):
    return crud.get_today_attendance(db, status)


# ✅ DYNAMIC ROUTE AFTER
@router.get("/{employee_id}")
def get_attendance(
    employee_id: int,
    db: Session = Depends(get_db)
):
    return crud.get_attendance_by_employee(db, employee_id)
