import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]),
    AUTH_SECRET: z.string(),
    AUTH_SPOTIFY_ID: z.string(),
    AUTH_SPOTIFY_SECRET: z.string(),
    DATABASE_HOST: z.string(),
    DATABASE_NAME: z.string(),
    DATABASE_USER: z.string(),
    DATABASE_PASSWORD: z.string(),
    DATABASE_URL: z.string(),
  },
  experimental__runtimeEnv: {
    NOVE_ENV: process.env.NODE_ENV,
    AUTH_SECRET: process.env.AUTH_SECRET,
    AUTH_SPOTIFY_ID: process.env.AUTH_SPOTIFY_ID,
    AUTH_SPOTIFY_SECRET: process.env.AUTH_SPOTIFY_SECRET,
    DATABASE_HOST: process.env.DATABASE_HOST,
    DATABASE_NAME: process.env.DATABASE_NAME,
    DATABASE_USER: process.env.DATABASE_USER,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
    DATABASE_URL: process.env.DATABASE_URL,
  },
});
