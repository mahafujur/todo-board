
# To-Do Board Solution
@ Mahafujur Rahaman

## Overview

The To-Do Board Solution is a web application designed to manage tasks effectively. It features a modern drag-and-drop interface, custom components, and robust functionality for handling tasks and categories.

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

- **Frontend**: Utilizes JWT for managing user sessions.
- 
## Drag-and-Drop Implementation

- **Drag-and-Drop**: Uses the native HTML Drag and Drop API to handle ticket movement without relying on external libraries.

