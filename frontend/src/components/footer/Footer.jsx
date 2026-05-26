export default function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-primary text-white">

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">

        <div className="md:col-span-2">

          <div className="font-display text-2xl text-gold">
            ZoiHouse LLC
          </div>

          <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70">
            A boutique Texas brokerage helping
            families and investors find homes.
          </p>
        </div>

        <div>
          <div className="mb-3 text-sm font-semibold text-gold">
            Explore
          </div>

          <ul className="space-y-2 text-sm text-white/70">
            <li>Listings</li>
            <li>Our Team</li>
            <li>Contact</li>
          </ul>
        </div>

        <div>
          <div className="mb-3 text-sm font-semibold text-gold">
            Contact
          </div>

          <ul className="space-y-2 text-sm text-white/70">
            <li>info@zoihouse.com</li>
            <li>(555) 010-2030</li>
            <li>Texas, USA</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs text-white/50">
        © 2026 ZoiHouse LLC.
      </div>
    </footer>
  );
}