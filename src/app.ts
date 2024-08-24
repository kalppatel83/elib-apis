import express, { NextFunction, Request, Response } from "express";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import userRouter from "./user/userRouter";

const app = express();

// Routes...
// Http methods : GET,POST,PUT,PATCH,DELETE

app.get("/", (req, res, next) => {
  // throw new Error("Something went wrong");
  // const error = createHttpError(400, "Something went wrong");
  // throw error;
  res.json({ message: "Welcome to elib apis" });
});

app.use("/api/users", userRouter);

app.use(globalErrorHandler);
export default app;
