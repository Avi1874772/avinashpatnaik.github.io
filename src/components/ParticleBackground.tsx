
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

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;
      pulse: number;
      pulseSpeed: number;
      trail: Array<{ x: number; y: number; opacity: number }>;
    }> = [];

    const colors = [
      'rgba(99, 102, 241, ',
      'rgba(139, 92, 246, ',
      'rgba(236, 72, 153, ',
      'rgba(59, 130, 246, ',
      'rgba(16, 185, 129, ',
    ];

    // Create enhanced particles
    for (let i = 0; i < 150; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.8 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        trail: [],
      });
    }

    let mouseX = 0;
    let mouseY = 0;
    let time = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      time += 0.01;
      ctx.fillStyle = 'rgba(15, 23, 42, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        // Mouse attraction
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          const force = (150 - distance) / 150;
          particle.vx += (dx / distance) * force * 0.01;
          particle.vy += (dy / distance) * force * 0.01;
        }

        // Wave motion
        particle.x += particle.vx + Math.sin(time + particle.y * 0.01) * 0.5;
        particle.y += particle.vy + Math.cos(time + particle.x * 0.01) * 0.5;

        // Pulse effect
        particle.pulse += particle.pulseSpeed;
        const pulseSize = particle.size + Math.sin(particle.pulse) * 0.5;

        // Boundaries with wrapping
        if (particle.x < -10) particle.x = canvas.width + 10;
        if (particle.x > canvas.width + 10) particle.x = -10;
        if (particle.y < -10) particle.y = canvas.height + 10;
        if (particle.y > canvas.height + 10) particle.y = -10;

        // Trail effect
        particle.trail.push({ x: particle.x, y: particle.y, opacity: particle.opacity });
        if (particle.trail.length > 8) {
          particle.trail.shift();
        }

        // Draw trail
        particle.trail.forEach((point, i) => {
          const trailOpacity = (point.opacity * (i / particle.trail.length)) * 0.3;
          ctx.beginPath();
          ctx.arc(point.x, point.y, pulseSize * 0.3, 0, Math.PI * 2);
          ctx.fillStyle = particle.color + trailOpacity + ')';
          ctx.fill();
        });

        // Draw main particle with glow
        ctx.shadowBlur = 20;
        ctx.shadowColor = particle.color + '0.8)';
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, pulseSize, 0, Math.PI * 2);
        ctx.fillStyle = particle.color + particle.opacity + ')';
        ctx.fill();
        ctx.shadowBlur = 0;

        // Enhanced connections with animated thickness
        particles.slice(index + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            const connectionOpacity = 0.3 * (1 - distance / 120);
            const lineWidth = 1 + Math.sin(time * 2 + distance * 0.01) * 0.5;
            
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = particle.color + connectionOpacity + ')';
            ctx.lineWidth = lineWidth;
            ctx.stroke();
          }
        });
      });

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
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};

export default ParticleBackground;
