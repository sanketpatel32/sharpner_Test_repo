
const Sib = require('sib-api-v3-sdk');
require('dotenv').config();

// Initialize Brevo Client
const client = Sib.ApiClient.instance;
const apiKey = client.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY;

const tranEmailApi = new Sib.TransactionalEmailsApi();

// Sender Info (must be verified in Brevo)
const sender = {
    email: 'ssddpatel323@gmail.com',
    name: 'Siddharth Patel'
};

// Send Email Controller
const resetPassword = async (req, res) => {
    const { email: toEmail } = req.body;

    // Log incoming data for debugging
    console.log("📨 Incoming body:", req.body);

    const subject = "Password Reset Request";
    const textContent = "To reset your password, please click the link below:\n\n";
    const htmlContent = "<p>To reset your password, please click the link below:</p><br>";

    if (!toEmail || !subject || !textContent || !htmlContent) {
        return res.status(400).json({ error: 'Missing required email fields' });
    }

    try {
        const response = await tranEmailApi.sendTransacEmail({
            sender,
            to: [{ email: toEmail }],
            subject,
            textContent,
            htmlContent
        });

        console.log('✅ Email sent:', response.messageId || response);
        res.status(200).json({ message: 'Email sent successfully', data: response });
    } catch (error) {
        console.error('❌ Email send failed:', error.response?.body || error.message);
        res.status(500).json({ error: 'Failed to send email', details: error.response?.body });
    }
};

module.exports = {
    resetPassword
};
