import { useEffect, useState } from "react";
import { socket } from "@/lib/socket";
import Head from "next/head";
import Child from "@/components/child";
import { useRouter } from "next/router";

export default function LiveGame() {
  const router = useRouter();

  const handleConnect = () => {
    socket.connect();
    router.push("/livegame/game");
  };

  const getUsers = () => {};

  useEffect(() => {
    function onConnect() {
      console.log("connect");
    }
    function onDisconnect() {}
    function onConnectedUsers(data: any) {
      console.log(data);
    }
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("connectedUsers", onConnectedUsers);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("connectedUsers", onConnectedUsers);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Refiword</title>
        <meta name="description" content="Refiword" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen py-16 bg-rebeccapurple">
        <div className="bg-blue-400 border border-green-300 rounded-lg p-4">
          <h4>Card</h4>
          <button className="bg-red-300 p-2" onClick={handleConnect}>
            Connect
          </button>
          <Child />
        </div>
      </main>
    </>
  );
}
