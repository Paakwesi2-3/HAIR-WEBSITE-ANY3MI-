const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const nodemailer = require('nodemailer');

const host = process.env.EMAIL_HOST;
const port = Number(process.env.EMAIL_PORT);
const secure = process.env.EMAIL_SECURE === 'true';
const user = process.env.EMAIL_USER;
const pass = process.env.EMAIL_PASS;

if (!host || !port || !user || !pass) {
  console.log('MISSING_CREDS');
  process.exit(2);
}

const transporter = nodemailer.createTransport({ host, port, secure, auth: { user, pass } });
transporter.verify()
  .then(() => {
    console.log('SMTP_OK');
    process.exit(0);
  })
  .catch((err) => {
    console.error('SMTP_ERR', err && err.message ? err.message : err);
    process.exit(1);
  });
