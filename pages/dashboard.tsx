import WordEditor from "@/components/word-editor";
import { WordList } from "@/components/word-list";
import Head from "next/head";

export default function Dashboard({ wordList }: any) {
  return (
    <>
      <Head>
        <title>Refiword</title>
        <meta name="description" content="Refiword" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <WordEditor />
        <WordList items={wordList} />
      </main>
    </>
  );
}

export const getServerSideProps = async () => {
  try {
    const response = await fetch(`${process.env.PUBLIC_URL_API_ENDPOINT}/word-list`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const wordList = await response.json();
    return { props: { wordList } };
  } catch (error) {
    return { props: { wordList: [] } };
  }
};
