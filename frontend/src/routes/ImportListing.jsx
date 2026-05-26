import { useState } from "react";

export default function ImportListing() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleImport(e) {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/listings/import",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            url,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Import failed"
        );
      }

      setMessage(
        "Listing imported successfully!"
      );

      setUrl("");

      console.log(data);
    } catch (err) {
      console.error(err);

      setMessage(
        err.message || "Something went wrong"
      );
    }

    setLoading(false);
  }

  return (
    <div className="max-w-2xl mx-auto p-10">

      <h1 className="text-4xl font-bold mb-6">
        Import Zillow Listing
      </h1>

      <form
        onSubmit={handleImport}
        className="space-y-4"
      >

        <input
          type="text"
          placeholder="Paste Zillow URL"
          value={url}
          onChange={(e) =>
            setUrl(e.target.value)
          }
          className="w-full rounded-xl border p-4"
        />

        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-blue-600 px-6 py-3 text-white"
        >
          {loading
            ? "Importing..."
            : "Import Listing"}
        </button>

      </form>

      {message && (
        <div className="mt-6 rounded-xl bg-gray-100 p-4">
          {message}
        </div>
      )}
    </div>
  );
}