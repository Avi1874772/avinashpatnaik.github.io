import React, { useEffect, useRef, useState } from 'react';
import { Brain, Database, TrendingUp, Code, Palette, Globe } from 'lucide-react';

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedSkills, setAnimatedSkills] = useState<Set<string>>(new Set());
  const sectionRef = useRef<HTMLElement>(null);

  const skillCategories = [
    {
      title: 'Machine Learning & AI',
      icon: Brain,
      color: 'from-blue-500 to-cyan-500',
      description: 'Advanced expertise in building intelligent systems',
      skills: [
        { 
          name: 'Deep Learning', 
          details: 'Neural networks, CNNs, RNNs, Transformers with TensorFlow & PyTorch',
          expertise: 'Expert'
        },
        { 
          name: 'Classical ML', 
          details: 'Supervised/Unsupervised learning, ensemble methods, feature engineering',
          expertise: 'Expert'
        },
        { 
          name: 'NLP & Computer Vision', 
          details: 'Text processing, image recognition, object detection, sentiment analysis',
          expertise: 'Advanced'
        },
        { 
          name: 'MLOps & Deployment', 
          details: 'Model versioning, CI/CD pipelines, containerization, monitoring',
          expertise: 'Expert'
        },
      ]
    },
    {
      title: 'Data Engineering',
      icon: Database,
      color: 'from-green-500 to-emerald-500',
      description: 'Scalable data infrastructure and pipeline development',
      skills: [
        { 
          name: 'Big Data Technologies', 
          details: 'Apache Spark, Hadoop, Kafka for large-scale data processing',
          expertise: 'Expert'
        },
        { 
          name: 'Cloud Platforms', 
          details: 'AWS, GCP, Azure - Data lakes, warehouses, serverless computing',
          expertise: 'Advanced'
        },
        { 
          name: 'Database Systems', 
          details: 'SQL/NoSQL, PostgreSQL, MongoDB, Redis, time-series databases',
          expertise: 'Expert'
        },
        { 
          name: 'Data Pipelines', 
          details: 'ETL/ELT, real-time streaming, data quality, orchestration',
          expertise: 'Advanced'
        },
      ]
    },
    {
      title: 'Analytics & Statistics',
      icon: TrendingUp,
      color: 'from-purple-500 to-violet-500',
      description: 'Statistical modeling and business intelligence',
      skills: [
        { 
          name: 'Statistical Analysis', 
          details: 'Hypothesis testing, regression analysis, time series forecasting',
          expertise: 'Expert'
        },
        { 
          name: 'Business Intelligence', 
          details: 'KPI development, dashboard creation, stakeholder reporting',
          expertise: 'Advanced'
        },
        { 
          name: 'Experimental Design', 
          details: 'A/B testing, causal inference, statistical significance testing',
          expertise: 'Advanced'
        },
        { 
          name: 'Predictive Modeling', 
          details: 'Forecasting, risk assessment, optimization algorithms',
          expertise: 'Expert'
        },
      ]
    },
    {
      title: 'Programming & Tools',
      icon: Code,
      color: 'from-orange-500 to-red-500',
      description: 'Full-stack development and data science tools',
      skills: [
        { 
          name: 'Python Ecosystem', 
          details: 'Pandas, NumPy, Scikit-learn, Matplotlib, Seaborn, Jupyter',
          expertise: 'Expert'
        },
        { 
          name: 'R & Statistical Computing', 
          details: 'RStudio, ggplot2, dplyr, statistical packages, Shiny apps',
          expertise: 'Advanced'
        },
        { 
          name: 'Web Technologies', 
          details: 'React, TypeScript, REST APIs, microservices architecture',
          expertise: 'Advanced'
        },
        { 
          name: 'DevOps & Version Control', 
          details: 'Git, Docker, Kubernetes, CI/CD, infrastructure as code',
          expertise: 'Advanced'
        },
      ]
    },
    {
      title: 'Data Visualization',
      icon: Palette,
      color: 'from-pink-500 to-rose-500',
      description: 'Creating compelling visual narratives from data',
      skills: [
        { 
          name: 'Interactive Dashboards', 
          details: 'Tableau, Power BI, Plotly Dash, real-time monitoring',
          expertise: 'Expert'
        },
        { 
          name: 'Custom Visualizations', 
          details: 'D3.js, custom charts, interactive web applications',
          expertise: 'Advanced'
        },
        { 
          name: 'Storytelling with Data', 
          details: 'Executive presentations, insight communication, visual design',
          expertise: 'Expert'
        },
        { 
          name: 'Geospatial Analytics', 
          details: 'GIS, mapping, location intelligence, spatial statistics',
          expertise: 'Intermediate'
        },
      ]
    },
    {
      title: 'Domain Expertise',
      icon: Globe,
      color: 'from-indigo-500 to-blue-500',
      description: 'Industry knowledge and business acumen',
      skills: [
        { 
          name: 'Financial Analytics', 
          details: 'Risk modeling, fraud detection, algorithmic trading, fintech',
          expertise: 'Expert'
        },
        { 
          name: 'Healthcare & Biotech', 
          details: 'Clinical data analysis, drug discovery, medical imaging',
          expertise: 'Intermediate'
        },
        { 
          name: 'E-commerce & Marketing', 
          details: 'Customer segmentation, recommendation systems, attribution',
          expertise: 'Expert'
        },
        { 
          name: 'IoT & Sensors', 
          details: 'Time-series analysis, anomaly detection, predictive maintenance',
          expertise: 'Advanced'
        },
      ]
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          skillCategories.forEach((category, categoryIndex) => {
            category.skills.forEach((skill, skillIndex) => {
              setTimeout(() => {
                setAnimatedSkills(prev => new Set([...prev, `${categoryIndex}-${skillIndex}`]));
              }, (categoryIndex * 200) + (skillIndex * 100) + 500);
            });
          });
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const getExpertiseColor = (expertise: string) => {
    switch (expertise) {
      case 'Expert': return 'text-green-400 bg-green-400/10';
      case 'Advanced': return 'text-blue-400 bg-blue-400/10';
      case 'Intermediate': return 'text-yellow-400 bg-yellow-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  return (
    <section id="skills" ref={sectionRef} className="py-20 px-6 bg-gradient-to-br from-slate-800/20 to-slate-900/20">
      <div className="container mx-auto max-w-7xl">
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Technical Expertise
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto">
            Comprehensive data science and engineering capabilities spanning the entire ML lifecycle, 
            from data collection and processing to model deployment and business impact measurement.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={category.title}
              className={`bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-6 rounded-xl border border-slate-700/50 hover:border-slate-600/50 transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${categoryIndex * 150}ms` }}
            >
              <div className="flex items-center mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${category.color} mr-4`}>
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{category.title}</h3>
                </div>
              </div>
              
              <p className="text-gray-400 text-sm mb-6">{category.description}</p>

              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => {
                  const skillKey = `${categoryIndex}-${skillIndex}`;
                  const isAnimated = animatedSkills.has(skillKey);
                  
                  return (
                    <div 
                      key={skill.name} 
                      className={`transition-all duration-500 ${
                        isAnimated ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                      }`}
                      style={{ transitionDelay: `${skillIndex * 100}ms` }}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-white font-semibold text-sm">{skill.name}</h4>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getExpertiseColor(skill.expertise)}`}>
                          {skill.expertise}
                        </span>
                      </div>
                      <p className="text-gray-400 text-xs leading-relaxed">{skill.details}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
