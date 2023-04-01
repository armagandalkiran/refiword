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
    <div>
      <ul>
        {items.map((item) => (
          <li key={item._id}>
            <p>{item.word}</p>
            <p>{item.meaning}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
