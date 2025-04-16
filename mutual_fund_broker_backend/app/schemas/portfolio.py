
from pydantic import BaseModel

class InvestmentCreate(BaseModel):
    fund_name: str
    amount: float
    user_id: int
    qty: int
    current_value: float

