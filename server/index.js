// Load environment variables from .env when present (dev only)
try { require('dotenv').config(); } catch (e) { /* dotenv optional */ }
const express = require('express');
const cors = require('cors');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const nodemailer = require('nodemailer');

const DB_PATH = path.join(__dirname, 'data.sqlite');

const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('Failed to open DB', err);
    process.exit(1);
  }
});

const app = express();
app.use(cors());
app.use(express.json());

// Email helper
function createTransporter() {
  const host = process.env.EMAIL_HOST;
  const port = process.env.EMAIL_PORT && Number(process.env.EMAIL_PORT);
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;
  const secure = process.env.EMAIL_SECURE === 'true';
  if (!host || !port || !user || !pass) return null;
  return nodemailer.createTransport({ host, port, secure, auth: { user, pass } });
}

function sendBookingEmail(booking, action = 'created') {
  const owner = process.env.OWNER_EMAIL;
  const from = process.env.FROM_EMAIL || (process.env.EMAIL_USER || 'no-reply@example.com');
  if (!owner) return Promise.resolve();

  const subject = action === 'created' ? `New booking: ${booking.name} — ${booking.service}` : `Booking updated: ${booking.name} — ${booking.service}`;
  // build admin link (configurable via ADMIN_PANEL_URL). Format used: <base>/#admin?booking=ID
  const adminBase = process.env.ADMIN_PANEL_URL || `http://localhost:5173`;
  const adminLink = `${adminBase.replace(/\/$/, '')}/#admin?booking=${booking.id}`;
  const text = `Booking ${action}\n\nName: ${booking.name}\nEmail: ${booking.email}\nPhone: ${booking.phone || ''}\nService: ${booking.service}\nDate: ${booking.date} ${booking.time || ''}\nStatus: ${booking.status || 'pending'}\nNotes: ${booking.notes || ''}\n\nOpen the admin dashboard to manage this booking: ${adminLink}`;
  const html = `<p>Booking <strong>${action}</strong></p>
<ul>
  <li><strong>Name:</strong> ${booking.name}</li>
  <li><strong>Email:</strong> ${booking.email}</li>
  <li><strong>Phone:</strong> ${booking.phone || ''}</li>
  <li><strong>Service:</strong> ${booking.service}</li>
  <li><strong>Date:</strong> ${booking.date} ${booking.time || ''}</li>
  <li><strong>Status:</strong> ${booking.status || 'pending'}</li>
  <li><strong>Notes:</strong> ${booking.notes || ''}</li>
</ul>
<p><a href="${adminLink}">Open admin dashboard for this booking</a></p>`;

  // If SMTP is configured, use it. Otherwise create an Ethereal test account and log preview URL.
  const transporter = createTransporter();
  if (transporter) {
    return transporter.sendMail({ from, to: owner, subject, text, html }).then(() => null).catch((err) => {
      console.warn('Failed to send booking email via SMTP:', err && err.message ? err.message : err);
      // fallback to ethereal preview for developer convenience
      return nodemailer.createTestAccount().then((testAccount) => {
        const testTransport = nodemailer.createTransport({
          host: testAccount.smtp.host,
          port: testAccount.smtp.port,
          secure: testAccount.smtp.secure,
          auth: { user: testAccount.user, pass: testAccount.pass }
        });
        return testTransport.sendMail({ from: testAccount.user, to: owner, subject, text, html }).then((info) => {
          const url = nodemailer.getTestMessageUrl(info);
          if (url) console.log('Preview booking email (fallback):', url);
          return url || null;
        }).catch((err2) => {
          console.warn('Failed to send test booking email after SMTP failure:', err2 && err2.message ? err2.message : err2);
          return null;
        });
      }).catch((err3) => {
        console.warn('Failed to create test email account after SMTP failure:', err3 && err3.message ? err3.message : err3);
        return null;
      });
    });
  }

  // Fallback: ethereal test account (development only)
  return nodemailer.createTestAccount().then((testAccount) => {
    const testTransport = nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      auth: { user: testAccount.user, pass: testAccount.pass }
    });
    return testTransport.sendMail({ from: testAccount.user, to: owner, subject, text, html }).then((info) => {
      const url = nodemailer.getTestMessageUrl(info);
      if (url) console.log('Preview booking email:', url);
      return url || null;
    }).catch((err) => {
      console.warn('Failed to send test booking email:', err && err.message ? err.message : err);
      return null;
    });
  }).catch((err) => {
    console.warn('Failed to create test email account:', err && err.message ? err.message : err);
    return null;
  });
}

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    service TEXT,
    date TEXT,
    notes TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
  // Ensure `time` column exists, then create unique index on (date,time)
  db.all("PRAGMA table_info(bookings)", (err, cols) => {
    if (!err) {
      const hasTime = Array.isArray(cols) && cols.some(c => c && c.name === 'time');
      const hasStatus = Array.isArray(cols) && cols.some(c => c && c.name === 'status');
      if (!hasTime) {
        db.run("ALTER TABLE bookings ADD COLUMN time TEXT", (err2) => {
          if (err2) console.warn('Could not add time column:', err2.message || err2);
          if (!hasStatus) {
            db.run("ALTER TABLE bookings ADD COLUMN status TEXT DEFAULT 'pending'", (err3) => {
              if (err3) console.warn('Could not add status column:', err3.message || err3);
              db.run(`CREATE UNIQUE INDEX IF NOT EXISTS idx_bookings_date_time ON bookings(date, time)`);
            });
          } else {
            db.run(`CREATE UNIQUE INDEX IF NOT EXISTS idx_bookings_date_time ON bookings(date, time)`);
          }
        });
      } else {
        if (!hasStatus) {
          db.run("ALTER TABLE bookings ADD COLUMN status TEXT DEFAULT 'pending'", (err3) => {
            if (err3) console.warn('Could not add status column:', err3.message || err3);
            db.run(`CREATE UNIQUE INDEX IF NOT EXISTS idx_bookings_date_time ON bookings(date, time)`);
          });
        } else {
          db.run(`CREATE UNIQUE INDEX IF NOT EXISTS idx_bookings_date_time ON bookings(date, time)`);
        }
      }
    }
  });
});

