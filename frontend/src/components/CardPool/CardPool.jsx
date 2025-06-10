import { useState, useEffect } from "react";
import "./CardPool.css";
import FilterBar from "./FilterBar";
import CardGrid from "./CardGrid";

const CardPool = ({ cards, onSelect }) => {
  const [filteredCards, setFilteredCards] = useState([]);
  const [filters, setFilters] = useState({
    type: "",
    tribe: "",
    rarity: "",
    cardtype: "",
    sort: "",
    search: "",
    playcost: "",
  });
  const [cardSize, setCardSize] = useState(120);

  // Hilfsfunktion für Dropdowns (z. B. FilterBar)
  const uniqueValues = (key) => {
    const seen = new Set();
    cards.forEach((card) => {
      const value = card[key];
      if (Array.isArray(value)) value.forEach((v) => typeof v === "string" && seen.add(v.toLowerCase()));
      else if (typeof value === "string" || typeof value === "number") seen.add(value.toString().toLowerCase());
    });
    return [...seen].sort().map((val) => val.charAt(0).toUpperCase() + val.slice(1));
  };

  // Filter-Logik
  useEffect(() => {
    let result = [...cards];
    if (filters.search) result = result.filter((c) => c.name.toLowerCase().includes(filters.search.toLowerCase()));
    if (filters.type) result = result.filter((c) => Array.isArray(c.type) && c.type.some((t) => t.toLowerCase() === filters.type.toLowerCase()));
    if (filters.tribe) result = result.filter((c) => c.tribe?.toLowerCase() === filters.tribe.toLowerCase());
    if (filters.rarity) result = result.filter((c) => c.rarity === filters.rarity);
    if (filters.cardtype) result = result.filter((c) => c.cardtype === filters.cardtype);
    if (filters.playcost) result = result.filter((c) => c.playcost === Number(filters.playcost));
    if (filters.sort === "attack-asc") result.sort((a, b) => a.attack - b.attack);
    if (filters.sort === "attack-desc") result.sort((a, b) => b.attack - a.attack);
    setFilteredCards(result);
  }, [filters, cards]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      type: "",
      tribe: "",
      rarity: "",
      cardtype: "",
      playcost: "",
      sort: "",
    });
  };

  return (
    <div className="card-pool-container">
      <FilterBar
        filters={filters}
        cardSize={cardSize}
        onFilterChange={handleFilterChange}
        onCardSizeChange={setCardSize}
        uniqueValues={uniqueValues}
        onClearFilters={clearFilters}
      />
      <CardGrid cards={filteredCards} cardSize={cardSize} onSelect={onSelect} />
    </div>
  );
};

export default CardPool;
