import express, { Router } from "express";
// import serverless from "serverless-http";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import {  registerRouter } from "../src/routes/registerRouter";
import { loginRouter } from "../src/routes/loginRouter";
import {v2 as cloudinary} from "cloudinary";
import { addHeroImageRouter } from "./routes/addHeroImageRouter";
import serverless from "serverless-http";
const MONGODB_URL="mongodb+srv://mzainmumtaz99_db_user:dyt5kZSNRjq2x9Yl@cluster0.245yfua.mongodb.net/"
// dyt5kZSNRjq2x9Yl


const app = express();
app.use(express.json());
// const router = Router();

mongoose
  .connect(MONGODB_URL)
  .then(() => console.log("Database connected successfully"))
  .catch(error => {
    console.error("Database connection error:", error);
    // Continue execution even if DB connection fails
  });

// Middleware
const allowedOrigins = [
  "https://rivagehotelnathiagali.vercel.app",
  "http://localhost:3000"
];
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
// https://rivagehotelnathiagali.vercel.app/
// app.use(
//   cors({
//     origin: process.env.FRONTEND_URLNETLIFY  ||  "http://localhost:5173",
//     credentials: true,
//   })
// );
// const router = Router();
// Cloudinary config

cloudinary.config({ 
  cloud_name: "zainmughal999", 
  api_key:"744766614756274", 
  api_secret: "F5uKFc-wILFbT2CW44eUJzDV8o8"
});
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/v1", registerRouter);
app.use("/v2", loginRouter);
app.use("/v3", addHeroImageRouter);

// router.use("/v1", registerRouter);
// router.use("/v2", loginRouter);
// app.use("/.netlify/functions/api", router);


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Export the serverless handler
// const handler = serverless(app);
// console.log("handler",handler);
// export { handler };

// mzainmumtaz99
// P8YtfI7Uvtj64vuv