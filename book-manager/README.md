# Book Manager

A simple app to keep track of the books you want to read, are currently
reading, and have finished. Built with Next.js, MongoDB, and Tailwind CSS.

## Features

- Sign up and log in with email and password
- Add, edit, and delete books
- Tag books and filter by status or tag
- Stats overview (total, want to read, reading, completed)
- Passwords hashed with bcrypt, sessions via httpOnly JWT cookies

## Tech Stack

- Next.js (App Router)
- MongoDB + Mongoose
- Tailwind CSS
- Zod (validation), react-hook-form
- bcryptjs, jsonwebtoken

## Getting Started

1. Create a MongoDB database (local or Atlas).
2. Copy `.env.local.example` to `.env.local` and fill in your connection
   string and a JWT secret:

   ```
   MONGODB_URI=mongodb://...
   JWT_SECRET=<a long random string>
   ```

3. Install dependencies and run:

   ```bash
   npm install
   npm run dev
   ```

4. Open http://localhost:3000.

## Project Structure

```
app/
  api/          API routes (auth + books)
  dashboard/    Dashboard page
  login/        Login page
  signup/       Signup page
components/     UI components (book cards, form, filters, etc.)
lib/db.js       MongoDB connection (cached)
models/         Mongoose models
utils/          Auth helpers + shared constants
```
