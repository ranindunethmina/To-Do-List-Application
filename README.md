# To-Do List Application

A powerful and user-friendly To-Do List desktop application built using **Electron.js** for the front-end and **Node.js** for the backend. This application allows you to create tasks, set deadlines, manage subtasks, and track progress seamlessly.

## Features

- Add new tasks with descriptions and deadlines.
- Manage subtasks under a task.
- Mark tasks and subtasks as completed or pending.
- Delete tasks and subtasks.
- View a list of all tasks with their statuses and deadlines.
- Electron.js-based desktop application with a clean interface.

## Technologies Used

### Frontend
- **Electron.js**: For building cross-platform desktop applications.
- **HTML, CSS, JavaScript**: For UI and functionality.

### Backend
- **Node.js**: For handling API requests.
- **Express.js**: A lightweight Node.js framework for RESTful APIs.

### Database
- **In-memory storage**: Temporary storage for tasks.
- **Optional**: Connect to a persistent database like MongoDB or SQLite.

---

## Getting Started

### Prerequisites

To run the application, ensure you have the following installed:

- **Node.js** (v14 or later)
- **npm** (Node Package Manager)
- **Electron** (installed via npm)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/to-do-list-application.git
    cd to-do-list-application
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Start the application:

    ```bash
    npm run dev
    ```

This will start the backend server on `http://localhost:5500` and launch the Electron desktop application.

---

## Application Structure

```plaintext
├── assets/                # Icons, screenshots, and other assets
├── server/                # Backend files
│   ├── server.js          # Entry point for the Node.js server
│   └── routes.js          # API routes for tasks and subtasks
├── src/                   # Frontend source files
│   ├── main.js            # Electron's main process
│   ├── preload.js         # Secure communication with renderer
│   ├── index.html         # Main HTML file
│   ├── style.css          # Application styles
│   └── script.js          # Frontend JavaScript
├── package.json           # Project metadata and scripts
└── README.md              # Documentation (this file)
```

---

## API Endpoints

The backend exposes the following RESTful API endpoints:

### Task Management

1. **Fetch All Tasks**
   - **`GET /tasks`**
   - Fetch all tasks with their details (including subtasks).

2. **Create a New Task**
   - **`POST /tasks`**
   - Request body:
     ```json
     {
       "description": "Task description",
       "deadline": "YYYY-MM-DD"
     }
     ```

3. **Update a Task**
   - **`PUT /tasks/:taskId`**
   - Update a task's details or mark it as completed.
   - Request body:
     ```json
     {
       "completed": true
     }
     ```

4. **Delete a Task**
   - **`DELETE /tasks/:taskId`**

### Subtask Management

1. **Add a Subtask**
   - **`POST /tasks/:taskId/subtasks`**
   - Request body:
     ```json
     {
       "description": "Subtask description"
     }
     ```

2. **Update a Subtask**
   - **`PUT /tasks/:taskId/subtasks/:subtaskId`**
   - Request body:
     ```json
     {
       "completed": true
     }
     ```

3. **Delete a Subtask**
   - **`DELETE /tasks/:taskId/subtasks/:subtaskId`**

---

## Scripts

The following npm scripts are available:

- **`npm run dev`**: Start the backend and launch the Electron application in development mode.
- **`npm start`**: Launch the Electron application (only the frontend, assumes the backend is running).
- **`npm run server`**: Start the Node.js backend server.

---

## Contribution Guidelines

We welcome contributions to improve the application! Follow these steps to contribute:

1. Fork the repository.
2. Create a new branch:
    ```bash
    git checkout -b feature-name
    ```
3. Commit your changes:
    ```bash
    git commit -m "Add your message here"
    ```
4. Push the branch:
    ```bash
    git push origin feature-name
    ```
5. Open a pull request on GitHub.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

## Contact

For questions or feedback, please reach out:

- **Name**: Ranindu Nethmina
- **Email**: ranindunethmina@gmail.com
- **GitHub**: [ranindunethmina](https://github.com/ranindunethmina)
