"use client";

import Swal from "sweetalert2";
import toast from "react-hot-toast";

export default function DeleteButton({ id, onDelete }) {

  async function handleDelete() {

    const result = await Swal.fire({
      title: "Delete URL?",
      text: "This action cannot be undone.",
      icon: "warning",
      width: "300px",
      padding: "1rem",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      background: "#18181b",
      color: "#ffffff",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#3f3f46",
    });

    if (!result.isConfirmed) return;

    try {

      console.log("Deleting ID:", id);

      const res = await fetch(
        `/api/url/${id}`,
        {
          method: "DELETE",
        }
      );

      console.log("Status:", res.status);

      const data = await res.json();

      console.log("Status:", res.status);
      console.log("Response:", data);

      if (data.success) {

        toast.success("URL deleted");

        onDelete?.();

      } else {

        toast.error(
          data.message
        );

      }

    } catch (error) {

      console.error(error);

      toast.error(
        error.message || "Failed to delete URL."
      );

    }
  }

  return (
    <button
      onClick={handleDelete}
      className="border px-3 py-1 rounded cursor-pointer transition-all duration-200 hover:scale-105"
    >
      Delete
    </button>
  );
}