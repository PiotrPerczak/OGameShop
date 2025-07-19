
// Search bar component for live searching games from RAWG API
import React, { useState, useRef } from "react";
import type { Game } from "./ProductList";


// Props: callback for when a game is clicked in the search results
interface GameSearchBarProps {
  onGameClick: (game: Game) => void;
}


const GameSearchBar: React.FC<GameSearchBarProps> = ({ onGameClick }) => {
  // State for search input value
  const [query, setQuery] = useState("");
  // State for fetched search results
  const [results, setResults] = useState<Game[]>([]);
  // State for loading indicator
  const [loading, setLoading] = useState(false);
  // State for dropdown visibility
  const [showDropdown, setShowDropdown] = useState(false);
  // Ref for debounce timeout
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handles debounced search input and fetches games from API
  const handleSearch = (value: string) => {
    setQuery(value);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (value.length < 2) {
      setResults([]);
      setShowDropdown(false);
      return;
    }
    setLoading(true);
    timeoutRef.current = setTimeout(() => {
      fetch(
        `https://api.rawg.io/api/games?key=a9da7b7a0db84f3883518ed837145728&page_size=6&search=${encodeURIComponent(
          value
        )}`
      )
        .then((res) => res.json())
        .then((data) => {
          setResults(data.results || []);
          setShowDropdown(true);
        })
        .finally(() => setLoading(false));
    }, 400);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto mt-24 z-20">
      {/* Search input field */}
      <input
        type="text"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search for games..."
        className="w-full px-8 py-5 rounded-2xl bg-white/80 backdrop-blur-xl border-4 border-blue-400 shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-500 text-2xl font-semibold text-blue-900 placeholder:text-blue-400 transition-all duration-200"
        onFocus={() => query.length > 1 && setShowDropdown(true)}
        onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
      />
      {/* Dropdown with search results */}
      {showDropdown && results.length > 0 && (
        <div className="absolute left-0 right-0 mt-2 bg-white/80 backdrop-blur-lg rounded-xl shadow-2xl border border-gray-200 overflow-hidden animate-fade-in">
          {results.map((game) => (
            <button
              key={game.id}
              className="flex items-center w-full px-4 py-3 hover:bg-blue-50 transition text-left gap-4"
              onClick={() => onGameClick(game)}
              tabIndex={-1}
            >
              {/* Game image and name in result */}
              <img
                src={game.background_image}
                alt={game.name}
                className="w-14 h-14 object-cover rounded-lg border border-gray-200 shadow"
              />
              <span className="font-medium text-gray-900 text-lg truncate">
                {game.name}
              </span>
            </button>
          ))}
        </div>
      )}
      {/* Loading indicator */}
      {loading && (
        <div className="absolute left-0 right-0 mt-2 bg-white/80 rounded-xl shadow-2xl border border-gray-200 p-4 text-center text-gray-500">
          Loading...
        </div>
      )}
    </div>
  );
};

export default GameSearchBar;
