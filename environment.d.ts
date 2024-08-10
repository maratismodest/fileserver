export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      POSTGRES_HOST: string;
      POSTGRES_PORT: string;
      POSTGRES_USER: string;
      POSTGRES_PASSWORD: string;
      POSTGRES_DB: string;
      PORT: string;
      SERVER_DOMAIN_URL: string;
      SITE_DOMAIN_URL: string;
      NODE_ENV: string;
      JWT_PRIVATE_KEY: string;
      TELEGRAM_BOT_TOKEN: string;
      TELEGRAM_CHAT_ID: string;
      APP_NAME: string;
    }
  }
}
