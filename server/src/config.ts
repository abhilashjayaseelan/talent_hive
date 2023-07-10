import dotenv from "dotenv";
dotenv.config();

const configKeys = {
  MONGO_DB_URL: process.env.DATABASE as string,
  DB_NAME: process.env.DB_NAME as string,
  JWT_KEY: process.env.JWT_SECRET as string,
  GOOGLE_CLIENT_ID:process.env.GOOGLE_CLIENT_ID as string,
  CLOUD_NAME: process.env.CLOUD_NAME as string,
  API_KEY: process.env.API_KEY as string,
  APP_SECRET: process.env.APP_SECRET as string,
  PORT: process.env.PORT as string,
  ORIGIN_PORT: process.env.ORIGIN_PORT as string,
  NODE_MAIL_USER: process.env.NODE_MAIL_USER_EMAIL as string,
  NODE_MAIL_PASS: process.env.EMAIL_PASS as string,
};
export default configKeys;
