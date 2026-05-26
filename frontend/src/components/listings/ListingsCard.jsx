import { Link } from "@tanstack/react-router";

export default function ListingCard({ listing }) {
  return (
    <Link to={`/property/${listing.id}`}>
      <div className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition">

        <img
          src={listing.images[0]}
          alt={listing.title}
          className="w-full h-64 object-cover"
        />

        <div className="p-4">

          <h2 className="text-2xl font-bold">
            ${listing.price.toLocaleString()}
          </h2>

          <p className="text-gray-600 mt-1">
            {listing.address.street}
          </p>

          <div className="flex gap-4 mt-3 text-sm text-gray-700">
            <span>{listing.details.beds} Beds</span>
            <span>{listing.details.baths} Baths</span>
            <span>{listing.details.sqft} sqft</span>
          </div>

        </div>
      </div>
    </Link>
  );
}