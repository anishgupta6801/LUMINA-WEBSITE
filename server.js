import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5175;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME || 'restaurant';

if (!uri) {
  console.error('❌ MongoDB URI is required. Please check your .env file.');
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
      { _id: new MongoClient.ObjectId(id) },
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

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'API server is running',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 API server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
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
