
import React, { useEffect, useRef, useState } from 'react';
import { Award, Users, TrendingUp, Database, MapPin, Mail, Phone } from 'lucide-react';

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
    { icon: Award, label: 'Years Experience', value: '5+', color: 'text-blue-400' },
    { icon: Users, label: 'Projects Completed', value: '50+', color: 'text-green-400' },
    { icon: TrendingUp, label: 'Models Deployed', value: '25+', color: 'text-purple-400' },
    { icon: Database, label: 'Data Points Analyzed', value: '1M+', color: 'text-pink-400' },
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
          <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-8"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          {/* Professional Photo and Info */}
          <div className={`transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}>
            <div className="text-center mb-8">
              <div className="relative inline-block mb-6">
                <div className="w-64 h-64 mx-auto rounded-full overflow-hidden border-4 border-gradient-to-r from-blue-400 to-purple-400 p-1">
                  <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900">
                    <img 
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                      alt="Avinash Patnaik - Data Scientist" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-3">
                  <Award className="w-6 h-6 text-white" />
                </div>
              </div>
              
              <h3 className="text-3xl font-bold mb-2 text-white">Avinash Patnaik</h3>
              <p className="text-xl text-blue-300 mb-4">Data Scientist & Analytics Expert</p>
              
              <div className="flex flex-col gap-2 text-gray-300 text-sm">
                <div className="flex items-center justify-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-400" />
                  <span>Based in Italy</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4 text-green-400" />
                  <span>Available for collaboration</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4 text-purple-400" />
                  <span>+39 3510290250</span>
                </div>
              </div>
            </div>
          </div>

          {/* About Content */}
          <div className={`transition-all duration-1000 delay-400 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            <h3 className="text-3xl font-bold mb-6 text-white">
              Passionate About Data-Driven Solutions
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              With over 5 years of experience in data science and analytics, I specialize in 
              extracting meaningful insights from complex datasets. My expertise spans machine 
              learning, statistical modeling, and data visualization.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              I've worked with Fortune 500 companies and startups alike, helping them make 
              data-driven decisions that drive growth and innovation. My approach combines 
              technical expertise with business acumen to deliver impactful solutions.
            </p>
            <div className="flex flex-wrap gap-3">
              {['Python', 'SQL', 'Machine Learning', 'Deep Learning', 'Microsoft Power BI', 'Tableau'].map((skill) => (
                <span 
                  key={skill}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full text-blue-300 border border-blue-500/30"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className={`transition-all duration-1000 delay-600 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div 
                key={stat.label}
                className={`bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-6 rounded-xl border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 transform hover:scale-105 text-center ${
                  isVisible ? 'animate-fade-in' : ''
                }`}
                style={{ animationDelay: `${800 + index * 100}ms` }}
              >
                <stat.icon className={`w-8 h-8 ${stat.color} mb-3 mx-auto`} />
                <div className={`text-3xl font-bold ${stat.color} mb-2`}>
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm">
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
