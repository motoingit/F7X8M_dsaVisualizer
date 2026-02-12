# Folder Structure Tree

```
/
├── .env                    # Environment variables (Mongo URI, Auth Secret)
├── .gitignore              # Files to ignore in Git
├── README.md               # Main project documentation
├── middleware.ts           # (DELETED - Old incorrect location)
├── next.config.mjs         # Next.js configuration
├── package.json            # Dependencies and scripts include Next.js 15
├── postcss.config.mjs      # PostCSS config for Tailwind
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript compilation options
├── public/                 # Static assets (images, fonts, icons)
│   └── favicon.ico         # App icon
└── src/                    # Source code directory
    ├── app/                # Next.js 15 App Router (Frontend)
    │   ├── algorithms/     # Dynamic algorithm pages
    │   │   ├── binary-search/page.tsx
    │   │   ├── bubble-sort/page.tsx
    │   │   ├── insertion-sort/page.tsx
    │   │   ├── linear-search/page.tsx
    │   │   ├── pathfinding/page.tsx
    │   │   └── selection-sort/page.tsx
    │   ├── api/            # Backend API routes
    │   │   ├── auth/[...nextauth]/route.ts  # NextAuth Handlers
    │   │   └── signup/route.ts              # User registration endpoint
    │   ├── auth/           # Authentication pages (Login/Signup)
    │   ├── dashboard/      # User dashboard (Algorithm list)
    │   ├── data-structures/# Structure pages (Stack, Queue, BST)
    │   ├── globals.css     # Global styles (Tailwind base)
    │   ├── layout.tsx      # Root layout (Navbar, Footer, HTML frame)
    │   └── page.tsx        # Home/Landing page with Search
    ├── auth.config.ts      # Edge-compatible Auth configuration
    ├── auth.ts             # Full Node.js Auth setup (Providers)
    ├── components/         # Reusable React components
    │   ├── HomeSearch.tsx  # Dynamic search bar component
    │   ├── Navbar.tsx      # Main navigation structure
    │   └── Visualizer/     # Core visualization logic components
    │       ├── BST.tsx
    │       ├── BinarySearch.tsx
    │       ├── BubbleSort.tsx
    │       ├── InsertionSort.tsx
    │       ├── LinearSearch.tsx
    │       ├── Pathfinding.tsx
    │       ├── Queue.tsx
    │       ├── SelectionSort.tsx
    │       └── Stack.tsx
    ├── lib/                # Utility libraries and helpers
    │   ├── mongodb.ts      # Database connection (Mongoose/MongoClient)
    │   └── pathfinding/    # Specific algorithm logic (dijkstra.ts)
    ├── middleware.ts       # Edge Runtime Middleware (Route protection)
    ├── models/             # Mongoose schemas
    │   └── User.ts         # User model definition
    └── utils/              # General helper functions (delay, etc.)
```
