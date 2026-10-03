// Builds the HTML for the internal notification email sent to the admin
// inbox every time someone joins the waitlist. Simple dark-themed table
// layout so the signup details are easy to scan at a glance.

export interface AdminNotifyEmailProps {
  name: string;
  email: string;
  roleLabel: string;
  timestamp: string;
}

export function renderAdminNotifyEmail({
  name,
  email,
  roleLabel,
  timestamp,
}: AdminNotifyEmailProps): string {
  const rows: Array<[string, string]> = [
    ['Name', name],
    ['Email', email],
    ['Role', roleLabel],
    ['Signed up at', timestamp],
  ];

  const tableRows = rows
    .map(
      ([label, value], index) => `
                  <tr>
                    <td style="padding:12px 16px; border-top:${index === 0 ? 'none' : '1px solid #2a2a33'}; color:#8a8a94; font-size:13px; font-weight:600; width:140px; vertical-align:top;">
                      ${escapeHtml(label)}
                    </td>
                    <td style="padding:12px 16px; border-top:${index === 0 ? 'none' : '1px solid #2a2a33'}; color:#ffffff; font-size:14px; vertical-align:top;">
                      ${escapeHtml(value)}
                    </td>
                  </tr>`
    )
    .join('');

  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>New Waitlist Signup</title>
  </head>
  <body style="margin:0; padding:0; background-color:#0b0b10; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0b0b10; padding:40px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px; background-color:#121218; border:1px solid #2a2a33; border-radius:12px; overflow:hidden;">
            <tr>
              <td style="padding:28px 32px; border-bottom:1px solid #2a2a33;">
                <span style="display:inline-block; font-size:12px; letter-spacing:3px; text-transform:uppercase; color:#d4af6a; font-weight:600;">
                  RegMedInk &middot; Internal Notice
                </span>
                <h1 style="margin:12px 0 0 0; color:#ffffff; font-size:20px; font-weight:700;">
                  New Waitlist Signup
                </h1>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 16px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                  ${tableRows}
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px; border-top:1px solid #2a2a33;">
                <p style="margin:0; color:#6b6b76; font-size:12px; line-height:1.5;">
                  Sent automatically by the RegMedInk waitlist form via Resend.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`.trim();
}

// Minimal HTML-escaping so user-submitted form values can't break the
// markup or inject tags into the rendered email.
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
