# 🗄️ How to Check Your Database Data

Since we are using **MongoDB**, your data lives in the cloud (MongoDB Atlas). Here is how you can view your signed-up users.

## Option 1: MongoDB Atlas (Easiest - In Browser)

1.  **Log in** to your [MongoDB Atlas Dashboard](https://cloud.mongodb.com/).
2.  Click on **Database** in the left sidebar.
3.  Click the **Browse Collections** tab (button usually next to "Connect").
4.  You will see your database structure:
    *   **Database Name**: `test` or `dsa-visualizer` (whatever was in your connection string).
    *   **Collections**: Look for `users`.
5.  Click on `users`. You will see a list of documents (JSON objects) for each registered user.

## Option 2: MongoDB Compass (Desktop App)

If you prefer a desktop application:

1.  Download and install standard **MongoDB Compass**.
2.  Open it and paste your **Connection String** (the same `MONGODB_URI` from your `.env` file).
3.  Click **Connect**.
4.  Navigate to your database -> `users` collection to see the data.

## 🔒 Important Note About Passwords

When you look at the `password` field, you will see a long, random-looking string like this:

```text
$2a$10$X7.G1... (and many more characters)
```

**This is normal and correct.** We verify user passwords using **Bcrypt hashing**.
*   We **NEVER** store plain text passwords (e.g., "123456") in the database.
*   If we did, and the database was hacked, everyone's passwords would be stolen.
*   Instead, we verify login by hashing the *input* password and comparing it to this stored hash.

**You cannot "read" the original password from the database.** You can only verify if a login matches it.


``` json
{
    "_id": ObjectId("..."),
    "username": "mohit",
    "password": "$2b$10$EpRnTzVlqQH...", // Hashed password (Unreadable)
    "createdAt": "2024-02-13T..."
}
```