
import React, { useEffect, useRef, useState } from 'react';
import { Brain, Database, TrendingUp, Code, Palette, Award, Users, Target } from 'lucide-react';

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const skillCategories = [
    {
      title: 'Machine Learning & AI',
      icon: Brain,
      color: 'from-blue-500 to-cyan-500',
      description: 'Advanced expertise in developing and deploying ML models',
      skills: [
        { 
          name: 'Deep Learning', 
          description: 'Neural networks, CNNs, RNNs, Transformers using TensorFlow & PyTorch',
          experience: '5+ years',
          projects: '15+ projects'
        },
        { 
          name: 'Machine Learning', 
          description: 'Supervised/Unsupervised learning, ensemble methods, feature engineering',
          experience: '6+ years',
          projects: '25+ projects'
        },
        { 
          name: 'Computer Vision', 
          description: 'Image classification, object detection, semantic segmentation',
          experience: '4+ years',
          projects: '12+ projects'
        },
        { 
          name: 'Natural Language Processing', 
          description: 'Text analysis, sentiment analysis, language models, chatbots',
          experience: '3+ years',
          projects: '8+ projects'
        },
      ]
    },
    {
      title: 'Data Science & Analytics',
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500',
      description: 'Transforming complex data into actionable business insights',
      skills: [
        { 
          name: 'Statistical Analysis', 
          description: 'Hypothesis testing, regression analysis, time series forecasting',
          experience: '7+ years',
          projects: '30+ analyses'
        },
        { 
          name: 'Data Mining', 
          description: 'Pattern recognition, clustering, association rules, anomaly detection',
          experience: '5+ years',
          projects: '20+ projects'
        },
        { 
          name: 'Business Intelligence', 
          description: 'KPI development, dashboard creation, performance optimization',
          experience: '4+ years',
          projects: '18+ dashboards'
        },
        { 
          name: 'Predictive Analytics', 
          description: 'Forecasting models, risk assessment, trend analysis',
          experience: '5+ years',
          projects: '22+ models'
        },
      ]
    },
    {
      title: 'Data Engineering & Infrastructure',
      icon: Database,
      color: 'from-purple-500 to-violet-500',
      description: 'Building robust data pipelines and scalable architectures',
      skills: [
        { 
          name: 'Big Data Technologies', 
          description: 'Apache Spark, Hadoop, Kafka, distributed computing systems',
          experience: '4+ years',
          projects: '10+ pipelines'
        },
        { 
          name: 'Cloud Platforms', 
          description: 'AWS, GCP, Azure - data lakes, warehouses, ML services',
          experience: '5+ years',
          projects: '15+ deployments'
        },
        { 
          name: 'Database Management', 
          description: 'SQL/NoSQL databases, data modeling, query optimization',
          experience: '6+ years',
          projects: '25+ databases'
        },
        { 
          name: 'ETL/ELT Processes', 
          description: 'Data pipeline automation, real-time processing, data quality',
          experience: '5+ years',
          projects: '20+ pipelines'
        },
      ]
    },
    {
      title: 'Technical Leadership & Strategy',
      icon: Award,
      color: 'from-orange-500 to-red-500',
      description: 'Leading teams and driving data-driven innovation',
      skills: [
        { 
          name: 'Team Leadership', 
          description: 'Managing cross-functional teams, mentoring junior data scientists',
          experience: '3+ years',
          projects: '5+ teams led'
        },
        { 
          name: 'Project Management', 
          description: 'Agile methodologies, stakeholder management, delivery optimization',
          experience: '4+ years',
          projects: '20+ projects'
        },
        { 
          name: 'Strategic Planning', 
          description: 'Data strategy development, technology roadmaps, ROI analysis',
          experience: '3+ years',
          projects: '8+ strategies'
        },
        { 
          name: 'Client Consulting', 
          description: 'Requirements gathering, solution architecture, presentation skills',
          experience: '5+ years',
          projects: '15+ clients'
        },
      ]
    },
  ];

  const achievements = [
    {
      icon: Award,
      title: 'Technical Certifications',
      items: ['AWS Certified Solutions Architect', 'Google Cloud Professional Data Engineer', 'Microsoft Azure Data Scientist Associate']
    },
    {
      icon: Users,
      title: 'Industry Impact',
      items: ['Published 12+ research papers', 'Speaker at 8+ conferences', 'Mentor to 25+ professionals']
    },
    {
      icon: Target,
      title: 'Business Results',
      items: ['$2M+ cost savings delivered', '40% efficiency improvements', '95%+ model accuracy achieved']
    }
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
    <section id="skills" ref={sectionRef} className="py-20 px-6 bg-gradient-to-br from-slate-800/10 to-slate-900/10">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Expertise & Capabilities
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            With over 8 years of experience in data science and analytics, I specialize in transforming complex data 
            challenges into innovative solutions that drive business growth and technological advancement.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={category.title}
              className={`bg-gradient-to-br from-slate-800/40 to-slate-900/40 p-8 rounded-2xl border border-slate-700/30 hover:border-slate-600/50 transition-all duration-500 backdrop-blur-sm ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${categoryIndex * 150}ms` }}
            >
              <div className="flex items-center mb-6">
                <div className={`p-4 rounded-xl bg-gradient-to-r ${category.color} mr-5 shadow-lg`}>
                  <category.icon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{category.title}</h3>
                  <p className="text-gray-400 text-sm">{category.description}</p>
                </div>
              </div>

              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <div 
                    key={skill.name} 
                    className="bg-slate-800/30 p-5 rounded-xl border border-slate-700/20 hover:bg-slate-800/50 transition-all duration-300"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="text-lg font-semibold text-white">{skill.name}</h4>
                      <div className="flex gap-3 text-xs">
                        <span className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full">
                          {skill.experience}
                        </span>
                        <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded-full">
                          {skill.projects}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">{skill.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Achievements Section */}
        <div className={`transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`} style={{ transitionDelay: '600ms' }}>
          <h3 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Professional Achievements
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <div 
                key={achievement.title}
                className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 p-6 rounded-xl border border-slate-700/20 text-center hover:border-slate-600/40 transition-all duration-300"
              >
                <div className="inline-flex p-4 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 mb-4">
                  <achievement.icon className="w-8 h-8 text-purple-400" />
                </div>
                <h4 className="text-xl font-semibold text-white mb-4">{achievement.title}</h4>
                <ul className="space-y-2">
                  {achievement.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-gray-300 text-sm">{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
