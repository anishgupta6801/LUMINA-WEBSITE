import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { MongoClient, ObjectId } from 'mongodb';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// MongoDB connection with improved error handling
const uri = process.env.MONGO_URI || process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME || 'restaurant';

if (!uri) {
  console.error('❌ MongoDB URI is required. Please check your .env file.');
  console.error('   Make sure MONGO_URI or MONGODB_URI is set in your environment variables.');
  process.exit(1);
}

let client;
let clientPromise;

async function connectToDatabase() {
  try {
    if (!client) {
      client = new MongoClient(uri);
      clientPromise = client.connect();
    }
    await clientPromise;
    const db = client.db(dbName);
    return { client, db };
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw error;
  }
}

// Test MongoDB connection on startup
connectToDatabase()
  .then(() => {
    console.log('✅ Connected to MongoDB successfully');
  })
  .catch((error) => {
    console.error('❌ Failed to connect to MongoDB:', error.message);
  });

// API Routes

// POST /api/contact - Handle contact form submissions
app.post('/api/contact', async (req, res) => {
  try {
    const contactData = req.body;
    
    // Validate required fields for contact form
    const requiredFields = ['name', 'email', 'message'];
    const missingFields = requiredFields.filter(field => !contactData[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        error: `Missing required fields: ${missingFields.join(', ')}`
      });
    }

    const { db } = await connectToDatabase();
    const collection = db.collection('contact_messages');
    
    // Add timestamp and status
    const contact = {
      ...contactData,
      createdAt: new Date(),
      status: 'unread',
      replied: false
    };
    
    const result = await collection.insertOne(contact);
    
    console.log('✅ New contact message saved:', {
      id: result.insertedId,
      name: contact.name,
      email: contact.email,
      subject: contact.subject || 'No subject'
    });
    
    res.status(201).json({
      success: true,
      messageId: result.insertedId,
      message: 'Contact message saved successfully'
    });
  } catch (error) {
    console.error('❌ Error saving contact message:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// GET /api/contact - Get all contact messages
app.get('/api/contact', async (req, res) => {
  try {
    const { db } = await connectToDatabase();
    const collection = db.collection('contact_messages');
    
    const messages = await collection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    
    res.status(200).json({
      success: true,
      messages,
      count: messages.length
    });
  } catch (error) {
    console.error('❌ Error fetching contact messages:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// POST /api/newsletter - Handle newsletter signups
app.post('/api/newsletter', async (req, res) => {
  try {
    const { email, name } = req.body;
    
    if (!email) {
      return res.status(400).json({
        success: false,
        error: 'Email is required'
      });
    }

    const { db } = await connectToDatabase();
    const collection = db.collection('newsletter_subscribers');
    
    // Check if email already exists
    const existingSubscriber = await collection.findOne({ email });
    if (existingSubscriber) {
      return res.status(400).json({
        success: false,
        error: 'Email already subscribed'
      });
    }
    
    const subscriber = {
      email,
      name: name || '',
      subscribedAt: new Date(),
      active: true
    };
    
    const result = await collection.insertOne(subscriber);
    
    console.log('✅ New newsletter subscriber:', {
      id: result.insertedId,
      email: subscriber.email
    });
    
    res.status(201).json({
      success: true,
      subscriberId: result.insertedId,
      message: 'Successfully subscribed to newsletter'
    });
  } catch (error) {
    console.error('❌ Error saving newsletter subscription:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// POST /api/reservations - Create new reservation
app.post('/api/reservations', async (req, res) => {
  try {
    const reservationData = req.body;
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'date', 'time', 'guests'];
    const missingFields = requiredFields.filter(field => !reservationData[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        error: `Missing required fields: ${missingFields.join(', ')}`
      });
    }

    const { db } = await connectToDatabase();
    const collection = db.collection('reservations');
    
    // Add timestamp and status
    const reservation = {
      ...reservationData,
      createdAt: new Date(),
      status: 'pending',
      confirmed: false
    };
    
    const result = await collection.insertOne(reservation);
    
    console.log('✅ New reservation saved:', {
      id: result.insertedId,
      name: reservation.name,
      date: reservation.date,
      time: reservation.time
    });
    
    res.status(201).json({
      success: true,
      reservationId: result.insertedId,
      message: 'Reservation saved successfully'
    });
  } catch (error) {
    console.error('❌ Error saving reservation:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// GET /api/reservations - Get all reservations
app.get('/api/reservations', async (req, res) => {
  try {
    const { db } = await connectToDatabase();
    const collection = db.collection('reservations');
    
    const reservations = await collection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    
    res.status(200).json({
      success: true,
      reservations,
      count: reservations.length
    });
  } catch (error) {
    console.error('❌ Error fetching reservations:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// PUT /api/reservations/:id/status - Update reservation status
app.put('/api/reservations/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!['pending', 'confirmed', 'cancelled'].includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid status. Must be: pending, confirmed, or cancelled'
      });
    }

    const { db } = await connectToDatabase();
    const collection = db.collection('reservations');
    
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { 
        $set: { 
          status,
          confirmed: status === 'confirmed',
          updatedAt: new Date()
        }
      }
    );
    
    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        error: 'Reservation not found'
      });
    }
    
    res.status(200).json({
      success: true,
      modified: result.modifiedCount > 0
    });
  } catch (error) {
    console.error('❌ Error updating reservation:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// GET /api/contacts - Get all contact messages
app.get('/api/contacts', async (req, res) => {
  try {
    const { db } = await connectToDatabase();
    const collection = db.collection('contact_messages');
    
    const contacts = await collection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    res.json({
      success: true,
      data: contacts,
      total: contacts.length
    });
  } catch (error) {
    console.error('❌ Error fetching contact messages:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// GET /api/newsletter - Get all newsletter subscribers
app.get('/api/newsletter', async (req, res) => {
  try {
    const { db } = await connectToDatabase();
    const collection = db.collection('newsletter_subscribers');
    
    const subscribers = await collection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    res.json({
      success: true,
      data: subscribers,
      total: subscribers.length
    });
  } catch (error) {
    console.error('❌ Error fetching newsletter subscribers:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'API server is running',
    environment: NODE_ENV,
    timestamp: new Date().toISOString(),
    database: 'Connected to MongoDB Atlas'
  });
});

// Production: Serve static files from dist directory
if (NODE_ENV === 'production') {
  // Trust proxy for deployment platforms like Render, Heroku, etc.
  app.set('trust proxy', 1);
  
  // Serve static files from the dist directory with proper caching
  app.use(express.static(path.join(__dirname, 'dist'), {
    maxAge: '1d', // Cache static assets for 1 day
    etag: true,
    lastModified: true
  }));
  
  // Handle client-side routing - serve index.html for all non-API routes
  // This catch-all handler must come AFTER all API routes
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
} else {
  // Development: Let Vite handle the frontend
  app.get('/', (req, res) => {
    res.json({
      message: 'Lumina Restaurant API - Development Mode',
      frontend: 'Run `npm run dev` to start the frontend development server',
      api: `API server running on http://localhost:${PORT}`,
      availableEndpoints: [
        'GET /api/health',
        'POST /api/reservations',
        'GET /api/reservations',
        'PUT /api/reservations/:id/status',
        'POST /api/contact',
        'GET /api/contact',
        'POST /api/newsletter'
      ]
    });
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Lumina Restaurant ${NODE_ENV} server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  
  if (NODE_ENV === 'production') {
    console.log(`🌐 Frontend served from: http://localhost:${PORT}`);
  } else {
    console.log(`🔧 Development mode - Frontend: http://localhost:5176`);
  }
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('🛑 Shutting down server...');
  if (client) {
    await client.close();
    console.log('✅ MongoDB connection closed');
  }
  process.exit(0);
});
