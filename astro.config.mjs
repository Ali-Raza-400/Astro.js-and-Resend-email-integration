// Astro configuration: enables server-side rendering (required for Astro
// Actions to run the Resend email logic) and wires up Tailwind CSS.
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import node from '@astrojs/node';

export default defineConfig({
  // SSR is required because the waitlist form submits to an Astro Action
  // that runs server-side code (sending email via Resend).
  output: 'server',
  adapter: node({
    mode: 'standalone',
  }),
  integrations: [tailwind()],
});
