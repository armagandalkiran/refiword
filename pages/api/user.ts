import { NextApiResponse } from "next";
import { ExtendedNextApiRequest } from "./models/interfaces";
import dbConnect from "@/lib/mongoose";
import User, { IUser } from "./models/user";
import authMiddleware from "@/lib/authMiddleware";

async function handler(req: ExtendedNextApiRequest, res: NextApiResponse) {
  try {
    await dbConnect();

    const userId = req.userId;
    const user: IUser | null = await User.findOne({ _id: userId });

    if (user !== null) {
      return res.status(200).json({username: user.username});
    }
    return res.status(404).json({ message: "User not found" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}

export default authMiddleware(handler);
