from sqlalchemy.orm import Session
from app import models, schemas
from fastapi import HTTPException, status
from datetime import date
from sqlalchemy.orm import Session
from app import models
from datetime import date
from sqlalchemy.orm import Session
from app import models, schemas
from fastapi import HTTPException

from app.models import AttendanceStatus

def get_today_attendance(db: Session, status: AttendanceStatus | None = None):
    today = date.today()

    query = (
        db.query(models.Attendance, models.Employee)
        .join(models.Employee, models.Attendance.employee_id == models.Employee.id)
        .filter(models.Attendance.date == today)
    )

    if status:
        query = query.filter(models.Attendance.status == status)

    results = query.all()

    return [
        {
            "employee_id": emp.employee_id,
            "name": emp.full_name,
            "department": emp.department,
            "status": att.status.value,  # 👈 enum value
        }
        for att, emp in results
    ]

def create_employee(db: Session, employee: schemas.EmployeeCreate):
    if db.query(models.Employee).filter(
        (models.Employee.employee_id == employee.employee_id) |
        (models.Employee.email == employee.email)
    ).first():
        raise HTTPException(status_code=400, detail="Employee already exists")

    emp = models.Employee(**employee.dict())
    db.add(emp)
    db.commit()
    db.refresh(emp)
    return emp

def get_employees(db: Session):
    return db.query(models.Employee).all()

def delete_employee(db: Session, emp_id: int):
    emp = db.query(models.Employee).filter(models.Employee.id == emp_id).first()
    if not emp:
        raise HTTPException(status_code=404, detail="Employee not found")
    db.delete(emp)
    db.commit()


def mark_attendance(db: Session, data: schemas.AttendanceCreate):
    # check if employee exists
    emp = db.query(models.Employee).filter(
        models.Employee.id == data.employee_id
    ).first()
    if not emp:
        raise HTTPException(status_code=404, detail="Employee not found")

    # 🔥 check if attendance already exists for this date
    attendance = (
        db.query(models.Attendance)
        .filter(
            models.Attendance.employee_id == emp.id,
            models.Attendance.date == data.date,
        )
        .first()
    )

    if attendance:
        # UPDATE instead of INSERT
        attendance.status = data.status
    else:
        attendance = models.Attendance(
            employee_id=emp.id,
            date=data.date,
            status=data.status,
        )
        db.add(attendance)

    db.commit()
    db.refresh(attendance)
    return attendance

def get_attendance_by_employee(db: Session, emp_id: int):
    return db.query(models.Attendance).filter(models.Attendance.employee_id == emp_id).all()
from sqlalchemy.orm import Session
from datetime import date
from app import models

def get_dashboard_stats(db: Session):
    today = date.today()

    total_employees = db.query(models.Employee).count()

    present_today = (
        db.query(models.Attendance)
        .filter(
            models.Attendance.date == today,
            models.Attendance.status == models.AttendanceStatus.present
        )
        .count()
    )

    absent_today = (
        db.query(models.Attendance)
        .filter(
            models.Attendance.date == today,
            models.Attendance.status == models.AttendanceStatus.absent
        )
        .count()
    )

    return {
        "total_employees": total_employees,
        "present_today": present_today,
        "absent_today": absent_today,
    }
