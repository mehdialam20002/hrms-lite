from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.deps import get_db
from app import crud

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

@router.get("/stats")
def dashboard_stats(db: Session = Depends(get_db)):
    return crud.get_dashboard_stats(db)
