
import React, { useEffect, useRef, useState } from 'react';
import { Award, Users, TrendingUp, MapPin, Mail, Phone } from 'lucide-react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    { icon: Award, label: 'Years Experience', value: '4+', color: 'text-blue-400' },
    { icon: Users, label: 'Projects Completed', value: '50+', color: 'text-green-400' },
    { icon: TrendingUp, label: 'Models Deployed', value: '25+', color: 'text-purple-400' },
  ];

  return (
    <section id="about" ref={sectionRef} className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            About Me
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-8 transform transition-all duration-1000 hover:w-32"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          {/* Professional Photo and Info */}
          <div className={`transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}>
            <div className="text-center mb-8">
              <div className="relative inline-block mb-6 group">
                <div className="w-64 h-64 mx-auto rounded-full overflow-hidden border-4 border-gradient-to-r from-blue-400 to-purple-400 p-1 transform transition-all duration-500 group-hover:scale-105 group-hover:rotate-2">
                  <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900">
                    <img 
                      src="/avinash.jpg" 
                      alt="Avinash Patnaik - Data Scientist" 
                      className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                    />
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-3 transform transition-all duration-300 hover:scale-110 hover:rotate-12">
                  <Award className="w-6 h-6 text-white" />
                </div>
              </div>
              
              <h3 className="text-3xl font-bold mb-2 text-white transform transition-all duration-300 hover:scale-105">Avinash Patnaik</h3>
              <p className="text-xl text-blue-300 mb-4 transform transition-all duration-300 hover:text-blue-200">Data Scientist & Analytics Expert</p>
              
              <div className="flex flex-col gap-2 text-gray-300 text-sm">
                <div className="flex items-center justify-center gap-2 transform transition-all duration-300 hover:scale-105 hover:text-blue-300">
                  <MapPin className="w-4 h-4 text-blue-400 transition-all duration-300 hover:animate-pulse" />
                  <span>Based in Italy</span>
                </div>
                <div className="flex items-center justify-center gap-2 transform transition-all duration-300 hover:scale-105 hover:text-green-300">
                  <Mail className="w-4 h-4 text-green-400 transition-all duration-300 hover:animate-pulse" />
                  <span>Available for collaboration</span>
                </div>
                <div className="flex items-center justify-center gap-2 transform transition-all duration-300 hover:scale-105 hover:text-purple-300">
                  <Phone className="w-4 h-4 text-purple-400 transition-all duration-300 hover:animate-pulse" />
                  <span>+39 3510290250</span>
                </div>
              </div>
            </div>
          </div>

          {/* About Content */}
          <div className={`transition-all duration-1000 delay-400 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            <h3 className="text-3xl font-bold mb-6 text-white transform transition-all duration-300 hover:text-blue-300">
              Passionate About Data-Driven Solutions
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed mb-6 transform transition-all duration-300 hover:text-gray-200">
              With over 4 years of experience in data science and analytics, 
              I am a passionate, data-driven professional specializing in deep learning, 
              machine learning, statistical modeling, and data visualization.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-6 transform transition-all duration-300 hover:text-gray-200">
              I am deeply passionate about AI and continuously explore emerging technologies, 
              including the transformative potential of generative AI. My curiosity and 
              enthusiasm for innovation drive me to stay at the forefront of the AI landscape, 
              always looking for new ways to apply intelligent solutions to real-world challenges.
            </p>
            <div className="flex flex-wrap gap-3">
              {['Python', 'SQL', 'Machine Learning', 'Deep Learning', 'Microsoft Power BI', 'Tableau'].map((skill) => (
                <span 
                  key={skill}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full text-blue-300 border border-blue-500/30 transform transition-all duration-300 hover:scale-110 hover:bg-gradient-to-r hover:from-blue-500/30 hover:to-purple-500/30 hover:text-blue-200 hover:border-blue-400/50 cursor-pointer"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section - Now with 3 containers optimally spaced */}
        <div className={`transition-all duration-1000 delay-600 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div 
                key={stat.label}
                className={`bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-8 rounded-xl border border-slate-700/50 hover:border-slate-600/50 transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 text-center group cursor-pointer ${
                  isVisible ? 'animate-fade-in' : ''
                }`}
                style={{ animationDelay: `${800 + index * 200}ms` }}
              >
                <stat.icon className={`w-10 h-10 ${stat.color} mb-4 mx-auto transition-all duration-300 group-hover:scale-125 group-hover:animate-pulse`} />
                <div className={`text-4xl font-bold ${stat.color} mb-3 transition-all duration-300 group-hover:scale-110`}>
                  {stat.value}
                </div>
                <div className="text-gray-400 text-base font-medium transition-all duration-300 group-hover:text-gray-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
