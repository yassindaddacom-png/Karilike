
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_PROPERTIES } from '../constants';
import { MapPin, BedDouble, Bath, Square, User, ArrowLeft, Heart, Share2, CheckCircle2, MessageCircle, ChevronLeft, ChevronRight, Map, Star, X } from 'lucide-react';
import { getChatResponse } from '../services/geminiService';
import { useLanguage } from '../contexts/LanguageContext';

export const PropertyDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState(MOCK_PROPERTIES.find(p => p.id === id)); // Local state to allow updating rating
  const { t, dir } = useLanguage();
  const [showChat, setShowChat] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<{role: 'user' | 'bot', text: string}[]>([
    {role: 'bot', text: t('chat_intro')}
  ]);
  const [isSending, setIsSending] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Rating System State
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [ratingSubmitted, setRatingSubmitted] = useState(false);

  if (!property) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center flex-col">
        <h2 className="text-2xl font-bold text-gray-900">{t('prop_not_found')}</h2>
        <Link to="/" className="mt-4 text-brand hover:underline">{t('return_home')}</Link>
      </div>
    );
  }

  const handleChatSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isSending) return;

    const userMsg = chatInput;
    setChatInput('');
    setChatHistory(prev => [...prev, {role: 'user', text: userMsg}]);
    setIsSending(true);

    const botResponse = await getChatResponse(userMsg, property);
    setChatHistory(prev => [...prev, {role: 'bot', text: botResponse}]);
    setIsSending(false);
  };

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRating === 0) return;

    // Simulate submission
    setTimeout(() => {
      setRatingSubmitted(true);
      // Mock update to property data for visual feedback
      setProperty(prev => prev ? ({
        ...prev,
        ownerReviewCount: (prev.ownerReviewCount || 0) + 1,
        ownerRating: prev.ownerRating 
          ? ((prev.ownerRating * (prev.ownerReviewCount || 0)) + selectedRating) / ((prev.ownerReviewCount || 0) + 1)
          : selectedRating
      }) : prev);
      
      setTimeout(() => {
        setRatingSubmitted(false);
        setShowRatingModal(false);
        setSelectedRating(0);
        setReviewText('');
      }, 2000);
    }, 500);
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5 text-yellow-400">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star 
            key={star} 
            size={14} 
            fill={star <= Math.round(rating) ? "currentColor" : "none"} 
            className={star <= Math.round(rating) ? "text-yellow-400" : "text-gray-300"}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white min-h-screen pb-20 relative">
      {/* Sticky Header for Mobile */}
      <div className="sticky top-16 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex justify-between items-center sm:hidden">
        <Link to="/" className="p-2 -ms-2 text-gray-600 hover:text-gray-900">
          <ArrowLeft size={20} className="rtl:rotate-180" />
        </Link>
        <span className="font-semibold text-gray-900 truncate max-w-[200px]">{property.title}</span>
        <button className="p-2 -me-2 text-gray-600">
          <Share2 size={20} />
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Breadcrumb & Actions */}
        <div className="hidden sm:flex justify-between items-center mb-6">
          <Link to="/" className="flex items-center text-gray-500 hover:text-brand transition-colors">
            <ArrowLeft size={16} className="me-2 rtl:rotate-180" />
            {t('back_listings')}
          </Link>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
              <Share2 size={16} /> {t('share')}
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
              <Heart size={16} /> {t('save')}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Images & Details */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-4">
              <div className="relative rounded-3xl overflow-hidden shadow-sm aspect-video bg-gray-100 group">
                <img 
                  src={property.images[activeImageIndex]} 
                  alt={property.title} 
                  className="w-full h-full object-cover transition-all duration-300"
                />
                
                {property.images.length > 1 && (
                  <>
                    <button 
                      onClick={prevImage}
                      className="absolute start-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity text-gray-800"
                    >
                      <ChevronLeft size={24} className="rtl:rotate-180" />
                    </button>
                    <button 
                      onClick={nextImage}
                      className="absolute end-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity text-gray-800"
                    >
                      <ChevronRight size={24} className="rtl:rotate-180" />
                    </button>
                    
                    <div className="absolute bottom-4 start-1/2 -translate-x-1/2 flex gap-2">
                       {property.images.map((_, idx) => (
                         <div 
                           key={idx} 
                           className={`w-2 h-2 rounded-full transition-all ${idx === activeImageIndex ? 'bg-white w-4' : 'bg-white/50'}`} 
                         />
                       ))}
                    </div>
                  </>
                )}
              </div>
              
              {property.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x">
                  {property.images.map((img, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`
                        flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden border-2 transition-all snap-start
                        ${idx === activeImageIndex ? 'border-brand ring-2 ring-brand/30' : 'border-transparent opacity-70 hover:opacity-100'}
                      `}
                    >
                      <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div>
              <div className="flex justify-between items-start">
                <div>
                   <h1 className="text-3xl font-bold text-gray-900">{property.title}</h1>
                   <div className="flex items-center text-gray-500 mt-2">
                     <MapPin size={18} className="me-1 text-brand" />
                     {property.location}
                   </div>
                </div>
                <div className="text-end hidden sm:block">
                  <div className="text-3xl font-bold text-brand">{property.price} <span className="text-xl">{t('currency')}</span></div>
                  <div className="text-gray-500">{t('per_month')}</div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="p-4 bg-gray-50 rounded-2xl flex flex-col items-center text-center">
                  <BedDouble className="text-brand mb-2" size={24} />
                  <span className="font-bold text-gray-900">{property.bedrooms} {t('bed')}</span>
                </div>
                <div className="p-4 bg-gray-50 rounded-2xl flex flex-col items-center text-center">
                  <Bath className="text-brand mb-2" size={24} />
                  <span className="font-bold text-gray-900">{property.bathrooms} {t('bath')}</span>
                </div>
                <div className="p-4 bg-gray-50 rounded-2xl flex flex-col items-center text-center">
                  <Square className="text-brand mb-2" size={24} />
                  <span className="font-bold text-gray-900">{property.sqft} {t('sqft')}</span>
                </div>
              </div>

              <div className="mt-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">{t('about_home')}</h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {property.description}
                </p>
              </div>

              <div className="mt-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">{t('amenities')}</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {property.amenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-gray-600 bg-gray-50 px-4 py-3 rounded-xl">
                      <CheckCircle2 size={16} className="text-green-500" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Location Map Section */}
              <div className="mt-8">
                 <div className="flex items-center gap-2 mb-4">
                    <MapPin className="text-brand" size={24} />
                    <h2 className="text-xl font-bold text-gray-900">{t('location_map')}</h2>
                 </div>
                 <div className="rounded-2xl overflow-hidden border border-gray-200 h-[300px] w-full bg-gray-100 relative shadow-sm">
                   <iframe
                     width="100%"
                     height="100%"
                     frameBorder="0"
                     scrolling="no"
                     marginHeight={0}
                     marginWidth={0}
                     src={`https://maps.google.com/maps?q=${encodeURIComponent(property.location)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                     title={property.title}
                     className="w-full h-full"
                   ></iframe>
                 </div>
              </div>
            </div>
          </div>

          {/* Right Column: Owner Card & Chat (Sticky) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              
              {/* Owner Card */}
              <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-lg">
                <h3 className="font-bold text-gray-900 text-lg mb-4">{t('property_owner')}</h3>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xl font-bold">
                    {property.ownerName.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-lg">{property.ownerName}</div>
                    <div className="text-sm text-gray-500 mb-1">{t('member_since')}</div>
                    
                    {/* Rating Display */}
                    <div className="flex items-center gap-1.5">
                      {renderStars(property.ownerRating || 0)}
                      <span className="text-xs font-bold text-gray-700 pt-0.5">
                        {property.ownerRating ? property.ownerRating.toFixed(1) : "New"}
                      </span>
                      <span className="text-xs text-gray-400 pt-0.5">
                        ({property.ownerReviewCount || 0} {t('reviews')})
                      </span>
                    </div>
                  </div>
                </div>

                {/* Rate Owner Button */}
                <button
                   onClick={() => setShowRatingModal(true)}
                   className="w-full mb-3 py-2 px-4 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-brand hover:border-brand-light transition-all text-sm font-medium"
                >
                  {t('rate_owner')}
                </button>
                
                <div className="space-y-3">
                  <button 
                    onClick={() => setShowChat(!showChat)}
                    className="w-full py-3 px-4 bg-brand text-white rounded-xl font-semibold hover:bg-brand-dark transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle size={20} />
                    {t('chat_owner')}
                  </button>
                  <div className="text-center text-xs text-gray-400 mt-2">
                    {t('no_fees')}
                  </div>
                </div>
              </div>

              {/* AI Assistant Chat Box */}
              {showChat && (
                <div className="bg-white border border-gray-200 rounded-2xl shadow-xl overflow-hidden flex flex-col h-[400px]">
                  <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white">
                    <div className="font-bold flex items-center gap-2">
                      <MessageCircle size={18} /> {t('kari_assistant')}
                    </div>
                    <div className="text-xs opacity-80">{t('drafting_msg', {name: property.ownerName})}</div>
                  </div>
                  
                  <div className="flex-grow p-4 overflow-y-auto space-y-4 bg-gray-50 scrollbar-thin">
                    {chatHistory.map((msg, i) => (
                      <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                          msg.role === 'user' 
                            ? 'bg-brand text-white rounded-tr-none rtl:rounded-tr-2xl rtl:rounded-tl-none' 
                            : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none rtl:rounded-tl-2xl rtl:rounded-tr-none shadow-sm'
                        }`}>
                          {msg.text}
                        </div>
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleChatSend} className="p-3 bg-white border-t border-gray-100">
                    <div className="relative">
                      <input
                        type="text"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder={t('ask_placeholder')}
                        className="w-full ps-4 pe-12 py-3 bg-gray-100 rounded-xl focus:bg-white focus:ring-2 focus:ring-brand focus:outline-none transition-all text-sm"
                      />
                      <button 
                        type="submit" 
                        disabled={isSending || !chatInput.trim()}
                        className="absolute end-2 top-1/2 -translate-y-1/2 p-1.5 text-brand disabled:opacity-50"
                      >
                         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rtl:rotate-180"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                      </button>
                    </div>
                  </form>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>

      {/* Rating Modal */}
      {showRatingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
            {ratingSubmitted ? (
               <div className="flex flex-col items-center justify-center py-8">
                 <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4 animate-bounce">
                   <CheckCircle2 size={32} />
                 </div>
                 <h3 className="text-xl font-bold text-gray-900">{t('review_submitted')}</h3>
                 <p className="text-gray-500 mt-2">{t('review_thanks')}</p>
               </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900">{t('rate_title', {name: property.ownerName})}</h3>
                  <button 
                    onClick={() => setShowRatingModal(false)}
                    className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    <X size={20} className="text-gray-500" />
                  </button>
                </div>
                
                <form onSubmit={handleSubmitReview}>
                  <div className="flex justify-center mb-8 gap-2" style={{ direction: 'ltr' }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setSelectedRating(star)}
                        className="focus:outline-none transition-transform hover:scale-110 active:scale-90"
                      >
                        <Star 
                          size={40} 
                          fill={star <= selectedRating ? "#FBBF24" : "none"} 
                          className={star <= selectedRating ? "text-yellow-400 drop-shadow-sm" : "text-gray-200 hover:text-gray-300"}
                          strokeWidth={1.5}
                        />
                      </button>
                    ))}
                  </div>
                  
                  <div className="mb-6">
                    <textarea 
                      className="w-full p-4 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-brand focus:border-transparent outline-none resize-none h-32"
                      placeholder={t('review_placeholder')}
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit" 
                    disabled={selectedRating === 0}
                    className="w-full py-3 bg-brand text-white rounded-xl font-bold shadow-lg hover:bg-brand-dark hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {t('submit_review')}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
      
      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 start-0 end-0 p-4 bg-white border-t border-gray-200 sm:hidden z-40">
        <div className="flex gap-3">
          <div className="flex-1">
             <div className="text-lg font-bold text-brand">{property.price} {t('currency')}</div>
             <div className="text-xs text-gray-500">{t('monthly_rent')}</div>
          </div>
          <button 
            onClick={() => setShowChat(true)}
            className="flex-1 bg-brand text-white font-bold py-3 rounded-xl shadow-lg"
          >
            {t('contact')}
          </button>
        </div>
      </div>
    </div>
  );
};
