# 📂 Folder & File Information

This document provides a detailed breakdown of the key directories and files used in the **Algorithmic Visualizer** project.

## Root Directory

- **`middleware.ts`**: The main gatekeeper for the application. It runs on the Edge Runtime.
  - **Purpose**: Protects routes by checking for authentication cookies (`__Secure-next-auth.session-token` or `guest-mode`).
  - **Logic**: Redirects unauthenticated users to `/login` and authenticated users away from `/login`. Bypasses static assets and API routes.

## `/src/app` (App Router)

The heart of the Next.js application where routing happens based on the file structure.

- **`page.tsx`**: The Home Page. Features the hero section, the main call-to-action buttons, and the `HomeSearch` component for finding algorithms quickly.
- **`layout.tsx`**: The Root Layout. Wraps every page in the application. It includes the HTML `<body>` tag, global font settings, and the `Navbar`.
- **`globals.css`**: Contains global styles, Tailwind CSS directives, and custom animations (e.g., `animate-fade-in`, custom scrollbars).

### Routes (`/src/app/...`)

- **`/algorithms/[name]/page.tsx`**: Individual pages for each algorithm (Bubble Sort, Binary Search, etc.).
  - **Structure**: Each page imports a specific Visualizer component (e.g., `<BubbleSort />`) and displays educational content (Time Complexity, Pseudocode, Explanation).
- **`/data-structures/[name]/page.tsx`**: Similar structure for data structures (Stack, Queue, BST).
- **`/dashboard/`**: The main hub for logged-in or guest users. Displays a grid of cards linking to all available algorithms and structures.
- **`/login/` & `/signup/`**: Authentication pages. Login supports both credentials (username/password) and a "Guest Mode" bypass.
- **`/about/`**: A stylized developer portfolio page.

### API Routes (`/src/app/api/...`)

- **`/auth/[...nextauth]/route.ts`**: The catch-all route for NextAuth.js. Handles login requests, session management, and callbacks.
- **`/register/route.ts` (or similar)**: Handles new user registration (creates a user document in MongoDB).

## `/src/components`

Reusable UI components.

- **`HomeSearch.tsx`**: A smart search bar component.
  - **Features**: Real-time filtering, category labels, outside click handling, and navigation.
- **`/Visualizer/*.tsx`**: The core complexity of the app lives here.
  - **`BubbleSort.tsx`**: Visualizes array swapping with color-coded bars (Green for sorted, Red for swapping).
  - **`Pathfinding.tsx`**: Interactive grid for Dijkstra's algorithm. Utilizes `mousedown`/`mouseenter` events for drawing walls.
  - **`BST.tsx`**: SVG-based visualization for Binary Search Trees.

## `/src/lib` & `/src/utils`

Backend logic and helper functions.

- **`mongodb.ts`**: Handles the connection to the MongoDB database using Mongoose. Ensures a cached connection is reused in a serverless environment like Vercel.
- **`pathfinding/dijkstra.ts`**: Pure TypeScript implementation of Dijkstra's algorithm logic (returns visited nodes in order).
- **`delay.ts`**: A simple utility function (`sleep(ms)`) used to slow down the loop execution in visualizers so users can see the sorting steps.

## `/src/auth.ts` & `auth.config.ts`

Authentication configuration split for Edge compatibility.

- **`auth.config.ts`**: Lightweight config safe for Edge Runtime (contains route definitions).
- **`auth.ts`**: Full Node.js configuration (contains `bcrypt` for password hashing and `mongoose` models).

## `/src/models`

- **`User.ts`**: Mongoose Schema defining the shape of a User document (username, password, email).
