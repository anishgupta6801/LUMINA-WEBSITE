import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME || 'restaurant';

let client;
let clientPromise;

if (!uri) {
  throw new Error('Please add your MongoDB URI to .env file');
}

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export async function connectToDatabase() {
  const client = await clientPromise;
  const db = client.db(dbName);
  return { client, db };
}

export async function saveReservation(reservationData) {
  try {
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
    return {
      success: true,
      reservationId: result.insertedId,
      message: 'Reservation saved successfully'
    };
  } catch (error) {
    console.error('Error saving reservation:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

export async function getAllReservations() {
  try {
    const { db } = await connectToDatabase();
    const collection = db.collection('reservations');
    
    const reservations = await collection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    
    return {
      success: true,
      reservations
    };
  } catch (error) {
    console.error('Error fetching reservations:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

export async function updateReservationStatus(reservationId, status) {
  try {
    const { db } = await connectToDatabase();
    const collection = db.collection('reservations');
    
    const result = await collection.updateOne(
      { _id: reservationId },
      { 
        $set: { 
          status,
          confirmed: status === 'confirmed',
          updatedAt: new Date()
        }
      }
    );
    
    return {
      success: true,
      modified: result.modifiedCount > 0
    };
  } catch (error) {
    console.error('Error updating reservation:', error);
    return {
      success: false,
      error: error.message
    };
  }
}
