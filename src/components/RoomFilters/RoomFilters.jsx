import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import "./RoomFilters.css";

function RoomFilters({ onFilterChange }) {
  const [sortBy, setSortBy] = useState("default");
  const [guestCount, setGuestCount] = useState("all");

  const handleSortChange = (value) => {
    setSortBy(value);
    onFilterChange?.({ sortBy: value, guestCount });
  };

  const handleGuestChange = (value) => {
    setGuestCount(value);
    onFilterChange?.({ sortBy, guestCount: value });
  };

  return (
    <div className="room-filters">
      <div className="room-filters-heading">
        <SlidersHorizontal size={20} />
        <h3>Filter Rooms</h3>
      </div>

      <div className="room-filter-group">
        <label htmlFor="guest-filter">Guests</label>
        <select
          id="guest-filter"
          value={guestCount}
          onChange={(e) => handleGuestChange(e.target.value)}
        >
          <option value="all">All Guests</option>
          <option value="1">1 or more guests</option>
          <option value="2">2 or more guests</option>
          <option value="3">3 or more guests</option>
          <option value="4">4 or more guests</option>
        </select>
      </div>

      <div className="room-filter-group">
        <label htmlFor="sort-filter">Sort By</label>
        <select
          id="sort-filter"
          value={sortBy}
          onChange={(e) => handleSortChange(e.target.value)}
        >
          <option value="default">Default</option>
          <option value="low-to-high">Price: Low to High</option>
          <option value="high-to-low">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
}

export default RoomFilters;