// Update booking: allow updating fields and status
app.patch('/api/bookings/:id', (req, res) => {
  const id = Number(req.params.id);
  if (!id) return res.status(400).json({ error: 'invalid id' });
  const allowed = ['name','email','phone','service','date','time','notes','status'];
  const updates = [];
  const params = [];
  for (const key of allowed) {
    if (Object.prototype.hasOwnProperty.call(req.body, key)) {
      let val = req.body[key];
      if (key === 'date') {
        try {
          const d = new Date(val);
          if (Number.isNaN(d.getTime())) throw new Error('invalid date');
          val = d.toISOString().slice(0,10);
        } catch (e) {
          return res.status(400).json({ error: 'invalid date format' });
        }
      }
      updates.push(`${key} = ?`);
      params.push(val);
    }
  }
  if (updates.length === 0) return res.status(400).json({ error: 'no valid fields to update' });
  params.push(id);
  const sql = `UPDATE bookings SET ${updates.join(', ')} WHERE id = ?`;
  db.run(sql, params, function(err) {
    if (err) return res.status(500).json({ error: 'DB error' });
    db.get('SELECT * FROM bookings WHERE id = ?', [id], (err, row) => {
      if (err) return res.status(500).json({ error: 'DB error' });
        // send notification (best-effort) and include previewUrl when available
        sendBookingEmail(row, 'updated').then((previewUrl) => {
          const out = { ...row };
          if (previewUrl) out.previewUrl = previewUrl;
          res.json(out);
        }).catch(() => res.json(row));
    });
  });
});

// Optional: delete a booking
app.delete('/api/bookings/:id', (req, res) => {
  const id = Number(req.params.id);
  if (!id) return res.status(400).json({ error: 'invalid id' });
  db.run('DELETE FROM bookings WHERE id = ?', [id], function(err) {
    if (err) return res.status(500).json({ error: 'DB error' });
    res.json({ deleted: this.changes });
  });
});

app.get('/api/bookings', (req, res) => {
  db.all('SELECT * FROM bookings ORDER BY created_at DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    res.json(rows);
  });
});

// Availability check: returns { available: true } if no booking exists for the given date (YYYY-MM-DD) and time
app.get('/api/availability', (req, res) => {
  const { date, time } = req.query;
  if (!date || !time) return res.status(400).json({ error: 'date and time required' });
  // normalize date to YYYY-MM-DD
  let dateOnly;
  try {
    const d = new Date(date);
    if (Number.isNaN(d.getTime())) throw new Error('invalid date');
    dateOnly = d.toISOString().slice(0,10);
  } catch (e) {
    return res.status(400).json({ error: 'invalid date format' });
  }

  db.get('SELECT COUNT(1) as cnt FROM bookings WHERE date = ? AND time = ?', [dateOnly, time], (err, row) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    const available = !(row && row.cnt > 0);
    res.json({ available });
  });
});

app.post('/api/bookings', (req, res) => {
  const { name, email, phone, service, date, time, notes } = req.body;
  if (!name || !email) return res.status(400).json({ error: 'name and email required' });
  if (!date || !time) return res.status(400).json({ error: 'date and time required' });

  // Normalize date to YYYY-MM-DD to ensure uniqueness by day + timeslot
  let dateOnly;
  try {
    dateOnly = new Date(date);
    if (Number.isNaN(dateOnly.getTime())) throw new Error('invalid date');
    dateOnly = dateOnly.toISOString().slice(0,10);
  } catch (e) {
    return res.status(400).json({ error: 'invalid date format' });
  }

  // Insert booking (dateOnly already normalized)
  const insert = db.prepare('INSERT INTO bookings (name,email,service,date,time,notes) VALUES (?,?,?,?,?,?)');
  insert.run(name, email, service || null, dateOnly, time || null, notes || null, function (err) {
    if (err) {
      if (err.code === 'SQLITE_CONSTRAINT' || /UNIQUE constraint failed/.test(err.message)) {
        return res.status(409).json({ error: 'Selected date/time already booked' });
      }
      return res.status(500).json({ error: 'DB error' });
    }
    db.get('SELECT * FROM bookings WHERE id = ?', [this.lastID], (err, row) => {
      if (err) return res.status(500).json({ error: 'DB error' });
        // send notification (best-effort) and include previewUrl when available
        sendBookingEmail(row, 'created').then((previewUrl) => {
          const out = { ...row };
          if (previewUrl) out.previewUrl = previewUrl;
          res.status(201).json(out);
        }).catch(() => res.status(201).json(row));
    });
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
