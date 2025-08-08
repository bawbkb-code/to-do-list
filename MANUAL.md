# Project Manual

This document provides instructions on how to set up, run, and use this full-stack project management application.

## 1. Prerequisites

Before you begin, ensure you have the following software installed on your system:

-   **Node.js:** [Download and install Node.js](https://nodejs.org/) (which includes npm).
-   **PostgreSQL:** [Download and install PostgreSQL](https://www.postgresql.org/download/). You will also need a database and user credentials.

## 2. Backend Setup

The backend is a Node.js server that provides the API for the application.

### Step 1: Install Dependencies

Navigate to the root directory of the project in your terminal and run the following command to install the necessary packages:

```bash
npm install
```

### Step 2: Configure Environment Variables

The backend requires a connection to a PostgreSQL database. You need to provide the connection details via environment variables.

1.  Create a new file named `.env` in the root directory of the project.
2.  Copy the contents of the `.env.example` file into your new `.env` file.
3.  Modify the `DATABASE_URL` variable in your `.env` file to match your PostgreSQL database credentials. The format is:

    ```
    DATABASE_URL="postgres://USER:PASSWORD@HOST:PORT/DATABASE"
    ```

    For example:
    ```
    DATABASE_URL="postgres://postgres:mysecretpassword@localhost:5432/scrumapp"
    ```

### Step 3: Start the Backend Server

Once the dependencies are installed and the environment variables are configured, you can start the backend server with the following command:

```bash
node index.js
```

The server will start, synchronize the database tables, and begin listening on port 8000 (or the port specified in your environment).

## 3. Frontend Setup

The frontend is a React application that provides the user interface.

### Step 1: Install Dependencies

Navigate to the `client` directory from the project root and run the following command to install the frontend dependencies:

```bash
npm install --prefix client
```
*Note: Due to an environment issue, the frontend dependencies may not be saved to `client/package.json`. If you encounter issues, you may need to run `npm install --prefix client <package_name>` for any missing packages.*

### Step 2: Start the Frontend Development Server

Once the dependencies are installed, you can start the React development server with the following command from the project root:

```bash
npm start --prefix client
```

This will open the application in your default web browser, usually at `http://localhost:3000`. The application will automatically reload when you make changes to the frontend code.

## 4. How to Use the Application

Once both the backend and frontend servers are running, you can use the application as follows:

### Step 1: Register and Login

1.  Navigate to the application in your browser.
2.  You will be redirected to the `/login` page.
3.  If you are a new user, click the "Register" link.
4.  Fill in your desired username and password and click "Register".
5.  You will be redirected to the login page.
6.  Log in with your new credentials.

### Step 2: Create and Select a Project

1.  After logging in, you will be taken to the **Projects** page.
2.  Use the form to create a new project by giving it a name and an optional description.
3.  Your new project will appear in the "Your Projects" list.
4.  Click on a project's name to navigate to its **Sprints** page.

### Step 3: Plan Sprints

1.  On the **Sprints** page, you will see a view with two main sections: "Sprints" on the left and "Product Backlog" on the right.
2.  You can create new sprints using the "Create New Sprint" form.
3.  You can create new tasks in the backlog using the form on the right (Note: Task creation in the backlog is a planned feature). For now, all new tasks are created in the backlog.
4.  To plan a sprint, **drag a task** from the "Product Backlog" section and **drop it** onto the desired sprint in the "All Sprints" section. The task will now be assigned to that sprint.

### Step 4: Use the Kanban Board

1.  From the **Sprints** page, click the "View Board" link on any sprint to go to its Kanban board.
2.  The Kanban board will show all the tasks for that specific sprint, organized by status ("To Do", "In Progress", "Done").
3.  You can **drag and drop** tasks between the columns to update their status. The change will be saved automatically.
