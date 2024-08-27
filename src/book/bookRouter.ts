import express from "express";
const bookRouter = express.Router();
import createBook from "./bookController";
import multer from "multer";
import path from "node:path";

// file store local(needed to give location) => s3(cloud) => then delete local file
const upload = multer({
  dest: path.resolve(__dirname, "../../public/data/uploads"),
  limits: { fileSize: 10 * 1024 * 1024 },
});
// Routes
bookRouter.post(
  "/",
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "file", maxCount: 1 },
  ]),
  createBook
);
export default bookRouter;
