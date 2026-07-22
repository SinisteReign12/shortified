"use client";

import { useState, useEffect } from "react";
import DeleteButton from "./DeleteButton";
import EditAliasButton from "./EditAliasButton";
import QRCodeCard from "./QRCodeCard";
import toast from "react-hot-toast";

export default function SearchUrls({ urls }) {

  const [urlList, setUrlList] = useState(urls);

  const [search, setSearch] =
    useState("");

  const filteredUrls = urlList.filter(
    (url) =>
      url.shortCode
        .toLowerCase()
        .includes(
          search.toLowerCase()
        ) ||
      url.originalUrl
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
  );

  return (
    <div>

      <h2 className="text-2xl font-bold mb-4">
        Search URLs
      </h2>

      <input
        type="text"
        placeholder="Search URLs..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="w-full bg-zinc-800 border border-zinc-700 text-white p-3 rounded-lg mb-6"
      />

      {filteredUrls.length === 0 && (
        <p>No URLs found.</p>
      )}

      {filteredUrls.map((url) => (
        <div
          key={url._id}
          className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 mb-4 shadow transition-all duration-300 hover:scale-[1.01] hover:shadow-xl animate-fadeIn"
        >
          <p className="break-all">
            <strong>
              Original URL:
            </strong>{" "}
            {url.originalUrl}
          </p>

          <p>
            <strong>
              Alias:
            </strong>{" "}
            {url.shortCode}
          </p>

          <p>
            <strong>
              Clicks:
            </strong>{" "}
            {url.clicks}
          </p>

          <p>
            <strong>
              Expires:
            </strong>{" "}
            {url.expiresAt
              ? new Date(
                url.expiresAt
              ).toLocaleDateString()
              : "Never"}
          </p>

          <div className="mt-2">

            {url.expiresAt &&
              new Date() >
              new Date(
                url.expiresAt
              ) ? (

              <span className="bg-red-900 text-red-300 border border-red-700 px-3 py-1 rounded-full text-sm">
                🔴 Expired
              </span>

            ) : (

              <span className="bg-green-900 text-green-300 border border-green-700 px-3 py-1 rounded-full text-sm">
                🟢 Active
              </span>

            )}

          </div>

          <div className="mt-3 flex flex-wrap gap-2">

            <a
              href={`/${url.shortCode}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white px-3 py-1 rounded p-3 cursor-pointer transition-all duration-200 hover:scale-[1.02]"
            >
              Visit
            </a>

            <button
              onClick={() => {
                navigator.clipboard.writeText(
                  `${window.location.origin}/${url.shortCode}`
                );
                toast.success(
                  "Link copied!"
                );
              }}
              className="bg-zinc-700 text-white px-3 py-1 rounded p-3 cursor-pointer transition-all duration-200 hover:scale-[1.02]"
            >
              Copy
            </button>

            <EditAliasButton
              id={url._id}
              onEdit={(updatedAlias) =>
                setUrlList((prev) =>
                  prev.map((item) =>
                    item._id === url._id
                      ? {
                        ...item,
                        shortCode: updatedAlias,
                      }
                      : item
                  )
                )
              }
            />

            <DeleteButton
              id={url._id}
              onDelete={() =>
                setUrlList((prev) =>
                  prev.filter((item) => item._id !== url._id)
                )
              }
            />

          </div>

          <div className="overflow-x-auto mt-4">

            <QRCodeCard
              value={`https://shortified.vercel.app/${url.shortCode}`}
            />

          </div>

        </div>
      ))}
    </div>
  );
}