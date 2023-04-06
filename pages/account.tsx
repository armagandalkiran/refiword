import React from "react";
import Head from "next/head";
import { GetServerSidePropsContext } from "next";
import Logout from "@/components/logout";
import { IconLoader } from "@tabler/icons-react";
import Navbar from "@/components/navbar";

export default function Account({ data }: any) {
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
        <div className="p-4 flex flex-col justify-between h-full">
          <h3 className="text-paledogwood font-bold text-lg text-center">
            <span className="mr-2">Hello,</span>
            {data.username}
          </h3>
          <Logout />
        </div>
      </main>
      {/* {loader && (
        <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-black opacity-60 z-40"></div>
      )}
      {loader && (
        <IconLoader className="fixed z-50 w-12 h-12 animate-spin text-indianred inset-0 mx-auto my-auto" />
      )} */}
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
      `${process.env.PUBLIC_URL_API_ENDPOINT}/user`,
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
    const user = await response.json();
    return { props: { data: user } };
  } catch (error) {
    return { props: { data: [] } };
  }
};
