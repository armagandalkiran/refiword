import React from "react";
import WordEditor from "@/components/word-editor";
import { WordList } from "@/components/word-list";
import Head from "next/head";
import { GetServerSidePropsContext } from "next";
import Logout from "@/components/logout";
import { IconLoader } from "@tabler/icons-react";
import Navbar from "@/components/navbar";

export default function Dashboard({ data }: any) {
  const [wordList, setWordList] = React.useState(data);
  const [loader, setLoader] = React.useState(false);

  const getWordList = async () => {
    setLoader(true);
    try {
      const response = await fetch("/api/word-list");
      const data = await response.json();
      setWordList(data);
    } catch (error) {
      return error;
    } finally {
      setLoader(false);
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
      <Navbar />
      <main className="min-h-screen bg-rebeccapurple">
        <WordEditor getWordList={getWordList} />
        <WordList items={wordList} getWordList={getWordList} />
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
      `${process.env.PUBLIC_URL_API_ENDPOINT}/word-list`,
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
