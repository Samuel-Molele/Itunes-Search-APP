// Import required modules
const express = require("express");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const cors = require("cors");

// Initialize Express application
const app = express();
const port = process.env.PORT || 5000;

// Middleware setup
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON bodies

// Secret key for JWT, should be a strong secret in production
const JWT_SECRET = "your_jwt_secret"; 

// Middleware to authenticate JWT
const authenticateJWT = (req, res, next) => {
  // Extract token from Authorization header
  const token = req.header("Authorization")?.split(" ")[1];
  
  // If no token is provided, respond with 401 Unauthorized
  if (token == null) return res.sendStatus(401);

  // Verify the token using the secret key
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // If verification fails, respond with 403 Forbidden
    req.user = user; // Attach user information to the request
    next(); // Proceed to the next middleware or route handler
  });
};

// Route to search iTunes with query parameters
app.get("/api/search", async (req, res) => {
  const { term, media } = req.query; // Extract query parameters

  // If 'term' or 'media' is not provided, respond with 400 Bad Request
  if (!term || !media) {
    return res.status(400).send("Invalid query parameters");
  }

  try {
    // Make a request to iTunes Search API with the provided parameters
    const response = await axios.get("https://itunes.apple.com/search", {
      params: { term, media, limit: 5 }, // Limit the results to 5
    });
    res.json(response.data); // Send the response data to the client
  } catch (error) {
    res.status(500).send("Error retrieving data"); // Respond with 500 Internal Server Error on failure
  }
});

// Start the server only if this module is run directly (not imported)
if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

// Export the app for testing or importing in other modules
module.exports = app;
