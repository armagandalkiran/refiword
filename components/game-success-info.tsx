import Link from "next/link";
import React from "react";

const GameSuccessInfo = () => {
  return <div>
    <p>Game is finished</p>
    <Link href="/dashboard">Return dashboard</Link>
  </div>;
};

export default GameSuccessInfo;
