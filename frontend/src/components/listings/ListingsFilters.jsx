export default function ListingsFilters() {
  return (
    <div className="sticky top-[73px] z-30 -mx-4 mb-8 grid gap-3 border-y border-border bg-background/85 px-4 py-4 backdrop-blur sm:mx-0 sm:grid-cols-4 sm:rounded-lg sm:border">

      <input
        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring md:text-sm sm:col-span-2"
        placeholder="Search city or address"
      />

      <select className="h-9 rounded-md border border-input bg-transparent px-3 text-sm">
        <option>Property Type</option>
        <option>House</option>
        <option>Condo</option>
        <option>Townhome</option>
      </select>

      <select className="h-9 rounded-md border border-input bg-transparent px-3 text-sm">
        <option>Price Range</option>
        <option>$100k - $300k</option>
        <option>$300k - $500k</option>
        <option>$500k+</option>
      </select>
    </div>
  );
}