# Resend & Vercel Setup Guide — AMC Travel Service

This project uses **Resend** with a secure **Vercel Serverless Function** (`/api/contact`) to deliver customer inquiries directly to your inbox.

---

## 1. Architecture Overview

```text
Customer Form (React)
       ↓  POST /api/contact
Vercel Serverless Function (api/contact.js)
       ↓  Resend SDK (Server-Side)
Resend API
       ↓
AMC Travels Inbox (ADMIN_EMAIL)
```

The `RESEND_API_KEY` remains strictly confidential on the server and is never exposed in client bundles.

---

## 2. Environment Variables

Configure the following variables in Vercel (**Settings** → **Environment Variables**) and in your local `.env` file:

| Variable | Description | Example / Recommended Value |
| :--- | :--- | :--- |
| `RESEND_API_KEY` | Your Resend API Key (starts with `re_...`) | `re_123456789...` |
| `RESEND_FROM_EMAIL` | Verified sender address or testing sender | `AMC Travels <onboarding@resend.dev>` or `inquiries@yourdomain.com` |
| `ADMIN_EMAIL` | Recipient inbox where contact inquiries are sent | `sano.nago2712nr@gmail.com` |

---

## 3. Vercel Configuration

1. In your Vercel Project Dashboard:
   - Navigate to **Settings** → **Environment Variables**
2. Add each variable:
   - `RESEND_API_KEY`: Apply to **Production**, **Preview**, and **Development**
   - `RESEND_FROM_EMAIL`: Apply to **Production**, **Preview**, and **Development**
   - `ADMIN_EMAIL`: Apply to **Production**, **Preview**, and **Development**
3. Trigger a redeployment.

---

## 4. How Replying Works
When an inquiry arrives in your inbox:
- The **Reply-To** header is set directly to the customer's email.
- Simply clicking **Reply** in Gmail / your email client opens a direct reply to the customer.
