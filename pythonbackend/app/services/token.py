from sqlalchemy.orm import Session

from app.models import Patient


DEPARTMENT_CODES = {
    "General Medicine": "GM",
    "Cardiology": "CD",
    "Orthopedics": "OR",
    "Pediatrics": "PD",
    "Neurology": "NR",
}


def generate_token(db: Session, department: str) -> str:

    prefix = DEPARTMENT_CODES.get(department)

    last_patient = (
        db.query(Patient)
        .filter(Patient.department == department)
        .order_by(Patient.id.desc())
        .first()
    )

    if last_patient:
        last_number = int(last_patient.token[2:])
        next_number = last_number + 1
    else:
        next_number = 1

    return f"{prefix}{next_number:03d}"