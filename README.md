
# To-Do Board Solution
@ Mahafujur Rahaman

## Overview

The To-Do Board Solution is a web application designed to manage tasks effectively. It features a modern drag-and-drop interface, custom components, and robust functionality for handling tasks and categories.

## Features

- **Basic Authentication**: Secure authentication for users, applying best practices for both front-end and back-end.
- **Categories**: Create and manage categories to organize tasks.
- **Tickets Management**: Create, assign, and manage tickets with properties including Title, Description, and Expiry Date.
- **Drag-and-Drop Interface**: Implemented using the HTML Drag and Drop API to allow users to move tickets between categories.
-
## Tech Stack

- **Backend**: Express.js and Node.js and Mongodb
- **Frontend**: Next.js
- **Frontend Structure**: Atomic Design with custom components

## Environment Setup

### Backend

1. **Install Dependencies**:
   ```bash
   cd backend
   npm install
   ```

2. **Environment Variables**:
   Create a `.env` file in the `backend` folder with the following variables:
   ```
    APPLICATION_NAME=TODO_AUTH_SERVER
    NODE_ENV=development
    PORT=4000
    JWT_KEY=asdfafdjllkadkfa
    JWT_TOKEN_DURATION=30d
    MONGO_DB_URI=
    FRONTEND_URL=http://localhost:3000

   ```

3. **Start the Server**:
   ```bash
   npm start
   ```

### Frontend

1. **Install Dependencies**:
   ```bash
   cd frontend
   yarn install
   ```

2. **Environment Variables**:
   Create a `.env.local` file in the `frontend` folder with the following variables:
   ```
   NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
   ```

3. **Start the Development Server**:
   ```bash
   yarn dev
   ```

## Folder Structure

- **Backend**:
    - `src/`: Contains source code for the backend.
    - `config/`: Api documentation and logger.
    - `middleware/`: Authentication and other middleware.
    - `models/`: Database models.
    - `routes/`: API endpoints.
    - `types/`: Types.
    - `utils/`: Helper functions.

- **Frontend**:
    - `src/`: Contains Nextjs pages structure.
    - `pages/`: Next.js pages.
    - `components/`: Custom components following Atomic Design principles.
    - `hooks/`: Custom React hooks.
    - `utils/`: Utility functions and constants.
    - `lib/`: External library (like:handle API requests).
    - `store/`: Store keeper for state management( for this project i used zustand)

## Authentication

- **Frontend**: Utilizes JWT for managing user sessions.Token will be set by backend.
- **Backend**: Implements JWT-based authentication with token validation.

## Drag-and-Drop Implementation

- **Drag-and-Drop**: Uses the native HTML Drag and Drop API to handle ticket movement without relying on external libraries.


## Functionality

- Focused on clean and reusable code
- Did not use many third party libraries
- Followed hook based structure for api call and moved the business logics to custom hooks.

## Project is not fully completed,remaining part:

- **Update History Tracking**: Add functionality to track and display update history for tickets.
- **Card Update History**: Show a history of card updates with timestamps. Example output could be:

    - **Card 1**: Moved to "In Progress" on Jan 25, 2022, at 16:04
    - **Card 2**: Moved to "Done" on Feb 2, 2022, at 11:04
    - **Card 1**: Moved to "For Review" on Feb 1, 2022, at 10:04
