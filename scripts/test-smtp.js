/**
 * Run on Hostinger SSH (not on your laptop).
 * Example:
 *   /path/to/node scripts/test-smtp.js
 */
const nodemailer = require('nodemailer');

const host = process.env.SMTP_HOST || 'smtp-relay.gmail.com';
const port = parseInt(process.env.SMTP_PORT || '587', 10);
const from = process.env.MAIL_FROM || 'info@halodirect.io';
const to = process.argv[2] || from;
const user = process.env.SMTP_USER;
const pass = process.env.SMTP_PASS;

const transporter = nodemailer.createTransport({
  host,
  port,
  secure: false,
  requireTLS: true,
  name: 'halodirect.io',
  family: 4,
  ...(user && pass ? { auth: { user, pass } } : {}),
});

console.log('SMTP_HOST=', host);
console.log('SMTP_PORT=', port);
console.log('MAIL_FROM=', from);
console.log('TO=', to);
console.log('AUTH=', user && pass ? 'yes' : 'no');

transporter
  .sendMail({
    from,
    to,
    subject: 'Halo Direct SMTP test',
    html: '<p>If you received this, Hostinger can send via Google SMTP relay.</p>',
  })
  .then((info) => {
    console.log('SEND OK');
    console.log(info.response);
    process.exit(0);
  })
  .catch((err) => {
    console.log('SEND FAIL');
    console.log('code=', err.code || '');
    console.log('responseCode=', err.responseCode || '');
    console.log(err.message);
    process.exit(1);
  });
