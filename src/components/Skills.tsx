
import React, { useEffect, useRef, useState } from 'react';
import { BarChart, Brain, Database, TrendingUp, Code, Palette } from 'lucide-react';

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedSkills, setAnimatedSkills] = useState<Set<string>>(new Set());
  const sectionRef = useRef<HTMLElement>(null);

  const skillCategories = [
    {
      title: 'Machine Learning',
      icon: Brain,
      color: 'from-blue-500 to-cyan-500',
      skills: [
        { name: 'Python/Scikit-learn', level: 95 },
        { name: 'TensorFlow/Keras', level: 90 },
        { name: 'PyTorch', level: 85 },
        { name: 'XGBoost/LightGBM', level: 88 },
      ]
    },
    {
      title: 'Data Analysis',
      icon: BarChart,
      color: 'from-green-500 to-emerald-500',
      skills: [
        { name: 'Pandas/NumPy', level: 98 },
        { name: 'R/RStudio', level: 92 },
        { name: 'Statistical Analysis', level: 90 },
        { name: 'A/B Testing', level: 85 },
      ]
    },
    {
      title: 'Data Engineering',
      icon: Database,
      color: 'from-purple-500 to-violet-500',
      skills: [
        { name: 'SQL/PostgreSQL', level: 93 },
        { name: 'Apache Spark', level: 80 },
        { name: 'Docker/Kubernetes', level: 75 },
        { name: 'AWS/GCP', level: 82 },
      ]
    },
    {
      title: 'Visualization',
      icon: Palette,
      color: 'from-pink-500 to-rose-500',
      skills: [
        { name: 'Tableau', level: 90 },
        { name: 'Power BI', level: 85 },
        { name: 'Matplotlib/Seaborn', level: 92 },
        { name: 'D3.js', level: 78 },
      ]
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate skills progressively
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

  return (
    <section id="skills" ref={sectionRef} className="py-20 px-6 bg-gradient-to-br from-slate-800/20 to-slate-900/20">
      <div className="container mx-auto max-w-6xl">
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Technical Skills
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Proficient in cutting-edge technologies and methodologies for data science and analytics
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={category.title}
              className={`bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-8 rounded-xl border border-slate-700/50 hover:border-slate-600/50 transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${categoryIndex * 200}ms` }}
            >
              <div className="flex items-center mb-6">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${category.color} mr-4`}>
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">{category.title}</h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => {
                  const skillKey = `${categoryIndex}-${skillIndex}`;
                  const isAnimated = animatedSkills.has(skillKey);
                  
                  return (
                    <div key={skill.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 font-medium">{skill.name}</span>
                        <span className="text-gray-400 text-sm">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${category.color} transition-all duration-1000 ease-out`}
                          style={{
                            width: isAnimated ? `${skill.level}%` : '0%',
                            transitionDelay: `${skillIndex * 100}ms`
                          }}
                        />
                      </div>
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
