const fetch = require('node-fetch');

async function testSMS() {
  const apiKey = 'q5NGB42Q6Fn6UHLv5A9c';
  const senderId = '8809617624395';
  const phone = '8801733577215'; // Your test phone
  const message = 'Test OTP: 123456';
  
  const url = `http://bulksmsbd.net/api/smsapi?api_key=${apiKey}&type=text&number=${phone}&senderid=${senderId}&message=${encodeURIComponent(message)}`;
  
  console.log('Testing BulkSMS API...');
  console.log('URL:', url);
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    console.log('\n=== RESPONSE ===');
    console.log(JSON.stringify(data, null, 2));
    
    if (data.response_code === 202) {
      console.log('\n✅ SUCCESS! SMS sent.');
    } else {
      console.log('\n❌ FAILED!');
      console.log('Error:', data.error_message || data);
    }
  } catch (error) {
    console.error('\n❌ EXCEPTION:', error.message);
  }
}

testSMS();