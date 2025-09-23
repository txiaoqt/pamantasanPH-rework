import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import PlatformOverview from './components/PlatformOverview';
import FeaturedUniversities from './components/FeaturedUniversities';
import ExploreTools from './components/ExploreTools';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import Universities from './pages/Universities';
import Programs from './pages/Programs';
import Compare from './pages/Compare';
import About from './pages/About';
import ScrollToTop from './ScrollToTop';
import UniversityDetails from './components/UniversityDetails';

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
            <Route path="/about" element={<About />} />
            <Route path="/universities/:id" element={<UniversityDetails />} />

          </Routes>
        </ScrollToTop>


        <Footer />
      </div>
    </Router>
  );
}

export default App;