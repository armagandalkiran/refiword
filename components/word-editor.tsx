import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface WordEditorProps {
  word: string;
  wordMeaning: string;
}

const schema = yup.object().shape({
  word: yup.string().required(),
  wordMeaning: yup.string().required(),
});

const WordEditor = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<WordEditorProps>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: WordEditorProps) => {
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
        // do something
      } else {
        // fail something
      }
    } catch (error) {
      // error something
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="word">Word:</label>
        <Controller
          name="word"
          control={control}
          defaultValue=""
          render={({ field }) => <input {...field} id="word" type="text" />}
        />
        {errors.word && <p>{errors.word.message}</p>}
      </div>
      <div>
        <label htmlFor="wordMeaning">Word Meaning:</label>
        <Controller
          name="wordMeaning"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <input {...field} id="wordMeaning" type="text" />
          )}
        />
        {errors.wordMeaning && <p>{errors.wordMeaning.message}</p>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default WordEditor;
