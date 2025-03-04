import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import { fileURLToPath } from 'url';
import path from 'path';
import connectDB from "./config/MongoDB.js";

// Importing Routes
import authRoutes from "./routes/auth.routes.js";
import navbarRoutes from './routes/navbar.routes.js'
import herosectionRoutes from './routes/herosection.routes.js'
import servicesRoutes from './routes/services.routes.js'
import clientsRoutes from './routes/clients.routes.js'
import recentProjectRoutes from './routes/recentprojects.routes.js'
import projectRoutes from "./routes/projects.routes.js";
import contactsectionRoutes from "./routes/contactsection.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import footerRoutes from "./routes/footer.routes.js";
import workMethodRoutes from "./routes/workmethod.routes.js";

import metadataRoutes from "./routes/metadata.routes.js";





dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Static Files (If Using File Uploads)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(cors({ 
    origin: ["http://localhost:5175", "http://localhost:5173", "https://geenenict-server.vercel.app","https://geenenict-landing-page.vercel.app","http://localhost:3000","https://geenenict-landing-page.vercel.app" ], 
    credentials: true 
  }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//routes
app.use("/api/auth", authRoutes);
app.use("/api/navbar",navbarRoutes)
app.use("/api/herosection",herosectionRoutes)
app.use("/api/services",servicesRoutes)
app.use("/api/clients",clientsRoutes)
app.use("/api/project-section",recentProjectRoutes)
app.use("/api/projects",projectRoutes)
app.use("/api/contact-section",contactsectionRoutes)
app.use("/api/contact", contactRoutes);
app.use("/api/footer", footerRoutes);
app.use("/api/workmethod", workMethodRoutes);
app.use("/api/metadata", metadataRoutes); 





connectDB()

  app.listen(process.env.PORT,()=>{
    console.log(`server is running at port ${process.env.PORT}`)
  })

export default app;
