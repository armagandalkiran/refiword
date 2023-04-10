import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User, { IUser } from "./models/user";
import dbConnect from "@/lib/mongoose";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { email, password } = req.body;

    try {
      await dbConnect();
      // Check if user exists
      const user: IUser | null = await User.findOne({ email }).select(
        "+password"
      );

      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Check if password is correct
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      if (!process.env.JWT_SECRET) {
        return res.status(401).json({ message: "Service unavailable" });
      }

      // Create and sign JWT token
      const token = jwt.sign(
        { userId: user._id, userName: user.username },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

      // Set the token as a cookie
      res.setHeader(
        "Set-Cookie",
        `token=${token}; Path=/; HttpOnly; Expires=${new Date(
          Date.now() + 7 * 24 * 60 * 60 * 1000
        )}`
      );

      return res.status(200).json({ message: "User logged in successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  if (req.method === "DELETE") {
    // Remove token cookie to log user out
    res.setHeader(
      "Set-Cookie",
      "token=; HttpOnly; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT"
    );
    return res.status(200).json({ message: "User logged out successfully" });
  }

  return res.status(404).end();
};

export default handler;
