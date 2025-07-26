/* import express from "express";
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
    origin:'http://localhost:5173',
    credentials:true
}

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;


// api's
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);



app.listen(PORT,()=>{
    connectDB();
    console.log(`Server running at port ${PORT}`);
}) */


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
    
    // Connect to the database immediately
    connectDB();
    
    const app = express();
    
    // Middleware
    app.use(express.json());
    app.use(express.urlencoded({extended:true}));
    app.use(cookieParser());
    
    // Dynamic CORS configuration for production and development
    const frontendURL = process.env.FRONTEND_URL || 'http://localhost:5173';
    const corsOptions = {
        origin: frontendURL,
        credentials:true
    };
    app.use(cors(corsOptions));
    
    // api's
    app.use("/api/v1/user", userRoute);
    app.use("/api/v1/company", companyRoute);
    app.use("/api/v1/job", jobRoute);
    app.use("/api/v1/application", applicationRoute);
    
    // This part is removed for Vercel deployment
    /*
    const PORT = process.env.PORT || 3000;
    app.listen(PORT,()=>{
        console.log(`Server running at port ${PORT}`);
    })
    */
    
    // Export the app for Vercel
    export default app;