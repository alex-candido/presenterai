# System Architecture

This document describes the high-level architecture of the `presenterai` system, broken down by its main components and data flow.

### Group 1: Frontend (Client-Side)

*   **Description:** The user-facing application, built as a single-page application using Next.js.
*   **Components:**
    *   `Components (React/shadcn/ui)`: The UI is built with React and the shadcn/ui component library.
    *   `Styling (Tailwind CSS)`: Utility-first CSS framework for styling.
    *   `Data Fetching (React Query)`: Manages server state, caching, and data fetching.
    *   `Requests (Axios)`: The HTTP client used to make requests to the backend API.

### Group 2: Backend (Server-Side)

*   **Description:** The server-side logic, built using Next.js API Routes.
*   **Components:**
    *   `API Routes`: Endpoints for all backend functionality.
    *   `Authentication (Next-Auth)`: Handles user authentication and session management.
    *   `Validation (Zod)`: Ensures data integrity by validating schemas.
    *   `ORM (Prisma)`: The Object-Relational Mapper for database access.

### Group 3: AI Services

*   **Description:** The layer responsible for content generation.
*   **Components:**
    *   `Mastra (Orchestrator)`: An internal library to manage and orchestrate AI workflows.
    *   `Google Generative AI (Gemini)`: The underlying large language model used for generation tasks.

### Group 4: Database

*   **Description:** The primary data store for the application.
*   **Component:**
    *   `PostgreSQL`: A relational database (hosted on Supabase/Neon) for storing all application data (users, documents, etc.).

### Group 5: Infrastructure

*   **Description:** The cloud services used for hosting and deployment.
*   **Component:**
    *   `Vercel`: The platform for deploying and hosting the Next.js application.

### Data Flow

*   The user interacts with the **Frontend**, which sends **Requests** to the **Backend API Routes**.
*   The **API Routes** use **Next-Auth** for protection, **Zod** for validation, and **Prisma** to communicate with the **Database**.
*   For AI tasks, the **API Routes** call the **Mastra Orchestrator**, which in turn uses **Google Generative AI**.
*   The entire application is hosted and deployed via **Vercel**.