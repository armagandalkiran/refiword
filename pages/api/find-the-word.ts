import { NextApiResponse } from "next";
import { ExtendedNextApiRequest } from "./models/interfaces";
import dbConnect from "@/lib/mongoose";
import Word, { IWord } from "./models/word-list";
import authMiddleware from "@/lib/authMiddleware";

async function handler(req: ExtendedNextApiRequest, res: NextApiResponse) {
  try {
    await dbConnect();

    const userId = req.userId;
    const wordList: IWord[] = await Word.find({ owner: userId })
      .sort({ _id: -1 })
      .exec();

    const words = wordList.map((item) => item.word);
    const shuffledWords = words.sort(() => 0.5 - Math.random());

    wordList.forEach((item) => {
      const otherWords = shuffledWords.filter((word) => word !== item.word);
      const choices = otherWords.slice(0, 4);
      choices.push(item.word);
      const shuffledChoices = choices.sort(() => 0.5 - Math.random());
      item.choices = shuffledChoices;
    });

    const wordListWithPhrases = wordList.filter((item) => item.phrase);
    const shuffledWordListWithPhrases = wordListWithPhrases.sort(
      () => 0.5 - Math.random()
    );

    return res.status(200).json(shuffledWordListWithPhrases);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
}

export default authMiddleware(handler);
