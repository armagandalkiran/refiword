import React from "react";
import { WordCard } from "./word-card";

interface Item {
  _id: string;
  word: string;
  meaning: string;
}

interface WordListProps {
  items: Item[];
  getWordList: () => void;
}

export const WordList = ({ items, getWordList }: WordListProps) => {
  return (
    <div className="px-4">
      <h3 className="text-2xl text-iceblue font-bold text-center">
        Recently Added Words
      </h3>
      <ul className="text-spacecadet font-semibold text-sm py-4 flex flex-col gap-y-4">
        {items?.map((item) => (
          <WordCard key={item._id} item={item} getWordList={getWordList} />
        ))}
      </ul>
    </div>
  );
};
