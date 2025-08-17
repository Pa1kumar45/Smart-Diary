 // Rate Limiter Middleware - Prevents API abuse by limiting requests per user
// Uses Upstash (cloud Redis service) to track request counts and enforce limits
// Purpose: Stop malicious users from spamming API with too many requests

// Import rate limiting function from upstash.js config file
// This contains the configured rate limiter (10 requests per 20 seconds)
import ratelimit from "../src/config/upstash.js";
 
// Middleware function that runs BEFORE each API request reaches controllers
// Parameters: req = incoming request, res = response, next = continue to next middleware
const ratelimiter = async (req,res,next)=>{
    try{
        // Check if user has exceeded rate limit using a unique identifier
        // "my-rate-limit" = identifier key (could be IP address, user ID, etc.)
        // Upstash Redis stores: key="my-rate-limit", count=current_requests, expiry=reset_time
        const {success}= await ratelimit.limit("my-rate-limit");
     
        // If rate limit exceeded (success = false)
        if(!success){
            // Block request with 429 "Too Many Requests" HTTP status
            return res.status(429).json({
                message:"Too many requests, please try again later",
            });
        }
        
        // Rate limit OK - continue to next middleware/controller
        next();
    }catch(error){
        // If Upstash/Redis fails, log error but don't block requests (graceful degradation)
        console.log("Rate limit Error:",error);
        next(); // Continue without rate limiting if service fails
    }
};

export default ratelimiter;