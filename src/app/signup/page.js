"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignup(e) {
    e.preventDefault();

    const res = await fetch(
      "/api/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      }
    );

    const data = await res.json();

    if (data.success) {
      toast.success("Account created!");
      window.location.href = "/login";

      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
      
    } else {
      toast.error(data.message);
    }
  }

  return (
    <div className="p-10 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Signup
      </h1>

      <form
        onSubmit={handleSignup}
        className="space-y-4"
      >
        <input
          type="text"
          placeholder="Name"
          className="bg-zinc-900 w-full border border-zinc-700 p-3 rounded"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

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
          Signup
        </button>
      </form>
    </div>
  );
}