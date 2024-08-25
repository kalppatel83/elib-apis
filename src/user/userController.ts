import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import userModel from "./userModel";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { config } from "../config/config";
import { User } from "./userTypes";
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

  try {
    const user = await userModel.findOne({ email }); //if value of key value is same we can write only email findone either return document or NULL
    // DB Call to check user Register or not...
    if (user) {
      const error = createHttpError(400, "User already registered");
      return next(error);
    }
  } catch (error) {
    return next(createHttpError(500, "error while getting user"));
  }

  //password => hash
  const hashedPassword = await bcrypt.hash(password, 10);

  let newUser: User;
  try {
    newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });
  } catch (error) {
    return next(createHttpError(500, "error while creating user"));
  }

  try {
    // Token Generation JWT Token
    const token = await sign({ sub: newUser._id }, config.jwtSecret as string, {
      expiresIn: "7d",
    });
    // Response
    res.status(201).json({ accessToken: token });
  } catch (error) {
    return next(createHttpError(500, "error while signing the jwt token"));
  }
};

export { createUser };
