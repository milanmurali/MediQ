from sqlalchemy.orm import Session
from app import models, schemas
from app.services.token import generate_token

def create_patient(db: Session, patient: schemas.PatientCreate):

    new_patient = models.Patient(
        name=patient.name,
        age=patient.age,
        gender=patient.gender,
        mobile=patient.mobile,
        address=patient.address,
        department=patient.department,
        token=generate_token(db, patient.department)
    )

    db.add(new_patient)
    db.commit()
    db.refresh(new_patient)

    return new_patient  

def get_patients(
    db: Session,
    search: str | None,
    department: str | None
):

    query = db.query(models.Patient)

    if search:
        query = query.filter(
            models.Patient.name.ilike(f"%{search}%")
        )

    if department:
        query = query.filter(
            models.Patient.department == department
        )

    return (
        query
        .order_by(models.Patient.created_at.desc())
        .all()
    )


def get_patient_by_id(db: Session, patient_id: int):

    return (
        db.query(models.Patient)
        .filter(models.Patient.id == patient_id)
        .first()
    )