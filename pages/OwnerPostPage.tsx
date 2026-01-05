import React, { useState, useRef, useEffect } from 'react';
import { generateListingDescription } from '../services/geminiService';
import { Sparkles, Loader2, CheckCircle, Upload, X, User, Mail, Phone, Plus } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

export const OwnerPostPage: React.FC = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    listingType: 'Rent',
    title: '',
    type: 'Apartment',
    location: '',
    price: '',
    features: '',
    description: '',
    images: [] as string[],
    ownerName: '',
    ownerContact: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useLanguage();

  // Auto-fill user details if logged in
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        ownerName: user.name,
        // Prefer phone if available, else email
        ownerContact: user.phone || user.email
      }));
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // Fix: Cast file to File to avoid "unknown" type error in some TS environments
      const newImages = Array.from(e.target.files).map(file => URL.createObjectURL(file as File));
      setFormData(prev => ({ ...prev, images: [...prev.images, ...newImages] }));
    }
  };

  const removeImage = (indexToRemove: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleGenerateDescription = async () => {
    if (!formData.features || !formData.location) {
      alert("Please enter Location and Key Features first.");
      return;
    }
    
    setIsGenerating(true);
    // Include listingType in the type parameter for better context
    const description = await generateListingDescription(
      `${formData.listingType} ${formData.type}`, 
      formData.location, 
      formData.features
    );
    setFormData(prev => ({ ...prev, description }));
    setIsGenerating(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.images.length === 0) {
      alert("Please upload at least one photo.");
      return;
    }

    // Generate a unique ID for the property
    const propertyId = crypto.randomUUID();
    
    // Create the full property data object
    const propertyData = {
      id: propertyId,
      ...formData,
      amenities: formData.features.split(',').map(f => f.trim()).filter(Boolean),
      price: Number(formData.price),
      ownerId: user?.id || undefined // Associate with user if logged in, otherwise undefined
    };

    // Log the data to demonstrate storage/submission
    console.log("Property Submitted:", propertyData);

    // In a real app, this would send data to backend
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-4">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
          <CheckCircle size={32} />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-2">{t('listing_submitted')}</h2>
        <p className="text-gray-500 text-center max-w-md mb-8">
          {t('listing_submitted_desc')}
        </p>
        <button 
          onClick={() => {
            setIsSubmitted(false);
            setFormData({
              listingType: 'Rent',
              title: '',
              type: 'Apartment',
              location: '',
              price: '',
              features: '',
              description: '',
              images: [],
              ownerName: user?.name || '',
              ownerContact: user?.phone || user?.email || ''
            });
          }}
          className="px-8 py-3 bg-brand text-white rounded-full font-medium hover:bg-brand-dark"
        >
          {t('post_another')}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-gray-900">{t('list_your_property')}</h1>
        <p className="text-gray-500 mt-2">{t('connect_tenants')}</p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-gray-50 px-8 py-4 border-b border-gray-100 flex items-center gap-2">
           <div className="w-8 h-8 rounded-full bg-brand text-white flex items-center justify-center font-bold text-sm">1</div>
           <span className="font-semibold text-gray-700">{t('property_details')}</span>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          
          {/* Listing Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t('i_want_to')}</label>
            <div className="grid grid-cols-2 gap-4">
              <label 
                className={`relative flex items-center justify-center px-4 py-3 rounded-xl border cursor-pointer transition-all ${
                  formData.listingType === 'Rent' 
                    ? 'border-brand bg-brand-50 text-brand font-bold ring-1 ring-brand' 
                    : 'border-gray-200 hover:border-brand-light hover:bg-gray-50 text-gray-600'
                }`}
              >
                <input 
                  type="radio" 
                  name="listingType" 
                  value="Rent" 
                  checked={formData.listingType === 'Rent'} 
                  onChange={handleInputChange} 
                  className="hidden" 
                />
                {t('rent')}
              </label>
              <label 
                className={`relative flex items-center justify-center px-4 py-3 rounded-xl border cursor-pointer transition-all ${
                  formData.listingType === 'Lease' 
                    ? 'border-brand bg-brand-50 text-brand font-bold ring-1 ring-brand' 
                    : 'border-gray-200 hover:border-brand-light hover:bg-gray-50 text-gray-600'
                }`}
              >
                <input 
                  type="radio" 
                  name="listingType" 
                  value="Lease" 
                  checked={formData.listingType === 'Lease'} 
                  onChange={handleInputChange} 
                  className="hidden" 
                />
                {t('lease')}
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('property_type')}</label>
              <select 
                name="type" 
                value={formData.type}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand focus:border-transparent outline-none bg-white"
              >
                <option>Apartment</option>
                <option>House</option>
                <option>Studio</option>
                <option>Shared Room</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">{t('monthly_price')}</label>
              <input 
                type="number" 
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand focus:border-transparent outline-none"
                placeholder="2500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('location')}</label>
            <input 
              type="text" 
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand focus:border-transparent outline-none"
              placeholder="e.g. Downtown near Central Park"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">{t('key_features')}</label>
            <input 
              type="text" 
              name="features"
              value={formData.features}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand focus:border-transparent outline-none"
              placeholder="e.g. Gym, Pool, Renovated Kitchen, Near Subway"
              required
            />
            <p className="text-xs text-gray-400 mt-1">{t('separate_commas')}</p>
          </div>

          <div className="border-t border-gray-100 pt-6">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">{t('description')}</label>
              <button
                type="button"
                onClick={handleGenerateDescription}
                disabled={isGenerating}
                className="text-xs flex items-center gap-1 text-purple-600 hover:text-purple-700 font-semibold bg-purple-50 px-3 py-1 rounded-full transition-colors"
              >
                {isGenerating ? <Loader2 size={12} className="animate-spin"/> : <Sparkles size={12} />}
                {t('auto_write')}
              </button>
            </div>
            <textarea 
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition-all"
              placeholder="Describe your property..."
              required
            />
            <p className="text-xs text-gray-400 mt-2">
              {t('ai_tip')}
            </p>
          </div>

          {/* Owner Details Section */}
          <div className="border-t border-gray-100 pt-6">
             <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('contact_info')}</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('your_name')}</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 ps-3 flex items-center pointer-events-none text-gray-400">
                      <User size={18} />
                    </div>
                    <input 
                      type="text" 
                      name="ownerName"
                      value={formData.ownerName}
                      onChange={handleInputChange}
                      className="w-full ps-10 pe-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand focus:border-transparent outline-none"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t('email_phone')}</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 ps-3 flex items-center pointer-events-none text-gray-400">
                      {formData.ownerContact.includes('@') ? <Mail size={18} /> : <Phone size={18} />}
                    </div>
                     <input 
                      type="text" 
                      name="ownerContact"
                      value={formData.ownerContact}
                      onChange={handleInputChange}
                      className="w-full ps-10 pe-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand focus:border-transparent outline-none"
                      placeholder="john@example.com or +1 234..."
                      required
                    />
                  </div>
                </div>
             </div>
          </div>

          {/* Image Upload Section - Moved to Bottom */}
          <div className="border-t border-gray-100 pt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">{t('property_photo')}</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {formData.images.map((img, idx) => (
                <div key={idx} className="relative aspect-square rounded-xl overflow-hidden group border border-gray-200">
                  <img 
                    src={img} 
                    alt={`Preview ${idx}`} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="bg-white text-red-600 p-1.5 rounded-full hover:bg-gray-100 transition-colors shadow-lg"
                      title={t('remove_image')}
                    >
                      <X size={16} />
                    </button>
                  </div>
                  {idx === 0 && (
                    <div className="absolute top-2 start-2 bg-brand text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      Cover
                    </div>
                  )}
                </div>
              ))}
              
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="aspect-square border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-brand hover:bg-brand-50/50 transition-all group"
              >
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 group-hover:bg-white group-hover:text-brand mb-2 transition-colors">
                  {formData.images.length > 0 ? <Plus size={16} /> : <Upload size={16} />}
                </div>
                <p className="text-xs font-medium text-gray-600 group-hover:text-brand text-center px-1">
                  {formData.images.length > 0 ? t('add_photos') : t('click_upload')}
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-2">{t('upload_hint')}</p>
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden" 
              accept="image/*"
              multiple
            />
          </div>

          <div className="pt-4">
            <button 
              type="submit"
              className="w-full py-4 bg-brand text-white rounded-xl font-bold text-lg hover:bg-brand-dark shadow-lg hover:shadow-xl transition-all"
            >
              {t('post_now')}
            </button>
            <p className="text-center text-xs text-gray-400 mt-4">
              {t('agreement')}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};