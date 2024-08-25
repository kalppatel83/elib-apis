import express from "express";
const bookRouter = express.Router();
import createBook from "./bookController";

// Routes
bookRouter.post("/", createBook);
export default bookRouter;
