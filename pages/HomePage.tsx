import React, { useState } from 'react';
import { MOCK_PROPERTIES } from '../constants';
import { Property, PropertyType } from '../types';
import { PropertyCard } from '../components/PropertyCard';
import { SmartSearch } from '../components/SmartSearch';
import { ShieldCheck, Wallet, MessageSquare, Building2, Home, Users, Armchair } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const HomePage: React.FC = () => {
  const [displayedProperties, setDisplayedProperties] = useState<Property[]>(MOCK_PROPERTIES);
  const [isFiltered, setIsFiltered] = useState(false);
  const [activeCategory, setActiveCategory] = useState<PropertyType | null>(null);
  const { t } = useLanguage();

  const categories = [
    { type: PropertyType.APARTMENT, label: t('cat_apartments'), icon: Building2 },
    { type: PropertyType.HOUSE, label: t('cat_houses'), icon: Home },
    { type: PropertyType.ROOM, label: t('cat_rooms'), icon: Users },
    { type: PropertyType.STUDIO, label: t('cat_studios'), icon: Armchair },
  ];

  const handleSearchResults = (results: Property[]) => {
    setDisplayedProperties(results);
    setIsFiltered(true);
    setActiveCategory(null);
  };

  const handleClearSearch = () => {
    setDisplayedProperties(MOCK_PROPERTIES);
    setIsFiltered(false);
    setActiveCategory(null);
  };

  const handleCategoryClick = (type: PropertyType) => {
    if (activeCategory === type) {
      setActiveCategory(null);
      setDisplayedProperties(MOCK_PROPERTIES);
      setIsFiltered(false);
    } else {
      setActiveCategory(type);
      setDisplayedProperties(MOCK_PROPERTIES.filter(p => p.type === type));
      setIsFiltered(true);
    }
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-blue-50 -z-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 lg:pt-32 lg:pb-24 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
            {t('hero_title_1')}<br />
            <span className="text-brand">{t('hero_title_2')}</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-gray-600 mb-10">
            {t('hero_subtitle')}
          </p>
          
          <SmartSearch 
            allProperties={MOCK_PROPERTIES} 
            onSearchResults={handleSearchResults} 
            onClear={handleClearSearch}
          />

          <div className="mt-8 flex flex-wrap justify-center gap-3 sm:gap-4">
            {categories.map((cat) => (
              <button
                key={cat.type}
                onClick={() => handleCategoryClick(cat.type)}
                className={`flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full font-medium transition-all shadow-sm text-sm sm:text-base ${
                  activeCategory === cat.type
                    ? 'bg-brand text-white ring-2 ring-brand-light ring-offset-2'
                    : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-brand border border-gray-200'
                }`}
              >
                <cat.icon size={18} />
                {cat.label}
              </button>
            ))}
          </div>
          
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-gray-500">
             <div className="flex items-center gap-2">
               <ShieldCheck className="text-brand" size={20} />
               <span className="font-medium">{t('verified_owners')}</span>
             </div>
             <div className="flex items-center gap-2">
               <Wallet className="text-brand" size={20} />
               <span className="font-medium">{t('zero_brokerage')}</span>
             </div>
             <div className="flex items-center gap-2">
               <MessageSquare className="text-brand" size={20} />
               <span className="font-medium">{t('direct_chat')}</span>
             </div>
          </div>
        </div>
      </section>

      {/* Listings Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              {isFiltered ? t('search_results') : t('featured_properties')}
            </h2>
            <p className="text-gray-500 mt-2">
              {isFiltered 
                ? t('found_properties', {count: displayedProperties.length})
                : t('handpicked')
              }
            </p>
          </div>
          {isFiltered && (
            <button 
              onClick={handleClearSearch}
              className="text-brand font-medium hover:underline"
            >
              {t('show_all')}
            </button>
          )}
        </div>

        {displayedProperties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedProperties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <div className="text-gray-300 mb-4">
              <SearchIconLarge />
            </div>
            <h3 className="text-xl font-bold text-gray-900">{t('no_properties')}</h3>
            <p className="text-gray-500 mt-2">{t('try_adjusting')}</p>
            <button 
              onClick={handleClearSearch}
              className="mt-6 px-6 py-2 bg-brand text-white rounded-full font-medium hover:bg-brand-dark transition-colors"
            >
              {t('clear_filters')}
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

const SearchIconLarge = () => (
  <svg className="w-24 h-24 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);