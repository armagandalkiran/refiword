import { NextApiHandler, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { ExtendedNextApiRequest } from "@/pages/api/models/interfaces";

const authMiddleware = (handler: NextApiHandler) => {
  return async (req: ExtendedNextApiRequest, res: NextApiResponse) => {
    try {
      const token = req.cookies.token;
      if (!token || !process.env.JWT_SECRET) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET) as any;
      const userId = decoded.userId;
      req.userId = userId;

      return handler(req, res);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
};

export default authMiddleware;