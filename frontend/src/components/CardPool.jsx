import { useState, useEffect } from "react";
import "./CardPool.css";

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
  const [cardSize, setCardSize] = useState(120); // Standardgrösse 120px

  // Hier werden einzigarte Werte extrahiert
  const uniqueValues = (key) => {
    const seen = new Set();

    cards.forEach((card) => {
      const value = card[key];

      if (Array.isArray(value)) {
        value.forEach((v) => {
          if (typeof v === "string") {
            seen.add(v.toLowerCase());
          }
        });
      } else if (typeof value === "string") {
        seen.add(value.toLowerCase());
      } else if (typeof value === "number") {
        seen.add(value);
      }
    });

    const sorted = [...seen].sort((a, b) => {
      if (typeof a === "number" && typeof b === "number") {
        return a - b; // 🔥 numerisch korrekt
      }
      return String(a).localeCompare(String(b)); // fallback für Strings
    });

    return sorted.map((val) => {
      if (typeof val === "string") {
        return val.charAt(0).toUpperCase() + val.slice(1);
      } else {
        return val;
      }
    });
  };

  useEffect(() => {
    let result = [...cards];

    if (filters.search) {
      result = result.filter((card) => card.name.toLowerCase().includes(filters.search.toLowerCase()));
    }

    if (filters.type) {
      result = result.filter((card) => {
        const type = card.type;

        if (Array.isArray(type)) {
          return type.some((t) => t.toLowerCase() === filters.type.toLowerCase());
        }

        if (typeof type === "string") {
          return type.toLowerCase() === filters.type.toLowerCase();
        }
        return false;
      });
    }

    if (filters.tribe) {
      result = result.filter((card) => typeof card.tribe === "string" && card.tribe.toLowerCase() === filters.tribe.toLowerCase());
    }

    if (filters.rarity) result = result.filter((card) => card.rarity === filters.rarity);
    if (filters.cardtype) result = result.filter((card) => card.cardtype === filters.cardtype);
    if (filters.playcost !== "") {
      result = result.filter((card) => card.playcost === Number(filters.playcost));
    }
    if (filters.sort === "attack-asc") {
      result.sort((a, b) => a.attack - b.attack);
    } else if (filters.sort === "attack-desc") {
      result.sort((a, b) => b.attack - a.attack);
    }
    setFilteredCards(result);
  }, [filters, cards]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  if (cards.length === 0) {
    return <p>Loading cardpool...</p>;
  }

  return (
    <div className="card-pool-container">
      <div className="card-pool-header">
        <div className="filter-bar">
          <div className="card-size-slider">
            <input
              type="text"
              className="filter-search"
              name="search"
              placeholder="Search cardname..."
              value={filters.search}
              onChange={handleChange}
            />

            <input
              className="card-size-range"
              type="range"
              id="cardSize"
              name="cardSize"
              min="80"
              max="200"
              step="10"
              value={cardSize}
              onChange={(e) => setCardSize(Number(e.target.value))}
            />
          </div>

          <select name="type" onChange={handleChange}>
            <option value="">All Types</option>
            {uniqueValues("type").map((val) => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
          </select>

          <select name="tribe" onChange={handleChange}>
            <option value="">All Tribes</option>
            {uniqueValues("tribe").map((val) => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
          </select>

          <select name="rarity" onChange={handleChange}>
            <option value="">All Rarities</option>
            {uniqueValues("rarity").map((val) => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
          </select>

          <select name="cardtype" onChange={handleChange}>
            <option value="">All Cardtypes</option>
            {uniqueValues("cardtype").map((val) => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
          </select>

          <select name="playcost" onChange={handleChange}>
            <option value="">All Playcosts</option>
            {uniqueValues("playcost").map((val) => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
          </select>

          <select name="sort" onChange={handleChange}>
            <option value="">Sort by</option>
            <option value="attack-asc">Attack Ascending</option>
            <option value="attack-desc">Attack Descending</option>
          </select>
        </div>
      </div>
      <div className="cards-container" style={{ "--card-size": `${cardSize}px` }}>
        {filteredCards.map((card) => (
          <div key={card.cardID} className="card" onClick={() => onSelect(card)}>
            <img src={card.imgURL} alt={card.name} className="img-pool" style={{ width: "100%" }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardPool;
