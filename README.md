**Smart Leads Dashboard**

A full-stack Lead Management Dashboard built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring JWT authentication, role-based access control, advanced filtering, and CSV export capabilities.

## 🚀 Features

### Core Features
- ✅ **JWT Authentication** - Secure user authentication with token-based auth
- ✅ **Role-Based Access Control (RBAC)** - Admin and Sales user roles
- ✅ **Lead Management (CRUD)** - Complete create, read, update, delete operations
- ✅ **Advanced Filtering** - Filter by status, source, with search functionality
- ✅ **Pagination** - Efficient backend pagination (10 records per page)
- ✅ **Debounced Search** - Optimized search with 500ms debounce
- ✅ **CSV Export** - Export filtered leads to CSV
- ✅ **Dark Mode Support** - Toggle between light and dark themes
- ✅ **Docker Support** - Complete containerized setup

### Technical Features
- 🔒 Password hashing with bcrypt
- 🛡️ Protected routes with middleware
- ✨ Clean code architecture
- 📱 Responsive design
- 🎨 Beautiful UI with TailwindCSS
- ⚡ Fast and optimized
- 🔄 Real-time form validation
- 🎯 TypeScript throughout (100%)

## 📋 Tech Stack

### Frontend
- **React 18** with TypeScript
- **TailwindCSS** for styling
- **React Router DOM** for routing
- **Zustand** for state management
- **React Hook Form** for form handling
- **Axios** for API calls
- **React Hot Toast** for notifications
- **Lucide React** for icons
- **Vite** as build tool

### Backend
- **Node.js** with Express.js
- **TypeScript** for type safety
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Bcrypt** for password hashing
- **Express Validator** for validation
- **Winston** for logging
- **Helmet** for security
- **CORS** enabled
- **Rate Limiting** implemented

## 📁 Project Structure

```
smart-leads-dashboard/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.ts
│   │   ├── controllers/
│   │   │   ├── auth.controller.ts
│   │   │   └── lead.controller.ts
│   │   ├── middleware/
│   │   │   ├── auth.ts
│   │   │   ├── errorHandler.ts
│   │   │   └── validate.ts
│   │   ├── models/
│   │   │   ├── User.ts
│   │   │   └── Lead.ts
│   │   ├── routes/
│   │   │   ├── auth.routes.ts
│   │   │   ├── lead.routes.ts
│   │   │   └── index.ts
│   │   ├── services/
│   │   │   ├── auth.service.ts
│   │   │   └── lead.service.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   ├── utils/
│   │   │   ├── apiResponse.ts
│   │   │   └── logger.ts
│   │   ├── validators/
│   │   │   ├── auth.validators.ts
│   │   │   └── lead.validators.ts
│   │   ├── app.ts
│   │   └── server.ts
│   ├── .env.example
│   ├── .gitignore
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   │   └── ProtectedRoute.tsx
│   │   │   ├── dashboard/
│   │   │   │   └── StatsCard.tsx
│   │   │   ├── layout/
│   │   │   │   ├── DashboardLayout.tsx
│   │   │   │   └── Navbar.tsx
│   │   │   ├── leads/
│   │   │   │   ├── LeadDetails.tsx
│   │   │   │   ├── LeadFilters.tsx
│   │   │   │   ├── LeadForm.tsx
│   │   │   │   ├── LeadTable.tsx
│   │   │   │   └── Pagination.tsx
│   │   │   └── ui/
│   │   │       ├── Badge.tsx
│   │   │       ├── Button.tsx
│   │   │       ├── Card.tsx
│   │   │       ├── EmptyState.tsx
│   │   │       ├── Input.tsx
│   │   │       ├── Modal.tsx
│   │   │       ├── Select.tsx
│   │   │       └── Spinner.tsx
│   │   ├── hooks/
│   │   │   └── useDebounce.ts
│   │   ├── pages/
│   │   │   ├── DashboardPage.tsx
│   │   │   ├── LeadsPage.tsx
│   │   │   ├── LoginPage.tsx
│   │   │   └── RegisterPage.tsx
│   │   ├── services/
│   │   │   ├── api.ts
│   │   │   ├── authService.ts
│   │   │   └── leadService.ts
│   │   ├── store/
│   │   │   ├── authStore.ts
│   │   │   └── themeStore.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   ├── utils/
│   │   │   ├── cn.ts
│   │   │   ├── downloadCSV.ts
│   │   │   └── formatDate.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── .env.example
│   ├── .gitignore
│   ├── Dockerfile
│   ├── index.html
│   ├── nginx.conf
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── docker-compose.yml
├── .gitignore
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (v7.0 or higher)
- npm or yarn

### Option 1: Docker Setup (Recommended)

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd smart-leads-dashboard
```

2. **Create environment files**

Backend (.env):
```bash
cd backend
cp .env.example .env
# Edit .env with your configurations
```

