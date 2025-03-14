
# Todo-Frontend

This is a React-based front-end application built with TypeScript, Vite, and modern React hooks. It interacts with the `Todo-Backend` GraphQL API, allowing users to manage tasks via a clean and interactive UI.

##  Features
-   **Task Management:** Users can:
    -   Create new tasks
    -   Update task status (completed / not completed)
    -   Edit task descriptions
    -   Delete tasks
    -   Filter tasks by status and description
-   **GraphQL API Integration:** Uses Axios to communicate with the backend.
-   **State Management:** Utilizes React hooks for efficient state handling.
-   **Request Caching:** Uses `useQuery` for automatic caching of repeated API requests.
-   **Notifications:** Displays success/error messages using `toast`.
## Setup Instructions

### **Running Locally**

1.  Clone the repository:
    
    ```sh
    git clone <repository-url>
    cd todo-frontend
    ```
    
2.  Install dependencies:
    ```sh
    npm install
    ```
3.  Set up environment variables:
    -   Copy `.env.development` and configure API URLs if necessary.
4.  Start the development server:
    ```sh
    npm run dev
    ```
### **Deployment on Vercel**

The project is deployed on Vercel. To deploy it yourself:
1.  Fork the repository.
2.  Push the code to your own GitHub repository.
3.  Import the repository into Vercel and deploy.

##  Tech Stack
-   React (TypeScript)
-   Vite
-   Axios (API requests)
-   React Hooks: `useState`, `useEffect`, `useMemo`, `useQuery`
-   Toast Notifications
