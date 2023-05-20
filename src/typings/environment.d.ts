export {};

declare global{
    namespace NodeJS{
        interface ProcessEnv{
            JWT_SECRET: string;
            EXPIRES_IN: string;
            PORT: number;
            MONGO_URL: string;
        }
    }
}