// Test script for API endpoints
import dotenv from 'dotenv';
dotenv.config();

const API_BASE_URL = 'http://localhost:5175';

async function testHealthEndpoint() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/health`);
    const data = await response.json();
    console.log('✅ Health Check:', data);
    return true;
  } catch (error) {
    console.error('❌ Health Check Failed:', error.message);
    return false;
  }
}

async function testCreateReservation() {
  const testReservation = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1-555-0123',
    date: '2025-08-20',
    time: '19:00',
    guests: '4',
    occasion: 'Anniversary',
    specialRequests: 'Window seat with a view, please!'
  };

  try {
    const response = await fetch(`${API_BASE_URL}/api/reservations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testReservation)
    });

    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Reservation Created:', data);
      return data.reservationId;
    } else {
      console.error('❌ Reservation Failed:', data.error);
      return null;
    }
  } catch (error) {
    console.error('❌ Reservation Error:', error.message);
    return null;
  }
}

async function testGetReservations() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/reservations`);
    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Retrieved Reservations:', {
        count: data.count,
        reservations: data.reservations.map(r => ({
          id: r._id,
          name: r.name,
          date: r.date,
          time: r.time,
          status: r.status
        }))
      });
      return data.reservations;
    } else {
      console.error('❌ Get Reservations Failed:', data.error);
      return [];
    }
  } catch (error) {
    console.error('❌ Get Reservations Error:', error.message);
    return [];
  }
}

// Run tests
async function runTests() {
  console.log('🚀 Starting API Tests...\n');
  
  // Test health endpoint
  const healthOk = await testHealthEndpoint();
  if (!healthOk) {
    console.log('❌ Server not ready, exiting tests');
    return;
  }
  
  console.log('\n---\n');
  
  // Test create reservation
  const reservationId = await testCreateReservation();
  
  console.log('\n---\n');
  
  // Test get reservations
  await testGetReservations();
  
  console.log('\n🎉 API Tests Complete!');
}

runTests().catch(console.error);
