import "dotenv/config";
import mongoose from "mongoose";
import Category from "../src/models/category.model.js";
import Task from "../src/models/task.model.js";
import logger from "../src/utils/logger.js";

async function seed() {
  await mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost:27017/lexamicssssa"
  );

  await Category.deleteMany({});
  await Task.deleteMany({});

  const categories = [
    { name: "Backlog", position: 1 },
    { name: "To Do", position: 2 },
    { name: "In Progress", position: 3 },
    { name: "Done", position: 4 },
  ];

  const createdCategories = await Category.insertMany(categories);

  if (createdCategories.length === 0) {
    logger.error("No categories created");
    return;
  }

  const backlogCategory = createdCategories[0];
  const todoCategory = createdCategories[1];
  const inProgressCategory = createdCategories[2];
  const doneCategory = createdCategories[3];

  const tasks = [
    {
      name: "MongoDB database with Mongoose ORM",
      category: doneCategory?._id,
      position: 1,
    },
    {
      name: "Proper database indexing for optimized queries",
      category: inProgressCategory?._id,
      position: 1,
    },
    {
      name: "Well-defined schemas for Tasks and Categories",
      category: doneCategory?._id,
      position: 2,
    },
    {
      name: "Data validation and sanitization",
      category: doneCategory?._id,
      position: 3,
    },
    {
      name: "Pagination for list endpoints",
      category: doneCategory?._id,
      position: 4,
    },
    {
      name: "API documentation (Swagger/OpenAPI preferred)",
      category: doneCategory?._id,
      position: 5,
    },
    {
      name: "Categories CRUD operations",
      category: doneCategory?._id,
      position: 6,
    },
    { name: "Tasks CRUD operations", category: doneCategory?._id, position: 7 },
    {
      name: "Endpoint for reordering tasks within/across categories",
      category: todoCategory?._id,
      position: 1,
    },
    {
      name: "Implement proper error handling and status codes",
      category: doneCategory?._id,
      position: 8,
    },
    {
      name: "Implement API proxy configuration in Next.js",
      category: doneCategory?._id,
      position: 9,
    },
    {
      name: "Drag and drop functionality for tasks",
      category: doneCategory?._id,
      position: 10,
    },
    {
      name: "Drag and drop functionality for categories",
      category: doneCategory?._id,
      position: 11,
    },
    {
      name: "CRUD operations for tasks with appropriate UI components",
      category: doneCategory?._id,
      position: 12,
    },
    {
      name: "Responsive design (mobile-first approach)",
      category: doneCategory?._id,
      position: 13,
    },
    {
      name: "Loading states and error handling",
      category: todoCategory?._id,
      position: 2,
    },
    {
      name: "Use Bootstrap React for base components",
      category: doneCategory?._id,
      position: 14,
    },
    {
      name: "Implement SCSS/SASS for custom styling where needed",
      category: backlogCategory?._id,
      position: 1,
    },
    {
      name: "Add comprehensive test coverage (unit tests and E2E tests)",
      category: todoCategory?._id,
      position: 3,
    },
    {
      name: "Implement proper state management",
      category: doneCategory?._id,
      position: 15,
    },
    {
      name: "Handle API errors gracefully",
      category: todoCategory?._id,
      position: 4,
    },
  ];

  await Task.insertMany(tasks);

  await mongoose.disconnect();
  logger.info("Database seeded!");
}

seed().catch((err) => {
  logger.error(err);
  process.exit(1);
});
