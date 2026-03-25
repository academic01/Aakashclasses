export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' })
  }

  const { phone, otp } = req.body;
  const FAST2SMS_KEY = "edH0Or9RZ7cxqBYbMNkPSaC251LUyQoE3VjuntlDi4XJKsGfvhImRVKqBJ1LGrcSEUiaXznjlNT79OwD";

  if (!phone || !otp) {
    return res.status(400).json({ message: 'Phone and OTP are required' })
  }

  try {
    const url = `https://www.fast2sms.com/dev/bulkV2?authorization=${FAST2SMS_KEY}&route=q&message=Your Aakash Academics OTP is ${otp}. Valid for 5 minutes.&language=english&numbers=${phone}`;
    
    const response = await fetch(url);
    const data = await response.json();

    if (data.return) {
      return res.status(200).json({ message: 'OTP Sent Successfully', return: true })
    } else {
      return res.status(500).json({ message: data.message || 'Failed to send SMS', return: false })
    }
  } catch (error) {
    console.error('Fast2SMS Proxy Error:', error);
    return res.status(500).json({ message: 'Internal Server Error', error: error.message })
  }
}
