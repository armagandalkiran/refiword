import React from "react";
import Head from "next/head";
import { GetServerSidePropsContext } from "next";
import Logout from "@/components/logout";
import { IconLoader } from "@tabler/icons-react";
import Navbar from "@/components/navbar";

export default function FindTheWord({ data }: any) {
  const [loader, setLoader] = React.useState(false);
  const [questionIndex, setQuestionIndex] = React.useState(0);

  const hideWordInsidePhrase = (phrase: string, word: string) => {
    return phrase?.replace(new RegExp(word, "gi"), "_".repeat(word.length));
  };

  const handleClick = (selectedWord: string) => {
    data[questionIndex].word.toLowerCase() === selectedWord.toLowerCase() &&
      setQuestionIndex((prevValue) => prevValue + 1);
  };

  return (
    <>
      <Head>
        <title>Refiword</title>
        <meta name="description" content="Refiword" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen bg-rebeccapurple">
        <Navbar />
        <div className="question-container p-4">
          <h4 className="text-paledogwood">Fill in the blank.</h4>
          <p className="py-2 font-bold text-lg">
            <span className="mr-1">{questionIndex + 1}.</span>
            {hideWordInsidePhrase(
              data[questionIndex]?.phrase,
              data[questionIndex]?.word
            )}
          </p>
          <ul className="choices-container py-2 text-lightgreyishblue text-sm flex flex-col gap-y-2 font-semibold">
            {data[questionIndex]?.choices.map(
              (choice: string, index: number) => (
                <li className="bg-paledogwood p-2 rounded-lg" key={index}>
                  <button className="w-full" onClick={() => handleClick(choice)}>{choice}</button>
                </li>
              )
            )}
          </ul>
        </div>
      </main>
      {loader && (
        <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black opacity-60 z-40"></div>
      )}
      {loader && (
        <IconLoader className="fixed z-50 w-12 h-12 animate-spin text-indianred inset-0 mx-auto my-auto" />
      )}
    </>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  if (!context.req.headers.cookie) {
    return {
      props: { data: [] },
      redirect: { permanent: false, destination: "/login" },
    };
  }
  try {
    const response = await fetch(
      `${process.env.PUBLIC_URL_API_ENDPOINT}/find-the-word`,
      {
        headers: {
          cookie: context.req.headers.cookie,
        },
        credentials: "include",
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const wordList = await response.json();
    return { props: { data: wordList } };
  } catch (error) {
    return { props: { data: [] } };
  }
};
