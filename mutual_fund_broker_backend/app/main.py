
from fastapi import FastAPI
from app.api import auth, funds, portfolio
from app.core.database import Base, engine
from app.scheduler import start_scheduler
from fastapi.middleware.cors import CORSMiddleware

# Base.metadata.drop_all(engine) 
Base.metadata.create_all(bind=engine)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/auth")
app.include_router(funds.router, prefix="/funds")
app.include_router(portfolio.router, prefix="/investment")

start_scheduler()
if __name__ == "__main__":
    # Use this for debugging purposes only
    import uvicorn

    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        log_level="debug",
    )
