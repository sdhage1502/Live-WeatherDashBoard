
import { useState, useEffect } from 'react';

const API_KEY = '2127ab3228dfa393b06afb6960bf4780'; // Replace with your API key
const API_URL = 'https://api.openweathermap.org/geo/1.0/direct';

export function useCitySuggestions(query, limit = 5) {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    const controller = new AbortController();
    const signal = controller.signal;

    const fetchSuggestions = async () => {
      setLoading(true);
      try {
        const url = `${API_URL}?q=${encodeURIComponent(query)}&limit=${limit}&appid=${API_KEY}`;
        const response = await fetch(url, { signal });
        const data = await response.json();

        if (Array.isArray(data)) {
          setSuggestions(
            data.map(({ name, state, country }) => ({
              name,
              state: state || '',
              country,
            }))
          );
        } else {
          setSuggestions([]);
        }
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Error fetching city suggestions:', error);
          setSuggestions([]);
        }
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(fetchSuggestions, 300);

    return () => {
      clearTimeout(debounce);
      controller.abort();
    };
  }, [query, limit]);

  return { suggestions, loading };
}
