import {
  House,
  Menu
} from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-white/85 backdrop-blur-md">

      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">

        <a
          href="/"
          className="flex items-center gap-2.5"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-gold">

            <House className="h-5 w-5" />
          </div>

          <div className="leading-tight">
            <div className="font-display text-lg font-semibold text-primary">
              ZoiHouse
            </div>

            <div className="-mt-0.5 text-[10px] uppercase tracking-[0.2em] text-slate-500">
              LLC · Realty
            </div>
          </div>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          <a href="/">Home</a>
          <a href="/listings">Listings</a>
          <a href="/">Our Team</a>
          <a href="/contact">Contact</a>
        </nav>

        <a className="hidden rounded-md bg-primary px-4 py-2 text-sm text-white md:block" href="/signin">
           Sign in
        </a>

        <button className="md:hidden">
          <Menu />
        </button>
      </div>
    </header>
  );
}