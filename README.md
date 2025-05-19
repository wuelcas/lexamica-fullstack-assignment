# Lexamica Fullstack Assignment

This is the Kanban Board assignment for Lexaminca's Fullstack Developer position.

This was developed using [Node.js v22](https://nodejs.org/), [Next.js v15](https://nextjs.org/) (I tried using v12 but looks like it's not available anymore) and [Express v5](https://expressjs.com/), alongside other libraries and packages. For the DB I used [MongoDB](https://www.mongodb.com/) and [Moongose](https://mongoosejs.com/).

## Project Structure For Backend

The `backend` directory contains the backend code. The source code of the app is in `src` directory. The `src` directory contains the models, controllers, services, validation schemas and utils, among other files.

The `scripts` directory contains the script for seeding the DB.

## Project Structure For Frontend

The `frontend` directory contains the frontend code. You'll find the typical Next.js project structure containing the pages, components, hooks, stores, api requests and utils, among other files.

## Setup

- Run `npm install` in both the frontend and backend directories.
- Create a `.env` file for both frontend and backend directories using the `env.example` files as a template. The template has the necessary environment variables for both frontend and backend.
- Run `npm run seed` in the backend directory to seed the DB.
- Run `npm run dev` in the backend directory to start the server.
- Run `npm run dev` in the frontend directory to start the frontend.

## API documentation

The API documentation is in the `backend/openapi.yaml` file. I didn't have the time to generate the documentation using Swagger but you can load the file content in the [Swagger Editor](https://editor.swagger.io/) to view it.

## Technical decisions and trade-offs

### DB Schema

> [!IMPORTANT]
> I thought that part of the solution requested was to move Categories too. By the end I realized you didn't request that. That affected how I structured the DB since that's the first thing I did.

I used two Collections, one for Categories and one for Tasks. I started researching about existing solutions for Kanban boards but quickly realized I was going to spend a lot of time understanding how they worked and how to implement them (I never thought about this but this is very complex problem for both UI and backend), so I decided to go with what I thought was a simple solution.

First I started with an array type of solution, where I would store the tasks references in an array inside the category document. After seeing how Trello makes API calls after you move a task around I decided to go with a different approach. I ended up not using an array solution but referencing the category in the Task document and having a position field to determine the order of the tasks, same thing for the categories position field to move categories around.

I ended up having to think how to mantain integrity of the position value between tasks and categories when the user moved them around which cause a lot of complexity in the code when updating the position in both backend and frontend. I think an array type of solution might have been simpler specially if you only needed to move tasks around.

> [!NOTE]
> I tried implementing session and transactions when updating and shifting positions for both Tasks and Categories but I kept having this weird error: `ClientSession cannot be serialized to BSON`. I couldn't fix it not even with AI. Even AI assistants kept telling me my code had no issues. It was taking me a long time so I decided to skip it.

> [!WARNING]
> I'm sure there are bugs when you move stuff around. Sorry.

### Backend code organization

The controllers have the routes inside them so I just load them in the server.ts file. The services are the ones in charge of handling the logic to perform the actions using the models, The controllers just validate data and return the response and status codes.

I used Zod for validation schemas for the request data.

The `utils` directory contains utility functions, the rest of the code are classes pretty much.


### Frontend code organization

> [!NOTE]
> I tried to use Next.js v12 as requested but the Next.js cli kept installing v15.

There's only one page in the app, the index page. The components are in the `components` directory, you'll find components to load the board, load categories and task, create new category and task.

For state management I started with [Zustand](https://zustand-demo.pmnd.rs/) but realized that Zustand doesn't play well with server side rendering so I ended up using [Jotai](https://jotai.org/), which I always want it to try (now I think I'll use it from now on, it's simple but robust, I barely scratched the surface of it). I created the atoms in the `store` folder.

The API calls to the backend are in the `api` directory. I created a wrapper for `fetch` to use Next.js API proxy to make requests to the backend.

There's only one custom hook which is a small hook for a click away listener. I used it when the user edits the name of a category or task and clicks away from it to close the form. You'll find it in the `hooks` directory.

For styling I used [react bootstrap](https://react-bootstrap.netlify.app/) components and bootstrap utility classes for extra stuff. I didn't use Sass for custom styling because it was very few custom styling that I couldn't use Bootstrap classes for, so I did it inline (I know, shocking! but the app was small and I was in a hurry).

For drag and drop I started looking at the exact same library that I guess Trello uses , mantained by Attlasian called [pragmatic-drag-and-drop](https://github.com/atlassian/pragmatic-drag-and-drop) but the examples and documentation was too much for me to understand in a short amount of time and I didn't want it to rely on AI too much to understand the solution so I ended up using [dnd-kit](https://dndkit.com/) which is simpler but still powerful enough for this app (again I barely scratched the surface of it). There were examples that had good enough code for me to grab and try implementing it in a simpler way.

### Not creating tests

I know right?!, who delivers software without tests?!

Sorry, I didn't have the time to write tests, it was going to take me a lot more time. That's something to add to "What you would improve with more time".

With time I would have used [Vitest](https://vitest.dev/)  and [supertest](https://github.com/visionmedia/supertest) for integration tests for the backend. For frontend I would have used Vitest too with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for frontend components. I'm not sure how I would have test it drag and drop events but hopefully that's something that can be done.


## List of completed features

- Categories CRUD operations
- Tasks CRUD operations
- Data validation and sanitization
- Pagination for list endpoints
- API documentation
- Implementing proper error handling and status codes in the backend
- Implementing proper state management in the frontend
- Implementing API proxy configuration in Next.js
- Drag and drop functionality for tasks
- Drag and drop functionality for categories (I know you didn't ask for it but I did it)
- Responsive design (mobile-first approach)*: Huge asterisk here because I did it the same way Trello does it which doesn't require any extra work.
- CRUD operations for tasks with appropriate UI components

## What you would improve with more time

- Tests
- Drag and drop events
- DB integrity when moving tasks and categories
- Solving the weird error with transactions
- Styling! the app looks awful, I'm not a designer but I'm sure I can find pretty designs for this, even with dark mode.
- Implementing the bonus points. The one that would have taking me more time I guess it's the real time updates with WebSockets since I haven't used WebSockets and socket.io in long time.
- Loading states and error handling in the frontend

> [!NOTE]
> If you run `npm run seed`, you'll see the tasks I did, the one that I was doing before calling it quits, the ones I didn't do and the one that I decided to put it in the Backlog category.
