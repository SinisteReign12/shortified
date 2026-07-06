"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.ok) {

      toast.success(
        "Login successful!"
      );

      setTimeout(() => {
        window.location.href =
          "/dashboard";
      }, 1000);

    } else {

      toast.error(
        "Invalid email or password"
      );

    }
  }

  return (
    <div className="p-10 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Login
      </h1>

      <form
        onSubmit={handleLogin}
        className="space-y-4"
      >
        <input
          type="email"
          placeholder="Email"
          className="bg-zinc-900 w-full border border-zinc-700 p-3 rounded"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="bg-zinc-900 w-full border border-zinc-700 p-3 rounded"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          type="submit"
          className="bg-white text-black font-semibold rounded-lg px-4 py-2 transition-all duration-200 cursor-pointer hover:bg-zinc-200 hover:scale-[1.02]"
        >
          Login
        </button>

        <button
          type="button"
          onClick={() =>
            signIn("google", {
              callbackUrl: "/",
            })
          }
          className="w-full mt-4 flex items-center justify-center gap-3 border border-zinc-700 bg-zinc-900 text-white p-3 rounded-lg transition-all duration-200 hover:bg-zinc-800 cursor-pointer"
        >
          <Image
            src="/google.svg"
            alt="Google"
            width={22}
            height={22}
          />

          <span className="font-medium">
            Continue with Google
          </span>
        </button>
      </form>
    </div>
  );
}