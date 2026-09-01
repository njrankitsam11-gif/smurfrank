import { resend, EMAIL_FROM } from '../resend';
import { logger } from '../logger';
import { escapeHtml } from './escapeHtml';

export async function sendOrderConfirmationEmail({ to, orders }) {
  if (!resend || !to || !orders?.length) return;

  const total = orders.reduce((sum, o) => sum + o.itemPrice * o.quantity, 0);
  const rows = orders
    .map(
      (o) => `
        <tr>
          <td style="padding:8px 0;">${escapeHtml(o.itemTitle)}</td>
          <td style="padding:8px 0; text-align:right;">x${o.quantity}</td>
          <td style="padding:8px 0; text-align:right;">$${o.itemPrice.toFixed(2)}</td>
        </tr>`
    )
    .join('');

  try {
    await resend.emails.send({
      from: EMAIL_FROM,
      to,
      subject: `Order confirmed — SmurfRank`,
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
          <h2>Thanks for your order!</h2>
          <table style="width:100%; border-collapse:collapse;">
            ${rows}
          </table>
          <p style="margin-top:16px; font-weight:bold;">Total: $${total.toFixed(2)}</p>
        </div>
      `,
    });
  } catch (err) {
    logger.error('Failed to send order confirmation email', err);
  }
}
