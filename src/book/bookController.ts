import { Request, Response, NextFunction } from "express";
import cloudinary from "../config/cloudinary";
import path from "node:path";
import createHttpError from "http-errors";
import fs from "node:fs";
import bookModel from "./bookModel";
import console from "node:console";

const createBook = async (req: Request, res: Response, next: NextFunction) => {
  const { title, genre } = req.body;
  // console.log("files", req.files);
  // stackOverflow to typecast so ts won't give error might be undefined [3:29:00]
  const files = req.files as { [fieldname: string]: Express.Multer.File[] };
  const coverImageMimeType = files.coverImage[0].mimetype.split("/").at(-1);

  const fileName = files.coverImage[0].filename;
  const filePath = path.resolve(
    __dirname,
    "../../public/data/uploads",
    fileName
  );

  try {
    const uploadResult = await cloudinary.uploader.upload(filePath, {
      filename_override: fileName,
      folder: "book-covers",
      format: coverImageMimeType,
    });

    const bookFileName = files.file[0].filename;
    const bookFilePath = path.resolve(
      __dirname,
      "../../public/data/uploads",
      bookFileName
    );

    const bookFileUploadResult = await cloudinary.uploader.upload(
      bookFilePath,
      {
        resource_type: "raw",
        filename_override: bookFileName,
        folder: "book-PDF",
        format: "pdf", // also you can genrate as mimetype as given above
      }
    );

    console.log("uploadResult", uploadResult);
    console.log("bookFileUploadResult", bookFileUploadResult);
    // @ts-ignore
    console.log("UserID", req.userId);
    const newBook = await bookModel.create({
      title,
      genre,
      author: "66cafcae13948eaf42adcf0f",
      coverImage: uploadResult.secure_url,
      file: bookFileUploadResult.secure_url,
    });

    // Delete temp.files
    // todo: wrap in try catch...
    await fs.promises.unlink(filePath);
    await fs.promises.unlink(bookFilePath);

    res.status(201).json({ id: newBook._id });
  } catch (error) {
    // console.log(error);
    return next(createHttpError(500, "Error while uploading the files."));
  }
};

export default createBook;
