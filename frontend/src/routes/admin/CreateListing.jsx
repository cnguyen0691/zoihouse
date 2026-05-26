import { auth } from "../../../lib/firebase";
import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { getAdminStatus } from "../../auth/adminAuth";

export default function CreateListing() {
  const navigate = useNavigate();

  const [listingUrl, setListingUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [listingData, setListingData] = useState(null);

  // Protect admin route
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        navigate({ to: "/signin" });
        return;
      }

      const isAdmin = await getAdminStatus(user.uid);

      if (!isAdmin) {
        navigate({ to: "/" });
      }
    });

    return () => unsubscribe();
  }, []);

  const handleImport = async () => {
    setError("");
    setSuccess("");
    setListingData(null);

    if (!listingUrl) {
      setError("Please enter a Zillow URL");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/import-listing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: listingUrl,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to import listing");
      }

      const data = await response.json();

      setListingData(data);
      setSuccess("Listing imported successfully");
    } catch (err) {
      console.error(err);
      setError("Could not import listing");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveListing = async () => {
    if (!listingData) return;

    try {
      setSaving(true);

      const response = await fetch("/api/listings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(listingData),
      });

      if (!response.ok) {
        throw new Error("Failed to save listing");
      }

      setSuccess("Listing saved successfully");
    } catch (err) {
      console.error(err);
      setError("Failed to save listing");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white border rounded-2xl shadow-sm p-8">
          <h1 className="text-3xl font-bold mb-2">
            Create Listing
          </h1>

          <p className="text-gray-500 mb-8">
            Import property data directly from Zillow
          </p>

          {/* URL INPUT */}
          <div className="space-y-4">
            <label className="block text-sm font-medium">
              Zillow Listing URL
            </label>

            <div className="flex gap-3">
              <input
                type="text"
                placeholder="https://www.zillow.com/..."
                value={listingUrl}
                onChange={(e) => setListingUrl(e.target.value)}
                className="flex-1 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              />

              <button
                onClick={handleImport}
                disabled={loading}
                className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 disabled:opacity-50"
              >
                {loading ? "Importing..." : "Import"}
              </button>
            </div>

            {error && (
              <div className="text-red-500 text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="text-green-600 text-sm">
                {success}
              </div>
            )}
          </div>

          {/* PREVIEW */}
          {listingData && (
            <div className="mt-10 border-t pt-8">
              <h2 className="text-2xl font-semibold mb-6">
                Listing Preview
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                {/* IMAGE */}
                <div className="grid grid-cols-2 gap-3">
                   {listingData.photos
                      ?.slice(0, 4)
                       .map((photo, index) => (
                          <img
                            key={index}
                            src={photo}
                            alt=""
                            className="rounded-xl h-40 w-full object-cover"
                  />
                ))}
                </div>

                {/* INFO */}
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-500 text-sm">
                      Address
                    </p>

                    <h3 className="text-xl font-semibold">
                      {listingData.address}
                    </h3>
                  </div>

                  <div>
                    <p className="text-gray-500 text-sm">
                      Price
                    </p>

                    <h3 className="text-2xl font-bold">
                      ${listingData.price?.toLocaleString()}
                    </h3>
                  </div>

                  <div className="flex gap-6">
                    <div>
                      <p className="text-gray-500 text-sm">
                        Beds
                      </p>

                      <p className="font-semibold">
                        {listingData.bedrooms}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-500 text-sm">
                        Baths
                      </p>

                      <p className="font-semibold">
                        {listingData.bathrooms}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-500 text-sm">
                        Sqft
                      </p>

                      <p className="font-semibold">
                        {listingData.sqft}
                      </p>
                    </div>
                  </div>

                  {listingData.description && (
                    <div>
                      <p className="text-gray-500 text-sm mb-1">
                        Description
                      </p>

                      <p className="text-gray-700 text-sm leading-relaxed">
                        {listingData.description}
                      </p>
                    </div>
                  )}

                  <button
                    onClick={handleSaveListing}
                    disabled={saving}
                    className="mt-4 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 disabled:opacity-50"
                  >
                    {saving ? "Saving..." : "Save Listing"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}