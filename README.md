# 🚀 Smart Leads Dashboard

> A production-ready **Lead Management & Sales Dashboard** built with the MERN stack, featuring secure authentication, role-based access control, advanced lead filtering, pagination, CSV export, and a responsive modern UI.

---

## ✨ Overview

**Smart Leads Dashboard** is a full-stack CRM-style application designed to help sales teams efficiently manage, track, and analyze leads.

The application provides separate access levels for **Administrators** and **Sales Users**, with secure JWT-based authentication and backend-enforced authorization.

### Key Highlights

* 🔐 Secure JWT authentication
* 👥 Role-Based Access Control (Admin / Sales)
* 📊 Lead management dashboard
* 🔎 Advanced search & filtering
* 📄 Server-side pagination
* 📤 CSV export
* 🌙 Dark / Light mode
* 🛡️ API security & rate limiting
* ✅ Backend & frontend validation
* 🐳 Dockerized deployment
* 📱 Responsive UI
* ⚡ Optimized API requests with debounced search
* 🧩 Modular & scalable architecture
* 💯 TypeScript-based codebase

---

## 🏗️ System Architecture

```text
┌──────────────────────┐
│      React SPA       │
│   React + TypeScript │
│      TailwindCSS     │
└──────────┬───────────┘
           │
           │ REST API / Axios
           ▼
┌──────────────────────┐
│    Express.js API    │
│   Node.js + TS       │
│                      │
│ • Authentication     │
│ • Authorization      │
│ • Validation         │
│ • Lead Management    │
│ • CSV Export         │
└──────────┬───────────┘
           │
           │ Mongoose ODM
           ▼
┌──────────────────────┐
│       MongoDB        │
│                      │
│ • Users              │
│ • Leads              │
└──────────────────────┘
```

---

## 🔥 Core Features

### 🔐 Authentication & Authorization

* JWT-based authentication
* Secure password hashing using bcrypt
* Protected API routes
* Role-based authorization
* Admin and Sales user roles
* Configurable token expiration
* Automatic logout on token expiration

### 👥 Role-Based Access Control

| Role      | Permissions                     |
| --------- | ------------------------------- |
| **Admin** | Full access to leads and users  |
| **Sales** | Manage and view their own leads |

Authorization is enforced on the **backend**, ensuring users cannot bypass access restrictions through the frontend.

---

### 📊 Lead Management

Complete CRUD functionality:

* Create leads
* View lead details
* Update lead information
* Delete leads
* Update lead status
* Track lead source
* Add notes

Supported statuses:

```text
New → Contacted → Qualified → Lost
```

Supported sources:

```text
Website
Instagram
Referral
```

---

### 🔎 Advanced Search & Filtering

Users can combine multiple filters to quickly find relevant leads.

**Available filters:**

* Status
* Source
* Name
* Email
* Sorting
* Pagination

Search requests use **500ms debounce** to reduce unnecessary API calls and improve performance.

Example:

```http
GET /api/v1/leads?page=1&limit=10&status=New&source=Website&search=john&sort=latest
```

---

### 📤 CSV Export

Export leads directly from the dashboard.

Features:

* Export filtered results
* Preserve active filters
* Include complete lead information
* Automatic CSV download

Example:

```http
GET /api/v1/leads/export/csv?status=Qualified&source=Instagram
```

---

### 🌙 Dark Mode

* Light / Dark theme support
* Persistent theme preference
* Smooth UI transitions
* Accessible color contrast

---

## 🛠️ Tech Stack

### Frontend

| Technology      | Purpose             |
| --------------- | ------------------- |
| React 18        | UI development      |
| TypeScript      | Type safety         |
| TailwindCSS     | Styling             |
| React Router    | Client-side routing |
| Zustand         | State management    |
| React Hook Form | Form management     |
| Axios           | API communication   |
| React Hot Toast | Notifications       |
| Lucide React    | UI icons            |
| Vite            | Build tooling       |

### Backend

| Technology         | Purpose                    |
| ------------------ | -------------------------- |
| Node.js            | Runtime                    |
| Express.js         | REST API                   |
| TypeScript         | Type safety                |
| MongoDB            | Database                   |
| Mongoose           | ODM                        |
| JWT                | Authentication             |
| bcrypt             | Password hashing           |
| Express Validator  | Request validation         |
| Winston            | Application logging        |
| Helmet             | HTTP security              |
| CORS               | Cross-origin configuration |
| Express Rate Limit | API protection             |

### DevOps

```text
Docker
Docker Compose
Nginx
MongoDB Atlas
Vercel / Netlify
Railway / Render
```

---

## 📁 Project Structure

