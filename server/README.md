# Hair Website Backend

This is a small Express backend that exposes a bookings API backed by SQLite.

Quick start:

```bash
cd server
npm install
npm start
```

API endpoints:
- `GET /api/bookings` — list bookings
- `POST /api/bookings` — create booking (JSON body: `name`, `email`, `phone`, `service`, `date` (ISO), `time` (string), `notes`).
	- Returns `201` with the booking on success.
	- Returns `409` if the selected `date` (YYYY-MM-DD) and `time` slot are already booked (no double bookings).
- `GET /api/availability?date=ISO_DATE&time=TIME` — check availability for a specific date/time. Returns `{ available: true|false }`.

Server listens on port `4000` by default.

Email notifications
-------------------

The server can send email notifications to the site owner when a booking is created or updated. Set these environment variables (example uses SMTP):

```
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_SECURE=false   # true for 465, false for 587
EMAIL_USER=your_smtp_user
EMAIL_PASS=your_smtp_password
FROM_EMAIL=hair@example.com   # optional; defaults to EMAIL_USER
OWNER_EMAIL=owner@example.com
```

If these are not set the server will still work but no emails will be sent.

Quick curl examples:

Create a booking (replace host/port as needed):

```bash
curl -i -X POST http://localhost:4000/api/bookings \
	-H "Content-Type: application/json" \
	-d '{"name":"Test User","email":"test@example.com","phone":"012345","service":"Box Braids","date":"2026-02-25T00:00:00.000Z","time":"10:00 AM"}'
```

Check availability:

```bash
curl "http://localhost:4000/api/availability?date=2026-02-25T00:00:00.000Z&time=10%3A00%20AM"
```

Run integration tests (requires server running). Use `TEST_API_URL` if server is on a non-default port:

```bash
cd server
npm run test:integration
# or if your server runs on port 4001:
TEST_API_URL=http://localhost:4001 npm run test:integration
```
