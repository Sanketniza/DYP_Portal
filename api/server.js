import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "../backend/utils/db.js";
import userRoute from "../backend/routes/user.route.js";
import companyRoute from "../backend/routes/company.route.js";
import jobRoute from "../backend/routes/job.route.js";
import applicationRoute from "../backend/routes/application.route.js";

// Load environment variables
dotenv.config({});

// Connect to the database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

// Dynamic CORS configuration for production and development
const frontendURL = process.env.FRONTEND_URL || 'http://localhost:5173';
console.log('Frontend URL:', frontendURL);

const corsOptions = {
    origin: frontendURL,
    credentials: true
};
app.use(cors(corsOptions));

// API routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// Health check route
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Server is healthy" });
});

// Export the Express app as a serverless function
export default app;
