import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import HeroSection from './components/common/HeroSection';
import PlatformOverview from './components/home/PlatformOverview';
import FeaturedUniversities from './components/home/FeaturedUniversities';
import ExploreTools from './components/home/ExploreTools';
import Newsletter from './components/common/Newsletter';
import Footer from './components/common/Footer';
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

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (

    <Router>
      <div className="min-h-screen bg-white">
        <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
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
            <Route path="/compare" element={<Compare />} />
            <Route path="/map" element={<MapView />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/saved" element={<Saved />} />
            <Route path="/universities/:id" element={<UniversityDetails />} />
          </Routes>
        </ScrollToTop>


        <Footer />
      </div>
    </Router>
  );
}

export default App;
