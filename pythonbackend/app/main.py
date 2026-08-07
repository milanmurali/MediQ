from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import Base, engine
from app import models
from app.routers.patients import router as patient_router

app = FastAPI() 
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)


Base.metadata.create_all(bind=engine)
app.include_router(patient_router)



@app.get("/")



async def root():
    return {
        "status": "success",
        "service": "MediQ Python Backend"
    }
    