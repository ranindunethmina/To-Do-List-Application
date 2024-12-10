const { contextBridge, ipcRenderer } = require('electron');

// Expose a set of secure functions to the renderer process
contextBridge.exposeInMainWorld('electronAPI', {
  // Listen for the 'task-list-updated' event from the main process and call the callback function
  onTaskListUpdated: (callback) => ipcRenderer.on('task-list-updated', (event, tasks) => callback(tasks)),
  
  // Send an 'add-task' event to the main process with the task data
  addTask: (task) => ipcRenderer.send('add-task', task),
});

// Explanation of preload.js:
// contextBridge.exposeInMainWorld: This safely exposes a set of functions to the renderer (the front-end) so that it can communicate with the main process without direct access to Node.js or Electron’s APIs, improving security.

// onTaskListUpdated: This function listens for the task-list-updated event from the main process and calls the provided callback with the updated task list. This allows the renderer to react to task changes.

// addTask: This function sends a task to the main process when a new task is added. It triggers the add-task event, which is then handled by the ipcMain.on('add-task', ...) listener in the main process.