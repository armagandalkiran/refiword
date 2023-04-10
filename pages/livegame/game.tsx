import { useEffect, useState } from "react";
import Head from "next/head";
import { socket } from "@/lib/socket";

export default function LiveGame() {
  const [currentPage, setCurrentPage] = useState(0);
  const [connectedUsers, setConnectedUsers] = useState({});
  const [vote, setVote] = useState({
    metric1: 0,
    metric2: 0,
  });
  const [results, setResults] = useState([]);
  const handleNext = () => {
    socket.emit("nextPage", currentPage + 1);
    socket.emit("finish");
  };

  const handleVote = (item: any, type: any) => {
    setVote({
      ...vote,
      metric1: type === 1 ? item : vote.metric1,
      metric2: type === 2 ? item : vote.metric2,
    });
  };

  const handleReady = () => {
    socket.emit("vote", vote);
  };

  useEffect(() => {
    socket.connect();

    socket.on("currentPage", (data) => {
      setCurrentPage(data);
    });

    socket.on("votes", (votes) => {
      setResults(votes);
    });

    socket.on("connectedUsers", (users) => {
      setConnectedUsers(users);
    });

    return () => {
      socket.disconnect();
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
        <>
          <p>{currentPage}</p>
          <h3>Task Title</h3>
          <p>task description</p>
          <div>
            {[1, 2, 3, 4, 5].map((item, key) => (
              <button
                onClick={() => handleVote(item, 1)}
                className="bg-white p-2 mx-2"
                key={key}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="mt-2">
            {[1, 2, 3, 4, 5].map((item, key) => (
              <button
                onClick={() => handleVote(item, 2)}
                className="bg-white p-2 mx-2"
                key={key}
              >
                {item}
              </button>
            ))}
          </div>
          <button onClick={handleReady}>ready</button>
          <button onClick={handleNext}>next task</button>
          <div>{JSON.stringify(connectedUsers)}</div>
          <div>{JSON.stringify(results)}</div>
        </>
      </main>
    </>
  );
}
