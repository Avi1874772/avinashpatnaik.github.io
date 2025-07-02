
import React, { useEffect, useRef } from 'react';

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Data star particles
    const dataStars: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;
      twinkle: number;
      dataType: string;
    }> = [];

    // Digital signals/streams
    const digitalSignals: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      length: number;
      opacity: number;
      color: string;
      frequency: number;
    }> = [];

    // Orbital data points
    const orbitalData: Array<{
      angle: number;
      radius: number;
      speed: number;
      size: number;
      color: string;
      label: string;
    }> = [];

    // Earth properties
    const earth = {
      x: canvas.width * 0.2,
      y: canvas.height * 0.7,
      radius: 80,
      rotation: 0
    };

    // Initialize data stars
    const initializeDataStars = () => {
      const dataTypes = ['ML', 'AI', 'DL', 'NN', 'RF', 'SVM', 'KNN', 'NLP', 'CV', 'TS'];
      const colors = ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];
      
      for (let i = 0; i < 150; i++) {
        dataStars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: 1 + Math.random() * 3,
          opacity: 0.3 + Math.random() * 0.7,
          color: colors[Math.floor(Math.random() * colors.length)],
          twinkle: Math.random() * Math.PI * 2,
          dataType: dataTypes[Math.floor(Math.random() * dataTypes.length)]
        });
      }
    };

    // Initialize digital signals
    const initializeDigitalSignals = () => {
      const colors = ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981'];
      
      for (let i = 0; i < 20; i++) {
        digitalSignals.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          length: 30 + Math.random() * 60,
          opacity: 0.4 + Math.random() * 0.4,
          color: colors[Math.floor(Math.random() * colors.length)],
          frequency: 0.1 + Math.random() * 0.3
        });
      }
    };

    // Initialize orbital data points
    const initializeOrbitalData = () => {
      const labels = ['Data', 'Models', 'Analytics', 'Insights', 'Predictions', 'Algorithms'];
      const colors = ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];
      
      for (let i = 0; i < 6; i++) {
        orbitalData.push({
          angle: (i / 6) * Math.PI * 2,
          radius: 120 + i * 20,
          speed: 0.01 + (i * 0.005),
          size: 2 + Math.random() * 2,
          color: colors[i],
          label: labels[i]
        });
      }
    };

    initializeDataStars();
    initializeDigitalSignals();
    initializeOrbitalData();

    let time = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      time += 0.01;
      
      // Deep space background
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add subtle space nebula effect
      const nebula = ctx.createRadialGradient(
        canvas.width * 0.3, canvas.height * 0.4, 0,
        canvas.width * 0.3, canvas.height * 0.4, canvas.width * 0.5
      );
      nebula.addColorStop(0, 'rgba(59, 130, 246, 0.03)');
      nebula.addColorStop(0.5, 'rgba(139, 92, 246, 0.02)');
      nebula.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = nebula;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw data stars
      dataStars.forEach((star, index) => {
        star.x += star.vx;
        star.y += star.vy;
        star.twinkle += 0.05;
        
        // Wrap around screen
        if (star.x > canvas.width) star.x = 0;
        if (star.x < 0) star.x = canvas.width;
        if (star.y > canvas.height) star.y = 0;
        if (star.y < 0) star.y = canvas.height;
        
        // Mouse interaction
        const distance = Math.sqrt(
          Math.pow(mouseX - star.x, 2) + Math.pow(mouseY - star.y, 2)
        );
        const isNearMouse = distance < 100;
        
        // Draw star with twinkling effect
        const currentOpacity = star.opacity * (0.5 + 0.5 * Math.sin(star.twinkle));
        const currentSize = star.size + (isNearMouse ? 1 : 0);
        
        ctx.shadowBlur = isNearMouse ? 15 : 5;
        ctx.shadowColor = star.color;
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, currentSize, 0, Math.PI * 2);
        ctx.fillStyle = `${star.color}${Math.floor(currentOpacity * 255).toString(16).padStart(2, '0')}`;
        ctx.fill();
        
        // Show data type label on hover
        if (isNearMouse && Math.random() < 0.1) {
          ctx.shadowBlur = 0;
          ctx.font = '8px monospace';
          ctx.fillStyle = `${star.color}CC`;
          ctx.fillText(star.dataType, star.x + 5, star.y - 5);
        }
      });

      // Update and draw digital signals
      digitalSignals.forEach((signal) => {
        signal.x += signal.vx;
        signal.y += signal.vy;
        
        // Wrap around screen
        if (signal.x > canvas.width + signal.length) signal.x = -signal.length;
        if (signal.x < -signal.length) signal.x = canvas.width + signal.length;
        if (signal.y > canvas.height + 20) signal.y = -20;
        if (signal.y < -20) signal.y = canvas.height + 20;
        
        // Draw signal trail with wave effect
        const waveOffset = Math.sin(time + signal.x * signal.frequency) * 10;
        
        ctx.shadowBlur = 3;
        ctx.shadowColor = signal.color;
        ctx.strokeStyle = `${signal.color}${Math.floor(signal.opacity * 255).toString(16).padStart(2, '0')}`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(signal.x - signal.vx * signal.length, signal.y - signal.vy * signal.length + waveOffset);
        ctx.lineTo(signal.x, signal.y);
        ctx.stroke();
        
        // Draw signal pulse
        if (Math.random() < 0.05) {
          ctx.beginPath();
          ctx.arc(signal.x, signal.y, 3, 0, Math.PI * 2);
          ctx.fillStyle = `${signal.color}AA`;
          ctx.fill();
        }
      });

      // Draw Earth
      ctx.shadowBlur = 20;
      ctx.shadowColor = '#3b82f6';
      
      // Earth outline
      ctx.beginPath();
      ctx.arc(earth.x, earth.y, earth.radius, 0, Math.PI * 2);
      const earthGradient = ctx.createRadialGradient(
        earth.x - 20, earth.y - 20, 0,
        earth.x, earth.y, earth.radius
      );
      earthGradient.addColorStop(0, '#4f46e5');
      earthGradient.addColorStop(0.7, '#1e40af');
      earthGradient.addColorStop(1, '#0f172a');
      ctx.fillStyle = earthGradient;
      ctx.fill();
      
      // Earth continents (simplified)
      earth.rotation += 0.005;
      ctx.shadowBlur = 0;
      ctx.fillStyle = 'rgba(34, 197, 94, 0.3)';
      for (let i = 0; i < 6; i++) {
        const angle = earth.rotation + (i * Math.PI / 3);
        const x = earth.x + Math.cos(angle) * (earth.radius * 0.6);
        const y = earth.y + Math.sin(angle) * (earth.radius * 0.3);
        ctx.beginPath();
        ctx.arc(x, y, 8 + Math.sin(time + i) * 2, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw orbital data points around Earth
      orbitalData.forEach((data, index) => {
        data.angle += data.speed;
        const x = earth.x + Math.cos(data.angle) * data.radius;
        const y = earth.y + Math.sin(data.angle) * data.radius * 0.5; // Elliptical orbit
        
        // Draw orbit path
        ctx.strokeStyle = `${data.color}20`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.ellipse(earth.x, earth.y, data.radius, data.radius * 0.5, 0, 0, Math.PI * 2);
        ctx.stroke();
        
        // Draw data point
        ctx.shadowBlur = 8;
        ctx.shadowColor = data.color;
        ctx.beginPath();
        ctx.arc(x, y, data.size, 0, Math.PI * 2);
        ctx.fillStyle = data.color;
        ctx.fill();
        
        // Draw connecting line to Earth
        ctx.shadowBlur = 0;
        ctx.strokeStyle = `${data.color}40`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(earth.x, earth.y);
        ctx.lineTo(x, y);
        ctx.stroke();
        
        // Draw data label
        if (Math.sin(time + index) > 0.5) {
          ctx.font = '10px monospace';
          ctx.fillStyle = `${data.color}CC`;
          ctx.fillText(data.label, x + 10, y);
        }
      });

      // Draw constellation connections between nearby stars
      ctx.shadowBlur = 0;
      dataStars.forEach((star1, i) => {
        dataStars.slice(i + 1).forEach((star2) => {
          const distance = Math.sqrt(
            Math.pow(star1.x - star2.x, 2) + Math.pow(star1.y - star2.y, 2)
          );
          
          if (distance < 80 && Math.random() < 0.001) {
            ctx.strokeStyle = 'rgba(59, 130, 246, 0.1)';
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(star1.x, star1.y);
            ctx.lineTo(star2.x, star2.y);
            ctx.stroke();
          }
        });
      });

      // Add floating data processing labels
      if (Math.random() < 0.008) {
        const labels = ['Processing...', 'Analyzing...', 'Learning...', 'Predicting...', 'Computing...'];
        const label = labels[Math.floor(Math.random() * labels.length)];
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        
        ctx.font = '12px monospace';
        ctx.fillStyle = 'rgba(59, 130, 246, 0.4)';
        ctx.fillText(label, x, y);
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ width: '100vw', height: '100vh' }}
    />
  );
};

export default ParticleBackground;
