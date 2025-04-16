
from sqlalchemy import Column, Integer, String, Float, ForeignKey
from app.core.database import Base

class Investment(Base):
    __tablename__ = "investments"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    fund_name = Column(String)
    amount = Column(Float)
    current_value = Column(Float)
    qty=Column(Integer)
    
    class Config:
        orm_mode = True