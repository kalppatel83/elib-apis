import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import userModel from "./userModel";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  // This is the hirarchy ( Validation => Process => Respone )

  // console.log("reqdata", req.body);
  // return res.json({});
  const { name, email, password } = req.body;
  // Validation
  if (!name || !email || !password) {
    const error = createHttpError(400, "All fields are required");
    return next(error);
  }

  // DB Call to check user Register or not...
  const user = await userModel.findOne({ email }); //if value of key value is same we can write only email findone either return document or NULL
  if (user) {
    const error = createHttpError(400, "User already registered");
    return next(error);
  }

  res.json({ message: "User Created" });
};

export { createUser };
