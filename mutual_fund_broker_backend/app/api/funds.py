
from fastapi import APIRouter,Depends
from app.utils.readfile import read_fund_data
from app.core.verify_token import verify_token
from app.services.rapidapi import fetch_fund_data

router = APIRouter()

@router.get("/latest")
def fetch_funds(user_id: str = Depends(verify_token)):
    return fetch_fund_data()
# read_fund_data()