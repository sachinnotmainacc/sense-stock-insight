// Simple API test script
import fetch from 'node-fetch';
import fs from 'fs';

async function testAPI() {
  try {
    console.log('Testing API endpoint...');
    
    const response = await fetch('http://localhost:5000/api/professional', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: 'How is NIFTY performing today?' }),
    });
    
    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('API Response Status:', response.status);
    console.log('API Response Entity:', data.entity);
    console.log('API Response Format:', data.format);
    console.log('API Response Content (preview):', data.content.substring(0, 100) + '...');
    
    // Check if content contains "NIFTY"
    if (data.content.includes('NIFTY')) {
      console.log('✅ NIFTY data found in response!');
    } else {
      console.log('❌ NIFTY data NOT found in response!');
    }
    
    // Save full response to file for inspection
    fs.writeFileSync('api-response.json', JSON.stringify(data, null, 2));
    console.log('Full response saved to api-response.json');
    
  } catch (error) {
    console.error('Error testing API:', error);
  }
}

testAPI(); 