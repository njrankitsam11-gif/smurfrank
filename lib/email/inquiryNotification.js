import { resend, EMAIL_FROM } from '../resend';
import { logger } from '../logger';
import { escapeHtml } from './escapeHtml';

export async function sendInquiryNotificationEmail({ topic, name, email, message }) {
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL;
  if (!resend || !adminEmail) return;

  try {
    await resend.emails.send({
      from: EMAIL_FROM,
      to: adminEmail,
      replyTo: email,
      subject: `New ${escapeHtml(topic)} inquiry from ${escapeHtml(name)}`,
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
          <h2>New inquiry</h2>
          <p><strong>Topic:</strong> ${escapeHtml(topic)}</p>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
        </div>
      `,
    });
  } catch (err) {
    logger.error('Failed to send inquiry notification email', err);
  }
}
