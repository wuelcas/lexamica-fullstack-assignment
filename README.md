# Lexamica Fullstack Assignment

This is the Kanban Board assignment for Lexaminca's Fullstack Developer position.

This was developed using Node.js v22, Next.js v15 (I tried using v12 but looks like it's not available anymore) and Express v5, alongside other libraries and packages. For the DB I used MongoDB and Moongose.

## Project Structure For Backend

The `backend` directory contains the backend code. The source code of the app is in `src` directory. The `src` directory contains the models, controllers, services, validation schemas and utils, among other files.

The `scripts` directory contains the script for seeding the DB.

## Project Structure For Frontend

The `frontend` directory contains the frontend code. You'll find the typical Next.js project structure containing the pages, components, hooks, stores, api requests and utils, among other files.

## Setup

- Run `npm install` in both the frontend and backend directories.
- Create a `.env` file for both frontend and backend directories using the env.example files as a template. The template has the necessary environment variables for both frontend and backend.
- Run `npm run seed` in the backend directory to seed the DB.
- Run `npm run dev` in the backend directory to start the server.
- Run `npm run dev` in the frontend directory to start the frontend.