```text
smart-leads-dashboard/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.ts
│   │   │
│   │   ├── controllers/
│   │   │   ├── auth.controller.ts
│   │   │   └── lead.controller.ts
│   │   │
│   │   ├── middleware/
│   │   │   ├── auth.ts
│   │   │   ├── errorHandler.ts
│   │   │   └── validate.ts
│   │   │
│   │   ├── models/
│   │   │   ├── User.ts
│   │   │   └── Lead.ts
│   │   │
│   │   ├── routes/
│   │   │   ├── auth.routes.ts
│   │   │   ├── lead.routes.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── services/
│   │   │   ├── auth.service.ts
│   │   │   └── lead.service.ts
│   │   │
│   │   ├── validators/
│   │   │   ├── auth.validators.ts
│   │   │   └── lead.validators.ts
│   │   │
│   │   ├── types/
│   │   ├── utils/
│   │   ├── app.ts
│   │   └── server.ts
│   │
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   ├── dashboard/
│   │   │   ├── layout/
│   │   │   ├── leads/
│   │   │   └── ui/
│   │   │
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── store/
│   │   ├── types/
│   │   ├── utils/
│   │   ├── App.tsx
│   │   └── main.tsx
│   │
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── package.json
│   └── vite.config.ts
│
├── docker-compose.yml
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

```text
Node.js >= 18
MongoDB >= 7
npm / yarn
Docker (optional)
```

---

## 🐳 Docker Setup

Docker is the recommended way to run the complete application.

### 1. Clone the repository

```bash
git clone <your-repo-url>

cd smart-leads-dashboard
```

### 2. Configure environment variables

Backend:

```bash
cd backend
cp .env.example .env
```

Frontend:

```bash
cd frontend
cp .env.example .env
```

Configure your MongoDB connection and JWT secret.

### 3. Start the application

From the root directory:

```bash
docker-compose up -d
```

### Application URLs

```text
Frontend  → http://localhost
Backend   → http://localhost:5000
MongoDB   → localhost:27017
```

---

## 💻 Manual Installation

### Backend

```bash
cd backend

npm install

cp .env.example .env

npm run dev
```

Backend:

```text
http://localhost:5000
```

### Frontend

```bash
cd frontend

npm install

cp .env.example .env

npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

## 🔑 Environment Variables

### Backend

```env
NODE_ENV=development
PORT=5000

MONGODB_URI=mongodb://localhost:27017/smart-leads

JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=7d

FRONTEND_URL=http://localhost:5173

RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
```

### Frontend

```env
VITE_API_URL=http://localhost:5000/api/v1
```

> ⚠️ Never commit real secrets, JWT keys, or production database credentials to GitHub.

---

# 📚 API Reference

## Authentication

### Register

```http
POST /api/v1/auth/register
```

### Login

```http
POST /api/v1/auth/login
```

### Current User

```http
GET /api/v1/auth/me
```

### All Users

```http
GET /api/v1/auth/users
```

> Admin access required.

---

## Leads

### Get Leads

```http
GET /api/v1/leads
```

Supports:

```text
?page=1
&limit=10
&status=New
&source=Website
&search=john
&sort=latest
```

### Get Lead

```http
GET /api/v1/leads/:id
```

### Create Lead

```http
POST /api/v1/leads
```

### Update Lead

```http
PATCH /api/v1/leads/:id
```

### Delete Lead

```http
DELETE /api/v1/leads/:id
```

### Export CSV

```http
GET /api/v1/leads/export/csv
```

### Lead Statistics

```http
GET /api/v1/leads/stats
```

---

# 🔒 Security

The application implements multiple security measures:

* JWT authentication
* bcrypt password hashing
* Protected API routes
* Role-based authorization
* Request validation
* Helmet security headers
* CORS configuration
* API rate limiting
* Centralized error handling
* Environment-based secrets
* Backend authorization enforcement

---

# ⚡ Performance

Performance-focused implementation includes:

* Server-side pagination
* Debounced search
* Efficient MongoDB queries
* Client-side state management with Zustand
* Optimized API communication
* Production builds with Vite
* Dockerized deployment

---

# 🧪 Test Accounts

### Admin

```text
Email:    admin@smartleads.com
Password: Admin123
Role:     admin
```

### Sales

```text
Email:    sales@smartleads.com
Password: Sales123
Role:     sales
```

> Use these credentials only in local/demo environments.

---

# 🚢 Deployment

### Frontend

Compatible with:

```text
Vercel
Netlify
Nginx
Docker
```

Build:

```bash
npm run build
```

### Backend

Compatible with:

```text
Railway
Render
Docker
AWS
```

### Database

For production, use:

```text
MongoDB Atlas
```

---

# 📸 Screenshots

Add screenshots here to showcase the application:

```text
/screenshots/
├── login.png
├── dashboard.png
├── leads.png
├── lead-form.png
└── dark-mode.png
```

Example:

```markdown
![Dashboard](./screenshots/dashboard.png)
```

---

# 🎯 What This Project Demonstrates

This project demonstrates practical experience with:

* Full-stack application development
* REST API design
* Authentication & authorization
* RBAC implementation
* MongoDB data modeling
* Secure backend development
* State management
* API integration
* Search & filtering
* Pagination
* CSV data export
* Docker containerization
* Responsive UI development
* TypeScript-based architecture

---

# 👨‍💻 Author

**Syed Sadain**

Full Stack Developer | Python | Node.js | React | TypeScript | AI

📧 `ssadain8682@gmail.com`

🔗 [GitHub](https://github.com/syed-sadain/)

---

## 📄 License

This project is licensed under the **MIT License**.

---

⭐ If you find this project useful, consider giving it a **star** on GitHub.
