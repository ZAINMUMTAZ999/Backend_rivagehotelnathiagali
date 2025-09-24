import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import { registerRouter } from "./routes/registerRouter";
import { loginRouter } from "./routes/loginRouter";
import { v2 as cloudinary } from "cloudinary";
import { addHeroImageRouter } from "./routes/addHeroImageRouter";

const MONGODB_URL =
  "mongodb+srv://mzainmumtaz99_db_user:dyt5kZSNRjq2x9Yl@cluster0.245yfua.mongodb.net/";

const app = express();
app.use(express.json());

mongoose
  .connect(MONGODB_URL)
  .then(() => console.log("Database connected successfully"))
  .catch((error) => {
    console.error("Database connection error:", error);
  });

app.use(
  cors({
    origin: "https://rivagehotelnathiagali.vercel.app",
    credentials: true,
  })
);

cloudinary.config({
  cloud_name: "zainmughal999",
  api_key: "744766614756274",
  api_secret: "F5uKFc-wILFbT2CW44eUJzDV8o8",
});
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/v1", registerRouter);
app.use("/v2", loginRouter);
app.use("/v3", addHeroImageRouter);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
