
import React from 'react';
import HeroSection from '../components/HeroSection';
import KitsShowcase from '../components/KitsShowcase';
import GrocerySection from '../components/GrocerySection';
import ImpactSection from '../components/ImpactSection';
import HowItWorks from '../components/HowItWorks';
import TransparencySection from '../components/TransparencySection';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <KitsShowcase />
      <GrocerySection />
      <ImpactSection />
      <HowItWorks />
      <TransparencySection />
      <Footer />
    </div>
  );
};

export default Index;
