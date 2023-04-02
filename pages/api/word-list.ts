import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/mongoose";
import Word, { IWord } from "./models/word-list";
import jwt from "jsonwebtoken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      await dbConnect();
      const token = req.cookies.token;
      if (!token || !process.env.JWT_SECRET) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET) as any;
      const userId = decoded.userId;
      const { word, meaning } = req.body;
      const newWord: IWord = new Word({
        word,
        meaning,
        owner: userId,
      });

      // Save the new word to the database
      await newWord.save();

      res
        .status(201)
        .json({ message: "Word added successfully", word: newWord });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else if (req.method === "GET") {
    try {
      await dbConnect();
      const token = req.cookies.token;
      if (!token || !process.env.JWT_SECRET) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET) as any;
      const userId = decoded.userId;

      const words: IWord[] = await Word.find({ owner: userId }).exec();

      return res.status(200).json(words);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
}
