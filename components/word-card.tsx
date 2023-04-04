import { IconArrowNarrowRight, IconTrash } from "@tabler/icons-react";
import classNames from "classnames";
import React from "react";
import { Popup } from "./shared/popup";

interface Item {
  _id: string;
  word: string;
  meaning: string;
}

interface WordCardProps {
  item: Item;
  getWordList: () => void;
}

export const WordCard = ({ item, getWordList }: WordCardProps) => {
  const [showPopup, setShowPopup] = React.useState(false);
  const wordClasses = classNames(
    "truncate overflow-ellipsis whitespace-no-wrap flex-1 text-center"
  );

  const handleDelete = async (itemId: string) => {
    setShowPopup(false);
    try {
      const response = await fetch(`/api/word-list?id=${itemId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        getWordList();
      }
    } catch (error) {}
  };
  return (
    <>
      <li
        className="relative px-4 py-2 bg-indigo-400 text-indigo-600 rounded flex flex-col gap-y-2"
        key={item._id}
      >
        <IconTrash
          onClick={() => setShowPopup(true)}
          className="text-red-600 w-4 h-4 ml-auto"
        />
        <div className="flex justify-between">
          <p className={wordClasses}>{item.word}</p>
          <IconArrowNarrowRight className="text-paledogwood inset-0 mx-auto my-auto flex-1" />
          <p className={wordClasses}>{item.meaning}</p>
        </div>
      </li>
      <Popup show={showPopup} setShow={setShowPopup} title="Are you sure?">
        <div className="py-4 flex flex-col gap-y-4">
          <p className="text-gray-500 text-md">
            The selected card will be deleted
          </p>
          <button
            className="text-semibold text-sm p-2 bg-indianred text-white rounded-lg w-full"
            onClick={() => handleDelete(item._id)}
          >
            Delete
          </button>
          <button
            className="text-semibold text-sm p-2 border text-gray-500 border-gray-500 rounded-lg w-full"
            onClick={() => setShowPopup(false)}
          >
            Cancel
          </button>
        </div>
      </Popup>
    </>
  );
};
