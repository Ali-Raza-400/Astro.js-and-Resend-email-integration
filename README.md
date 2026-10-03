# RegMedInk — InkBinder™ Protocol Waitlist Demo

A demo Astro.js application built for **RegMedInk** to showcase a working
[Resend](https://resend.com) email integration: a dark-themed waitlist
signup form that, on submit, sends a confirmation email to the signee and
an internal notification email to the admin inbox — all logged to the
console for easy debugging during a client demo.

## What's inside

- **`src/pages/index.astro`** — the dark-themed landing page and waitlist
  form (Full Name, Email, Role, Submit).
- **`src/actions/index.ts`** — the Astro Action (`joinWaitlist`) that
  validates the submission and sends both emails via the Resend SDK.
- **`src/emails/confirmation.ts`** — HTML for the "you're on the list"
  email sent to the person who signed up.
- **`src/emails/admin-notify.ts`** — HTML for the internal notification
  email sent to `ADMIN_EMAIL`.

## Prerequisites

- Node.js 18.17+ (Astro 5 requirement)
- npm
- A [Resend](https://resend.com) account and API key

## Installation

```bash
npm install
cp .env.example .env
```

Then open `.env` and add your real Resend API key:

```
RESEND_API_KEY=re_your_actual_key_here
```

`FROM_EMAIL` and `ADMIN_EMAIL` already default to
`hello@regmedink.com` / `admin@regmedink.com` — change them in `.env` if
you want to test with different addresses.

## Running the app

```bash
npm run dev
```

Open the printed local URL (typically `http://localhost:4321`).

## Testing the form

1. Fill in a full name, a real email address you can check, and pick a
   role.
2. Click **"Join the Launch List"**.
3. On success you'll see a green confirmation message on the page, and
   two emails will be sent:
   - A confirmation email to the address you entered.
   - An internal notification email to `ADMIN_EMAIL`.
4. Leave a field empty or enter an invalid email to see inline
   validation errors (red text, no email sent).
5. Check your terminal — every send attempt (success or failure) is
   logged to the console with the Resend message id.

## Where to see logs in the Resend dashboard

Every email sent by this app shows up in your
[Resend dashboard → Emails](https://resend.com/emails) log, with delivery
status, timestamps, and the full rendered HTML. The message `id` printed
in your terminal console corresponds to the entry you'll find there.

## Important: Resend free tier limitation

On Resend's **free plan**, you can only send email **to your own verified
email address(es)** until you verify a sending domain. For this demo:

- `FROM_EMAIL` (`hello@regmedink.com`) requires the `regmedink.com` domain
  to be verified in Resend before you can send *from* it in production.
  For local testing without domain verification, Resend provides a
  sandbox sender you can swap in temporarily.
- Recipient addresses (the signup email and `ADMIN_EMAIL`) must be
  addresses you've verified with Resend, unless you're on a paid plan.

This is expected behavior for a demo/sandbox account — no code changes
are needed once your domain and/or recipients are verified.

## Tech stack

- [Astro](https://astro.build) with SSR (`@astrojs/node`, standalone mode)
- [Astro Actions](https://docs.astro.build/en/guides/actions/) for
  type-safe, server-side form handling
- [Resend](https://resend.com) Node SDK for email delivery
- [Tailwind CSS](https://tailwindcss.com) for styling
- TypeScript throughout
# Astro.js-and-Resend-email-integration
