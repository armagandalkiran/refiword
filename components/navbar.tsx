import React from "react";
import Link from "next/link";
import { IconUser } from "@tabler/icons-react";

const Navbar = () => {
  return (
    <header className="flex items-center justify-between w-full p-4 bg-rebeccapurple">
      <h1 className="text-indianred font-bold text-xl text-center">REFIWORD</h1>
      <Link href="/account">
        <IconUser className="text-indianred w-6 h-6" />
      </Link>
    </header>
  );
};

export default Navbar;
