import React from "react";
import "./FilterBar.css";

const FilterBar = ({ filters, cardSize, onFilterChange, onCardSizeChange, uniqueValues, onClearFilters }) => (
  <div className="filter-bar">
    <div className="card-size-slider">
      <input type="text" className="filter-search" name="search" placeholder="Search cardname..." value={filters.search} onChange={onFilterChange} />
      <input
        className="card-size-range"
        type="range"
        min="80"
        max="200"
        step="10"
        value={cardSize}
        onChange={(e) => onCardSizeChange(Number(e.target.value))}
      />
    </div>

    {["type", "tribe", "rarity", "cardtype", "playcost"].map((filterKey) => (
      <select key={filterKey} name={filterKey} value={filters[filterKey] || ""} onChange={onFilterChange}>
        <option value="">All {filterKey.charAt(0).toUpperCase() + filterKey.slice(1)}s</option>
        {[...uniqueValues(filterKey)]
          .sort((a, b) => (filterKey === "playcost" ? a - b : String(a).localeCompare(String(b))))
          .map((val) => (
            <option key={val} value={val}>
              {val}
            </option>
          ))}
      </select>
    ))}

    <select name="sort" value={filters.sort || ""} onChange={onFilterChange}>
      <option value="">Sort by</option>
      <option value="attack-asc">Attack Ascending</option>
      <option value="attack-desc">Attack Descending</option>
    </select>

    <button onClick={onClearFilters}>Clear all Filters</button>
  </div>
);

export default FilterBar;
