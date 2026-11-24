/// <reference types="astro/client" />

interface ImportMetaEnv {
  /** Web3Forms access key, injected at build time (GitHub secret WEB3FORMS_KEY). */
  readonly PUBLIC_WEB3FORMS_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module '*.svg?raw' {
  const content: string;
  export default content;
}
