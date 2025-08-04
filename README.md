# 🍽️ LUMINA Restaurant - Online Reservation System

An elegant restaurant website with online booking system built with React, TypeScript, and MongoDB.

## ✨ Features

- **Modern Restaurant Website** - Apple-inspired design with smooth animations
- **Online Reservation System** - Complete booking form with MongoDB integration
- **Admin Dashboard** - View and manage reservations
- **Responsive Design** - Works perfectly on all devices
- **Multi-page Application** - Home, Booking, Thank You, and Admin pages

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)  
- MongoDB Atlas account
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Apple-Inspired-Restaurant-Website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Copy the example environment file
   cp .env.example .env
   
   # Edit .env and add your MongoDB credentials
   MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/
   MONGODB_DB_NAME=restaurant
   ```

4. **Start the development servers**
   ```bash
   # Terminal 1: Start the API server
   npm run server
   
   # Terminal 2: Start the frontend
   npm run dev
   ```

5. **Access the application**
   - Main website: http://localhost:5179
   - Booking page: http://localhost:5179/booking.html
   - Admin dashboard: http://localhost:5179/admin.html
   - API health: http://localhost:5175/api/health

## 📝 MongoDB Atlas Setup

1. Create a MongoDB Atlas account at https://www.mongodb.com/atlas
2. Create a new cluster
3. Create a database user with read/write permissions
4. Get your connection string from the "Connect" button
5. Replace the placeholder values in your `.env` file

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **Build Tool**: Vite with multi-page configuration

## 📱 Pages

- **Home** (`/`) - Main restaurant website with menu, about, contact
- **Booking** (`/booking.html`) - Online reservation form
- **Thank You** (`/thank-you.html`) - Booking confirmation page
- **Admin** (`/admin.html`) - Dashboard to view reservations

## 🔧 Available Scripts

```bash
npm run dev          # Start frontend development server
npm run server       # Start API server
npm run build        # Build for production
npm run preview      # Preview production build
```

## 🚀 Deployment

### Frontend (Netlify/Vercel)
1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting service
3. Set up environment variables in your hosting dashboard

### Backend (Railway/Render/Heroku)
1. Deploy the server.js and api folder
2. Set environment variables in your hosting dashboard
3. Update API URLs in frontend code

## 🔒 Security Notes

- Never commit `.env` files to version control
- Use `.env.example` for sharing configuration templates
- Store sensitive credentials in your hosting service's environment variables
- Regularly rotate your MongoDB credentials

## 📊 Database Schema

### Reservations Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  phone: String,
  date: String,
  time: String,
  guests: Number,
  specialRequests: String,
  createdAt: Date
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Made with ❤️ for great dining experiences
