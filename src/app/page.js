"use client";

import QRCodeCard from "@/components/QRCodeCard";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function Home() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [customAlias, setCustomAlias] = useState("");
  const [expiresInDays, setExpiresInDays] = useState("");
  const [stats, setStats] = useState({
    totalUrls: 0,
    totalClicks: 0,
    totalUsers: 0,
  });
  const [suggestions, setSuggestions] =
    useState([]);
  const [shortUrl, setShortUrl] = useState("");
  const [selectedAlias, setSelectedAlias] = useState("");
  useEffect(() => {
    async function fetchStats() {
      const res = await fetch("/api/stats");

      const data = await res.json();

      if (data.success) {
        setStats(data);
      }
    }

    fetchStats();
  }, []);


  useEffect(() => {
    if (!originalUrl) {
      setSuggestions([]);
      return;
    }

    const clean = originalUrl
      .replace("https://", "")
      .replace("http://", "")
      .replace("www.", "");

    const parts = clean.split("/");

    const domain =
      parts[0]?.split(".")[0] || "";

    const slug =
      parts[1] || "";

    const suggestions = [
      domain,
      slug,
      `${domain}-${slug}`,
      `${slug}-site`,
      `${domain}-link`,
    ].filter(Boolean);

    setSuggestions(
      [...new Set(suggestions)]
    );

  }, [originalUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/shorten", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        originalUrl,
        customAlias,
        expiresInDays,
      }),
    });



    const data = await res.json();

    if (data.success) {

      if (data.alreadyExists) {
        toast("You've already shortened this URL.");
      } else {
        toast.success("Short URL created!");
      }

      setShortUrl(
        `${window.location.origin}/${data.shortUrl}`
      );

    } else {

      toast.error(data.message);

    }
  };
  return (
    <div className="min-h-screen bg-black text-white">

      {/* hero */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-20">

        <div className="text-center mb-12">

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-white">
            Shortified
          </h1>

          <p className="text-base md:text-xl text-zinc-400 max-w-3xl mx-auto">
            Create short URLs, track clicks,
            generate QR codes and manage links.
          </p>

        </div>

        {/* url form */}
        <div className="w-full max-w-2xl mx-auto bg-zinc-900 border border-zinc-800 p-6 md:p-8 rounded-xl">
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >

            <input
              type="text"
              placeholder="Enter URL"
              value={originalUrl}
              onChange={(e) =>
                setOriginalUrl(e.target.value)
              }
              className="w-full bg-zinc-800 border border-zinc-700 text-white p-3 md:p-4 rounded-lg"
            />

            {suggestions.length > 0 && (
              <div className="mt-4">

                <p className="font-semibold mb-2">
                  Suggested Aliases
                </p>

                <div className="flex flex-wrap gap-2">

                  <input
                    type="text"
                    placeholder="Custom Alias (optional)"
                    value={customAlias}
                    onChange={(e) =>
                      setCustomAlias(e.target.value)
                    }
                    className="w-full border p-3 rounded"
                  />

                  {suggestions.map(
                    (alias, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => {
                          setCustomAlias((prev) =>
                            prev
                              ? `${prev}-${alias}`
                              : alias
                          );

                          setSelectedAlias(alias);
                        }}
                        className={`px-4 py-2 rounded-full border text-sm font-medium cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:border-purple-500 hover:text-purple-400 ${selectedAlias === alias ? "bg-purple-600 text-white border-purple-600" : "bg-zinc-900 text-zinc-300 border-zinc-700"}
                        `}
                      >
                        {alias}
                      </button>
                    )
                  )}

                </div>

              </div>
            )}

            <input
              type="number"
              placeholder="Expires in days (optional)"
              value={expiresInDays}
              onChange={(e) =>
                setExpiresInDays(e.target.value)
              }
              className="w-full bg-zinc-800 border border-zinc-700 text-white p-3 md:p-4 rounded-lg"
            />

            <button
              type="submit"
              className="w-full bg-white text-black font-semibold p-4 rounded-lg hover:bg-zinc-200 cursor-pointer transition-all duration-200 hover:scale-[1.02]"
            >
              Create Short URL
            </button>

          </form>

          {shortUrl && (
            <div className="mt-6">

              <p className="font-semibold text-white">
                Your Short URL
              </p>

              <div className="flex flex-col md:flex-row md:items-center gap-3 mt-2">

                <a
                  href={shortUrl}
                  target="_blank"
                  className="underline"
                >
                  {shortUrl}
                </a>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      shortUrl
                    );

                    toast.success("Copied to clipboard!");
                  }}
                  className="border px-3 py-1 p-3 rounded font-semibold cursor-pointer transition-all duration-200 hover:scale-[1.02]"
                >
                  Copy
                </button>

              </div>

              <QRCodeCard value={shortUrl} />

            </div>
          )}

        </div>

      </section>

      <section className="max-w-6xl mx-auto px-6 pb-20">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-xl text-center">
            <h3 className="text-4xl font-bold text-white">
              {stats.totalUrls}
            </h3>

            <p>Total URLs</p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-xl text-center">
            <h3 className="text-4xl font-bold text-white">
              {stats.totalClicks}
            </h3>

            <p>Total Clicks</p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-xl text-center">
            <h3 className="text-4xl font-bold text-white">
              {stats.totalUsers}
            </h3>

            <p>Registered Users</p>
          </div>

        </div>

      </section>

      {/* features */}
      <section className="max-w-6xl mx-auto px-6 pb-20">

        <h2 className="text-4xl font-bold text-center mb-10">
          Features
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl">
            <h3 className="font-bold mb-2">
              Custom Aliases
            </h3>

            <p className="text-zinc-400">
              Create personalized short links that are easy to share and recognize.
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl">
            <h3 className="font-bold mb-2">
              QR Codes
            </h3>

            <p className="text-zinc-400">
              Generate QR codes instantly
              for every link.
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl">
            <h3 className="font-bold mb-2">
              Analytics
            </h3>

            <p className="text-zinc-400">
              Track clicks and monitor
              performance.
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl">
            <h3 className="font-bold mb-2">
              Link Expiration
            </h3>

            <p className="text-zinc-400">
              Set links to expire
              automatically.
            </p>
          </div>

        </div>

      </section>

    </div>
  );
}