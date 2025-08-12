# Lumina Restaurant Website - Backend Documentation

## Overview
Your Lumina Restaurant website now has a complete Node.js/Express backend with MongoDB Atlas integration for handling all form data from the frontend.

## Backend Architecture

### 🚀 Server Setup
- **Framework**: Express.js
- **Database**: MongoDB Atlas
- **Environment**: Node.js with ES modules
- **Port**: 5175 (configurable via environment variable)

### 📡 API Endpoints

#### Health Check
- **GET** `/api/health` - Server health status

#### Reservations
- **POST** `/api/reservations` - Create new reservation
- **GET** `/api/reservations` - Get all reservations
- **PUT** `/api/reservations/:id/status` - Update reservation status

#### Contact Messages
- **POST** `/api/contact` - Save contact form submissions
- **GET** `/api/contact` - Get all contact messages

#### Newsletter
- **POST** `/api/newsletter` - Handle newsletter signups

### 🗄️ Database Collections

#### `reservations`
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  phone: String,
  date: String,
  time: String,
  guests: String,
  occasion: String,
  specialRequests: String,
  createdAt: Date,
  status: String, // 'pending', 'confirmed', 'cancelled'
  confirmed: Boolean
}
```

#### `contact_messages`
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  phone: String,
  subject: String,
  message: String,
  createdAt: Date,
  status: String, // 'unread', 'read', 'replied'
  replied: Boolean
}
```

#### `newsletter_subscribers`
```javascript
{
  _id: ObjectId,
  email: String,
  name: String,
  subscribedAt: Date,
  active: Boolean
}
```

### 🔧 Configuration Files

#### Environment Variables (`.env`)
```env
MONGODB_URI=mongodb+srv://new-user09:ERhaUmmiuiqlYpLr@cluster-restro.0bp6k.mongodb.net/restaurantDB?retryWrites=true&w=majority&appName=Cluster-Restro
MONGODB_DB_NAME=restaurant
```

#### Package.json Scripts
- `npm run dev` - Start Vite development server
- `npm run dev:server` - Start Express backend server
- `npm run dev:full` - Start both frontend and backend concurrently
- `npm run start` - Start production server

### 🔗 Frontend Integration

#### BookingForm.tsx
- Submits reservation data to `/api/reservations`
- Handles form validation and error messages
- Redirects to thank-you page on success

#### ContactForm.tsx
- Submits contact messages to `/api/contact`
- Comprehensive contact form with subject selection
- Real-time validation and feedback

#### NewsletterSignup.tsx
- Submits email subscriptions to `/api/newsletter`
- Prevents duplicate subscriptions
- Animated success state

### 🛡️ Security Features
- CORS enabled for cross-origin requests
- Request body parsing with built-in Express middleware
- Input validation for all API endpoints
- Error handling with proper HTTP status codes

### 📊 Features
- **Real-time Data Storage**: All form submissions saved to MongoDB Atlas
- **Admin Dashboard Ready**: Data structure supports admin functionality
- **Scalable Architecture**: Modular design for easy expansion
- **Error Handling**: Comprehensive error handling and logging
- **Data Validation**: Server-side validation for all inputs

### 🚀 Running the Application

1. **Start Development Environment**:
   ```bash
   npm run dev:full
   ```
   - Backend API: http://localhost:5175
   - Frontend: http://localhost:5176

2. **Start Production Environment**:
   ```bash
   npm start
   ```

### 🧪 Testing
- API test script: `test-api.js`
- PowerShell test script: `test-api.ps1`
- Health check: `GET http://localhost:5175/api/health`

### 📋 Data Flow
1. User fills out form on frontend (React/TypeScript)
2. Form data sent via fetch API to Express server
3. Server validates data and saves to MongoDB Atlas
4. Response sent back to frontend with success/error status
5. User sees confirmation or error message

Your restaurant website is now fully equipped with a professional backend system that can handle all customer interactions and store data reliably in MongoDB Atlas!
