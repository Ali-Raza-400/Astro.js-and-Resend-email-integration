// Builds the HTML for the "you're on the list" confirmation email that is
// sent to whoever just signed up for the InkBinder™ Protocol waitlist.
// Email clients don't load external stylesheets reliably, so every style
// here is inlined on the element itself.

export interface ConfirmationEmailProps {
  name: string;
  roleLabel: string;
}

export function renderConfirmationEmail({ name, roleLabel }: ConfirmationEmailProps): string {
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>You're on the RegMedInk launch list</title>
  </head>
  <body style="margin:0; padding:0; background-color:#0b0b10; font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0b0b10; padding:40px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px; background-color:#121218; border:1px solid #2a2a33; border-radius:12px; overflow:hidden;">
            <!-- Brand header -->
            <tr>
              <td style="padding:32px 32px 16px 32px; text-align:center;">
                <span style="display:inline-block; font-size:13px; letter-spacing:3px; text-transform:uppercase; color:#d4af6a; font-weight:600;">
                  RegMedInk
                </span>
                <div style="height:1px; background-color:#2a2a33; margin-top:16px;"></div>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:8px 32px 32px 32px;">
                <h1 style="margin:0 0 16px 0; color:#ffffff; font-size:24px; line-height:1.3; font-weight:700;">
                  You're on the list, ${escapeHtml(name)}.
                </h1>
                <p style="margin:0 0 16px 0; color:#c7c7cf; font-size:15px; line-height:1.6;">
                  Thank you for joining the RegMedInk launch waitlist as a
                  <strong style="color:#e4c583;">${escapeHtml(roleLabel)}</strong>.
                  You'll be among the first to hear when the
                  <strong style="color:#ffffff;">InkBinder&trade; Protocol</strong>
                  officially launches &mdash; including early access details and
                  launch-day pricing.
                </p>
                <p style="margin:0 0 24px 0; color:#c7c7cf; font-size:15px; line-height:1.6;">
                  We built InkBinder&trade; to give studios, artists, and clients a
                  single, clinically-minded aftercare protocol they can trust.
                  We're glad to have you with us before day one.
                </p>
                <table role="presentation" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="background-color:#ffffff; border-radius:8px;">
                      <a
                        href="https://regmedink.com"
                        style="display:inline-block; padding:12px 24px; color:#0b0b10; font-size:14px; font-weight:700; text-decoration:none;"
                        >Visit RegMedInk</a
                      >
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:24px 32px; border-top:1px solid #2a2a33;">
                <p style="margin:0; color:#6b6b76; font-size:12px; line-height:1.5;">
                  RegMedInk &middot; InkBinder&trade; Protocol &middot; This is a
                  demo email sent via Resend for regmedink.com.
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

// Minimal HTML-escaping so user-submitted name/role text can't break the
// markup or inject tags into the rendered email.
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
