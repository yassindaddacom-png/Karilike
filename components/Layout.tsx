import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, PlusCircle, Search, Menu, X, MessageCircle, Globe, LogIn, User, LogOut } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { language, setLanguage, t } = useLanguage();
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center gap-2">
                <div className="w-8 h-8 bg-brand rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">K</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-end sm:gap-2 leading-none">
                  <span className="text-xl font-bold text-gray-900 tracking-tight">KariLike</span>
                  <span className="text-lg font-bold text-brand">كاري ليك</span>
                </div>
              </Link>
              <div className="hidden sm:ms-8 sm:flex sm:space-x-8 rtl:space-x-reverse">
                <Link
                  to="/"
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    isActive('/') 
                      ? 'border-brand text-gray-900' 
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  {t('nav_find_home')}
                </Link>
                <Link
                  to="/post"
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    isActive('/post') 
                      ? 'border-brand text-gray-900' 
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  {t('nav_list_property')}
                </Link>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={toggleLanguage}
                className="hidden sm:flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              >
                <Globe size={18} />
                {language === 'en' ? 'العربية' : 'English'}
              </button>

              {user ? (
                <div className="relative hidden sm:block">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 px-3 py-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-6 h-6 rounded-full bg-brand/10 text-brand flex items-center justify-center text-xs font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-medium text-gray-700 max-w-[100px] truncate">{user.name}</span>
                  </button>

                  {showUserMenu && (
                    <div className="absolute end-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                      <div className="px-4 py-2 border-b border-gray-50">
                        <p className="text-xs text-gray-500">{t('auth_welcome', {name: ''})}</p>
                        <p className="text-sm font-bold text-gray-900 truncate">{user.name}</p>
                      </div>
                      <button 
                        onClick={handleLogout}
                        className="w-full text-start px-4 py-2 text-sm text-red-600 hover:bg-gray-50 flex items-center gap-2"
                      >
                        <LogOut size={16} />
                        {t('nav_logout')}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/auth"
                  className="hidden sm:flex items-center gap-1 px-4 py-2 rounded-full bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors shadow-sm"
                >
                  <LogIn size={16} />
                  {t('nav_login')}
                </Link>
              )}

              <div className="flex items-center sm:hidden">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand"
                >
                  {isMobileMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="sm:hidden bg-white border-b border-gray-200 shadow-lg">
            <div className="pt-2 pb-3 space-y-1">
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block ps-3 pe-4 py-2 border-s-4 text-base font-medium ${
                  isActive('/')
                    ? 'bg-brand-50 border-brand text-brand-dark'
                    : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Search size={18} /> {t('nav_find_home')}
                </div>
              </Link>
              <Link
                to="/post"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block ps-3 pe-4 py-2 border-s-4 text-base font-medium ${
                  isActive('/post')
                    ? 'bg-brand-50 border-brand text-brand-dark'
                    : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <PlusCircle size={18} /> {t('nav_list_property')}
                </div>
              </Link>
              
              {user ? (
                 <>
                    <div className="ps-3 pe-4 py-2 border-s-4 border-transparent text-base font-medium text-gray-900">
                       <div className="flex items-center gap-2">
                          <User size={18} /> {user.name}
                       </div>
                    </div>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full text-start ps-3 pe-4 py-2 border-s-4 border-transparent text-base font-medium text-red-600 hover:bg-gray-50 hover:border-gray-300"
                    >
                      <div className="flex items-center gap-2">
                        <LogOut size={18} /> {t('nav_logout')}
                      </div>
                    </button>
                 </>
              ) : (
                <Link
                  to="/auth"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block ps-3 pe-4 py-2 border-s-4 text-base font-medium ${
                    isActive('/auth')
                      ? 'bg-brand-50 border-brand text-brand-dark'
                      : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <LogIn size={18} /> {t('nav_login')}
                  </div>
                </Link>
              )}

              <button
                onClick={() => {
                  toggleLanguage();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-start ps-3 pe-4 py-2 border-s-4 border-transparent text-base font-medium text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
              >
                <div className="flex items-center gap-2">
                  <Globe size={18} /> {language === 'en' ? 'العربية' : 'English'}
                </div>
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex justify-center md:justify-start gap-2">
               <span className="text-gray-400 text-sm">{t('footer_copyright')}</span>
            </div>
            <div className="mt-4 flex justify-center md:mt-0 space-x-6 rtl:space-x-reverse">
              <a href="#" className="text-gray-400 hover:text-gray-500 text-sm">{t('privacy')}</a>
              <a href="#" className="text-gray-400 hover:text-gray-500 text-sm">{t('terms')}</a>
              <a href="#" className="text-gray-400 hover:text-gray-500 text-sm">{t('support')}</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};