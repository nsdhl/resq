export { };

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JWT_SECRET: string;
      EXPIRES_IN: string;
      PORT: string;
      MONGO_URL: string;
      VAPID_PUBLIC_KEY: string;
      VAPID_PRIVATE_KEY: string;
    }
  }
}

