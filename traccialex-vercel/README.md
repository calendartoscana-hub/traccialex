# TRACCIALEX — Vercel-ready website

A responsive Italian-language Next.js 15 website with an enquiry form backed by a Vercel API route and Resend.

## Run locally

Requires Node.js 20+. Run `npm install` and `npm run dev`.

## Deploy to Vercel

1. Upload the project to a GitHub repository (do not upload `.env` files).
2. Import the repository into Vercel as a Next.js project.
3. Set environment variables `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` in Vercel Project Settings → Environment Variables. `CONTACT_FROM_EMAIL` must use a domain verified with Resend.
4. Redeploy. Test the contact form with a real email.

**Important:** The form returns a clear configuration error until these variables are set; it never pretends a message was delivered. Consider CAPTCHA, rate limiting and abuse protection before paid traffic. Do not collect wallet seed phrases, passwords, or private keys.

## Mandatory before public commercial launch

- Replace placeholder contact email in `app/page.jsx` footer.
- Add actual company identity, registration, address and regulatory status, if applicable.
- Do not call the service a regulated law firm or claim legal credentials unless verified. Current homepage intentionally avoids such claims.
- Complete privacy notice, cookie policy (if using non-essential cookies), legal notice and any legally required consumer disclosures.
- Review data-processing agreements and retention periods for Resend and Vercel.
- Confirm all advertised services are actually provided and statements are substantiated.

No invented testimonials, regulatory badges, guaranteed recoveries or success percentages are included.
