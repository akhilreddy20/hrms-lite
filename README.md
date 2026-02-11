# HRMS Lite - Human Resource Management System

A lightweight web-based HRMS application for managing employee records and tracking daily attendance.

## 🚀 Live Demo

- **Frontend**: https://hrms-lite-eight-theta.vercel.app/
- **Backend API**: https://hrms-lite-y0ev.onrender.com
- **API Documentation**: https://hrms-lite-backend.up.render.app/docs

## 📋 Features

- 👥 **Employee Management**: Add, view, and delete employee records
- 📅 **Attendance Tracking**: Mark and view daily attendance for employees
- 📊 **Dashboard**: View statistics and top performers
- 🔍 **Date Filters**: Filter attendance records by date range
- 📈 **Analytics**: Display total present/absent days per employee
- 🎨 **Clean UI**: Professional, responsive interface built with React and Tailwind CSS
- ⚡ **Real-time Updates**: Instant feedback with toast notifications
- 🔄 **Loading States**: Visual feedback during data operations

## 🛠️ Tech Stack

### Frontend
- React 19
- React Router DOM
- Axios
- Tailwind CSS
- React Hot Toast
- Vite

### Backend
- FastAPI
- MongoDB (Motor - async driver)
- Pydantic
- Python 3.11+

### Deployment
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

## 📦 Installation & Local Setup

### Prerequisites

- Node.js (v18 or higher)
- Python 3.8+
- MongoDB Atlas account

### 1. Clone the Repository
```bash
git clone https://github.com/akhilreddy20/hrms-lite
cd HRMS-Lite
```

### 2. Backend Setup
```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env
# Edit .env with your MongoDB credentials
```

### 3. Frontend Setup
```bash
cd ../frontend

# Install dependencies
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:8000" > .env
```

### 4. Run the Application

**Start Backend:**
```bash
cd backend
uvicorn app.main:app --reload
```
Backend runs on `http://127.0.0.1:8000`

**Start Frontend:**
```bash
cd frontend
npm run dev
```
Frontend runs on `http://localhost:5173`

## 📁 Project Structure
```
HRMS-Lite/
├── backend/
│   ├── app/
│   │   ├── routes/
│   │   │   ├── employee.py
│   │   │   └── attendance.py
│   │   ├── schemas/
│   │   │   ├── employee.py
│   │   │   └── attendance.py
│   │   ├── models/
│   │   │   ├── employee.py
│   │   │   └── attendance.py
│   │   ├── utils/
│   │   │   └── validators.py
│   │   ├── database.py
│   │   └── main.py
│   ├── .env.example
│   ├── requirements.txt
│   ├── Procfile
│   └── railway.json
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── api.js
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── EmployeeForm.jsx
│   │   │   ├── EmployeeList.jsx
│   │   │   ├── AttendanceForm.jsx
│   │   │   └── AttendanceRecords.jsx
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Employees.jsx
│   │   │   └── Attendance.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env.production
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## 🔐 Environment Variables

### Backend (.env)
```env
MONGODB_URL=your_mongodb_connection_string
DATABASE_NAME=hrms_lite
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:8000
```

## 📊 API Endpoints

### Employees
- `GET /employees/` - Get all employees
- `POST /employees/` - Add new employee
- `DELETE /employees/{employee_id}` - Delete employee

### Attendance
- `POST /attendance` - Mark attendance
- `GET /attendance/{employee_id}` - Get attendance records for employee

## ✨ Key Features Implemented

### Required Features
✅ Employee Management (Add, View, Delete)
✅ Attendance Management (Mark, View)
✅ RESTful APIs
✅ Database Persistence (MongoDB)
✅ Validation (Email format, Required fields, Duplicate handling)
✅ Error Handling (HTTP status codes, Error messages)
✅ Professional UI (Clean layout, Spacing, Typography, Navigation)
✅ Reusable Components
✅ UI States (Loading, Empty, Error)

### Bonus Features Implemented
✅ Date Range Filter for attendance records
✅ Total present/absent days per employee
✅ Dashboard with summary statistics
✅ Top performers table
✅ Attendance percentage calculation
✅ Toast notifications
✅ Responsive design

## 🚨 Assumptions & Limitations

### Assumptions
- Single admin user (no authentication required as per assignment)
- Employee IDs are unique and managed manually
- Date format follows ISO standard (YYYY-MM-DD)
- Maximum one attendance entry per employee per day

### Limitations
- No user authentication/authorization
- No employee profile pictures
- No bulk operations (import/export)
- No email notifications
- No advanced reporting features

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License.

## 👤 Author

  Name - akhilreddy8688@gmail.com
- GitHub: https://github.com/akhilreddy20
- LinkedIn:

## 🙏 Acknowledgments

- FastAPI documentation
- React documentation
- Tailwind CSS
- MongoDB
