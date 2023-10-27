import { model, Schema, Document } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config"

export interface IUser extends Document {
  names: string;
  lastNames: string;
  email: string;
  password: string;
  username: string;
  isDisabled: boolean;
  createdAt: Date;
  comparePassword: (password: string) => Promise<boolean>;
  updateData: (userData: {
    names?: string;
    lastNames?: string;
    email?: string;
    username?: string;
    oldPassword?: string;
    newPassword?: string;
    isDisabled?: boolean;
  }) => Promise<boolean>;
  createToken: () => Promise<string>;
}

const userSchema = new Schema<IUser>({
  names: {
    type: String,
    required: true,
  },
  lastNames: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  isDisabled: {
    type: Boolean,
    required: true,
    default: false,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});



userSchema.pre<IUser>("save", async function(next) {
  const user = this;

  if (!user.isModified("password")) return next();

  user.email = user.email.toLowerCase();

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;

  next();
});

userSchema.methods.comparePassword = async function(
  password: string
): Promise<Boolean> {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.updateData = async function (
  userData: {
    names?: string;
    lastNames?: string;
    email?: string;
    username?: string;
    oldPassword?: string;
    newPassword?: string;
    isDisabled?: boolean;
  }
): Promise<boolean> {
  const user = this;

  if (userData.newPassword) {
    if (!(await user.comparePassword(userData.oldPassword))) return false;
    user.password = userData.newPassword;
  }

  if (userData.names) user.names = userData.names;
  if (userData.lastNames) user.lastNames = userData.lastNames;
  if (userData.email) {
    user.email = userData.email;
  }
  if (userData.username) user.username = userData.username;
  if (userData.isDisabled !== undefined) user.isDisabled = userData.isDisabled;

  await user.save();
  return true;
};

userSchema.methods.createToken = async function(user:IUser):Promise<string>{
  return jwt.sign(
    {id:user.id},
     process.env.JWT_SECRET || "secret",
    {expiresIn: 60*60*24*7}
  )
}

  

const userCollection = model<IUser>("User", userSchema);

export default userCollection;