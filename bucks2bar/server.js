// filepath: c:\code\GitHubCopilotBeginnertoPro\bucks2bar\server.js
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Email route
app.post('/send-email', async (req, res) => {
    const { email, chartImage } = req.body;

    // Validate email and chartImage
    if (!email || !chartImage) {
        return res.status(400).json({ error: 'Email and chart image are required.' });
    }
    const validator = require('validator');
    if (!validator.isEmail(email)) {
        return res.status(400).json({ error: 'Invalid email address.' });
    }
        if (!chartImage.startsWith('data:image/png;base64,')) {
        return res.status(400).json({ error: 'Invalid chart image format.' });
    }
    // Create a transporter
       const transporter = nodemailer.createTransport({
        host: 'smtp.resend.com',
        port: 587,
        auth: {
            user: process.env.SMTP_USER, // Set in environment variables
            pass: process.env.SMTP_PASS  // Set in environment variables
        }
    });

    // Email options
    const mailOptions = {
        from: 'test@resend.dev', // Sender email
        to: email, // Recipient email
        subject: 'Your Chart Image',
        text: 'Here is your chart image.',
        attachments: [
            {
                filename: 'chart.png',
                content: chartImage.split('base64,')[1], // Extract base64 content
                encoding: 'base64'
            }
        ]
    };

    try {
        // Send email
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email.' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});