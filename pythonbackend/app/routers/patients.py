from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app import crud, schemas
from app.database import get_db
from app.schemas import CreatePatientResponse

router = APIRouter(
    prefix="/api/patients",
    tags=["Patients"]
)


@router.post("/", response_model=CreatePatientResponse, status_code=201)
def create_patient(
    patient: schemas.PatientCreate,
    db: Annotated[Session, Depends(get_db)]
):

    new_patient = crud.create_patient(db, patient)

    return {
        "success": True,
        "message": "Patient created successfully",
        "data": new_patient
    }


@router.get("/")
def get_patients(
    db: Annotated[Session, Depends(get_db)],
    search: str | None = None,
    department: str | None = None,
):

    patients = crud.get_patients(db, search, department)

    return {
        "success": True,
        "data": patients
    }


@router.get("/{patient_id}")
def get_patient(
    patient_id: int,
    db: Annotated[Session, Depends(get_db)]
):

    patient = crud.get_patient_by_id(db, patient_id)

    if patient is None:
        raise HTTPException(
            status_code=404,
            detail="Patient not found"
        )

    return {
        "success": True,
        "data": patient
    }