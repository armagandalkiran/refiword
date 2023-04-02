import React from "react";
import { IconArrowNarrowRight } from "@tabler/icons-react"

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
          <li className="relative px-4 py-2 flex justify-between bg-indigo-400 text-indigo-600 rounded" key={item._id}>
            <p>{item.word}</p>
            <IconArrowNarrowRight className="text-paledogwood absolute inset-0 mx-auto my-auto"/>
            <p>{item.meaning}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
