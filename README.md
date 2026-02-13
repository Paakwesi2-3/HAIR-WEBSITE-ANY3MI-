# Anna's Braids — Simple Website

This is a small static site for a hair-braiding business, served by a minimal Java static file server.

Quick setup

1. Build Tailwind CSS (generates `dist/styles.css`):

```bash
npm run build:css
```

2. Compile the Java server:

```bash
javac -d out src/main/java/com/hair/Server.java
```

3. Run the server:

```bash
java -cp out com.hair.Server
```

Open http://localhost:8080 in your browser.

Notes

- To auto-rebuild CSS while developing, run `npm run watch:css` in a separate terminal.
- Edit `public/index.html` to change content, or add images to `public/`.
 
Connecting booking system to Supabase (optional)

1. Create a Supabase project and get the `SUPABASE_URL` and `SUPABASE_ANON_KEY`.
2. Add a `bookings` table with fields: `id`, `name`, `email`, `service`, `date`, `price`, `deposit`, `status`, `created_at`.
3. In production, replace the client-side localStorage save with a POST to your backend that inserts into Supabase (or call Supabase from the frontend securely via a small server).

Example flow suggestion:
- Frontend `booking.js` submits to `/api/bookings`.
- Java server implements a small POST handler that validates input and calls Supabase using the client SDK or HTTP.
- Store appointment status and track deposits. Send confirmation emails via a transactional email provider.

If you want, I can scaffold the Supabase integration and add a secure POST endpoint in the Java server.
