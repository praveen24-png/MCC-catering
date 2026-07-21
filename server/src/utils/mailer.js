const nodemailer = require('nodemailer');

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.warn('[mailer] SMTP env vars missing — enquiry emails will not be sent.');
    return null;
  }

  const port = Number(SMTP_PORT) || 465;
  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
  return transporter;
}

async function sendEnquiryEmail(enquiry) {
  const tx = getTransporter();
  if (!tx) return;

  const to = process.env.ENQUIRY_TO || 'Info@cateringinchennai.com';
  const from = process.env.SMTP_USER;

  const {
    order_number, name, phone, email, city,
    event_type, event_date, venue, guests,
    package: pkg, special_requests, total_amount,
  } = enquiry;

  const rows = [
    ['Enquiry No', order_number],
    ['Name', name],
    ['Phone', phone],
    ['Email', email],
    ['City', city],
    ['Event Type', event_type],
    ['Event Date', event_date],
    ['Venue', venue],
    ['Guests', guests],
    ['Package', pkg],
    ['Est. Total', total_amount ? `\u20B9${total_amount}` : ''],
    ['Special Requests', special_requests],
  ].filter(([, v]) => v != null && v !== '');

  const html = `
    <h2 style="font-family:sans-serif">New Website Enquiry</h2>
    <table style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
      ${rows.map(([k, v]) =>
        `<tr>
           <td style="padding:6px 12px;border:1px solid #eee;font-weight:600">${k}</td>
           <td style="padding:6px 12px;border:1px solid #eee">${String(v)}</td>
         </tr>`
      ).join('')}
    </table>
    <p style="font-family:sans-serif;font-size:12px;color:#888">Sent from cateringinchennai.com enquiry form</p>
  `;

  const text = rows.map(([k, v]) => `${k}: ${v}`).join('\n');

  await tx.sendMail({
    from: `"MCC Website" <${from}>`,
    to,
    replyTo: email || undefined,
    subject: `New Enquiry — ${name}${event_date ? ` (${event_date})` : ''}`,
    text,
    html,
  });
}

module.exports = { sendEnquiryEmail };
