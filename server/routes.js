const express = require('express');  // Import Express library
const db = require('./db');  // Import the database connection

const router = express.Router();  // Create a new router instance

// Get all tasks from the database
router.get('/tasks', (req, res) => {
  db.query('SELECT * FROM tasks', (err, results) => {
    if (err) {
      console.error('Error fetching tasks:', err); // Log any query errors
      return res.status(500).send('Error fetching tasks');  // Send 500 if error occurs
    }
    res.json(results);  // Send back the list of tasks as JSON
  });
});

// Add a new task to the database
router.post('/tasks', (req, res) => {
  const { description, deadline } = req.body;  // Extract task details from request body
  db.query('INSERT INTO tasks (description, deadline) VALUES (?,?)', [description, deadline], (err) => {
    if (err) {
      console.error('Error adding task:', err);  // Log any query errors
      return res.status(500).send('Error adding task');  // Send 500 if error occurs
    }
    res.status(201).send('Task added');  // Send success response
  });
});

// Update a task's completion status
router.put('/tasks/:id', (req, res) => {
  const { id } = req.params;  // Extract task ID from the request URL
  const { completed } = req.body;  // Extract completion status from request body
  db.query('UPDATE tasks SET completed = ? WHERE id = ?', [completed, id], (err) => {
    if (err) {
      console.error('Error updating task:', err);  // Log any query errors
      return res.status(500).send('Error updating task');  // Send 500 if error occurs
    }
    res.status(200).send('Task updated');  // Send success response
  });
});

// Delete a task from the database
router.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;  // Extract task ID from the request URL
  db.query('DELETE FROM tasks WHERE id = ?', [id], (err) => {
    if (err) {
      console.error('Error deleting task:', err);  // Log any query errors
      return res.status(500).send('Error deleting task');  // Send 500 if error occurs
    }
    res.status(204).send();  // Send success response with no content (204)
  });
});

// Export the router to be used in the server file
module.exports = router;

// Explanation of router.js:
// GET /tasks: Retrieves all tasks from the database and sends them as a JSON response.
// POST /tasks: Adds a new task to the database using the task description and deadline received in the request body.
// PUT /tasks/:id: Updates a task's completion status (checked/unchecked) by its id.
// DELETE /tasks/:id: Deletes a task from the database based on its id.
// The router.js file manages all the CRUD (Create, Read, Update, Delete) operations for the tasks in the app.