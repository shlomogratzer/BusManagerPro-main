import mongoose, { Document, Schema } from "mongoose";

// הממשק מגדיר את המבנה של המשתמש
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "driver" | "admin" | "passenger";
}

const userSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, "אנא הכנס אימייל תקין"],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      enum: ["driver", "admin", "passenger"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

export default mongoose.model<IUser>("User", userSchema);
