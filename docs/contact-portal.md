# Contact form and portal

Every email link to Amit opens the contact form (`src/components/contact`). Submissions go to `POST /api/enquiry`
(`api/enquiry.ts`), are saved in Postgres, and trigger a notification email through Resend. The private portal is `/admin`.

## Environment variables (Vercel project settings, all environments)

| Name | Purpose |
| --- | --- |
| `DATABASE_URL` | Neon Postgres. Added automatically by Vercel → Storage → Neon. Tables are created on first use. |
| `RESEND_API_KEY` | Sends the notification email. Without it, enquiries are still saved and shown in the portal. |
| `ADMIN_PASSWORD` | Portal password, 10+ characters. Changing it signs every session out. |
| `ADMIN_EMAIL` | Optional. Portal login, defaults to uxbyamit@gmail.com. |
| `NOTIFY_EMAIL` | Optional. Where notifications go, defaults to uxbyamit@gmail.com. |
| `RESEND_FROM` | Optional. Defaults to `Portfolio <onboarding@resend.dev>`. Use a verified domain address for production. |

## Safeguards
Hidden honeypot field, minimum fill time, 5 enquiries per visitor per hour, 8 failed logins per 15 minutes, hashed IPs,
HttpOnly + SameSite=Strict session cookie, constant-time password check.

On a host without `/api` (for example GitHub Pages) the form shows a message and offers the direct email address instead.