Frontend (.env):
```bash
cd frontend
cp .env.example .env
# Edit .env with your configurations
```

3. **Run with Docker Compose**
```bash
# From root directory
docker-compose up -d
```

The application will be available at:
- Frontend: http://localhost
- Backend: http://localhost:5000
- MongoDB: localhost:27017

### Option 2: Manual Setup

#### Backend Setup

1. **Navigate to backend directory**
```bash
cd backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create .env file**
```bash
cp .env.example .env
```

4. **Configure environment variables**
Edit `.env` with your MongoDB URI and JWT secret

5. **Run the backend**
```bash
# Development
npm run dev

# Production
npm run build
npm start
```

Backend will run on http://localhost:5000

#### Frontend Setup

1. **Navigate to frontend directory**
```bash
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create .env file**
```bash
cp .env.example .env
```

4. **Configure environment variables**
```env
VITE_API_URL=http://localhost:5000/api/v1
```

5. **Run the frontend**
```bash
# Development
npm run dev

# Production
npm run build
npm run preview
```

Frontend will run on http://localhost:5173

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```
POST /api/v1/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password123",
  "role": "sales" // or "admin"
}
```

#### Login
```
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "Password123"
}
```

#### Get Current User
```
GET /api/v1/auth/me
Authorization: Bearer <token>
```

#### Get All Users (Admin Only)
```
GET /api/v1/auth/users
Authorization: Bearer <token>
```

### Lead Endpoints

#### Get All Leads (with filtering & pagination)
```
GET /api/v1/leads?page=1&limit=10&status=New&source=Website&search=john&sort=latest
Authorization: Bearer <token>
```

#### Get Lead by ID
```
GET /api/v1/leads/:id
Authorization: Bearer <token>
```

#### Create Lead
```
POST /api/v1/leads
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "status": "New",
  "source": "Website",
  "notes": "Interested in premium plan"
}
```

#### Update Lead
```
PATCH /api/v1/leads/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "Contacted",
  "notes": "Follow up scheduled"
}
```

#### Delete Lead
```
DELETE /api/v1/leads/:id
Authorization: Bearer <token>
```

#### Export Leads to CSV
```
GET /api/v1/leads/export/csv?status=Qualified&source=Instagram
Authorization: Bearer <token>
```

#### Get Lead Statistics
```
GET /api/v1/leads/stats
Authorization: Bearer <token>
```

## 🔐 Authentication & Authorization

### User Roles

1. **Admin**
   - Full access to all leads
   - Can view all users
   - Can manage any lead

2. **Sales**
   - Can only see their own leads
   - Can create, update, and delete their own leads
   - Cannot access other users' leads

### Token Management

- JWT tokens are stored in localStorage
- Tokens expire in 7 days (configurable)
- Automatic token refresh on API calls
- Redirect to login on token expiration

## 🎨 Features in Detail

### Lead Management
- **Create**: Add new leads with all required information
- **Read**: View leads in a paginated table with sorting
- **Update**: Edit lead information including status
- **Delete**: Remove leads with confirmation modal

### Advanced Filtering
- **Status Filter**: New, Contacted, Qualified, Lost
- **Source Filter**: Website, Instagram, Referral
- **Search**: Real-time search by name or email (debounced)
- **Sort**: Latest first or Oldest first
- **Combined Filters**: All filters work together

### CSV Export
- Export filtered leads to CSV
- Includes all lead information
- Respects current filter selections
- Automatic download

### Dark Mode
- Toggle between light and dark themes
- Persists across sessions
- Smooth transitions
- Accessible colors

## 🧪 Testing

### Test User Credentials

After setting up, you can create test users:

**Admin User:**
```json
{
  "name": "Admin User",
  "email": "admin@smartleads.com",
  "password": "Admin123",
  "role": "admin"
}
```

**Sales User:**
```json
{
  "name": "Sales User",
  "email": "sales@smartleads.com",
  "password": "Sales123",
  "role": "sales"
}
```

## 🚀 Deployment

### Deploy on Vercel/Netlify (Frontend)

1. Build the frontend:
```bash
cd frontend
npm run build
```

2. Deploy the `dist` folder

3. Set environment variables in your hosting platform

### Deploy on Railway/Render (Backend)

1. Push your code to GitHub

2. Connect your repository to Railway/Render

3. Set environment variables

4. Deploy

### MongoDB Atlas
Use MongoDB Atlas for production database:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/smart-leads
```

## 📝 Environment Variables

### Backend (.env)
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/smart-leads
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api/v1
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**SYED SADAIN**
- Email: ssadain8682@gmail.com
- GitHub: https://github.com/syed-sadain/

## 🙏 Acknowledgments

- React Team for the amazing framework
- MongoDB team for the robust database
- TailwindCSS for the utility-first CSS framework
- All open-source contributors

---


 
 
