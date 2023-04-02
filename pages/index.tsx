import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Refiword</title>
        <meta name="description" content="Refiword" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen py-16 bg-rebeccapurple">
        <header>
          <h1 className="text-indianred font-bold text-3xl text-center">
            REFIWORD
          </h1>
        </header>
        <div className="p-10 text-paledogwood flex flex-col gap-y-5 items-center">
          <p>Welcome to Refiword beta !</p>
          <p> Sign up to discover more.</p>
          <Link className="p-2 bg-indianred text-white font-bold rounded" href="/register">Sign up</Link>
        </div>
      </main>
    </>
  );
}
