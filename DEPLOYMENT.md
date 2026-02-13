# 🚀 Free Deployment Guide

This guide will walk you through deploying your **Algorithmic Visualizer** for free using **Vercel** (Frontend/API) and **MongoDB Atlas** (Database).

## Prerequisites

1.  **GitHub Account**: To host your code.
2.  **Vercel Account**: Sign up at [vercel.com](https://vercel.com) using your GitHub account.
3.  **MongoDB Atlas Account**: Sign up at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas).

---

## Step 1: Push Code to GitHub

1.  Initialize git if you haven't already:
    ```bash
    git init
    git add .
    git commit -m "Initial commit"
    ```
2.  Create a new repository on GitHub (e.g., `dsa-visualizer`).
3.  Link and push your local code:
    ```bash
    git remote add origin https://github.com/YOUR_USERNAME/dsa-visualizer.git
    git branch -M main
    git push -u origin main
    ```

---

## Step 2: Set up MongoDB Atlas (Free Database)

Since your app uses authentication, you need a live database.

1.  **Create a Cluster**: Log in to MongoDB Atlas and build a **Shared Cluster (Free Tier)**.
2.  **Create a User**: In "Database Access", create a new database user (e.g., `admin`) with a password. **Write this password down.**
3.  **Network Access**: In "Network Access", click "Add IP Address" and select **"Allow Access from Anywhere" (0.0.0.0/0)**. This allows Vercel to connect to your DB.
4.  **Get Connection String**:
    *   Click "Connect" -> "Drivers".
    *   Copy the connection string (it looks like `mongodb+srv://admin:<password>@cluster0.mongodb.net/?retryWrites=true&w=majority`).
    *   Replace `<password>` with your actual password.

---

## Step 3: Deploy to Vercel

1.  **Import Project**:
    *   Go to your Vercel Dashboard.
    *   Click **"Add New..."** -> **"Project"**.
    *   Import your `dsa-visualizer` repository from GitHub.

2.  **Configure Project**:
    *   **Framework Preset**: Next.js (should be auto-detected).
    *   **Root Directory**: `./` (default).

3.  **Environment Variables (Crucial!)**:
    Expand the "Environment Variables" section and add the following:

    | Name | Value |
    | :--- | :--- |
    | `MONGODB_URI` | Your MongoDB Connection String from Step 2. |
    | `NEXTAUTH_SECRET` | A long random string (e.g., run `openssl rand -base64 32` in terminal or mash your keyboard). |
    | `NEXTAUTH_URL` | leave this **EMPTY** or set to your Vercel URL (e.g. `https://your-project.vercel.app`) after deployment. *Vercel usually handles this automatically for NextAuth v5.* |

4.  **Deploy**:
    *   Click **"Deploy"**.
    *   Wait for build to complete (about 1-2 minutes).

---

## Step 4: Final Check

1.  Once deployed, Vercel will give you a domain (e.g., `dsa-visualizer-custom.vercel.app`).
2.  Visit the link.
3.  **Test Login**: Try to Sign Up or use Guest Mode. If it works, your Database connection is successful!

## Troubleshooting

-   **500 Error on Login**: Usually means `MONGODB_URI` is wrong or IP Access in MongoDB Atlas is not set to allow anywhere (0.0.0.0/0).
-   **Crypto Error**: Ensure you are using the latest version of the code where we fixed the Edge Runtime compatibility in `middleware.ts`.

**Enjoy your live site! 🌍**

## 🛑 Still getting an error?

If you see an error after deployment (like "500 Internal Server Error"), follow these steps to find the exact cause:

1.  **Check Vercel Logs**:
    *   Go to your Vercel Dashboard -> Project -> **Logs** tab.
    *   Look for red error messages.
    *   Common errors:
        *   `MongooseServerSelectionError`: Your IP Whitelist in MongoDB Atlas covers only your local IP. **Fix**: Set it to `0.0.0.0/0`.
        *   `Missing environment variable`: You forgot to add `MONGODB_URI` or `NEXTAUTH_SECRET` in Vercel Settings.

2.  **Check Environment Variables**:
    *   Go to Vercel Project Settings -> **Environment Variables**.
    *   Ensure `MONGODB_URI` is exactly the same as your `.env` file (but with the real password).
    *   Ensure `NEXTAUTH_URL` is set to your Vercel domain (e.g., `https://dsa-visualizer.vercel.app`) OR removed (NextAuth v5 often works without it).
