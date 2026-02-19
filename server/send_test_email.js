const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const nodemailer = require('nodemailer');

const host = process.env.EMAIL_HOST;
const port = Number(process.env.EMAIL_PORT);
const secure = process.env.EMAIL_SECURE === 'true';
const user = process.env.EMAIL_USER;
const pass = process.env.EMAIL_PASS;

const owner = process.env.OWNER_EMAIL || user;
const from = process.env.FROM_EMAIL || user;

if (!host || !port || !user || !pass) {
  console.error('MISSING_CREDS');
  process.exit(2);
}

const transporter = nodemailer.createTransport({ host, port, secure, auth: { user, pass } });

(async () => {
  try {
    const info = await transporter.sendMail({ from, to: owner, subject: 'Test send', text: 'This is a test send from local script.' });
    console.log('SENT', info && info.messageId);
  } catch (err) {
    console.error('SEND_ERR', err && err.message ? err.message : err);
    process.exit(1);
  }
})();
