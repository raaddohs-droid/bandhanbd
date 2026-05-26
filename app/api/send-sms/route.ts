import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { phone, message } = await request.json()

    console.log('=== SEND SMS DEBUG ===');
    console.log('Received phone:', phone);
    console.log('Phone type:', typeof phone);
    console.log('Received message:', message);

    // Remove +880 and keep only the number
    const cleanPhone = phone.replace('+880', '88')
    
    console.log('Clean phone after replace:', cleanPhone);

    const apiKey = process.env.BULKSMS_API_KEY
    const senderId = process.env.BULKSMS_SENDER_ID

    console.log('API Key exists:', !!apiKey);
    console.log('Sender ID:', senderId);

    const url = `http://bulksmsbd.net/api/smsapi?api_key=${apiKey}&type=text&number=${cleanPhone}&senderid=${senderId}&message=${encodeURIComponent(message)}`

    console.log('Calling URL:', url);

    const response = await fetch(url)
    const data = await response.json()

    console.log('BulkSMS Response:', JSON.stringify(data));

    if (data.response_code === 202) {
      return NextResponse.json({ success: true })
    } else {
      console.error('BulkSMS Error:', data);
      return NextResponse.json({ 
        success: false, 
        error: data.error_message || 'SMS sending failed' 
      }, { status: 400 })
    }
  } catch (error) {
    console.error('Exception:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to send SMS' 
    }, { status: 500 })
  }
}