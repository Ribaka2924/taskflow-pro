# 📋 TaskFlow Pro

TaskFlow Pro is a full-stack task management application built with **FastAPI**, **React**, **SQLite**, and **JWT Authentication**. It allows users to register, log in securely, and manage their daily tasks through a clean and responsive interface.

## ✨ Features

- 🔐 User Registration & Login (JWT Authentication)
- 📋 Create Tasks
- ✏️ Update Tasks
- 🗑️ Delete Tasks
- ✅ Change Task Status
- 🔍 Search Tasks
- 🎯 Filter by Status & Priority
- 📊 Dashboard Statistics
- ⏳ Loading Spinner
- 💬 Success & Error Notifications
- 🚪 Logout
- 🎨 Responsive UI with Bootstrap

## 🛠️ Tech Stack

### Frontend

- React
- React Router
- Axios
- Bootstrap

### Backend

- FastAPI
- SQLAlchemy
- SQLite
- JWT Authentication
- Pydantic

## ## 📂 Project Structure

```text
taskflow-pro/
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   └── v1/
│   │   │       ├── auth.py
│   │   │       └── tasks.py
│   │   │
│   │   ├── core/
│   │   │   ├── config.py
│   │   │   ├── security.py
│   │   │   └── auth.py
│   │   │
│   │   ├── db/
│   │   │   └── database.py
│   │   │
│   │   ├── models/
│   │   │   ├── __init__.py
│   │   │   ├── user.py
│   │   │   ├── project.py
│   │   │   └── task.py
│   │   │
│   │   ├── schemas/
│   │   │   ├── auth.py
│   │   │   └── task.py
│   │   │
│   │   ├── services/
│   │   │
│   │   ├── utils/
│   │   │
│   │   └── main.py
│   │
│   ├── requirements.txt
│   ├── taskflow.db
│   └── .env
│
├── frontend/
│   ├── public/
│   │
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js
│   │   │
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Dashboard.jsx
│   │   │
│   │   ├── components/
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
│
├── .gitignore
├── README.md
└── LICENSE (optional)
```

## 🚀 Installation

### Backend

```bash
cd backend
pip install -r requirements.txt
python -m uvicorn app.main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## 📸 Application Screenshots

### 🔐 Login Page

![Login](./screenshots/login.png)

---

### 📝 Register Page

![Register](./screenshots/register.png)

---

### 📋 Dashboard

![Dashboard](./screenshots/dashboard.png)

---

### ➕ Create Task

![Create Task](./screenshots/create-task.png)

---

### ✏️ Edit Task

![Edit Task](./screenshots/edit-task.png)

---

### 🔍 Search & Filter Tasks

![Search](./screenshots/filters.png)

## 👨‍💻 Author

**D. Ribaka**

Built as a Full Stack Development project using FastAPI and React.
