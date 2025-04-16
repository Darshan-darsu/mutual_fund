
from sqlalchemy.orm import Session
from app.models.investment import Investment

def add_investment(db: Session, user_id: int, data):
    investment = Investment(user_id=user_id, fund_name=data.fund_name, amount=data.amount, current_value=data.current_value,qty=data.qty)
    db.add(investment)
    db.commit()
    db.refresh(investment)
    return investment

def get_portfolio(db: Session, user_id: int):
    return db.query(Investment).filter(Investment.user_id == user_id).all()

