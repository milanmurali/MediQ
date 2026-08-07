from datetime import datetime
from typing import Literal  
from pydantic import BaseModel, ConfigDict


class PatientCreate(BaseModel):
    name: str
    age: int
    gender: str
    mobile: str
    address: str | None = None
    department: Literal[
        "General Medicine",
        "Cardiology",
        "Orthopedics",
        "Pediatrics",
        "Neurology"
    ]



class PatientResponse(BaseModel):
    id: int
    name: str
    age: int
    gender: str
    mobile: str
    address: str | None
    department: str
    token: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class CreatePatientResponse(BaseModel):
    success: bool
    message: str = "Patient created successfully"
    data: PatientResponse