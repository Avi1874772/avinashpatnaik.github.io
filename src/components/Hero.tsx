
import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface HeroProps {
  scrollY: number;
}

const Hero: React.FC<HeroProps> = ({ scrollY }) => {
  const [text, setText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const fullText = "Data Scientist & Analytics Expert";

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => {
      clearInterval(timer);
      clearInterval(cursorTimer);
    };
  }, []);

  const scrollToNext = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative">
      <div 
        className="text-center z-10 px-6"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      >
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-fade-in">
            Hello, I'm Alex
          </h1>
          <div className="text-2xl md:text-4xl text-gray-300 mb-8 h-12 flex items-center justify-center">
            <span>{text}</span>
            <span className={`ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity`}>|</span>
          </div>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed animate-fade-in">
            Transforming complex data into actionable insights. Specialized in machine learning, 
            statistical analysis, and data visualization to drive business decisions.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in">
          <button 
            onClick={() => scrollToSection('projects')}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white font-semibold hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            View My Work
          </button>
          <button 
            onClick={() => scrollToSection('contact')}
            className="px-8 py-4 border-2 border-blue-400 text-blue-400 rounded-full font-semibold hover:bg-blue-400 hover:text-white transition-all duration-200 transform hover:scale-105"
          >
            Get In Touch
          </button>
        </div>
      </div>

      <button
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce hover:text-blue-400 transition-colors duration-200"
      >
        <ChevronDown size={32} />
      </button>
    </section>
  );
};

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

export default Hero;
