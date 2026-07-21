require('dotenv').config();
const nodemailer = require('nodemailer');

(async () => {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, ENQUIRY_TO } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || SMTP_PASS === 'your-mailbox-password') {
    console.error('❌ SMTP_PASS is not set. Edit server/.env with the real password.');
    process.exit(1);
  }

  const port = Number(SMTP_PORT) || 465;
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  try {
    console.log('→ Verifying SMTP connection...');
    await transporter.verify();
    console.log('✓ SMTP connection OK');

    console.log(`→ Sending test email to ${ENQUIRY_TO || 'Info@cateringinchennai.com'}...`);
    const info = await transporter.sendMail({
      from: `"MCC Website" <${SMTP_USER}>`,
      to: ENQUIRY_TO || 'Info@cateringinchennai.com',
      subject: 'TEST — Enquiry email setup working ✅',
      text: 'This is a test. If you received this, form submissions will now arrive in this inbox.',
    });

    console.log('✓ Sent! Message ID:', info.messageId);
  } catch (err) {
    console.error('❌ Failed:', err.message);
    process.exit(1);
  }
})();
