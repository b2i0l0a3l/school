"use client";

import { Search, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

interface SearchInputProps {
  placeholder?: string;
  debounceMs?: number;
  onSearch: (value: string) => void;
  defaultValue?: string;
  className?: string;
  autoFocus?: boolean;
}

export default function SearchInput({
  placeholder = "بحث...",
  debounceMs = 300,
  onSearch,
  defaultValue = "",
  className = "",
  autoFocus = false,
}: SearchInputProps) {
  const [query, setQuery] = useState(defaultValue);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);
  const [isFocused, setIsFocused] = useState(false);

  const debouncedSearch = useCallback(
    (value: string) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        onSearch(value.trim());
      }, debounceMs);
    },
    [onSearch, debounceMs],
  );

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  const handleClear = () => {
    setQuery("");
    onSearch("");
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      handleClear();
    }
  };

  return (
    <div 
      className={`relative flex items-center w-full max-w-sm transition-all duration-300 ${isFocused ? 'scale-[1.02]' : ''} ${className}`}
    >
      <div 
        className={`absolute inset-0 rounded-full transition-all duration-300 pointer-events-none
          ${isFocused ? 'ring-2 ring-indigo-500/50 bg-slate-800/80 shadow-[0_0_15px_rgba(99,102,241,0.2)]' : 'ring-1 ring-slate-700/50 bg-slate-900/60 hover:ring-slate-600/50 hover:bg-slate-800/60'}`}
      />
      
      <span className={`absolute right-4 transition-colors duration-300 ${isFocused ? 'text-indigo-400' : 'text-slate-400'}`}>
        <Search size={18} strokeWidth={2.5} />
      </span>
      
      <input
        ref={inputRef}
        type="text"
        className="w-full py-2.5 pr-12 pl-10 bg-transparent text-slate-100 placeholder:text-slate-500 text-sm focus:outline-none relative z-10"
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        autoFocus={autoFocus}
        aria-label={placeholder}
      />
      
      {query && (
        <button
          className="absolute left-3 w-6 h-6 flex justify-center items-center rounded-full text-slate-400 hover:text-slate-100 hover:bg-slate-700/50 transition-colors z-10"
          onClick={handleClear}
          aria-label="مسح البحث"
          type="button"
        >
          <X size={14} strokeWidth={3} />
        </button>
      )}
    </div>
  );
}
