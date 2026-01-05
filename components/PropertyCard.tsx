import React from 'react';
import { Property } from '../types';
import { MapPin, BedDouble, Bath, Square, User, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

interface PropertyCardProps {
  property: Property;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const { t } = useLanguage();
  return (
    <Link to={`/property/${property.id}`} className="group block bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={property.images[0]} 
          alt={property.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 end-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-brand-dark shadow-sm">
          {property.type}
        </div>
        {property.isFeatured && (
          <div className="absolute top-3 start-3 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold shadow-sm">
            {t('featured')}
          </div>
        )}
        {property.images.length > 1 && (
          <div className="absolute bottom-3 end-3 bg-black/50 text-white px-2 py-1 rounded-lg text-xs flex items-center gap-1 backdrop-blur-sm">
            <ImageIcon size={12} />
            {property.images.length}
          </div>
        )}
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-brand transition-colors">
              {property.title}
            </h3>
            <div className="flex items-center text-gray-500 text-sm mt-1">
              <MapPin size={14} className="me-1" />
              {property.location}
            </div>
          </div>
          <div className="text-end">
            <div className="text-xl font-bold text-brand">{property.price} <span className="text-sm">{t('currency')}</span></div>
            <div className="text-xs text-gray-400">{t('per_month')}</div>
          </div>
        </div>
        
        <div className="mt-4 flex items-center justify-between text-gray-500 text-sm border-t border-gray-100 pt-4">
          <div className="flex items-center gap-1" title="Bedrooms">
            <BedDouble size={16} />
            <span>{property.bedrooms}</span>
          </div>
          <div className="flex items-center gap-1" title="Bathrooms">
            <Bath size={16} />
            <span>{property.bathrooms}</span>
          </div>
          <div className="flex items-center gap-1" title="Square Feet">
            <Square size={16} />
            <span>{property.sqft} {t('sqft')}</span>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
           <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
             <User size={12}/>
           </div>
           <span>{t('listed_by')} {property.ownerName}</span>
        </div>
      </div>
    </Link>
  );
};