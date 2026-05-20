# Smart Leads Dashboard - API Documentation

Base URL: `http://localhost:5000/api/v1`

## Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## Authentication Endpoints

### 1. Register User
**POST** `/auth/register`

Create a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password123",
  "role": "sales"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Account created successfully",
  "data": {
    "user": {
      "id": "655f123...",
      "email": "john@example.com",
      "role": "sales",
      "name": "John Doe"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### 2. Login
**POST** `/auth/login`

Authenticate user and receive JWT token.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "Password123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "655f123...",
      "email": "john@example.com",
      "role": "sales",
      "name": "John Doe"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

### 3. Get Current User
**GET** `/auth/me`

Get authenticated user's profile.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "User profile retrieved",
  "data": {
    "_id": "655f123...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "sales",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

### 4. Get All Users (Admin Only)
**GET** `/auth/users`

Get list of all users (Admin access only).

**Headers:**
```
Authorization: Bearer <admin_token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Users retrieved",
  "data": [
    {
      "_id": "655f123...",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "sales",
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

---

## Lead Endpoints

### 1. Get All Leads
**GET** `/leads`

Get paginated list of leads with optional filtering.

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `page` (optional, default: 1) - Page number
- `limit` (optional, default: 10) - Results per page
- `status` (optional) - Filter by status: New, Contacted, Qualified, Lost
- `source` (optional) - Filter by source: Website, Instagram, Referral
- `search` (optional) - Search by name or email
- `sort` (optional, default: latest) - Sort order: latest, oldest

**Example Request:**
```
GET /leads?page=1&limit=10&status=New&source=Website&search=john&sort=latest
```

**Response (200):**
```json
{
  "success": true,
  "message": "Leads retrieved successfully",
  "data": {
    "data": [
      {
        "_id": "655f456...",
        "name": "Jane Smith",
        "email": "jane@example.com",
        "status": "New",
        "source": "Website",
        "notes": "Interested in premium plan",
        "createdBy": {
          "_id": "655f123...",
          "name": "John Doe",
          "email": "john@example.com"
        },
        "createdAt": "2024-01-15T11:00:00.000Z",
        "updatedAt": "2024-01-15T11:00:00.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalRecords": 47,
      "limit": 10,
      "hasNextPage": true,
      "hasPrevPage": false
    }
  }
}
```

---

### 2. Get Lead by ID
**GET** `/leads/:id`

Get single lead details.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Lead retrieved successfully",
  "data": {
    "_id": "655f456...",
    "name": "Jane Smith",
    "email": "jane@example.com",
    "status": "New",
    "source": "Website",
    "notes": "Interested in premium plan",
    "createdBy": {
      "_id": "655f123...",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "createdAt": "2024-01-15T11:00:00.000Z",
    "updatedAt": "2024-01-15T11:00:00.000Z"
  }
}
```

---

### 3. Create Lead
**POST** `/leads`

Create a new lead.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "status": "New",
  "source": "Website",
  "notes": "Interested in premium plan"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Lead created successfully",
  "data": {
    "_id": "655f456...",
    "name": "Jane Smith",
    "email": "jane@example.com",
    "status": "New",
    "source": "Website",
    "notes": "Interested in premium plan",
    "createdBy": "655f123...",
    "createdAt": "2024-01-15T11:00:00.000Z",
    "updatedAt": "2024-01-15T11:00:00.000Z"
  }
}
```

---

### 4. Update Lead
**PATCH** `/leads/:id`

Update an existing lead.

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "status": "Contacted",
  "notes": "Follow up scheduled for next week"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Lead updated successfully",
  "data": {
    "_id": "655f456...",
    "name": "Jane Smith",
    "email": "jane@example.com",
    "status": "Contacted",
    "source": "Website",
    "notes": "Follow up scheduled for next week",
    "createdBy": {
      "_id": "655f123...",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "createdAt": "2024-01-15T11:00:00.000Z",
    "updatedAt": "2024-01-15T12:30:00.000Z"
  }
}
```

---

### 5. Delete Lead
**DELETE** `/leads/:id`

Delete a lead.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Lead deleted successfully",
  "data": null
}
```

---

### 6. Export Leads to CSV
**GET** `/leads/export/csv`

Export leads to CSV file with optional filtering.

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `status` (optional) - Filter by status
- `source` (optional) - Filter by source
- `search` (optional) - Search by name or email

**Example Request:**
```
GET /leads/export/csv?status=Qualified&source=Instagram
```

**Response (200):**
Returns CSV file with headers:
```
Content-Type: text/csv
Content-Disposition: attachment; filename="leads-1705318800000.csv"
```

CSV Content:
```csv
Name,Email,Status,Source,Notes,Created At
Jane Smith,jane@example.com,Qualified,Instagram,Interested in premium,2024-01-15T11:00:00.000Z
```

---

### 7. Get Lead Statistics
**GET** `/leads/stats`

Get lead statistics grouped by status and source.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "success": true,
  "message": "Lead stats retrieved",
  "data": {
    "statusStats": [
      { "_id": "New", "count": 15 },
      { "_id": "Contacted", "count": 23 },
      { "_id": "Qualified", "count": 12 },
      { "_id": "Lost", "count": 5 }
    ],
    "sourceStats": [
      { "_id": "Website", "count": 30 },
      { "_id": "Instagram", "count": 18 },
      { "_id": "Referral", "count": 7 }
    ],
    "total": 55
  }
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Access token is required"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "Role 'sales' is not authorized to access this resource"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Lead not found"
}
```

### 409 Conflict
```json
{
  "success": false,
  "message": "email already exists"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal server error"
}
```

---

## Rate Limiting

- Window: 15 minutes
- Max Requests: 100 per window
- Applies to all `/api/` routes

**Response when rate limit exceeded:**
```json
{
  "message": "Too many requests from this IP, please try again later"
}
```

---

## Data Models

### User Model
```typescript
{
  _id: ObjectId,
  name: string (2-100 chars),
  email: string (unique, lowercase),
  password: string (hashed, min 8 chars),
  role: 'admin' | 'sales',
  createdAt: Date,
  updatedAt: Date
}
```

### Lead Model
```typescript
{
  _id: ObjectId,
  name: string (2-150 chars),
  email: string (lowercase),
  status: 'New' | 'Contacted' | 'Qualified' | 'Lost',
  source: 'Website' | 'Instagram' | 'Referral',
  notes: string (optional, max 1000 chars),
  assignedTo: ObjectId (optional),
  createdBy: ObjectId (required),
  createdAt: Date,
  updatedAt: Date
}
```

---

## Role-Based Access

### Admin Role
- Can access all leads (all users)
- Can view all users (`GET /auth/users`)
- Can perform all CRUD operations on any lead

### Sales Role
- Can only access their own leads
- Cannot view other users
- Can perform CRUD operations only on their own leads

---

## Validation Rules

### Register
- **name**: Required, 2-100 characters
- **email**: Required, valid email format, unique
- **password**: Required, min 8 characters, must contain uppercase, lowercase, and number
- **role**: Optional, must be 'admin' or 'sales', defaults to 'sales'

### Login
- **email**: Required, valid email format
- **password**: Required

### Create/Update Lead
- **name**: Required (create only), 2-150 characters
- **email**: Required (create only), valid email format
- **status**: Optional, must be one of: New, Contacted, Qualified, Lost
- **source**: Required (create only), must be one of: Website, Instagram, Referral
- **notes**: Optional, max 1000 characters

---

## Testing with cURL

### Register
```bash
curl -X POST http://localhost:5000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "Test1234",
    "role": "sales"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test1234"
  }'
```

### Get Leads
```bash
curl -X GET "http://localhost:5000/api/v1/leads?page=1&limit=10" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Create Lead
```bash
curl -X POST http://localhost:5000/api/v1/leads \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "name": "New Lead",
    "email": "lead@example.com",
    "source": "Website",
    "status": "New"
  }'
```
