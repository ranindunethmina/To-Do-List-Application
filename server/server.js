const express = require('express');  // Import Express library
const cors = require('cors');  // Import CORS middleware to handle cross-origin requests
const bodyParser = require('body-parser');  // Import body-parser to parse incoming request bodies
const path = require('path');  // Import path module to work with file paths
const routes = require('./routes');  // Import the routes from router.js

const app = express();  // Create an instance of the Express app
const PORT = 5500;  // Set the server's port number

app.use(cors());  // Enable CORS for all routes (allow cross-origin requests)
app.use(bodyParser.json());  // Parse incoming JSON bodies
app.use(express.static(path.join(__dirname, '../public')));  // Serve static files (like the front-end)
app.use('/', routes);  // Use the routes defined in router.js

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);  // Log server start message
});

// Explanation of server.js:
// CORS: Allows the client-side app (usually running on a different port during development) to make requests to this server.
// Body Parser: This middleware helps parse incoming JSON data in the request body.
// Static Files: The express.static middleware is used to serve static files, like HTML, CSS, and JavaScript files.
// Routing: The app uses the routes from router.js to handle different HTTP requests.
// Start Server: The server listens on port 5500, and once it starts, it logs a message to the console.