const express = require('express');
const router = express.Router();
const { sendEmail } = require('../emailService');

// Route to handle sending emails
router.post('/send-email', async (req, res) => {
  try {
    const { recipients, subject, content } = req.body;

    // Validate request
    if (!recipients || !Array.isArray(recipients) || recipients.length === 0) {
      return res.status(400).json({ error: 'Recipients array is required' });
    }
    if (!subject) {
      return res.status(400).json({ error: 'Subject is required' });
    }
    if (!content) {
      return res.status(400).json({ error: 'Content is required' });
    }

    // Send email
    const result = await sendEmail(recipients, subject, content);
    res.json({ success: true, messageId: result.messageId });
  } catch (error) {
    console.error('Error in send-email route:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

module.exports = router; 