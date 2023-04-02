import React from "react";

interface Item {
  _id: string;
  word: string;
  meaning: string;
}

interface WordListProps {
  items: Item[];
}

export const WordList = ({ items }: WordListProps) => {
  return (
    <div className="px-4">
      <h3 className="text-2xl text-iceblue font-bold text-center">Recently Added Words</h3>
      <ul className="text-spacecadet font-semibold text-lg py-4">
        {items?.map((item) => (
          <li className="flex justify-between" key={item._id}>
            <p>{item.word}</p>
            <p>{item.meaning}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
