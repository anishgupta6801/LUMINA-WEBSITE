# Lumina Restaurant Website - Production Deployment Guide

## ✅ **Deployment Setup Complete!**

Your Lumina Restaurant website is now fully configured for production deployment with a single server serving both frontend and backend.

## 📁 **Project Structure**

```
LUMINA RESTAURANT WEBSITE/
├── dist/                    # Built frontend files (auto-generated)
│   ├── index.html          # Main page
│   ├── booking.html        # Booking page
│   ├── thank-you.html      # Thank you page
│   ├── admin.html          # Admin page
│   └── assets/             # CSS, JS, and other assets
├── server.js               # Express server (serves API + frontend)
├── .env                    # Environment variables
├── package.json            # Dependencies and scripts
└── [other source files]
```

## 🌐 **Environment Configuration**

### `.env` file:
```env
# MongoDB Configuration
MONGO_URI=mongodb+srv://new-user09:ERhaUmmiuiqlYpLr@cluster-restro.0bp6k.mongodb.net/restaurantDB?retryWrites=true&w=majority&appName=Cluster-Restro
MONGODB_DB_NAME=restaurant

# Environment Configuration
NODE_ENV=production
PORT=5000
```

## 🚀 **Deployment Commands**

### Development:
```bash
npm run dev:full          # Start both frontend and backend in dev mode
```

### Production Build:
```bash
npm run build             # Build frontend for production
npm run start             # Start production server
```

### One-command Deploy:
```bash
npm run deploy            # Build + Start production server
```

## 📊 **Production Server Features**

✅ **Single Server Deployment**: One server serves both API and frontend  
✅ **MongoDB Atlas Connected**: Database connection configured  
✅ **Static File Serving**: Frontend served from `/dist` directory  
✅ **SPA Routing**: Client-side routing support  
✅ **API Endpoints**: All form data APIs working  
✅ **Environment-Aware**: Different behavior in dev vs production  

## 🔗 **Production URLs**

When running in production (port 5000):

- **Frontend**: http://localhost:5000
- **API Health**: http://localhost:5000/api/health
- **Reservations API**: http://localhost:5000/api/reservations
- **Contact API**: http://localhost:5000/api/contact
- **Newsletter API**: http://localhost:5000/api/newsletter

## 📱 **Pages Available**

- **Main Page**: `/` (index.html)
- **Booking**: `/booking.html`
- **Thank You**: `/thank-you.html`
- **Admin**: `/admin.html`

## 🛡️ **Production Features**

1. **MongoDB Atlas Integration**:
   - Secure connection string in environment variables
   - Connection pooling and error handling
   - Collections: `reservations`, `contact_messages`, `newsletter_subscribers`

2. **Express Server Configuration**:
   - Serves static files in production
   - API routes for all forms
   - CORS enabled
   - JSON body parsing
   - Graceful shutdown handling

3. **Frontend Build**:
   - Optimized for production
   - All assets minified and bundled
   - Multiple entry points for different pages

## 🌍 **Deployment Platforms**

This setup is ready for deployment on:

- **Heroku**: Use `npm start` as start command
- **Railway**: Automatic deployment from Git
- **Render**: Node.js service with build command
- **DigitalOcean App Platform**: Node.js app
- **AWS Elastic Beanstalk**: Node.js platform
- **Google Cloud Run**: Container deployment
- **Netlify**: Serverless functions + static files

## ⚙️ **Environment Variables for Deployment**

When deploying, set these environment variables:

```
MONGO_URI=your_mongodb_atlas_connection_string
MONGODB_DB_NAME=restaurant
NODE_ENV=production
PORT=5000
```

## 📋 **Pre-Deployment Checklist**

- ✅ MongoDB Atlas cluster is accessible
- ✅ Connection string includes correct credentials
- ✅ Frontend builds successfully (`npm run build`)
- ✅ Production server starts without errors
- ✅ API endpoints respond correctly
- ✅ Database operations work (create reservations, contacts, etc.)
- ✅ Static files are served properly

## 🔧 **Troubleshooting**

1. **Build Issues**: Make sure all dependencies are installed
2. **Database Connection**: Verify MongoDB URI and network access
3. **Port Issues**: Change PORT in .env if needed
4. **CORS Issues**: Already configured for cross-origin requests

## 🎉 **Success!**

Your Lumina Restaurant website is now production-ready with:
- ✅ Full-stack deployment (frontend + backend in one)
- ✅ MongoDB Atlas integration
- ✅ Form data persistence
- ✅ Professional server configuration
- ✅ Scalable architecture

Run `npm run start` to serve your restaurant website in production mode!
