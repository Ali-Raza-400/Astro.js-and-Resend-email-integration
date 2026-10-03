/// <reference types="astro/client" />

// Typed access to the environment variables this app reads via
// `import.meta.env`. Keeps src/actions/index.ts type-safe and gives
// editors autocomplete for RESEND_API_KEY / FROM_EMAIL / ADMIN_EMAIL.
interface ImportMetaEnv {
  readonly RESEND_API_KEY: string;
  readonly FROM_EMAIL: string;
  readonly ADMIN_EMAIL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
