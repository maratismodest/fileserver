export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      SERVER_DOMAIN_URL: string;
      SITE_DOMAIN_URL: string;
      JWT_PRIVATE_KEY: string;
      APP_NAME: string;
      NODE_ENV: string;
    }
  }
}
