
import requests
import os
from app.core.config import settings

def fetch_fund_data():
    url = f"{settings.RAPIDAPI_URL}/latest?Scheme_Type=Open"
    headers = {
        "X-RapidAPI-Key": settings.RAPIDAPI_KEY,
        "X-RapidAPI-Host": settings.HOST_NAME
    }
    response = requests.get(url, headers=headers)
    print(response.json(),"----------------")
    return response.json()


def fetch_history_funds():
    url = f"{settings.RAPIDAPI_URL}/masterss?RTA_Agent_Code=CAMS"
    headers = {
        "X-RapidAPI-Key": settings.RAPIDAPI_KEY,
        "X-RapidAPI-Host": settings.HOST_NAME
    }
    response = requests.get(url, headers=headers)
    print(response.json(),"----------------")
    return response.json()
