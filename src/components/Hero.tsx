
import React, { useState, useEffect } from 'react';
import { ChevronDown, Sparkles, Code, Database } from 'lucide-react';

interface HeroProps {
  scrollY: number;
}

const Hero: React.FC<HeroProps> = ({ scrollY }) => {
  const [text, setText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const phrases = [
    "Data Scientist & Analytics Expert",
    "Machine Learning Engineer",
    "Statistical Analysis Specialist",
    "Business Intelligence Developer"
  ];

  useEffect(() => {
    let index = 0;
    let isDeleting = false;
    let phraseIndex = 0;

    const typewriter = () => {
      const currentText = phrases[phraseIndex];
      
      if (isDeleting) {
        setText(currentText.slice(0, index - 1));
        index--;
        
        if (index === 0) {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          setTimeout(typewriter, 500);
          return;
        }
      } else {
        setText(currentText.slice(0, index + 1));
        index++;
        
        if (index === currentText.length) {
          setTimeout(() => {
            isDeleting = true;
            typewriter();
          }, 2000);
          return;
        }
      }
      
      setTimeout(typewriter, isDeleting ? 50 : 100);
    };

    typewriter();

    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => {
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
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 animate-bounce delay-1000">
          <Sparkles className="text-purple-400 opacity-30" size={32} />
        </div>
        <div className="absolute top-40 right-20 animate-pulse delay-2000">
          <Code className="text-blue-400 opacity-30" size={28} />
        </div>
        <div className="absolute bottom-40 left-20 animate-bounce delay-3000">
          <Database className="text-pink-400 opacity-30" size={30} />
        </div>
      </div>

      <div 
        className="text-center z-10 px-6 relative"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      >
        {/* Animated backdrop */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-3xl animate-pulse"></div>
        
        <div className="relative">
          <div className="mb-8">
            {/* Greeting with slide animation */}
            <div className="mb-4 overflow-hidden">
              <p className="text-xl md:text-2xl text-gray-400 animate-[slideInUp_1s_ease-out]">
                Hello, I'm
              </p>
            </div>
            
            {/* Main name with multiple animations */}
            <div className="relative mb-6">
              <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-[fadeInScale_1.5s_ease-out] relative z-10">
                Avinash Patnaik
              </h1>
              
              {/* Animated underline */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-blue-400 to-purple-400 animate-[expandWidth_2s_ease-out_1s_forwards]"></div>
            </div>
            
            {/* Dynamic typewriter text */}
            <div className="text-2xl md:text-4xl text-gray-300 mb-8 h-16 flex items-center justify-center">
              <span className="animate-[glow_2s_ease-in-out_infinite_alternate]">{text}</span>
              <span className={`ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity text-purple-400`}>|</span>
            </div>
            
            {/* Description with stagger animation */}
            <div className="overflow-hidden">
              <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed animate-[slideInUp_1s_ease-out_0.5s_both]">
                Transforming complex data into actionable insights. Specialized in machine learning, 
                statistical analysis, and data visualization to drive business decisions.
              </p>
            </div>
          </div>

          {/* Animated buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => scrollToSection('projects')}
              className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white font-semibold hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl relative overflow-hidden animate-[slideInLeft_1s_ease-out_1s_both]"
            >
              <span className="relative z-10">View My Work</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </button>
            
            <button 
              onClick={() => scrollToSection('contact')}
              className="group px-8 py-4 border-2 border-blue-400 text-blue-400 rounded-full font-semibold hover:bg-blue-400 hover:text-white transition-all duration-300 transform hover:scale-105 relative overflow-hidden animate-[slideInRight_1s_ease-out_1s_both]"
            >
              <span className="relative z-10">Get In Touch</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-[bounceIn_2s_ease-out_2s_both]">
        <p className="text-gray-400 text-sm mb-2 animate-pulse">Scroll to explore</p>
        <button
          onClick={scrollToNext}
          className="text-white hover:text-blue-400 transition-all duration-300 group"
        >
          <ChevronDown size={32} className="animate-bounce group-hover:animate-pulse" />
        </button>
      </div>
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
