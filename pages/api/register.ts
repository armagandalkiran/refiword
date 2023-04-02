import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import User, { IUser } from "./models/user";
import dbConnect from "@/lib/mongoose";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { username, email, password } = req.body;

    try {
      await dbConnect();
      // Check if user already exists
      const existingUser: IUser | null = await User.findOne({ email });

      if (existingUser) {
        return res.status(409).json({ message: "User already exists" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 12);

      // Create new user
      const newUser: IUser = new User({
        username,
        email,
        password: hashedPassword,
      });

      // Save new user to database
      await newUser.save();

      return res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  return res.status(404).end();
};

export default handler;