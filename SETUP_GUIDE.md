# Smart Leads Dashboard - Setup Guide

This guide will help you set up and run the Smart Leads Dashboard project.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v7.0 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **Git** - [Download](https://git-scm.com/)
- **Docker** (Optional, for containerized setup) - [Download](https://www.docker.com/)

## 🚀 Quick Start with Docker (Recommended)

This is the easiest way to get the application running.

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd smart-leads-dashboard
```

### Step 2: Create Environment File
```bash
cp .env.example .env
```

Edit `.env` and update the JWT_SECRET:
```env
JWT_SECRET=your_very_secure_random_string_at_least_32_characters_long
```

### Step 3: Start the Application
```bash
docker-compose up -d
```

This will start:
- MongoDB on port 27017
- Backend API on port 5000
- Frontend on port 80

### Step 4: Access the Application
Open your browser and go to:
- **Frontend**: http://localhost
- **Backend API**: http://localhost:5000/api/v1/health

### Step 5: Create Your First User
1. Go to http://localhost
2. Click "Sign up"
3. Fill in the registration form
4. Choose role (Admin or Sales)
5. Click "Create Account"

### Stop the Application
```bash
docker-compose down
```

### Stop and Remove Data
```bash
docker-compose down -v
```

---

## 💻 Manual Setup (Development)

If you prefer to run the application without Docker:

### Part A: Backend Setup

#### Step 1: Install MongoDB
Make sure MongoDB is installed and running on your system.

Start MongoDB:
```bash
# On macOS with Homebrew
brew services start mongodb-community

# On Ubuntu/Linux
sudo systemctl start mongod

# On Windows
# MongoDB runs as a service by default after installation
```

#### Step 2: Navigate to Backend Directory
```bash
cd backend
```

#### Step 3: Install Dependencies
```bash
npm install
```

#### Step 4: Create Environment File
```bash
cp .env.example .env
```

#### Step 5: Configure Backend Environment Variables
Edit `backend/.env`:
```env
NODE_ENV=development
PORT=5000

# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/smart-leads

# JWT Configuration (CHANGE THESE IN PRODUCTION!)
JWT_SECRET=your_super_secret_jwt_key_change_in_production_min_32_chars
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your_refresh_secret_key_change_in_production_min_32_chars
JWT_REFRESH_EXPIRES_IN=30d

# CORS
FRONTEND_URL=http://localhost:5173

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
```

#### Step 6: Run Backend
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm run build
npm start
```

Backend will be running at: http://localhost:5000

#### Step 7: Test Backend
Open browser and go to: http://localhost:5000/api/v1/health

You should see:
```json
{
  "success": true,
  "message": "Smart Leads API is running",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### Part B: Frontend Setup

Open a **new terminal window**.

#### Step 1: Navigate to Frontend Directory
```bash
cd frontend
```

#### Step 2: Install Dependencies
```bash
npm install
```

#### Step 3: Create Environment File
```bash
cp .env.example .env
```

#### Step 4: Configure Frontend Environment Variables
Edit `frontend/.env`:
```env
VITE_API_URL=http://localhost:5000/api/v1
```

#### Step 5: Run Frontend
```bash
npm run dev
```

Frontend will be running at: http://localhost:5173

#### Step 6: Access the Application
Open your browser and go to: http://localhost:5173

---

## 👤 Creating Your First User

### Option 1: Via Web Interface (Recommended)

1. Go to http://localhost (or http://localhost:5173 in dev mode)
2. Click "Sign up"
3. Fill in the form:
   - **Name**: Your full name
   - **Email**: your@example.com
   - **Password**: Minimum 8 characters with uppercase, lowercase, and number
   - **Role**: Choose "Admin" or "Sales User"
4. Click "Create Account"

### Option 2: Via API (Using cURL)

**Create Admin User:**
```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@smartleads.com",
    "password": "Admin123",
    "role": "admin"
  }'
```

**Create Sales User:**
```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Sales User",
    "email": "sales@smartleads.com",
    "password": "Sales123",
    "role": "sales"
  }'
