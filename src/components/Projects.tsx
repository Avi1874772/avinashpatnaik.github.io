
import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, Github, BarChart, Brain, TrendingUp } from 'lucide-react';

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const projects = [
    {
      title: 'Customer Churn Prediction',
      description: 'Built a machine learning model to predict customer churn with 94% accuracy using ensemble methods. Helped reduce churn rate by 23% for a telecom company.',
      icon: TrendingUp,
      tags: ['Python', 'Random Forest', 'XGBoost', 'Feature Engineering'],
      gradient: 'from-blue-500 to-cyan-500',
      metrics: ['94% Accuracy', '23% Churn Reduction', '15M+ Records'],
    },
    {
      title: 'Sales Forecasting Dashboard',
      description: 'Developed an interactive Tableau dashboard for sales forecasting using time series analysis. Improved forecast accuracy by 18% compared to previous methods.',
      icon: BarChart,
      tags: ['Tableau', 'Time Series', 'ARIMA', 'Prophet'],
      gradient: 'from-green-500 to-emerald-500',
      metrics: ['18% Better Accuracy', '5 Regions', 'Real-time Updates'],
    },
    {
      title: 'Recommendation Engine',
      description: 'Created a collaborative filtering recommendation system for an e-commerce platform. Increased user engagement by 35% and conversion rates by 12%.',
      icon: Brain,
      tags: ['Collaborative Filtering', 'Deep Learning', 'TensorFlow', 'A/B Testing'],
      gradient: 'from-purple-500 to-violet-500',
      metrics: ['35% More Engagement', '12% Higher Conversion', '2M+ Users'],
    },
    {
      title: 'Fraud Detection System',
      description: 'Implemented a real-time fraud detection system using anomaly detection algorithms. Successfully identified 98% of fraudulent transactions with minimal false positives.',
      icon: Brain,
      tags: ['Anomaly Detection', 'Real-time Processing', 'Apache Kafka', 'Isolation Forest'],
      gradient: 'from-red-500 to-pink-500',
      metrics: ['98% Detection Rate', '0.1% False Positives', 'Real-time Processing'],
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Real-world applications of data science solving complex business problems
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-8 rounded-xl border border-slate-700/50 hover:border-slate-600/50 transition-all duration-500 cursor-pointer transform hover:scale-105 hover:shadow-2xl ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="flex items-center mb-6">
                <div className={`p-4 rounded-lg bg-gradient-to-r ${project.gradient} mr-4 transition-transform duration-300 ${
                  hoveredProject === index ? 'scale-110' : ''
                }`}>
                  <project.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                  {project.title}
                </h3>
              </div>

              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                {project.description}
              </p>

              <div className="mb-6">
                <h4 className="text-white font-semibold mb-3">Key Metrics:</h4>
                <div className="flex flex-wrap gap-2">
                  {project.metrics.map((metric) => (
                    <span 
                      key={metric}
                      className={`px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${project.gradient} text-white`}
                    >
                      {metric}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h4 className="text-white font-semibold mb-3">Technologies:</h4>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span 
                      key={tag}
                      className="px-3 py-1 bg-slate-700/50 text-gray-300 rounded-full text-sm border border-slate-600/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200">
                  <ExternalLink size={16} />
                  Live Demo
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-slate-600 text-gray-300 rounded-lg hover:bg-slate-700/50 transition-all duration-200">
                  <Github size={16} />
                  Code
                </button>
              </div>

              {/* Hover gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-xl pointer-events-none`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
