"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="border px-4 py-2 rounded p-3 cursor-pointer transition-all duration-200 hover:scale-[1.02]"
    >
      Logout
    </button>
  );
}