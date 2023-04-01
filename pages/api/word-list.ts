import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/mongoose";
import Word, { IWord } from "./models/word-list";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      await dbConnect();

      const { word, meaning } = req.body;
      const newWord: IWord = new Word({ word, meaning });
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
      const wordLists = await Word.find({}).exec();
      res.status(200).json(wordLists);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
}
