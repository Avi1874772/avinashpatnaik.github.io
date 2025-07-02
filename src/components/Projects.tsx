
import React from 'react';

const Projects = () => {
  const projects = [
    {
      title: 'Customer Churn Prediction',
      description: 'Built a machine learning model to predict customer churn with 94% accuracy using ensemble methods.',
      tags: ['Python', 'Machine Learning', 'Data Analysis'],
    },
    {
      title: 'Sales Forecasting Dashboard',
      description: 'Developed an interactive dashboard for sales forecasting using time series analysis.',
      tags: ['Tableau', 'Time Series', 'Business Intelligence'],
    },
    {
      title: 'Recommendation Engine',
      description: 'Created a collaborative filtering recommendation system for an e-commerce platform.',
      tags: ['Deep Learning', 'Python', 'Recommendation Systems'],
    },
    {
      title: 'Fraud Detection System',
      description: 'Implemented a real-time fraud detection system using anomaly detection algorithms.',
      tags: ['Anomaly Detection', 'Real-time Processing', 'Machine Learning'],
    },
  ];

  return (
    <section id="projects" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl font-bold mb-12 text-center text-white">
          Featured Projects
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="bg-slate-800 p-6 rounded-lg hover:bg-slate-700 transition-colors"
            >
              <h3 className="text-xl font-bold text-white mb-3">
                {project.title}
              </h3>
              
              <p className="text-gray-300 mb-4 leading-relaxed">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="px-3 py-1 bg-indigo-600 text-white text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
