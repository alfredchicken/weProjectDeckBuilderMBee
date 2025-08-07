import React from "react";
import "./FilterBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateLeft } from "@fortawesome/free-solid-svg-icons";

const FilterBar = ({ filters, cardSize, onFilterChange, onCardSizeChange, uniqueValues, onClearFilters }) => (
    <div className="filter-bar">
      <div className="card-size-slider">
        <input
          type="text"
          className="filter-search"
          name="search"
          placeholder="Search cardname..."
          value={filters.search}
          onChange={onFilterChange}
        />
        <div className="card-size-controls">
          <button title="Image Size -"onClick={() => onCardSizeChange(Math.max(cardSize - 10, 80))}>−</button>
          <button title="Image Size +" onClick={() => onCardSizeChange(Math.min(cardSize + 10, 200))}>+</button>
        </div>
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
        <option value="playcost">Playcost</option>
      </select>

      <button title="Reset Filters" onClick={onClearFilters}>
        {" "}
        <FontAwesomeIcon icon={faArrowRotateLeft} />
      </button>
    </div>
);

export default FilterBar;
