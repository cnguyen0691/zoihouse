import ListingsHero from "../components/listings/ListingsHero";
import ListingsFilters from "../components/listings/ListingsFilters";
import ListingsGrids from "../components/listings/ListingsGrids";

export default function Listings() {
  return (
    <div>
      <ListingsHero />
      <ListingsFilters />
      <ListingsGrids />
    </div>
  );
}