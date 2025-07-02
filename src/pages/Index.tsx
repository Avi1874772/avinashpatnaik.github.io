
import React from 'react';
import Hero from '../components/Hero';
import Projects from '../components/Projects';
import About from '../components/About';
import ParticleBackground from '../components/ParticleBackground';

const Index = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white relative overflow-x-hidden">
      <ParticleBackground />
      
      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
      </main>
    </div>
  );
};

export default Index;
