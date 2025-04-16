
from apscheduler.schedulers.background import BackgroundScheduler
from app.utils.readfile import read_fund_data

scheduler = BackgroundScheduler()

def start_scheduler():
    scheduler.add_job(read_fund_data, "interval", hours=1)
    scheduler.start()
