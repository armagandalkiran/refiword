import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Refiword</title>
        <meta name="description" content="Refiword" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <p className="text-red-500">Home</p>
      </main>
    </>
  );
}