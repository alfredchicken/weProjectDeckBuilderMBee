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
  });

  // Hier werden einzigarte Werte extrahiert
  const uniqueValues = (key) => {
    const normalized = cards
      .map((card) => {
        const value = card[key];
        return typeof value === "string" ? value.toLowerCase() : null;
      })
      .filter(Boolean); // entfernt null,undefinde und leere Strings

    const unique = [...new Set(normalized)];

    //hübsch machen: Alles lowercase zu erster Buchstaben gross
    return unique.map((val) => val.charAt(0).toUpperCase() + val.slice(1));
  };

  useEffect(() => {
    let result = [...cards];

    if (filters.search) {
      result = result.filter((card) => card.name.toLowerCase().includes(filters.search.toLowerCase()));
    }

    if (filters.type) result = result.filter((card) => card.type === filters.type);
    if (filters.tribe) result = result.filter((card) => card.tribe === filters.tribe);
    if (filters.rarity) result = result.filter((card) => card.rarity === filters.rarity);
    if (filters.cardtype) result = result.filter((card) => card.cardtype === filters.cardtype);

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
      <h2>Card Pool</h2>

      <div className="filter-bar">
        <input type="text" name="search" placeholder="Search cardname..." value={filters.search} onChange={handleChange} />

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

        <select name="sort" onChange={handleChange}>
          <option value="">Sort by</option>
          <option value="attack-asc">Attack Ascending</option>
          <option value="attack-desc">Attack Descending</option>
        </select>
      </div>

      <div className="cards-container">
        {filteredCards.map((card) => (
          <div key={card.cardID} className="card" onClick={() => onSelect(card)}>
            <img src={card.imgURL} alt={card.name} className="img-pool" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardPool;
