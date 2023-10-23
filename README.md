#Node.js Justify App
This Node.js application provides two API routes: api/token and api/justify, along with a caching system to manage the issuance of tokens and word count limitations for text justification.

##Routes
###api/token
This route is used to retrieve a token via a POST request. The request body should be in JSON format:

{
  "email": "your email"
}

Upon providing a valid email, the server will respond with an access token.

###api/justify
This route allows users to send POST requests with a contentType of text. The request should have the following headers:

Authorization: This header should contain the token received from the api/token route.
Content-Type: Set to text/plain.
The body of the request should contain the text you want to get justified. The server will return the justified text.

##Caching System
The app includes a caching system to control token issuance and manage word count limitations. Users are restricted to obtaining one token per day, and the text justification is limited to 80,000 words per day.

##Getting Started
Clone this repository.

Install the required dependencies using the following command:

npm install

Start the application in development mode using:

npm run dev
or in production mode using:

npm start

##Dependencies
express - Fast, unopinionated, minimalist web framework for Node.js.
body-parser - Node.js body parsing middleware.
cors - Middleware for enabling Cross-Origin Resource Sharing.
jsonwebtoken - JSON Web Token (JWT) implementation for Node.js.
node-cache - A simple in-memory caching module for Node.js.
nodemon - Utility that monitors for changes and automatically restarts the server.
