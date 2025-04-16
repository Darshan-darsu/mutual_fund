
from fastapi import APIRouter, Depends,Query
from sqlalchemy.orm import Session
from app.schemas.portfolio import InvestmentCreate
from app.crud.portfolio import add_investment, get_portfolio
from app.core.database import get_db
from app.core.verify_token import verify_token

router = APIRouter()

@router.post("/add")
def add_to_portfolio(data: InvestmentCreate, db: Session = Depends(get_db),user_id: str = Depends(verify_token)):
    return add_investment(db, user_id=data.user_id, data=data) 

@router.get("/portfolio")
def view_portfolio(id:int=Query(...),user_id: str = Depends(verify_token),db: Session = Depends(get_db)):
    return get_portfolio(db, user_id=id)
