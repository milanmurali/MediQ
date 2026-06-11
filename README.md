# MediQ - Patient Registration Kiosk

## Overview

MediQ is a self-service patient registration kiosk designed to streamline hospital check-in and registration workflows. Patients can register through a kiosk interface, receive a department-specific token, and hospital staff can manage registrations through an administrative dashboard.

The application is built as a full-stack web application using React, Express, and SQLite.

---
## Live Demo

### Frontend (vercel)
https://medi-q-five.vercel.app/

### Backend API (render)
https://mediq-backend-32vl.onrender.com/

---

## Features

### Patient Registration

* Register new patients through a kiosk-style interface
* Capture patient information:

  * Full Name
  * Age
  * Gender
  * Mobile Number
  * Address (Optional)
  * Department Selection
* Client-side and server-side validation
* Department-specific token generation
* Token confirmation screen
* Printable patient token

### Administrative Dashboard

* View all registered patients
* Search patients by name
* Search patients by patient ID
* Filter patients by department
* View registration timestamps
* Responsive tabular interface

### Accessibility Features

* Adjustable font size controls
* Persistent accessibility preferences using Local Storage
* Accessible form labels and validation feedback
* Responsive kiosk-friendly UI

---

## Technology Stack

### Frontend

* React
* React Router DOM
* Axios
* Tailwind CSS
* Vite
* react-to-print

### Backend

* Node.js
* Express.js
* SQLite
* better-sqlite3
---

## Project Structure

### Backend

```text
backend/
│
├── controllers/
│   └── patientController.js
│
├── database/
│   ├── db.js
│   └── mediq.db
│
├── routes/
│   └── patients.js
│
├── services/
│   └── generateToken.js
│
├── utils/
│   ├── departmentCodes.js
│   └── validation.js
│
└── server.js
```

### Frontend

```text
frontend/
│
├── public/
│
├── src/
│   ├── assets/
│   ├── pages/
│   │   ├── Welcome.jsx
│   │   ├── Register.jsx
│   │   ├── Token.jsx
│   │   └── Admin.jsx
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
└── vite.config.js
```

---

## API Endpoints

### Create Patient

```http
POST /api/patients
```

Creates a new patient registration and generates a department-specific token.

### Get All Patients

```http
GET /api/patients
```

Returns all registered patients.

### Get Patient By ID

```http
GET /api/patients/:id
```

Returns a specific patient by ID.

### Search Patients By Name

```http
GET /api/patients?search={name}
```

Returns matching patients based on name search.

### Filter Patients By Department

```http
GET /api/patients?department={department}
```

Returns patients belonging to a specific department.

---

## Token Generation

Tokens are automatically generated per department using department prefixes:

| Department       | Prefix |
| ---------------- | ------ |
| General Medicine | GEN    |
| Cardiology       | CAR    |
| Orthopedics      | ORT    |
| Dermatology      | DER    |
| Pediatrics       | PED    |

Example:

```text
CAR-001
CAR-002
GEN-001
PED-003
```

---

## Environment Setup

### Prerequisites

* Node.js v18+
* npm

---

### Backend Setup

Navigate to backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Start server:

```bash
npm run dev
```
---

### Frontend Setup

Navigate to frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
VITE_BACKEND_HOST="add_backend_host_here"
```

Start frontend:

```bash
npm run dev
```
---

## Application Workflow

1. Patient starts registration through the kiosk interface.
2. Patient enters personal details.
3. Patient selects a department.
4. Backend validates input and creates a registration record.
5. Department-specific token is generated.
6. Patient receives token confirmation screen.
7. Token can be printed for reference.
8. Administrative dashboard displays registrations and supports searching/filtering.

---

## Design Considerations

* Lightweight SQLite database for simplified deployment.
* Department-specific token generation.
* Responsive user interface for kiosk devices and desktop administration.
* Persistent accessibility preferences using Local Storage.
* Separation of concerns using Controllers, Routes, Services, and Utility modules.

---
