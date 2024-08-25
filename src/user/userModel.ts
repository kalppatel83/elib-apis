import mongoose from "mongoose";
import { User } from "./userTypes";

const userSchema = new mongoose.Schema<User>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true, // will not allow same email to register
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

//  Users (collection with S  )
// mongoose.model("User", userSchema, "custom name to collection");

export default mongoose.model<User>("User", userSchema);
