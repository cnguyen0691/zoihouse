import {
  Search,
  ShieldCheck,
  Award,
  Users,
  ArrowRight,
  Bed,
  Bath,
  Square,
} from "lucide-react";

import { useEffect, useState } from "react";

export default function HomePage() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/listings")
      .then((res) => res.json())
      .then((data) => {
        setListings(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {/* HERO */}

      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src="/hero-home.jpg"
            alt=""
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/30" />
        </div>

        <div className="mx-auto max-w-7xl px-4 py-28 sm:px-6 sm:py-36 lg:py-44">
          <div className="max-w-2xl text-white">
            <span className="inline-flex items-center rounded-full border border-gold/40 bg-primary/40 px-3 py-1 text-xs font-medium uppercase tracking-widest text-gold">
              Boutique Texas Brokerage
            </span>

            <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.05] sm:text-6xl lg:text-7xl">
              Find a home
              <br />
              you'll love coming home to.
            </h1>

            <p className="mt-6 max-w-lg text-lg text-white/80">
              ZoiHouse LLC pairs you with seasoned,
              licensed Texas realtors who know your
              neighborhood and negotiate like it's
              their own.
            </p>

            <form className="mt-8 flex max-w-md gap-2 rounded-full bg-white p-2 shadow-elegant">
              <div className="flex flex-1 items-center gap-2 px-3">
                <Search className="h-4 w-4 text-slate-500" />

                <input
                  placeholder="City, address, or ZIP"
                  className="w-full border-0 bg-transparent outline-none"
                />
              </div>

              <button className="rounded-full bg-primary px-6 py-2 text-white">
                Search
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FEATURES */}

      <section className="border-y border-border bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:grid-cols-3 sm:px-6">
          <Feature
            icon={<ShieldCheck />}
            title="Licensed Brokerage"
            text="TREC-licensed and fully insured"
          />

          <Feature
            icon={<Award />}
            title="Local Expertise"
            text="Decades of combined Texas experience"
          />

          <Feature
            icon={<Users />}
            title="Personal Service"
            text="Boutique team, never a call center"
          />
        </div>
      </section>

      {/* LISTINGS */}

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Just Listed
            </div>

            <h2 className="mt-2 font-display text-4xl font-semibold text-primary">
              Recently Added
            </h2>
          </div>
        </div>

        {loading ? (
          <div className="text-center text-slate-500">
            Loading listings...
          </div>
        ) : listings.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border bg-slate-50 p-12 text-center text-slate-500">
            No listings found.
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {listings.map((listing) => (
              <div
                key={listing.id}
                className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <img
                  src={listing.images?.[0]}
                  alt={listing.title}
                  className="h-60 w-full object-cover"
                />

                <div className="p-5">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      {listing.status}
                    </span>

                    <span className="text-2xl font-bold text-primary">
                      ${listing.price?.toLocaleString()}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-slate-800">
                    {listing.title}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {listing.address?.city},{" "}
                    {listing.address?.state}
                  </p>

                  <div className="mt-4 flex items-center gap-4 text-sm text-slate-600">
                    <div className="flex items-center gap-1">
                      <Bed className="h-4 w-4" />
                      {listing.details?.beds} Beds
                    </div>

                    <div className="flex items-center gap-1">
                      <Bath className="h-4 w-4" />
                      {listing.details?.baths} Baths
                    </div>

                    <div className="flex items-center gap-1">
                      <Square className="h-4 w-4" />
                      {listing.details?.sqft} sqft
                    </div>
                  </div>

                  <button className="mt-6 w-full rounded-lg bg-primary py-3 text-white transition hover:bg-primary/90">
                    View Property
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* CTA */}

      <section className="bg-gradient-hero">
        <div className="mx-auto max-w-7xl px-4 py-20 text-center text-white sm:px-6">
          <h2 className="font-display text-4xl font-semibold sm:text-5xl">
            Ready to make a move?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-white/75">
            Tell us what you're looking for and a
            ZoiHouse realtor will reach out personally.
          </p>

          <button className="mt-8 inline-flex items-center rounded-md bg-gold px-5 py-3 text-primary">
            Get in touch

            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>
      </section>
    </>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div className="flex items-start gap-3">
      <div className="rounded-md bg-primary/5 p-2 text-gold">
        {icon}
      </div>

      <div>
        <div className="font-semibold">
          {title}
        </div>

        <div className="text-sm text-slate-500">
          {text}
        </div>
      </div>
    </div>
  );
}