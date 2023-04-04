import { NextApiResponse } from "next";
import { ExtendedNextApiRequest } from "./models/interfaces";
import dbConnect from "@/lib/mongoose";
import Word, { IWord } from "./models/word-list";
import authMiddleware from "@/lib/authMiddleware";

async function handler(req: ExtendedNextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      await dbConnect();

      const { word, meaning, phrase } = req.body;
      const newWord: IWord = new Word({
        word,
        meaning,
        phrase,
        owner: req.userId,
      });

      await newWord.save();

      res
        .status(201)
        .json({ message: "Word added successfully", word: newWord });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else if (req.method === "GET") {
    try {
      await dbConnect();

      const userId = req.userId;

      const words: IWord[] = await Word.find({ owner: userId })
        .sort({ _id: -1 })
        .exec();

      return res.status(200).json(words);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  } else if (req.method === "DELETE") {
  try {
    await dbConnect();

    const userId = req.userId;

    const wordId = req.query.id;
    const deletedWord = await Word.findOneAndDelete({ _id: wordId, owner: userId });

    if (!deletedWord) {
      return res.status(404).json({ message: "Word not found" });
    }

    return res.status(200).json({ message: "Word deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}
}

export default authMiddleware(handler);
