from sqlalchemy import String, Integer, DateTime
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.sql import func

from app.database import Base


class Patient(Base):
    __tablename__ = "patients"

    id: Mapped[int] = mapped_column(primary_key=True)

    name: Mapped[str] = mapped_column(String, nullable=False)

    age: Mapped[int] = mapped_column(Integer, nullable=False)

    gender: Mapped[str] = mapped_column(String, nullable=False)

    mobile: Mapped[str] = mapped_column(String, nullable=False)

    address: Mapped[str | None] = mapped_column(String)

    department: Mapped[str] = mapped_column(String, nullable=False)

    token: Mapped[str] = mapped_column(String, unique=True)

    created_at: Mapped[DateTime] = mapped_column(
        DateTime,
        server_default=func.now()   
    )