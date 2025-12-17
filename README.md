# 🧑‍💻 Collaborative Task Manager

A **production-ready full-stack collaborative task management application** built as part of a full-stack engineering assessment.  
The application supports **secure authentication, task assignment, dashboards, and real-time collaboration**.

---

## 🚀 Live Demo

> ⚠️ Live links will be added after deployment

- **Frontend**: https://your-frontend-url.vercel.app  
- **Backend API**: https://your-backend-url.onrender.com  

---

## 🎯 Objective

To design and build a complete **collaborative task management system** demonstrating:
- Clean backend architecture
- Secure authentication
- Real-time updates using Socket.io
- Strong TypeScript usage
- Production readiness

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- TypeScript
- Tailwind CSS
- React Query (server state & caching)
- React Router
- Socket.io Client

### Backend
- Node.js
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL
- Socket.io
- JWT Authentication (HttpOnly Cookies)
- Zod (DTO validation)

---

## 🧱 Architecture Overview

### Backend Architecture

Routes → Controllers → Services → Repositories → Prisma → Database

- **Controllers**: Handle HTTP requests & responses
- **Services**: Business logic (task creation, assignment, notifications)
- **Repositories**: Database access via Prisma
- **DTOs (Zod)**: Input validation
- **Socket.io**: Real-time task updates & notifications

### Frontend Architecture
- **Pages**: Login, Register, Dashboard, Create Task
- **Hooks**: Data fetching via React Query
- **Components**: Reusable UI components
- **Socket Hooks**: Real-time updates without page refresh

---

## 🔐 Authentication & Authorization

- Secure user registration and login
- Passwords hashed using **bcrypt**
- JWT stored in **HttpOnly cookies**
- Protected frontend routes
- Session validation using `/api/auth/me`

---

## ✅ Core Features

### 🗂️ Task Management (CRUD)
Each task includes:
- Title
- Description
- Due Date
- Priority (Low, Medium, High, Urgent)
- Status (To Do, In Progress, Review, Completed)
- Creator
- Assigned User

### 🔄 Real-Time Collaboration
- Live task updates across users
- Instant assignment notifications
- Powered by **Socket.io**
- No page refresh required

### 📊 User Dashboard
- Tasks assigned to the current user
- Tasks created by the current user
- Overdue tasks
- Fully responsive UI

---

## 🧪 Testing

- Unit tests implemented using **Jest + ts-jest**
- Tested critical backend business logic:
  - Task creation
  - Task assignment notification
  - Task retrieval
- External services (DB, Socket.io) mocked
- Tests run without starting the server

---

## 📡 API Endpoints (Core)

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

### Tasks
- `POST /api/tasks`
- `GET /api/tasks`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`

### Users
- `GET /api/users`

### Notifications
- `GET /api/notifications`

---

## ⚙️ Local Setup Instructions

### 1️⃣ Clone Repository
```bash
git clone https://github.com/sanskritityagi31/collab-task-manager.git
