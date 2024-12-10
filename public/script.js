// Base URL of the backend API where requests will be made
const BASE_URL = 'http://localhost:5500';

// Function to load all tasks from the server
async function loadTasks() {
  try {
    // Send GET request to fetch all tasks from the backend
    const response = await fetch(`${BASE_URL}/tasks`);
    // Convert the response to JSON (tasks data)
    const tasks = await response.json();
    
    // Get the element to display the task list
    const taskList = document.getElementById('taskList');
    
    // Clear the current task list and populate it with tasks from the database
    taskList.innerHTML = tasks.map(task => `
      <li class="task ${task.completed ? 'completed' : ''}">
        <!-- Checkbox to mark task as completed -->
        <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="updateTask(${task.id}, this.checked)" />
        <!-- Task description and deadline display -->
        <span>${task.description} - Due: ${task.deadline || 'No Deadline'}</span>
        <!-- Delete button for the task -->
        <button class="delete-btn" onclick="deleteTask(${task.id})">🗑️</button>
      </li>
    `).join('');
  } catch (error) {
    // If an error occurs while fetching tasks, log the error and alert the user
    console.error('Error loading tasks:', error);
    alert('Failed to load tasks.');
  }
}

// Function to update the task's completion status (checked/unchecked)
async function updateTask(id, completed) {
  try {
    // Send PUT request to update task completion status in the database
    await fetch(`${BASE_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed })  // Send the updated completion status
    });
    // Reload the tasks after updating
    loadTasks();
  } catch (error) {
    // If an error occurs while updating the task, log the error and alert the user
    console.error('Error updating task:', error);
    alert('Failed to update task.');
  }
}

// Function to delete a task
async function deleteTask(id) {
  try {
    // Send DELETE request to remove the task from the database
    await fetch(`${BASE_URL}/tasks/${id}`, { method: 'DELETE' });
    // Reload the tasks after deletion
    loadTasks();
  } catch (error) {
    // If an error occurs while deleting the task, log the error and alert the user
    console.error('Error deleting task:', error);
    alert('Failed to delete task.');
  }
}

// Add an event listener to the "Add Task" button to add a new task
document.getElementById('addTaskButton').addEventListener('click', async () => {
  // Get the task description and deadline from the input fields
  const description = document.getElementById('taskInput').value.trim();
  const deadline = document.getElementById('deadlineInput').value;

  // If the description is not empty, send a POST request to add the new task
  if (description) {
    try {
      // Send POST request to add the new task to the database
      await fetch(`${BASE_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description, deadline })  // Send task data (description, deadline)
      });
      // Reload the task list after adding a new task
      loadTasks();
    } catch (error) {
      // If an error occurs while adding the task, log the error and alert the user
      console.error('Error adding task:', error);
      alert('Failed to add task.');
    }
  } else {
    // Alert the user if the description is empty
    alert('Please enter a task description.');
  }
});

// Load tasks initially when the page loads
loadTasks();


// Code Explanation:
// Base URL (BASE_URL):

// This variable stores the base URL of your backend API, which is the server that handles all CRUD (Create, Read, Update, Delete) operations for tasks.
// loadTasks():

// This function fetches all the tasks from the backend by sending a GET request to /tasks endpoint.
// Once the tasks are fetched, the function updates the DOM to display the list of tasks.
// Each task is rendered with:
// A checkbox to mark it as completed or not.
// The description and deadline of the task.
// A delete button (🗑️) to remove the task.
// updateTask(id, completed):

// This function updates the completion status of a task.
// It sends a PUT request to the /tasks/:id endpoint with the updated completed status.
// After updating the task, it calls loadTasks() to refresh the task list.
// deleteTask(id):

// This function removes a task from the database.
// It sends a DELETE request to the /tasks/:id endpoint to delete the task with the specified ID.
// Once the task is deleted, it reloads the task list using loadTasks().
// Add Task Button:

// The addTaskButton triggers the addition of a new task when clicked.
// The function retrieves the description and deadline values entered by the user and sends them in a POST request to the backend (/tasks).
// If the description is empty, it alerts the user to enter a task description.
// After successfully adding the task, the task list is reloaded.
// Initial Task Load:

// loadTasks() is called at the bottom of the script to load the tasks from the server as soon as the page loads.