import dotenv from "dotenv";
dotenv.config();

const configKeys = {
  MONGO_DB_URL: process.env.DATABASE as string,
  DB_NAME: process.env.DB_NAME as string,
  JWT_KEY: process.env.JWT_SECRET as string
};
export default configKeys;
