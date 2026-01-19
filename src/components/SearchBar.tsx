import { useState } from "react";
import { Search, Sparkles } from "lucide-react";

interface SearchBarProps {
  onSearch: (city: string) => void;
  isLoading: boolean;
}

const SearchBar = ({ onSearch, isLoading }: SearchBarProps) => {
  const [city, setCity] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full animate-fade-in">
      <div className={`flex gap-3 p-2 rounded-2xl transition-all duration-300 ${
        isFocused ? 'bg-white/50 shadow-glow' : 'bg-transparent'
      }`}>
        <div className="relative flex-1">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-primary/10">
            <Search className="h-5 w-5 text-primary" />
          </div>
          <input
            type="text"
            placeholder="Search for a city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="w-full pl-16 pr-4 h-14 text-lg rounded-xl input-glass focus:outline-none text-foreground placeholder:text-muted-foreground font-medium"
            disabled={isLoading}
          />
        </div>
        <button 
          type="submit" 
          disabled={isLoading || !city.trim()}
          className="h-14 px-8 rounded-xl text-lg font-semibold btn-gradient text-white disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2"
        >
          <Sparkles className="h-5 w-5" />
          <span className="hidden sm:inline">Get Weather</span>
          <span className="sm:hidden">Go</span>
        </button>
      </div>
    </form>
  );
};

export default SearchBar;