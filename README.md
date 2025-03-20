# Social Media Analytics Microservice

## Overview
A production-grade TypeScript/Node.js microservice providing social media analytics.

## Setup
1. Clone the repository
2. Run `npm install`
3. Run `npm start`

## Endpoints
- GET `/users` - Returns top 5 users by post count
- GET `/posts?type=popular` - Returns posts with maximum comments
- GET `/posts?type=latest` - Returns 5 latest posts

## Environment Variables
- PORT: Server port (default: 3000)
- TEST_SERVER_URL: Test server URL
- REFRESH_INTERVAL: Data refresh interval in ms (default: 30000)