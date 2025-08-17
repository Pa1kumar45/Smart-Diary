import express from "express";
import cors from 'cors'
import dotenv from "dotenv";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import ratelimiter from "../middleware/rateLimiter.js";

//const express= require("express");

dotenv.config();

const app=express();
const PORT= process.env.PORT||5001;


//middleware
// Middleware = Functions that execute BETWEEN request and response
// They have access to req (request), res (response), and next() function

// Built-in middleware: Parses JSON from request body into JavaScript object
// Without this, req.body would be undefined when receiving JSON data
 app.use(cors({
    origin:"http://localhost:5173",
}
));
app.use(express.json());
app.use(ratelimiter);

// Custom middleware: Logs every incoming request
// What it does: Intercepts ALL requests before they reach route handlers
// Parameters: req = incoming request, res = outgoing response, next = function to continue
// Flow: Request → This middleware → Log info → next() → Route handler → Response
// Example: GET /api/notes → Logs "Request method is GET and URL is /api/notes" → Continue to getAllNotes
app.use((req,res,next)=>{
    console.log(` Request method is ${req.method} and URL is ${req.url}`);
    // next() is CRITICAL - passes control to next middleware/route handler
    // Without next(), request hangs forever (client never gets response)
    // next() = "I'm done, continue to the next function in the chain"
    next();
});

app.use("/api/notes",notesRoutes);// This routes the request to notesRoutes

// first connect to database and then listen client calls
connectDB().then(()=>{
    app.listen(PORT, ()=>{
    //app.listen(5001, ...): Starts the server and makes it listen for incoming HTTP requests on port 5001.
    console.log("server started from port :  ", PORT);
    });
}); 
 