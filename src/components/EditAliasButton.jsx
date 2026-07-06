"use client";

import { useState } from "react";

export default function EditAliasButton({
  id,
  onEdit,
}) {
  const [editing, setEditing] = useState(false);
  const [newAlias, setNewAlias] = useState("");

  async function handleSave() {
    if (!newAlias.trim()) return;

    const res = await fetch(
      `/api/url/${id}/edit`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          shortCode: newAlias,
        }),
      }
    );

    const data = await res.json();

    if (data.success) {

      onEdit?.(newAlias);

      setEditing(false);

    } else {

      alert(data.message);

    }
  }

  if (editing) {
      return (
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={newAlias}
            onChange={(e) =>
              setNewAlias(e.target.value)
            }
            placeholder="New Alias"
            className="border px-3 py-1 rounded bg-zinc-800 text-white "
          />

          <button
            onClick={handleSave}
            className="bg-green-600 text-white px-3 py-1 rounded p-3 cursor-pointer transition-all duration-200 hover:scale-[1.02]"
          >
            Save
          </button>

          <button
            onClick={() =>
              setEditing(false)
            }
            className="bg-red-600 text-white px-3 py-1 rounded p-3 cursor-pointer transition-all duration-200 hover:scale-[1.02]"
          >
            Cancel
          </button>
        </div>
      );
    }

    return (
      <button
        onClick={() =>
          setEditing(true)
        }
        className="border px-3 py-1 rounded p-3 cursor-pointer transition-all duration-200 hover:scale-[1.02]"
      >
        Edit Alias
      </button>
    );
  }