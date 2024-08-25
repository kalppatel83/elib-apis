import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";

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

  res.json({ message: "User Created" });
};

export { createUser };
