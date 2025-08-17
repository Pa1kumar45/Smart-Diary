// Import Upstash rate limiting and Redis libraries
// Upstash = Cloud Redis service for rate limiting and caching
import{Ratelimit} from "@upstash/ratelimit"
import {Redis} from "@upstash/redis";
import dotenv from "dotenv"

// Load environment variables from .env file
// This makes UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN available
dotenv.config();

// Rate Limiting Configuration
// Purpose: Prevent abuse by limiting how many requests a user can make
// Example: Stop someone from spamming your API with 1000 requests per second

// Create a rate limiter that allows 5 requests per 20 seconds
// This object will be imported and used by rateLimiter.js middleware
const ratelimit = new Ratelimit({

    // Connect to Upstash Redis using environment variables
    // Redis.fromEnv() automatically reads UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN
    redis: Redis.fromEnv(),

    // Configure the rate limiting algorithm and limits
    // slidingWindow = Dynamic time window that slides with each request (more fair)
    // Alternative: fixedWindow = Fixed 20-second blocks (resets every 20 seconds exactly)
    // Parameters: (max_requests, time_period)
    limiter: Ratelimit.slidingWindow(100, "10 s"),
    
    // How it works: If user makes 5 requests at 0s, they must wait until 20s for next request
    // Sliding window means if 5 requests made at 5s, next allowed at 25s
});

// Export the configured rate limiter to be used in middleware/rateLimiter.js
// This allows other files to import and use: await ratelimit.limit("identifier")
export default ratelimit; 