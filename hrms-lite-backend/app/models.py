from sqlalchemy import Column, Integer, String, Date, Enum, ForeignKey, UniqueConstraint
from sqlalchemy.orm import relationship
from app.database import Base
import enum

class AttendanceStatus(enum.Enum):
    present = "Present"
    absent = "Absent"

class Employee(Base):
    __tablename__ = "employees"

    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(String, unique=True, nullable=False)
    full_name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    department = Column(String, nullable=False)

    attendance = relationship(
        "Attendance",
        back_populates="employee",
        cascade="all, delete"
    )

class Attendance(Base):
    __tablename__ = "attendance"

    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(Integer, ForeignKey("employees.id"), nullable=False)
    date = Column(Date, nullable=False)
    status = Column(Enum(AttendanceStatus), nullable=False)

    employee = relationship(
        "Employee",
        back_populates="attendance"
    )

    __table_args__ = (
        UniqueConstraint("employee_id", "date", name="unique_employee_date"),
    )
