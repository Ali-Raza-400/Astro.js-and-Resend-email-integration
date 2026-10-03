// Astro Action for the waitlist form. Runs server-side only — this is
// where the Resend API key is read and both signup emails are sent.
import { defineAction, ActionError } from 'astro:actions';
import { z } from 'astro:schema';
import { Resend } from 'resend';
import { renderConfirmationEmail } from '../emails/confirmation';
import { renderAdminNotifyEmail } from '../emails/admin-notify';

// Human-readable labels for the role values coming from the form.
const ROLE_LABELS: Record<string, string> = {
  studio_owner: 'Studio Owner',
  tattoo_artist: 'Tattoo Artist',
  customer: 'Customer',
};

export const server = {
  joinWaitlist: defineAction({
    accept: 'form',
    input: z.object({
      // Empty form fields arrive as `null` (not `undefined`), which would
      // otherwise hit Zod's generic "Expected string, received null" type
      // error before our friendlier `.min()` message runs. Preprocess
      // coerces a missing/null value to '' so that message always wins.
      name: z.preprocess(
        (val) => val ?? '',
        z.string().trim().min(1, 'Please enter your full name.')
      ),
      email: z.preprocess(
        (val) => val ?? '',
        z
          .string()
          .trim()
          .min(1, 'Please enter your email address.')
          .email('Please enter a valid email address.')
      ),
      role: z.preprocess(
        (val) => val ?? '',
        z.enum(['studio_owner', 'tattoo_artist', 'customer'], {
          errorMap: () => ({ message: 'Please select a role.' }),
        })
      ),
    }),

    handler: async ({ name, email, role }) => {
      // The Resend API key must come from the environment only — never
      // hardcode it. Fail loudly and clearly if it's missing.
      const apiKey = import.meta.env.RESEND_API_KEY;
      if (!apiKey) {
        console.error(
          '[RegMedInk] Missing RESEND_API_KEY. Copy .env.example to .env and add your Resend API key.'
        );
        throw new ActionError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Email service is not configured (missing RESEND_API_KEY).',
        });
      }

      const fromEmail = import.meta.env.FROM_EMAIL || 'hello@regmedink.com';
      const adminEmail = import.meta.env.ADMIN_EMAIL || 'admin@regmedink.com';
      const roleLabel = ROLE_LABELS[role];
      const timestamp = new Date().toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
      });

      const resend = new Resend(apiKey);

      // Email 1: confirmation to the person who signed up.
      // Resend's SDK returns a { data, error } result rather than throwing,
      // so we check `error` explicitly instead of wrapping this in try/catch.
      const { data: confirmationData, error: confirmationError } = await resend.emails.send({
        from: fromEmail,
        to: email,
        subject: `You're on the RegMedInk launch list, ${name}!`,
        html: renderConfirmationEmail({ name, roleLabel }),
      });

      if (confirmationError) {
        console.error('[RegMedInk] Confirmation email failed:', confirmationError);
        throw new ActionError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'We could not send your confirmation email. Please try again in a moment.',
        });
      }

      console.log(
        `[RegMedInk] Confirmation email sent to ${email} (Resend id: ${confirmationData?.id})`
      );

      // Email 2: internal notification to the admin inbox.
      const { data: adminData, error: adminError } = await resend.emails.send({
        from: fromEmail,
        to: adminEmail,
        subject: `New Waitlist Signup — ${name} (${roleLabel})`,
        html: renderAdminNotifyEmail({ name, email, roleLabel, timestamp }),
      });

      if (adminError) {
        console.error('[RegMedInk] Admin notification email failed:', adminError);
        throw new ActionError({
          code: 'INTERNAL_SERVER_ERROR',
          message:
            'Your confirmation email sent, but the internal notification failed to send.',
        });
      }

      console.log(
        `[RegMedInk] Admin notification sent for ${name} <${email}> (Resend id: ${adminData?.id})`
      );

      return {
        success: true,
        message: `Thanks, ${name}! Check your inbox for a confirmation email.`,
      };
    },
  }),
};
