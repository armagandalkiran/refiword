import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IconArrowNarrowDown } from "@tabler/icons-react";
import * as yup from "yup";

interface WordData {
  word: string;
  wordMeaning: string;
}

interface WordEditorProps {
  getWordList: () => void
}

const schema = yup.object().shape({
  word: yup.string().required(),
  wordMeaning: yup.string().required(),
});

const WordEditor = ({ getWordList }: WordEditorProps) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<WordData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: WordData) => {
    try {
      const response = await fetch("/api/word-list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          word: data.word,
          meaning: data.wordMeaning,
        }),
      });

      if (response.ok) {
        reset();
        getWordList();
      } else {
        // fail something
      }
    } catch (error) {
      // error something
    }
  };

  return (
    <form
      className="h-full px-4 py-10 flex flex-col gap-y-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="relative flex flex-col gap-y-8">
        <div>
          <Controller
            name="word"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                {...field}
                className="focus:outline-none h-10 rounded px-4 w-full"
                placeholder="Word"
                id="word"
                type="text"
              />
            )}
          />
          {/* {errors.word && <p>{errors.word.message}</p>} */}
        </div>
        <IconArrowNarrowDown className="absolute text-paledogwood inset-0 mx-auto my-auto" />
        <div>
          <Controller
            name="wordMeaning"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                className="focus:outline-none h-10 rounded px-4 w-full"
                placeholder="Meaning"
                {...field}
                id="wordMeaning"
                type="text"
              />
            )}
          />
          {/* {errors.wordMeaning && <p>{errors.wordMeaning.message}</p>} */}
        </div>
      </div>
      <button className="h-10 bg-indianred text-white font-bold rounded" type="submit">Save</button>
    </form>
  );
};

export default WordEditor;
