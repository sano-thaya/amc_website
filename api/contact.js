import { Resend } from 'resend';

// Basic HTML escaping helper to prevent injection in generated HTML emails
function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export default async function handler(req, res) {
  // 1. Only allow POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({
      success: false,
      error: 'Method not allowed. Only POST requests are accepted.'
    });
  }

  try {
    // 2. Parse request body
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const { name, email, phone, service, message, honeypot } = body;

    // Honeypot spam protection (if bot fills in hidden field, silently reject or respond)
    if (honeypot) {
      return res.status(200).json({
        success: true,
        message: 'Message processed successfully.'
      });
    }

    // 3. Server-side validation
    const trimmedName = typeof name === 'string' ? name.trim() : '';
    const trimmedEmail = typeof email === 'string' ? email.trim() : '';
    const trimmedPhone = typeof phone === 'string' ? phone.trim() : '';
    const trimmedService = typeof service === 'string' ? service.trim() : 'General Inquiry';
    const trimmedMessage = typeof message === 'string' ? message.trim() : '';

    if (!trimmedName) {
      return res.status(400).json({
        success: false,
        error: 'Please provide your name.'
      });
    }

    if (trimmedName.length > 100) {
      return res.status(400).json({
        success: false,
        error: 'Name is too long (maximum 100 characters).'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address.'
      });
    }

    if (trimmedEmail.length > 150) {
      return res.status(400).json({
        success: false,
        error: 'Email address is too long.'
      });
    }

    if (trimmedPhone && trimmedPhone.length > 30) {
      return res.status(400).json({
        success: false,
        error: 'Phone number is too long (maximum 30 characters).'
      });
    }

    if (!trimmedMessage) {
      return res.status(400).json({
        success: false,
        error: 'Please provide your message or travel inquiry.'
      });
    }

    if (trimmedMessage.length > 4000) {
      return res.status(400).json({
        success: false,
        error: 'Message is too long (maximum 4000 characters).'
      });
    }

    // 4. Check environment configuration
    const apiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'AMC Travels <onboarding@resend.dev>';
    const toEmail = process.env.ADMIN_EMAIL || 'sano.nago2712nr@gmail.com';

    if (!apiKey) {
      console.error('RESEND_API_KEY is not configured in server environment variables.');
      return res.status(500).json({
        success: false,
        error: 'Email service is not configured on the server. Please check environment variables.'
      });
    }

    const resend = new Resend(apiKey);

    // 5. Build HTML & Plaintext Content
    const sanitizedName = escapeHtml(trimmedName);
    const sanitizedEmail = escapeHtml(trimmedEmail);
    const sanitizedPhone = escapeHtml(trimmedPhone || 'Not provided');
    const sanitizedService = escapeHtml(trimmedService);
    const sanitizedMessage = escapeHtml(trimmedMessage).replace(/\n/g, '<br/>');

    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Travel Inquiry</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f7fa;
      color: #1a202c;
    }
    .wrapper {
      max-width: 600px;
      margin: 20px auto;
      background: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
      border: 1px solid #e2e8f0;
    }
    .header {
      background: linear-gradient(135deg, #0b2545 0%, #134074 100%);
      padding: 30px 24px;
      color: #ffffff;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 22px;
      font-weight: 700;
      letter-spacing: -0.5px;
    }
    .header p {
      margin: 6px 0 0;
      font-size: 14px;
      color: #94d2bd;
    }
    .content {
      padding: 28px 24px;
    }
    .info-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 24px;
    }
    .info-table td {
      padding: 10px 12px;
      border-bottom: 1px solid #edf2f7;
      font-size: 14px;
    }
    .info-table td.label {
      font-weight: 600;
      color: #4a5568;
      width: 35%;
      background-color: #f8fafc;
    }
    .info-table td.value {
      color: #1a202c;
    }
    .message-box {
      background-color: #f8fafc;
      border-left: 4px solid #134074;
      padding: 16px;
      border-radius: 4px;
      margin-top: 8px;
      font-size: 14px;
      line-height: 1.6;
      color: #2d3748;
    }
    .footer {
      background-color: #f8fafc;
      padding: 20px 24px;
      text-align: center;
      font-size: 12px;
      color: #718096;
      border-top: 1px solid #edf2f7;
    }
    .reply-badge {
      display: inline-block;
      margin-top: 16px;
      padding: 8px 16px;
      background-color: #e6fffa;
      color: #234e52;
      border-radius: 20px;
      font-size: 13px;
      font-weight: 600;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>AMC Travel Service</h1>
      <p>New Website Contact / Travel Inquiry</p>
    </div>
    <div class="content">
      <table class="info-table">
        <tr>
          <td class="label">Customer Name:</td>
          <td class="value"><strong>${sanitizedName}</strong></td>
        </tr>
        <tr>
          <td class="label">Customer Email:</td>
          <td class="value"><a href="mailto:${sanitizedEmail}">${sanitizedEmail}</a></td>
        </tr>
        <tr>
          <td class="label">Phone Number:</td>
          <td class="value">${sanitizedPhone}</td>
        </tr>
        <tr>
          <td class="label">Service of Interest:</td>
          <td class="value"><strong style="color: #134074;">${sanitizedService}</strong></td>
        </tr>
      </table>

      <h3 style="font-size: 15px; margin-bottom: 8px; color: #2d3748;">Customer Message / Travel Details:</h3>
      <div class="message-box">
        ${sanitizedMessage}
      </div>

      <div style="text-align: center;">
        <span class="reply-badge">
          💡 Simply reply directly to this email to respond to ${sanitizedName}
        </span>
      </div>
    </div>
    <div class="footer">
      This inquiry was submitted from the AMC Travel Service website contact form.
    </div>
  </div>
</body>
</html>
    `.trim();

    const textContent = `
AMC Travel Service - New Travel Inquiry
========================================

Customer Name: ${trimmedName}
Email: ${trimmedEmail}
Phone: ${trimmedPhone || 'Not provided'}
Service of Interest: ${trimmedService}

Message:
${trimmedMessage}

----------------------------------------
To reply to the customer, simply reply to this email (${trimmedEmail}).
    `.trim();

    // 6. Send email via Resend
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: trimmedEmail,
      subject: `New Travel Inquiry: ${trimmedService} — ${trimmedName}`,
      html: htmlContent,
      text: textContent
    });

    if (error) {
      console.error('Resend API error:', error);
      return res.status(500).json({
        success: false,
        error: 'Failed to send your message. Please try again later or reach out directly.'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Your inquiry has been sent successfully.',
      id: data?.id
    });
  } catch (err) {
    console.error('API Handler Error:', err);
    return res.status(500).json({
      success: false,
      error: 'An unexpected error occurred while processing your request.'
    });
  }
}
