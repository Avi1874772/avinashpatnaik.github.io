
import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl font-bold mb-12 text-center text-white">
          About Me
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center">
            <div className="w-48 h-48 mx-auto rounded-full overflow-hidden mb-6">
              <img 
                src="/avi.jpg" 
                alt="Avinash Patnaik" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Avinash Patnaik</h3>
            <p className="text-indigo-400 mb-4">Data Scientist</p>
            <p className="text-gray-400">Based in Italy</p>
          </div>

          <div>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              With over 5 years of experience in data science and analytics, I specialize in 
              extracting meaningful insights from complex datasets. My expertise spans machine 
              learning, statistical modeling, and data visualization.
            </p>
            
            <p className="text-gray-300 text-lg leading-relaxed mb-8">
              I've worked with companies across various industries, helping them make 
              data-driven decisions that drive growth and innovation.
            </p>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-slate-800 p-4 rounded-lg">
                <div className="text-2xl font-bold text-indigo-400 mb-1">5+</div>
                <div className="text-gray-400">Years Experience</div>
              </div>
              <div className="bg-slate-800 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-400 mb-1">50+</div>
                <div className="text-gray-400">Projects Completed</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
