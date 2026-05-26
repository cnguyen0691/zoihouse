import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function PropertyDetails() {
  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/listings/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProperty(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="p-10 text-center">
        Loading property...
      </div>
    );
  }

  if (!property) {
    return (
      <h1 className="p-10 text-center text-2xl">
        Property Not Found
      </h1>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">

      {/* IMAGE GRID */}

      <div className="grid grid-cols-4 gap-4 mb-8">

        <img
          src={property.images?.[0]}
          className="col-span-2 row-span-2 h-full w-full object-cover rounded-2xl"
        />

        {property.images?.slice(1).map((img, index) => (
          <img
            key={index}
            src={img}
            className="w-full h-48 object-cover rounded-2xl"
          />
        ))}
      </div>

      {/* PROPERTY INFO */}

      <div className="grid md:grid-cols-3 gap-10">

        <div className="md:col-span-2">

          <h1 className="text-4xl font-bold mb-4">
            ${property.price?.toLocaleString()}
          </h1>

          <p className="text-gray-600 mb-6">
            {property.address?.street},
            {" "}
            {property.address?.city},
            {" "}
            {property.address?.state}
          </p>

          <div className="flex gap-6 mb-6 text-lg">
            <span>
              {property.details?.beds} Beds
            </span>

            <span>
              {property.details?.baths} Baths
            </span>

            <span>
              {property.details?.sqft} sqft
            </span>
          </div>

          <p className="text-gray-700 leading-8">
            {property.description}
          </p>

          {/* FEATURES */}

          <div className="mt-8">

            <h2 className="text-2xl font-bold mb-4">
              Features
            </h2>

            <div className="flex flex-wrap gap-3">

              {property.features?.map(
                (feature, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 px-4 py-2 rounded-full"
                  >
                    {feature}
                  </span>
                )
              )}

            </div>
          </div>
        </div>

        {/* AGENT CARD */}

        <div className="bg-white shadow-lg rounded-2xl p-6 h-fit">

          <img
            src={
              property.agent?.image ||
              "/default-agent.jpg"
            }
            className="w-20 h-20 rounded-full mb-4 object-cover"
          />

          <h3 className="text-xl font-bold">
            {property.agent?.name}
          </h3>

          <p className="text-gray-600 mt-2">
            {property.agent?.phone}
          </p>

          <button className="w-full mt-6 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700">
            Contact Agent
          </button>

        </div>
      </div>
    </div>
  );
}