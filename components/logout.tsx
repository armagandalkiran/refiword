import React from "react";
import { useRouter } from "next/router";
import { IconLogout } from "@tabler/icons-react";

const Logout = () => {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth", {
        method: "DELETE",
      });
      if (response.ok) {
        router.push("/login");
      }
    } catch (error) {
      router.push("/login");
    }
  };
  return (
    <div>
      <button className="flex text-paledogwood" onClick={handleLogout}>
        <IconLogout />
        <span className="ml-2">Logout</span>
      </button>
    </div>
  );
};

export default Logout;
