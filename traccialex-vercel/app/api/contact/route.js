import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

const DEFAULT_INBOX = 'calendartoscana@gmail.com';

const escapeHtml = (s) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

const isValid = ({ name, email, type, message, consent }) =>
  consent &&
  typeof name === 'string' && name.trim().length >= 2 && name.length <= 120 &&
  typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254 &&
  typeof type === 'string' && type.length <= 150 &&
  typeof message === 'string' && message.trim().length >= 20 && message.length <= 4000;

export async function POST(req) {
  let data;
  try {
    data = await req.json();
  } catch {
    return Response.json({ error: 'Richiesta non valida.' }, { status: 400 });
  }

  if (data.website) return Response.json({ ok: true });
  if (!isValid(data)) return Response.json({ error: 'Verifica i campi e riprova.' }, { status: 400 });

  const user = process.env.GMAIL_USER || DEFAULT_INBOX;
  const pass = process.env.GMAIL_APP_PASSWORD;
  const to = process.env.CONTACT_TO_EMAIL || user;
  if (!pass) {
    return Response.json(
      { error: 'Il modulo non è ancora attivo. Configurare GMAIL_APP_PASSWORD su Vercel.' },
      { status: 503 },
    );
  }

  const { name, email, type, message } = data;
  const html = `<h2>Nuova richiesta TRACCIALEX</h2>
<p><b>Nome:</b> ${escapeHtml(name)}</p>
<p><b>Email:</b> ${escapeHtml(email)}</p>
<p><b>Tipo:</b> ${escapeHtml(type)}</p>
<p><b>Messaggio:</b><br>${escapeHtml(message).replace(/\n/g, '<br>')}</p>`;
  const text = `Nome: ${name}\nEmail: ${email}\nTipo: ${type}\n\n${message}`;

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: { user, pass: pass.replace(/\s/g, '') },
    });
    await transporter.sendMail({
      from: `"TRACCIALEX Sito" <${user}>`,
      to,
      replyTo: email,
      subject: `Nuova richiesta TRACCIALEX – ${name.trim().slice(0, 60)}`,
      text,
      html,
    });
    return Response.json({ ok: true });
  } catch (err) {
    console.error('Contact email failed:', err?.message);
    return Response.json({ error: 'Impossibile inviare la richiesta in questo momento.' }, { status: 502 });
  }
}
