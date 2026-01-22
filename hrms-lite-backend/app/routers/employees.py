from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app import schemas, crud
from app.deps import get_db

router = APIRouter(prefix="/employees", tags=["Employees"])

@router.post("/", response_model=schemas.EmployeeResponse)
def add_employee(employee: schemas.EmployeeCreate, db: Session = Depends(get_db)):
    return crud.create_employee(db, employee)

@router.get("/", response_model=list[schemas.EmployeeResponse])
def list_employees(db: Session = Depends(get_db)):
    return crud.get_employees(db)

@router.delete("/{emp_id}")
def remove_employee(emp_id: int, db: Session = Depends(get_db)):
    crud.delete_employee(db, emp_id)
    return {"message": "Employee deleted"}
