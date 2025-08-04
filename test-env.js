import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

console.log('🔍 Environment Variables Check:');
console.log('MONGODB_URI exists:', !!process.env.MONGODB_URI);
console.log('MONGODB_DB_NAME:', process.env.MONGODB_DB_NAME);

if (!process.env.MONGODB_URI) {
  console.log('❌ MONGODB_URI is not set in .env file');
  console.log('📝 Please update your .env file with your actual MongoDB connection string');
} else if (process.env.MONGODB_URI.includes('your_actual_connection_string_here')) {
  console.log('❌ Please replace the placeholder with your actual MongoDB connection string');
} else {
  console.log('✅ MongoDB URI is configured');
  console.log('🔗 Connection string format looks correct');
}
