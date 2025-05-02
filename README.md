
# QR-Based Event Check-In System

A backend system for managing college event check-ins using QR codes. Built with **Node.js**, **Express.js**, **MongoDB**, and **JWT** authentication.

## 🚀 Tech Stack

- **Backend**: Express.js (Node.js)
- **Database**: MongoDB (Atlas or Local)
- **Authentication**: JWT
- **Email**: Nodemailer (Gmail or SMTP)
- **QR Generation**: `qrcode` npm package

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/VaradSinghal/qr-checkin.git
   cd qr-checkin-system
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure `.env` file with your credentials:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_app_password
   ```

## ▶️ Start the Server

Run the server with Nodemon:
```bash
npx nodemon server.js
```

If not using Nodemon:
```bash
node server.js
```

## 📌 API Endpoints

### 🔐 Auth Routes

#### ➕ POST `/api/auth/register`
**Request:**
```json
{
  "name": "Alice",
  "email": "alice@student.com",
  "studentId": "STU001",
  "password": "password123",
  "role": "student"
}
```
**Response:**
```json
{
  "message": "User registered successfully"
}
```

#### 🔑 POST `/api/auth/login`
**Request:**
```json
{
  "email": "alice@student.com",
  "password": "password123"
}
```
**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "_id": "6632a2...",
    "name": "Alice",
    "email": "alice@student.com",
    "role": "student"
  }
}
```

### 🎫 Event Routes

#### 🛠 POST `/api/events/create`
**(Protected, Admin Only)**

**Header:**
```
Authorization: Bearer <ADMIN_TOKEN>
```

**Request:**
```json
{
  "title": "Tech Fest",
  "description": "Annual technical event",
  "location": "Auditorium",
  "date": "2025-06-10T00:00:00Z",
  "time": "10:00 AM"
}
```

**Response:**
```json
{
  "message": "Event created successfully",
  "event": {
    "_id": "6632af...",
    "title": "Tech Fest",
    "description": "Annual technical event",
    "location": "Auditorium",
    "date": "2025-06-10T00:00:00Z",
    "time": "10:00 AM"
  }
}
```

#### 📝 POST `/api/events/register`
**(Protected, Student Only)**

**Header:**
```
Authorization: Bearer <STUDENT_TOKEN>
```

**Request:**
```json
{
  "eventId": "6632af12..."
}
```

**Response:**
```json
{
  "message": "Registered and QR sent via email"
}
```

### 🛂 Admin Dashboard Routes

#### 📄 GET `/api/admin/attendees/:eventId`
**(Protected, Admin Only)**

**Header:**
```
Authorization: Bearer <ADMIN_TOKEN>
```

**Response:**
```json
{
  "event": {
    "title": "Tech Fest"
  },
  "registered": [
    {
      "name": "Alice",
      "email": "alice@student.com",
      "studentId": "STU001",
      "checkedIn": false
    }
  ],
  "checkedInCount": 0,
  "totalRegistered": 1
}
```

#### ✅ POST `/api/admin/checkin`
**(Protected, Admin Only)**

**Header:**
```
Authorization: Bearer <ADMIN_TOKEN>
```

**Request:**
```json
{
  "qrData": "6632af12..._6632aabc..."
}
```

**Response:**
```json
{
  "message": "Check-in successful",
  "attendee": {
    "name": "Alice",
    "email": "alice@student.com",
    "checkedIn": true
  }
}
```

## 🔐 Token Usage
For all protected routes, include this header:
```
Authorization: Bearer <YOUR_JWT_TOKEN>
```

## 📬 Email Example
Students will receive an email after registration with:
- Event details
- QR code for check-in

## 📎 Tools Used
- Express.js
- Mongoose
- JWT
- Nodemailer
- qrcode

## 📂 Future Enhancements
- Swagger UI
- QR scanning via mobile app
- Certificate generation
