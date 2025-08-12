// Test script to verify server routing
const testUrls = [
  'http://localhost:5000/',
  'http://localhost:5000/api/health',
  'http://localhost:5000/booking',
  'http://localhost:5000/admin',
  'http://localhost:5000/nonexistent'
];

async function testRoute(url) {
  try {
    const response = await fetch(url);
    const contentType = response.headers.get('content-type');
    
    let content;
    if (contentType && contentType.includes('application/json')) {
      content = await response.json();
      content = JSON.stringify(content, null, 2);
    } else {
      content = await response.text();
      content = content.substring(0, 200) + (content.length > 200 ? '...' : '');
    }
    
    console.log(`\n🔍 Testing: ${url}`);
    console.log(`📊 Status: ${response.status}`);
    console.log(`📋 Content-Type: ${contentType}`);
    console.log(`📄 Content Preview:\n${content}`);
    console.log('─'.repeat(50));
  } catch (error) {
    console.error(`❌ Error testing ${url}:`, error.message);
  }
}

async function runTests() {
  console.log('🧪 Testing Lumina Restaurant Server Routes...\n');
  
  for (const url of testUrls) {
    await testRoute(url);
  }
  
  console.log('\n✅ Route testing complete!');
}

runTests().catch(console.error);
