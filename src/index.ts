import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import { registerRouter } from "./routes/registerRouter";
import { loginRouter } from "./routes/loginRouter";
import { v2 as cloudinary } from "cloudinary";
import { addHeroImageRouter } from "./routes/addHeroImageRouter";

const MONGODB_URL = process.env.MONGODB_URL as string;


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
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/v1", registerRouter);
app.use("/v2", loginRouter);
app.use("/v3", addHeroImageRouter);
app.get("/", (_req, res) => {
  res.send("✅ Backend running successfully on Railway!");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
