
import React from 'react';

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative">
      <div className="text-center z-10 px-6 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
          Avinash Patnaik
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-8">
          Data Scientist & Analytics Expert
        </p>
        
        <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          Transforming complex data into actionable insights through advanced analytics, 
          machine learning, and statistical modeling.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => scrollToSection('about')}
            className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            About Me
          </button>
          
          <button 
            onClick={() => scrollToSection('projects')}
            className="px-8 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 transition-colors"
          >
            View Projects
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
