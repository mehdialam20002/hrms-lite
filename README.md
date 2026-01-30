# HRMS Lite – Full Stack Application

A lightweight Human Resource Management System (HRMS Lite) built as part of a full-stack coding assessment.  
The application allows an admin to manage employees and track daily attendance through a clean, professional, and production-ready interface.

---

## 🚀 Live Demo

- **Frontend URL:** (https://hrms-lite-one.vercel.app/)
- **Backend API URL:** https://hrms-lite-backendd.onrender.com
- **API Docs (Swagger):**https://hrms-lite-backendd.onrender.com/docs

---

## 📦 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Axios
- Responsive, mobile-first UI

### Backend
- FastAPI (Python)
- SQLAlchemy ORM
- PostgreSQL
- Pydantic (validation & schemas)

### Deployment
- Frontend: **Vercel**
- Backend: **Render**
- Database: **PostgreSQL (Managed)**

---

## ✨ Features

### Employee Management
- Add new employees
  - Unique Employee ID
  - Full Name
  - Email (validated)
  - Department
- View all employees in a structured table
- Delete employee records

### Attendance Management
- Mark daily attendance (Present / Absent)
- Prevent duplicate attendance for the same employee on the same date
- View attendance history per employee
- Status-based visual indicators (Present / Absent)

### Dashboard (Bonus)
- Total Employees
- Present Today
- Absent Today
- Monthly Attendance Percentage
- Clickable stats for quick insights

---

## 🧠 Backend Highlights

- RESTful API design
- Proper HTTP status codes
- Server-side validation
- Duplicate employee handling
- Graceful error responses with meaningful messages
- Modular, scalable folder structure

---

## 🎨 Frontend UI Highlights

- Professional HR dashboard layout
- Responsive (mobile, tablet, desktop)
- Reusable components
- Loading, empty, and error states
- Clean spacing and typography
- Intuitive navigation via sidebar

---

## 🛠️ How to Run Locally

### Backend Setup

cd hrms-lite-backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
Create .env file:

DATABASE_URL=postgresql://username:password@localhost:5432/hrms_lite

Run server:
uvicorn app.main:app --reload

Backend will run at:
http://localhost:8000

Frontend Setup
cd hrms-lite-frontend
npm install
npm run dev


Frontend will run at:
http://localhost:5173

hrms-lite/
│
├── hrms-lite-backend/
│   ├── app/
│   │   ├── routers/
│   │   ├── models.py
│   │   ├── schemas.py
│   │   ├── crud.py
│   │   ├── database.py
│   │   └── main.py
│   └── requirements.txt
│
├── hrms-lite-frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   └── package.json
│
└── README.md

.
