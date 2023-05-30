import dotenv from "dotenv";
dotenv.config();

const configKeys = {
  MONGO_DB_URL: process.env.DATABASE as string,
  DB_NAME: process.env.DB_NAME as string,
};
export default configKeys;
