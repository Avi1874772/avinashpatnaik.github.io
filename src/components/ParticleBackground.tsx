
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

    // Simple stars array
    const stars: Array<{
      x: number;
      y: number;
      size: number;
      opacity: number;
      twinkle: number;
    }> = [];

    // Earth properties
    const earth = {
      x: canvas.width * 0.25,
      y: canvas.height * 0.7,
      radius: 60,
      rotation: 0
    };

    // Sun properties
    const sun = {
      x: canvas.width * 0.8,
      y: canvas.height * 0.2,
      radius: 40
    };

    // Initialize stars
    const initializeStars = () => {
      for (let i = 0; i < 200; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: 0.5 + Math.random() * 2,
          opacity: 0.3 + Math.random() * 0.7,
          twinkle: Math.random() * Math.PI * 2
        });
      }
    };

    initializeStars();

    let time = 0;

    const animate = () => {
      time += 0.01;
      
      // Complete black background
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw stars with twinkling effect
      stars.forEach((star) => {
        star.twinkle += 0.02;
        const twinkleOpacity = star.opacity * (0.3 + 0.7 * Math.sin(star.twinkle));
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${twinkleOpacity})`;
        ctx.fill();
      });

      // Draw Sun
      ctx.shadowBlur = 30;
      ctx.shadowColor = '#fbbf24';
      
      // Sun glow
      const sunGradient = ctx.createRadialGradient(
        sun.x, sun.y, 0,
        sun.x, sun.y, sun.radius * 2
      );
      sunGradient.addColorStop(0, '#fbbf24');
      sunGradient.addColorStop(0.4, '#f59e0b');
      sunGradient.addColorStop(1, 'rgba(251, 191, 36, 0)');
      
      ctx.beginPath();
      ctx.arc(sun.x, sun.y, sun.radius * 2, 0, Math.PI * 2);
      ctx.fillStyle = sunGradient;
      ctx.fill();
      
      // Sun core
      ctx.beginPath();
      ctx.arc(sun.x, sun.y, sun.radius, 0, Math.PI * 2);
      ctx.fillStyle = '#fbbf24';
      ctx.fill();

      // Draw Earth
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#3b82f6';
      
      // Earth main body
      const earthGradient = ctx.createRadialGradient(
        earth.x - 15, earth.y - 15, 0,
        earth.x, earth.y, earth.radius
      );
      earthGradient.addColorStop(0, '#60a5fa');
      earthGradient.addColorStop(0.7, '#2563eb');
      earthGradient.addColorStop(1, '#1e40af');
      
      ctx.beginPath();
      ctx.arc(earth.x, earth.y, earth.radius, 0, Math.PI * 2);
      ctx.fillStyle = earthGradient;
      ctx.fill();
      
      // Earth continents (simple green patches)
      earth.rotation += 0.005;
      ctx.shadowBlur = 0;
      ctx.fillStyle = 'rgba(34, 197, 94, 0.8)';
      
      for (let i = 0; i < 8; i++) {
        const angle = earth.rotation + (i * Math.PI / 4);
        const x = earth.x + Math.cos(angle) * (earth.radius * 0.6);
        const y = earth.y + Math.sin(angle) * (earth.radius * 0.4);
        const size = 4 + Math.sin(time + i) * 2;
        
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Earth atmosphere glow
      ctx.shadowBlur = 20;
      ctx.shadowColor = '#3b82f6';
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.3)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(earth.x, earth.y, earth.radius + 5, 0, Math.PI * 2);
      ctx.stroke();

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
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
