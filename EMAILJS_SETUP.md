# EmailJS Setup Guide — AMC Travel Contact Form

## What is EmailJS?
EmailJS lets your website send emails directly from the browser to your Gmail — **no backend server needed**.
Every time someone submits the contact form, you will receive a full email at **sano.nago2712nr@gmail.com** with all their details. You can then simply **reply** to that email to respond to the customer.

---

## Step-by-Step Setup

### 1. Create a Free EmailJS Account
- Go to [https://www.emailjs.com](https://www.emailjs.com)
- Click **Sign Up** → Create a free account (200 emails/month free)

### 2. Add Your Gmail as the Email Service
1. In the EmailJS dashboard, go to **Email Services** → **Add New Service**
2. Select **Gmail**
3. Click **Connect Account** and sign in with **sano.nago2712nr@gmail.com**
4. Name it `AMC Travel Service` and click **Create Service**
5. Copy the **Service ID** (e.g. `service_abc123`)

### 3. Create an Email Template
1. Go to **Email Templates** → **Create New Template**
2. Name it `AMC Contact Form`
3. Set the template content like this:

**Subject:**
```
New Travel Inquiry from {{from_name}} — {{service}}
```

**Body (HTML):**
```html
<h2>New Contact Form Submission</h2>
<p><strong>From:</strong> {{from_name}}</p>
<p><strong>Email:</strong> <a href="mailto:{{reply_to}}">{{reply_to}}</a></p>
<p><strong>Phone:</strong> {{phone}}</p>
<p><strong>Service Interested In:</strong> {{service}}</p>
<hr>
<p><strong>Message:</strong></p>
<p>{{message}}</p>
<hr>
<p><small>Sent from AMC Travel Service Website — <a href="mailto:{{reply_to}}">Reply directly to customer</a></small></p>
```

4. In the **To Email** field, enter: `sano.nago2712nr@gmail.com`
5. In **Reply To**, enter: `{{reply_to}}`  ← This makes it so your reply goes directly to the customer!
6. Click **Save**
7. Copy the **Template ID** (e.g. `template_xyz456`)

### 4. Get Your Public Key
1. Go to **Account** → **General**
2. Copy your **Public Key** (e.g. `user_XXXXXXXXXXXXXXXXX`)

### 5. Update the .env File
Open `.env` in the project root and paste in your keys:

```env
VITE_EMAILJS_SERVICE_ID=service_abc123
VITE_EMAILJS_TEMPLATE_ID=template_xyz456
VITE_EMAILJS_PUBLIC_KEY=user_XXXXXXXXXXXXXXXXX
VITE_CONTACT_EMAIL=sano.nago2712nr@gmail.com
```

### 6. Restart the Dev Server
```bash
npm run dev
```

---

## How Replying Works
When you receive an email from the contact form:
- The **To** field will be your email: `sano.nago2712nr@gmail.com`
- The **Reply-To** field will be set to the **customer's email address**
- Just click **Reply** in Gmail and it goes directly to the customer ✅

---

## Vercel Deployment — Add Keys as Environment Variables
For the live website on Vercel:
1. Go to your Vercel project → **Settings** → **Environment Variables**
2. Add each key:
   - `VITE_EMAILJS_SERVICE_ID`
   - `VITE_EMAILJS_TEMPLATE_ID`
   - `VITE_EMAILJS_PUBLIC_KEY`
   - `VITE_CONTACT_EMAIL`
3. Redeploy the site

> **Note:** Never commit the `.env` file to GitHub — it is already in `.gitignore` ✅
