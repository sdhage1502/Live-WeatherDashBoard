// SearchBar.jsx
import React, { useState, useEffect } from 'react';
import { Search, Clock, MapPin, X } from 'lucide-react';
import { useCitySuggestions } from '../api/useCitySuggestions';
import Card from './Card'; // Assuming Card.jsx is in the same directory or correctly aliased

const SearchBar = ({ onSelect }) => {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [lastCities, setLastCities] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const { suggestions, loading } = useCitySuggestions(inputValue);

  useEffect(() => {
    const storedCities = localStorage.getItem('lastCities');
    if (storedCities) {
      setLastCities(JSON.parse(storedCities));
    }
  }, []);

  const getLastCities = () => {
    const cities = localStorage.getItem('lastCities');
    return cities ? JSON.parse(cities) : [];
  };

  const saveLastCity = (cityName) => {
    let cities = getLastCities();
    cities = cities.filter((c) => c.toLowerCase() !== cityName.toLowerCase());
    cities.unshift(cityName);
    if (cities.length > 5) cities = cities.slice(0, 5);
    localStorage.setItem('lastCities', JSON.stringify(cities));
    setLastCities(cities);
  };

  const removeLastCity = (cityToRemove, e) => {
    e.stopPropagation();
    const cities = getLastCities().filter(city => city !== cityToRemove);
    localStorage.setItem('lastCities', JSON.stringify(cities));
    setLastCities(cities);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (city) => {
    const cityDisplay = `${city.name}${city.state ? ', ' + city.state : ''}, ${city.country}`;
    setInputValue(cityDisplay);
    setShowSuggestions(false);
    onSelect(city.name);
    saveLastCity(city.name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== '') {
      onSelect(inputValue.trim());
      saveLastCity(inputValue.trim());
      setShowSuggestions(false);
    }
  };

  const handleLastCityClick = (city) => {
    setInputValue(city);
    onSelect(city);
    setShowSuggestions(false);
  };

  const clearInput = () => {
    setInputValue('');
    setShowSuggestions(false);
  };

  return (
    <div className="space-y-4 z-50 relative">
      {/* Search Input */}
      <Card variant="glass" className="relative">
        <form onSubmit={handleSubmit} className="flex items-center p-2">
          <div className="flex items-center flex-1 gap-3">
            <Search className="w-5 h-5 text-slate-400 ml-2" />
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onFocus={() => {
                setIsFocused(true);
                setShowSuggestions(true);
              }}
              onBlur={() => {
                setIsFocused(false);
                setTimeout(() => setShowSuggestions(false), 150);
              }}
              placeholder="Search for a city..."
              className="flex-1 py-2 px-1 bg-transparent text-slate-200 placeholder-slate-500 focus:outline-none text-lg"
              autoComplete="off"
            />
            {inputValue && (
              <button
                type="button"
                onClick={clearInput}
                className="p-1 hover:bg-slate-700 rounded-full transition-colors"
              >
                <X className="w-4 h-4 text-slate-400" />
              </button>
            )}
          </div>
          {/* Removed the right side search icon button */}
        </form>

        {/* Suggestions Dropdown */}
        {showSuggestions && (inputValue.length > 0 || lastCities.length > 0) && (
          <div className="absolute top-full left-0 right-0 mt-2 z-10">
            <Card variant="solid" className="max-h-80 overflow-y-auto p-2"> 
              {/* Loading State */}
              {loading && inputValue && (
                <div className="p-4 text-center">
                  <div className="inline-flex items-center gap-2 text-slate-400 ">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent " ></div>
                    Searching...
                  </div>
                </div>
              )}

              {/* Recent Cities */}
              {!inputValue && lastCities.length > 0 && (
                <> {/* Use fragment to group header and list */}
                  <div className="flex items-center gap-2 px-3 py-2 text-xs font-semibold uppercase text-slate-400 border-b border-slate-700/50 mb-2"> {/* Improved header style */}
                    <Clock className="w-4 h-4" />
                    Recent searches
                  </div>
                  <div className="space-y-1"> {/* Added space-y for list items */}
                    {lastCities.map((city, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleLastCityClick(city)}
                        className="w-full flex items-center justify-between px-3 py-2 hover:bg-slate-700 rounded-lg transition-colors group text-left" // Added text-left for consistency
                      >
                        <div className="flex items-center gap-3">
                          <MapPin className="w-4 h-4 text-slate-400" />
                          <span className="text-slate-200">{city}</span>
                        </div>
                        <button
                          onClick={(e) => removeLastCity(city, e)}
                          className="opacity-0 group-hover:opacity-100 p-1 hover:bg-slate-600 rounded transition-all"
                        >
                          <X className="w-3 h-3 text-slate-400" />
                        </button>
                      </button>
                    ))}
                  </div>
                  {suggestions.length > 0 && <hr className="my-2 border-slate-700/30" />} {/* Divider if suggestions follow */}
                </>
              )}

              {/* City Suggestions */}
              {!loading && inputValue && suggestions.length > 0 && (
                <> {/* Use fragment to group header and list */}
                  <div className="flex items-center gap-2 px-3 py-2 text-xs font-semibold uppercase text-slate-400 border-b border-slate-700/50 mb-2"> {/* Improved header style */}
                    <Search className="w-4 h-4" />
                    Search results
                  </div>
                  <div className="space-y-1"> {/* Added space-y for list items */}
                    {suggestions.map((city, index) => (
                      <button
                        key={`${city.name}-${index}`}
                        onClick={() => handleSuggestionClick(city)}
                        className="w-full flex items-center gap-3 px-3 py-2 hover:bg-slate-700 rounded-lg transition-colors text-left"
                      >
                        <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                        <div>
                          <div className="text-slate-200 font-medium">
                            {city.name}
                          </div>
                          <div className="text-sm text-slate-400">
                            {city.state ? `${city.state}, ` : ''}{city.country}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </>
              )}

              {/* No Results */}
              {!loading && inputValue && suggestions.length === 0 && (
                <div className="p-4 text-center text-slate-400">
                  <MapPin className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>No cities found</p>
                  <p className="text-sm">Try a different search term</p>
                </div>
              )}
            </Card>
          </div>
        )}
      </Card>

      {/* Quick Access Cities (when not focused) */}
      {!isFocused && lastCities.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-slate-400 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Recent:
          </span>
          {lastCities.slice(0, 3).map((city, idx) => (
            <button
              key={idx}
              onClick={() => handleLastCityClick(city)}
              className="inline-flex items-center gap-1 px-3 py-1 bg-slate-700/60 backdrop-blur-sm rounded-full text-sm text-slate-300 hover:bg-slate-700/80 transition-all hover:scale-105"
            >
              <MapPin className="w-3 h-3" />
              {city}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;