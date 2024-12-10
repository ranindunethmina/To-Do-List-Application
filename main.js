const { app, BrowserWindow, Tray, Menu, ipcMain } = require('electron');
const path = require('path');

// Declare variables for the window and tray
let win, tray;

// Listen for the 'add-task' event from the renderer process
ipcMain.on('add-task', (event, task) => {
  // Send the updated task list back to the renderer
  event.sender.send('task-list-updated', task);
});

// Create the main application window
function createWindow() {
  win = new BrowserWindow({
    width: 800, // Window width
    height: 600, // Window height
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // Path to preload script
      contextIsolation: true, // Security feature to isolate JavaScript context
    },
    icon: path.join(__dirname, 'assets', 'todo_app_icon.jpg'), // Window icon
    show: false, // Initially hide the window
  });

  // Load the main HTML file when the window is ready
  win.loadFile(path.join(__dirname, 'public', 'index.html')).catch(err => {
    console.error('Failed to load index.html:', err); // Log any errors loading the HTML file
  });

  // Once the window is ready to show, display it
  win.once('ready-to-show', () => win.show());
  
  // Handle window close event - hide window instead of quitting the app
  win.on('close', event => {
    if (!app.isQuiting) { // Check if the app is being quit
      event.preventDefault(); // Prevent default close action
      win.hide(); // Hide the window
    }
    return false; // Prevent actual window close
  });
}

// Create the system tray icon and context menu
function createTray() {
  const iconPath = path.join(__dirname, 'assets', 'todo_app_icon.jpg'); // Path to tray icon
  tray = new Tray(iconPath); // Create a new tray icon

  const contextMenu = Menu.buildFromTemplate([
    { label: 'Open ToDo List', click: () => win.show() }, // Menu item to show the window
    { label: 'Quit', click: () => app.quit() }, // Menu item to quit the app
  ]);

  tray.setToolTip('ToDo List Application'); // Set the tray icon's tooltip
  tray.setContextMenu(contextMenu); // Set the context menu for the tray icon
  
  // Toggle window visibility when the tray icon is clicked
  tray.on('click', () => win.isVisible() ? win.hide() : win.show());
}

// Initialize the app once it is ready
app.whenReady().then(() => {
  createWindow(); // Create the main window
  createTray(); // Create the system tray icon

  // Recreate the window if it's closed and the app is activated (macOS specific)
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Close the app when all windows are closed (for non-macOS platforms)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Explanation of main.js:
// ipcMain.on('add-task', ...): This listens for an event from the renderer process (the front-end of the Electron app). When the event add-task is triggered, it sends the updated task list back to the renderer via event.sender.send.

// createWindow(): This function creates a new browser window using BrowserWindow and loads the HTML file for the ToDo app. The window is initially hidden and only shown when it's ready.

// createTray(): This function creates a system tray icon with a right-click menu. It allows the user to either show the window or quit the application.

// Event Handling for Close: Instead of closing the app completely when the window is closed, the app hides the window and keeps running in the background (often used in tray applications).