# 🚀 Smart Leads Dashboard

> A modern, full-stack **Lead Management & Sales CRM Dashboard** built with the MERN stack and TypeScript, featuring secure JWT authentication, role-based access control, advanced lead management, server-side filtering, pagination, CSV export, and a responsive UI.

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react\&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?logo=typescript\&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-Frontend-646CFF?logo=vite\&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-Styling-06B6D4?logo=tailwindcss\&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js\&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-REST%20API-000000?logo=express\&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb\&logoColor=white)](https://www.mongodb.com/)
[![Mongoose](https://img.shields.io/badge/Mongoose-ODM-880000?logo=mongoose\&logoColor=white)](https://mongoosejs.com/)
[![JWT](https://img.shields.io/badge/JWT-Authentication-000000?logo=jsonwebtokens\&logoColor=white)](https://jwt.io/)
[![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?logo=docker\&logoColor=white)](https://www.docker.com/)
[![REST API](https://img.shields.io/badge/API-REST-009688)](https://developer.mozilla.org/en-US/docs/Glossary/REST)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

---

## 📌 Overview

**Smart Leads Dashboard** is a full-stack CRM-style application designed to help sales teams **manage, organize, filter, track, and export leads** from a centralized dashboard.

The application implements separate permissions for **Administrators** and **Sales Users**, with authorization enforced at the backend API level.

### Why This Project?

The project demonstrates practical full-stack engineering concepts including:

* Secure authentication
* Role-based authorization
* REST API architecture
* MongoDB data modeling
* Advanced filtering and pagination
* CSV data export
* Type-safe development with TypeScript
* API security and validation
* Docker-based deployment
* Responsive frontend architecture

---

## ✨ Key Features

| Feature               | Description                                           |
| --------------------- | ----------------------------------------------------- |
| 🔐 Authentication     | JWT-based secure login and registration               |
| 👥 RBAC               | Admin and Sales role-based permissions                |
| 📊 Lead Management    | Complete lead CRUD operations                         |
| 🔎 Search & Filtering | Search by name/email with status and source filters   |
| 📄 Pagination         | Server-side pagination for scalable data retrieval    |
| 📤 CSV Export         | Export filtered lead data                             |
| 🌙 Theme Support      | Dark and light mode                                   |
| 🛡️ API Security      | Helmet, CORS, rate limiting and validation            |
| ⚡ Performance         | Debounced search and optimized API requests           |
| 🐳 Docker             | Containerized frontend, backend and database services |
| 📱 Responsive UI      | Desktop, tablet and mobile friendly                   |
| 💯 TypeScript         | End-to-end type-safe development                      |

---

# 🏗️ System Architecture

```text
┌─────────────────────────────┐
│        React SPA            │
│     React + TypeScript      │
│       Tailwind CSS          │
│                             │
│ • Dashboard                 │
│ • Lead Management           │
│ • Authentication            │
│ • Search & Filters          │
└──────────────┬──────────────┘
               │
               │ REST API / Axios
               ▼
┌─────────────────────────────┐
│       Express.js API        │
│      Node.js + TypeScript   │
│                             │
│ • Authentication            │
│ • Authorization / RBAC      │
│ • Request Validation        │
│ • Lead Management           │
│ • CSV Export                │
│ • Error Handling            │
└──────────────┬──────────────┘
               │
               │ Mongoose ODM
               ▼
┌─────────────────────────────┐
│          MongoDB            │
│                             │
│ • Users                     │
│ • Leads                     │
└─────────────────────────────┘
```

---

# 🔐 Authentication & Authorization

The application uses **JWT-based authentication** with backend-enforced authorization.

### Authentication Flow

```text
User
 │
 ▼
Login / Register
 │
 ▼
Express API
 │
 ├── Validate Request
 ├── Verify Password
 └── Generate JWT
        │
        ▼
   Authenticated User
        │
        ▼
 Protected API Routes
```

### Security Features

* JWT authentication
* bcrypt password hashing
* Protected API routes
* Configurable token expiration
* Automatic logout when authentication expires
* Backend authorization
* Request validation
* Centralized error handling

---

# 👥 Role-Based Access Control

| Role      | Access                            |
| --------- | --------------------------------- |
| **Admin** | Manage users and access all leads |
| **Sales** | View and manage their own leads   |

Authorization is enforced on the **server**, rather than relying only on frontend route protection.

This prevents users from bypassing permissions by directly calling protected API endpoints.

---

# 📊 Lead Management

The dashboard provides complete lead management functionality.

### Operations

* Create leads
* View lead details
* Update lead information
* Delete leads
* Update lead status
* Track lead source
* Add lead notes
* Filter and sort leads
* Export lead data

### Lead Status

```text
New
  ↓
Contacted
  ↓
Qualified
  ↓
Lost
```

### Lead Sources

```text
Website
Instagram
Referral
```

---

# 🔎 Advanced Search & Filtering

The dashboard supports multiple filters that can be combined to quickly find relevant leads.

### Available Filters

* Lead name
* Email
* Status
* Source
* Sorting
* Pagination

Search input uses a **500ms debounce** to reduce unnecessary API requests.

### Example Request

```http
GET /api/v1/leads?page=1&limit=10&status=New&source=Website&search=john&sort=latest
```

---

# 📄 Server-Side Pagination

Lead data is paginated on the backend instead of loading the entire dataset into the browser.

Example:

```http
GET /api/v1/leads?page=1&limit=10
```

This approach helps reduce:

* API response size
* Browser memory usage
* Initial load time
* Unnecessary database-to-client data transfer

---

# 📤 CSV Export

Users can export lead information directly from the dashboard.

### Export Capabilities

* Export filtered results
* Preserve active filters
* Include lead information
* Generate downloadable CSV files

Example:

```http
GET /api/v1/leads/export/csv?status=Qualified&source=Instagram
```

---

# 🌙 Dark & Light Mode

The UI supports both dark and light themes.

Features include:

* Persistent theme preference
* Smooth theme transitions
* Accessible contrast
* Responsive design

---

# 🛠️ Technology Stack

## Frontend

| Technology      | Purpose                |
| --------------- | ---------------------- |
| React 18        | UI development         |
| TypeScript      | Static type safety     |
| Vite            | Frontend build tooling |
| Tailwind CSS    | Styling                |
| React Router    | Client-side routing    |
| Zustand         | State management       |
| React Hook Form | Form handling          |
| Axios           | API communication      |
| React Hot Toast | Notifications          |
| Lucide React    | UI icons               |

## Backend

| Technology         | Purpose                    |
| ------------------ | -------------------------- |
| Node.js            | JavaScript runtime         |
| Express.js         | REST API framework         |
| TypeScript         | Type safety                |
| MongoDB            | NoSQL database             |
| Mongoose           | MongoDB ODM                |
| JWT                | Authentication             |
| bcrypt             | Password hashing           |
| Express Validator  | Request validation         |
| Winston            | Application logging        |
| Helmet             | HTTP security              |
| CORS               | Cross-origin configuration |
| Express Rate Limit | API protection             |

## DevOps & Deployment

```text
Docker
Docker Compose
Nginx
MongoDB Atlas
Vercel
Netlify
Railway
Render
AWS
```

---

# 📁 Project Structure

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

# 🚀 Getting Started

## Prerequisites

Make sure the following are installed:

```text
Node.js >= 18
MongoDB >= 7
npm / yarn
Docker (optional)
```

---

# 🐳 Docker Setup

Docker provides the easiest way to run the complete application.

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

Configure your MongoDB connection string and JWT secret.

### 3. Start the application

From the project root:

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

# 💻 Manual Installation

## Backend

```bash
cd backend

npm install

cp .env.example .env

npm run dev
```

Backend API:

```text
http://localhost:5000
```

## Frontend

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

# 🔑 Environment Variables

## Backend

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

## Frontend

```env
VITE_API_URL=http://localhost:5000/api/v1
```

> ⚠️ Never commit production secrets, JWT keys, database credentials, or `.env` files to GitHub.

---

# 📚 API Reference

Base URL:

```text
/api/v1
```

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

### Get Users

```http
GET /api/v1/auth/users
```

> Requires Admin privileges.

---

## Leads

### Get Leads

```http
GET /api/v1/leads
```

Supported query parameters:

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

### Export Leads

```http
GET /api/v1/leads/export/csv
```

### Lead Statistics

```http
GET /api/v1/leads/stats
```

---

# 🔒 Security

Security is implemented across both frontend and backend layers.

### Security Measures

* JWT authentication
* bcrypt password hashing
* Protected API routes
* Backend RBAC enforcement
* Request validation
* Helmet security headers
* CORS configuration
* API rate limiting
* Centralized error handling
* Environment-based secrets
* Token expiration handling
* Secure API communication

---

# ⚡ Performance & Scalability

The application incorporates several performance-focused techniques:

* Server-side pagination
* Debounced search
* Efficient MongoDB queries
* Zustand-based client state management
* Optimized Axios requests
* Vite production builds
* Dockerized services
* Separation of controllers, services and data models

The modular architecture also makes it easier to extend the system with additional CRM functionality.

---

# 🧪 Demo Accounts

## Admin

```text
Email:    admin@smartleads.com
Password: Admin123
Role:     admin
```

## Sales

```text
Email:    sales@smartleads.com
Password: Sales123
Role:     sales
```

> ⚠️ These credentials should only be used for local/demo environments. Never use demo credentials in production.

---

# 📸 Screenshots

Add application screenshots to showcase the UI.

Recommended structure:

```text
screenshots/
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

Recommended screenshots:

1. Login page
2. Admin dashboard
3. Lead management table
4. Lead creation/edit form
5. Filtering and pagination
6. Dark mode

---

# 🚢 Deployment

## Frontend

Supported deployment options:

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

## Backend

Supported deployment options:

```text
Railway
Render
Docker
AWS
```

## Database

For production deployments:

```text
MongoDB Atlas
```

---

# 🎯 Engineering Highlights

This project demonstrates practical experience in:

* Full-stack MERN development
* TypeScript application architecture
* REST API design
* JWT authentication
* Role-Based Access Control
* MongoDB schema design
* Mongoose data modeling
* Secure backend development
* API validation
* Search and filtering
* Server-side pagination
* CSV generation
* State management with Zustand
* Responsive React development
* Docker containerization
* Production-oriented project structure

---

# 🔮 Future Improvements

Potential enhancements include:

* 📈 Sales analytics and reporting
* 📊 Interactive charts and KPIs
* 🔔 Real-time lead notifications
* 📧 Email integration
* 📱 Mobile application
* 🧠 AI-powered lead scoring
* 🤖 Automated lead assignment
* 📅 Follow-up reminders
* 🔄 Activity and communication history
* 🔍 Advanced full-text search
* 🧪 Automated unit and integration tests
* 🚀 CI/CD pipeline
* 📊 Advanced sales forecasting

---

# 👨‍💻 Author

**Syed Sadain**

Full Stack Developer | Python | Node.js | React | TypeScript | AI

📧 `ssadain8682@gmail.com`

🔗 **GitHub:**
https://github.com/syed-sadain/

🔗 **LinkedIn:**
https://www.linkedin.com/in/syed-sadain-a56ba827/

---

# 📄 License

This project is licensed under the **MIT License**.

See the `LICENSE` file for details.

---

## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.

---

> **Note:** This project is intended for demonstration and portfolio purposes. Production deployments should use secure secrets, HTTPS, hardened database access, proper monitoring, and environment-specific configuration.
