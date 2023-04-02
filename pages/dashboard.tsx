import React from "react";
import WordEditor from "@/components/word-editor";
import { WordList } from "@/components/word-list";
import Head from "next/head";
import { GetServerSidePropsContext } from "next";

export default function Dashboard({ data }: any) {
  const [wordList, setWordList] = React.useState(data);

  const getWordList = async () => {
    try {
      const response = await fetch("/api/word-list");
      const data = await response.json();
      setWordList(data);
    } catch (error) {
      return error;
    }
  };

  return (
    <>
      <Head>
        <title>Refiword</title>
        <meta name="description" content="Refiword" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <WordEditor getWordList={getWordList} />
        <WordList items={wordList} />
      </main>
    </>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  if (!context.req.headers.cookie) {
    return { props: { data: [] } };
  }
  try {
    const response = await fetch(
      `${process.env.PUBLIC_URL_API_ENDPOINT}/word-list`,
      {
        headers: {
          Cookie: context.req.headers.cookie,
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
