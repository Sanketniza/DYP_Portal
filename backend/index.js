import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

dotenv.config({});

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions = {
    origin: process.env.NODE_ENV === 'production' 
        ? ['https://your-frontend-domain.vercel.app', 'https://dyp-portal.vercel.app']
        : 'http://localhost:5173',
    credentials: true
}

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

// Health check route for Vercel
app.get("/", (req, res) => {
    res.json({ message: "DYP Portal Backend API is running!" });
});

app.get("/api", (req, res) => {
    res.json({ message: "DYP Portal API is working!" });
});

// api's
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);



// For Vercel deployment
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        connectDB();
        console.log(`Server running at port ${PORT}`);
    });
} else {
    connectDB();
}

// Export for Vercel
export default app;