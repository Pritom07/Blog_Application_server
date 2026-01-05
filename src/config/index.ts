import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export const config = {
  port: process.env.PORT,
  APP_URL: process.env.APP_URL,
  APP_USER: process.env.APP_USER,
  APP_PASS: process.env.APP_PASS,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  SEED_ADMIN_NAME: process.env.SEED_ADMIN_NAME,
  SEED_ADMIN_EMAIL: process.env.SEED_ADMIN_EMAIL,
  SEED_ADMIN_PASS: process.env.SEED_ADMIN_PASS,
  SEED_ADMIN_ROLE: process.env.SEED_ADMIN_ROLE,
};
