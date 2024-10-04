# Task Manager API

## Overview
The Task Manager API is a simple RESTful API for managing tasks. It supports creating, updating, deleting, and retrieving tasks. Each task has a title, description, completion status, creation date, and priority level (low, medium, high).

## Setup Instructions
1. Clone the repository:
    ```sh
    git clone <repository-url>
    cd <repository-directory>
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Start the server:
    ```sh
    npm start
    ```

4. The API will be available at `http://localhost:3000`.

## API Endpoints

### Get All Tasks
- **URL**: `/tasks`
- **Method**: `GET`
- **Query Parameters**:
  - `completed` (optional): Filter tasks by completion status (`true` or `false`).
- **Description**: Retrieves all tasks, optionally filtered by completion status and sorted by creation date.
- **Example**:
    ```sh
    curl -X GET "http://localhost:3000/tasks?completed=true"
    ```

### Get Task by ID
- **URL**: `/tasks/:id`
- **Method**: `GET`
- **Description**: Retrieves a specific task by its ID.
- **Example**:
    ```sh
    curl -X GET "http://localhost:3000/tasks/1"
    ```

### Create a New Task
- **URL**: `/tasks`
- **Method**: `POST`
- **Body Parameters**:
  - `title` (string): The title of the task.
  - `description` (string): The description of the task.
  - `completed` (boolean): The completion status of the task.
  - `priority` (string): The priority level of the task (`low`, `medium`, `high`).
- **Description**: Creates a new task.
- **Example**:
    ```sh
    curl -X POST "http://localhost:3000/tasks" -H "Content-Type: application/json" -d '{"title":"New Task","description":"Task description","completed":false,"priority":"medium"}'
    ```

### Update a Task by ID
- **URL**: `/tasks/:id`
- **Method**: `PUT`
- **Body Parameters**:
  - `title` (string): The title of the task.
  - `description` (string): The description of the task.
  - `completed` (boolean): The completion status of the task.
  - `priority` (string): The priority level of the task (`low`, `medium`, `high`).
- **Description**: Updates a specific task by its ID.
- **Example**:
    ```sh
    curl -X PUT "http://localhost:3000/tasks/1" -H "Content-Type: application/json" -d '{"title":"Updated Task","description":"Updated description","completed":true,"priority":"high"}'
    ```

### Delete a Task by ID
- **URL**: `/tasks/:id`
- **Method**: `DELETE`
- **Description**: Deletes a specific task by its ID.
- **Example**:
    ```sh
    curl -X DELETE "http://localhost:3000/tasks/1"
    ```

### Get Tasks by Priority Level
- **URL**: `/tasks/priority/:level`
- **Method**: `GET`
- **Description**: Retrieves tasks by priority level (`low`, `medium`, `high`).
- **Example**:
    ```sh
    curl -X GET "http://localhost:3000/tasks/priority/high"
    ```