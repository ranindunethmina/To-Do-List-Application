const mysql = require('mysql2');  // Import mysql2 library for database interaction

// Create a connection to the MySQL database
const db = mysql.createConnection({
  host: 'localhost', // The database host (local machine)
  user: 'root', // The MySQL username
  password: 'Ranindu@12', // The MySQL password (replace with your actual password)
  database: 'todo_app', // The name of the database
});

// Attempt to connect to the database and handle errors
db.connect(err => {
  if (err) {
    console.error('Database connection error:', err); // Log any connection error
    process.exit(1); // Exit the process if the connection fails
  }
  console.log('Connected to the MySQL database'); // Log success if the connection is successful
});

// Export the database connection for use in other files
module.exports = db;

// Explanation of db.js:
// mysql.createConnection(): Establishes a connection to the MySQL database.
// db.connect(): Attempts to connect to the database, and logs an error message if the connection fails.
// module.exports = db: Exports the db object so it can be used in other files, like router.js, to execute queries.