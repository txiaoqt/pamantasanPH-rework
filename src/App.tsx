import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import HeroSection from './components/common/HeroSection';
import PlatformOverview from './components/home/PlatformOverview';
import FeaturedUniversities from './components/home/FeaturedUniversities';
import ExploreTools from './components/home/ExploreTools';
import Newsletter from './components/common/Newsletter';
import Footer from './components/common/Footer';
import Chatbot from './components/common/Chatbot';
import Universities from './pages/Universities';
import Programs from './pages/Programs';
import Compare from './pages/Compare';
import About from './pages/About';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Saved from './pages/Saved';
import MapView from './pages/MapView';
import ScrollToTop from './ScrollToTop';
import UniversityDetails from './pages/UniversityDetails';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import ProtectedRoute from './components/common/ProtectedRoute';
import TermsOfServiceModal from './components/common/TermsOfServiceModal';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from './lib/supabase';
import { useTheme } from './hooks/useTheme';

function App() {
  useTheme(); // Apply the theme globally
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showTermsModal, setShowTermsModal] = useState(false);

  useEffect(() => {
    setLoading(true);
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
      if (session?.user) {
        checkTermsAgreement(session.user);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
      if (session?.user) {
        checkTermsAgreement(session.user);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const checkTermsAgreement = async (user: User) => {
    const { data } = await supabase
      .from('user_terms_agreements')
      .select('id')
      .eq('id', user.id)
      .single();
    
    if (!data) {
      setShowTermsModal(true);
    }
  };

  const handleAgreeToTerms = async () => {
    if (!user) return;
    const { error } = await supabase
      .from('user_terms_agreements')
      .insert({ id: user.id });
    
    if (!error) {
      setShowTermsModal(false);
    } else {
      alert('Error accepting terms: ' + error.message);
    }
  };

  const handleDisagreeToTerms = async () => {
    await supabase.auth.signOut();
    setShowTermsModal(false);
  };

  if (loading) {
    return <div>Loading...</div>; // Or a spinner component
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        {showTermsModal && user && (
          <TermsOfServiceModal 
            user={user} 
            onAgree={handleAgreeToTerms}
            onDisagree={handleDisagreeToTerms} 
          />
        )}
        <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} session={session} />
        <ScrollToTop>
          <Routes>
            <Route path="/" element={
              <main>
                <HeroSection />
                <PlatformOverview />
                <FeaturedUniversities />
                <ExploreTools />
                <Newsletter />
              </main>
            } />
            <Route path="/universities" element={<Universities />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/map" element={<MapView />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/universities/:id" element={<UniversityDetails session={session} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} />

            {/* Protected Routes */}
            <Route element={<ProtectedRoute session={session} />}>
              <Route path="/saved" element={<Saved />} />
              <Route path="/compare" element={<Compare />} />
            </Route>
          </Routes>
        </ScrollToTop>
        <Footer />
        <Chatbot />
      </div>
    </Router>
  );
}

export default App;
