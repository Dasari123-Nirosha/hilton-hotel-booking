
import { Search } from "lucide-react";
import "./SearchBar.css";

function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="rooms-search">
      <Search size={20} />
      <input
        type="text"
        placeholder="Search rooms by name or category..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
