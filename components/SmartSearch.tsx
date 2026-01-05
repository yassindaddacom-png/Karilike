import React, { useState, useMemo } from 'react';
import { Search, Sparkles, Loader2, X, MapPin } from 'lucide-react';
import { searchPropertiesWithAI } from '../services/geminiService';
import { Property } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface SmartSearchProps {
  allProperties: Property[];
  onSearchResults: (results: Property[]) => void;
  onClear: () => void;
}

export const SmartSearch: React.FC<SmartSearchProps> = ({ allProperties, onSearchResults, onClear }) => {
  const [query, setQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [isAiMode, setIsAiMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();

  // Extract unique cities from properties
  const cities = useMemo(() => {
    const citySet = new Set<string>();
    allProperties.forEach(p => {
      // Assumes location format is like "District, City" or just "City"
      // We extract the last part as the city name
      const parts = p.location.split(',');
      const city = parts.length > 1 ? parts[parts.length - 1].trim() : p.location.trim();
      if (city) citySet.add(city);
    });
    return Array.from(citySet).sort();
  }, [allProperties]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() && !selectedCity) return;

    setLoading(true);
    
    // 1. Filter by City (Strict Filter)
    let filtered = allProperties;
    if (selectedCity) {
      filtered = filtered.filter(p => {
        const pCity = p.location.split(',').pop()?.trim() || p.location.trim();
        return pCity.toLowerCase() === selectedCity.toLowerCase();
      });
    }

    // 2. Apply Search Query
    if (query.trim()) {
      if (isAiMode) {
        // AI Search Logic: Use the filtered list context if possible, 
        // but for simplicity and better AI matching, we can ask AI to match against the filtered set 
        // or just let AI filter further.
        const matchedIds = await searchPropertiesWithAI(query, filtered);
        filtered = filtered.filter(p => matchedIds.includes(p.id));
      } else {
        // Basic Local Search Logic
        const lowerQ = query.toLowerCase();
        filtered = filtered.filter(p => 
          p.title.toLowerCase().includes(lowerQ) ||
          p.location.toLowerCase().includes(lowerQ) ||
          p.type.toLowerCase().includes(lowerQ)
        );
      }
    }
    
    onSearchResults(filtered);
    setLoading(false);
  };

  const clearSearch = () => {
    setQuery('');
    setSelectedCity('');
    onClear();
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSearch} className="relative group z-10">
        <div className={`
          relative flex items-center bg-white rounded-full shadow-lg border-2 transition-all duration-300
          ${isAiMode ? 'border-purple-400 ring-4 ring-purple-100' : 'border-transparent ring-4 ring-gray-100'}
        `}>
          {/* City Dropdown */}
          <div className="relative ps-4 pe-2 border-e border-gray-200 min-w-[140px] hidden sm:block">
            <MapPin size={18} className="absolute start-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full appearance-none bg-transparent ps-8 pe-4 py-4 outline-none text-gray-700 font-medium cursor-pointer focus:text-brand"
            >
              <option value="">{t('all_cities')}</option>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
            {/* Custom chevron or standard select behavior */}
          </div>

          <div className="ps-4 pe-2 text-gray-400 sm:hidden">
            {isAiMode ? <Sparkles className="text-purple-500 animate-pulse" size={20} /> : <Search size={20} />}
          </div>
          
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={isAiMode ? t('ai_search_placeholder') : t('search_placeholder')}
            className="flex-grow py-4 px-2 bg-transparent border-none focus:ring-0 text-gray-800 placeholder-gray-400 outline-none w-full"
          />

          {(query || selectedCity) && (
            <button 
              type="button" 
              onClick={clearSearch}
              className="p-2 text-gray-300 hover:text-gray-500 transition-colors"
            >
              <X size={18} />
            </button>
          )}

          <div className="pe-2 flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsAiMode(!isAiMode)}
              className={`
                hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors
                ${isAiMode ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}
              `}
            >
              <Sparkles size={12} />
              {t('ai_search_btn')}
            </button>
            
            <button
              type="submit"
              disabled={loading}
              className={`
                px-6 py-2 rounded-full font-medium text-white shadow-md transition-all
                ${isAiMode ? 'bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700' : 'bg-brand hover:bg-brand-dark'}
                disabled:opacity-70 disabled:cursor-not-allowed
              `}
            >
              {loading ? <Loader2 size={20} className="animate-spin" /> : t('search_btn')}
            </button>
          </div>
        </div>
        
        {/* Mobile City Select (Shown below search bar on mobile) */}
        <div className="mt-3 flex gap-2 sm:hidden">
            <div className="relative flex-grow bg-white rounded-full border border-gray-200 shadow-sm">
                <MapPin size={16} className="absolute start-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full appearance-none bg-transparent ps-9 pe-4 py-2 rounded-full outline-none text-sm text-gray-700 font-medium"
                >
                  <option value="">{t('all_cities')}</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
            </div>

             <button
              type="button"
              onClick={() => setIsAiMode(!isAiMode)}
              className={`
                flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors shadow-sm
                ${isAiMode ? 'bg-purple-100 text-purple-700' : 'bg-white border border-gray-200 text-gray-500'}
              `}
            >
              <Sparkles size={12} />
              {isAiMode ? t('ai_active') : t('enable_ai')}
            </button>
        </div>
      </form>
    </div>
  );
};