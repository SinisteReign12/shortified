"use client";

import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-zinc-900 border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">

        <Link
          href="/"
          className="flex items-center gap-3"
        >
          <Image
            src="/shortified.svg"
            alt="Shortified Logo"
            width={38}
            height={38}
            priority
          />

          <span className="text-2xl font-bold">
            Shortified
          </span>
        </Link>

        <div className="flex items-center gap-4">

          <Link href="/" className="no-underline hover:underline underline-offset-4">
            Home
          </Link>

          {session && (
            <Link href="/dashboard" className="no-underline hover:underline underline-offset-4">
              Dashboard
            </Link>
          )}

          {!session ? (
            <>
              <Link href="/login" className="no-underline hover:underline underline-offset-4">
                Login
              </Link>

              <Link href="/signup" className="no-underline hover:underline underline-offset-4">
                Signup
              </Link>
            </>
          ) : (
            <>
              <span className="text-sm">
                {session.user.email}
              </span>

              <button
                onClick={() => signOut()}
                className="bg-white text-black font-semibold px-4 py-1.5 rounded-lg transition-all duration-200 cursor-pointer hover:bg-zinc-200 hover:scale-[1.02]"
              >
                Logout
              </button>
            </>
          )}
        </div>

      </div>
    </nav>
  );
}