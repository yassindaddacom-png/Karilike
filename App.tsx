import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { PropertyDetailsPage } from './pages/PropertyDetailsPage';
import { OwnerPostPage } from './pages/OwnerPostPage';
import { AuthPage } from './pages/AuthPage';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/property/:id" element={<PropertyDetailsPage />} />
              <Route path="/post" element={<OwnerPostPage />} />
              <Route path="/auth" element={<AuthPage />} />
            </Routes>
          </Layout>
        </Router>
      </AuthProvider>
    </LanguageProvider>
  );
};

export default App;