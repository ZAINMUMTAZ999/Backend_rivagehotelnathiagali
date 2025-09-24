import express,{Router,Request, Response} from "express";
import serverless from "serverless-http";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import {v2 as cloudinary} from "cloudinary";
import { registerRouter } from "../../src/routes/registerRouter";
import { loginRouter } from "../../src/routes/loginRouter";



const router = Router();
const app = express();
app.use(express.json());
const MONGODB_URL="mongodb+srv://mzainmumtaz99_db_user:dyt5kZSNRjq2x9Yl@cluster0.245yfua.mongodb.net"

mongoose
  .connect(MONGODB_URL)
  .then(() => console.log("Database connected successfully"))
  .catch(error => {
    console.error("Database connection error:", error);
    // Continue execution even if DB connection fails
  });

// Middleware
// app.use(
//   cors({
//    origin:  "http://localhost:3000" ,
//     credentials: true,
//   })
// );
// https://rivagehotelnathiagali.vercel.app/
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
// Cloudinary config
cloudinary.config({ 
  cloud_name: "zainmughal999", 
  api_key:"744766614756274", 
  api_secret: "F5uKFc-wILFbT2CW44eUJzDV8o8"
});
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
// app.use("/v1", registerRouter);
// app.use("/v2", loginRouter);

router.use("/v1", registerRouter);
router.use("/v2", loginRouter);
// app.use("/.netlify/functions/api", router);
router.get("/data",(req:Request,resp:Response)=>{
    resp.status(200).json({message:"API WORKINg"})
})
// app.listen(8000, ()=>{
//   // if (err) console.log("Error in server setup")
//   console.log("Server listening on Port 8000");
// })
app.use("/api",router)
// Export the serverless handler
const handler = serverless(app);
console.log("handler",handler);
export { handler };

