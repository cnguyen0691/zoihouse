import axios from "axios";
const API_URL = "http://localhost:5000";
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});
export async function importListing(url) {
  const response = await fetch(
    `${API_URL}/import-listing`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    }
  );

  if (!response.ok) {
    throw new Error("Import failed");
  }

  return response.json();
}