```

---

## 🧪 Testing the Application

### 1. Register and Login
- Register a new user
- Login with credentials
- Verify token is stored (check browser localStorage)

### 2. Create Leads
- Click "Add Lead" button
- Fill in lead information
- Save and verify it appears in the table

### 3. Test Filtering
- Create multiple leads with different statuses and sources
- Use the filter dropdowns
- Use the search box
- Verify results update correctly

### 4. Test Pagination
- Create more than 10 leads
- Verify pagination controls appear
- Navigate between pages

### 5. Test CSV Export
- Click "Export CSV" button
- Verify file downloads
- Open CSV and check data

### 6. Test Role-Based Access
- Login as Sales user
- Create some leads
- Login as different Sales user
- Verify you can only see your own leads
- Login as Admin
- Verify you can see all leads

### 7. Test Dark Mode
- Click the moon/sun icon in the navbar
- Verify theme switches
- Refresh page and verify theme persists

---

## 📁 Project Structure Overview

```
smart-leads-dashboard/
├── backend/                 # Node.js + Express + MongoDB
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Auth, validation, error handling
│   │   ├── models/         # Mongoose models
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   ├── types/          # TypeScript types
│   │   ├── utils/          # Utility functions
│   │   └── validators/     # Request validation
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/               # React + TypeScript + TailwindCSS
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── hooks/         # Custom hooks
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   ├── store/         # Zustand stores
│   │   ├── types/         # TypeScript types
│   │   └── utils/         # Utility functions
│   ├── .env.example
│   ├── package.json
│   └── vite.config.ts
│
├── docker-compose.yml     # Docker configuration
├── README.md
└── API_DOCUMENTATION.md
```

---

## 🐛 Troubleshooting

### Backend won't start

**Error: Cannot connect to MongoDB**
```
Solution:
1. Ensure MongoDB is running
2. Check MONGODB_URI in .env
3. Try: mongodb://localhost:27017/smart-leads
```

**Error: Port 5000 already in use**
```
Solution:
1. Change PORT in backend/.env to another port (e.g., 5001)
2. Update VITE_API_URL in frontend/.env accordingly
```

**Error: JWT_SECRET not configured**
```
Solution:
1. Check backend/.env file exists
2. Ensure JWT_SECRET is set and at least 32 characters
```

### Frontend won't start

**Error: Cannot connect to backend**
```
Solution:
1. Ensure backend is running on port 5000
2. Check VITE_API_URL in frontend/.env
3. Check browser console for CORS errors
```

**Error: Port 5173 already in use**
```
Solution:
1. Stop other Vite dev servers
2. Or change port in vite.config.ts
```

### Docker Issues

**Error: Cannot connect to Docker daemon**
```
Solution:
1. Ensure Docker Desktop is running
2. Check Docker service status
```

**Error: Port already allocated**
```
Solution:
1. Stop conflicting services on ports 80, 5000, 27017
2. Or modify ports in docker-compose.yml
```

### Database Issues

**Error: Collection not found**
```
Solution:
1. The collections are created automatically
2. Try creating your first lead
```

**Error: Duplicate key error**
```
Solution:
1. Email already exists
2. Use a different email address
```

### Authentication Issues

**Error: Token expired**
```
Solution:
1. Login again to get a new token
2. Tokens expire after 7 days by default
```

**Error: Invalid credentials**
```
Solution:
1. Check email and password
2. Password is case-sensitive
3. Ensure user exists (try registering first)
```

---

## 🔧 Development Tips

### Hot Reload
Both frontend and backend support hot reload:
- **Frontend**: Changes are reflected instantly
- **Backend**: Uses nodemon for auto-restart

### Database GUI
Use MongoDB Compass to view your data:
1. Download MongoDB Compass
2. Connect to: `mongodb://localhost:27017`
3. Navigate to `smart-leads` database

### API Testing
Use these tools to test the API:
- **Postman**: Import API endpoints
- **cURL**: Use examples in API_DOCUMENTATION.md
- **Thunder Client**: VS Code extension

### Code Editor Setup
Recommended VS Code extensions:
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript Vue Plugin
- MongoDB for VS Code

---

## 📊 Monitoring

### Check Logs

**Backend logs:**
```bash
# Docker
docker logs smart-leads-backend

# Manual
# Logs appear in terminal where backend is running
```

**Frontend logs:**
```bash
# Check browser console (F12)
```

### Health Checks

**Backend health:**
```bash
curl http://localhost:5000/api/v1/health
```

**Database connection:**
Check backend logs for "MongoDB Connected" message

---

## 🎯 Next Steps

After setup:

1. ✅ Create admin and sales users
2. ✅ Create sample leads
3. ✅ Test all features
4. ✅ Read API_DOCUMENTATION.md
5. ✅ Customize as needed
6. ✅ Deploy to production

---

## 📞 Support

If you encounter issues:

1. Check this guide
2. Check README.md
3. Check API_DOCUMENTATION.md
4. Review error messages carefully
5. Check browser console and backend logs

---

## 🎉 You're All Set!

Your Smart Leads Dashboard is now ready to use!

Start by creating your first user and adding some leads.

Happy lead managing! 🚀
