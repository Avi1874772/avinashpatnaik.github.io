import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  alpha: number;
  alphaSpeed: number;
}

interface Spacecraft {
  x: number;
  y: number;
  size: number;
  speedX: number;
  alpha: number;
  alphaSpeed: number;
  symbolIndex: number;
}

const codeSymbols = ['<>', '{}', '[]', '<>', '{}', '[]'];

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles: Particle[] = [];
  const spacecrafts: Spacecraft[] = [];
  const particleCount = 120;
  const spacecraftCount = 6;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles (stars)
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.2 + 0.3,
        speedY: 0.1 + Math.random() * 0.2,
        alpha: Math.random(),
        alphaSpeed: 0.001 + Math.random() * 0.002,
      });
    }

    // Initialize spacecrafts as code symbol clusters
    for (let i = 0; i < spacecraftCount; i++) {
      spacecrafts.push({
        x: Math.random() * width,
        y: Math.random() * height * 0.7 + height * 0.1,
        size: 14 + Math.random() * 10,
        speedX: 0.2 + Math.random() * 0.3,
        alpha: 0.3 + Math.random() * 0.5,
        alphaSpeed: 0.001 + Math.random() * 0.0015,
        symbolIndex: i % codeSymbols.length,
      });
    }

    // Draw subtle blue radial gradient in center
    const drawBackground = () => {
      const gradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        Math.max(width, height) / 1.5
      );
      gradient.addColorStop(0, '#001933');
      gradient.addColorStop(0.5, '#000000');
      gradient.addColorStop(1, '#000000');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    };

    // Draw star-like particles
    const drawParticles = () => {
      particles.forEach(p => {
        p.y -= p.speedY;
        p.alpha += p.alphaSpeed;
        if (p.alpha > 1 || p.alpha < 0.2) p.alphaSpeed = -p.alphaSpeed;
        if (p.y < 0) p.y = height;

        ctx.beginPath();
        ctx.fillStyle = `rgba(180, 220, 255, ${p.alpha})`;
        ctx.shadowColor = `rgba(180, 220, 255, ${p.alpha})`;
        ctx.shadowBlur = 6;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });
    };

    // Draw "spacecraft" as glowing code symbol strings
    const drawSpacecraft = (sc: Spacecraft) => {
      ctx.save();
      ctx.font = `${sc.size}px 'Source Code Pro', monospace`;
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';

      ctx.shadowColor = `rgba(180, 220, 255, ${sc.alpha * 0.8})`;
      ctx.shadowBlur = 8;
      ctx.fillStyle = `rgba(180, 220, 255, ${sc.alpha})`;

      const symbol = codeSymbols[sc.symbolIndex];

      ctx.fillText(symbol, sc.x, sc.y);

      ctx.shadowBlur = 0;
      ctx.restore();
    };

    const draw = () => {
      if (!ctx) return;

      ctx.clearRect(0, 0, width, height);

      drawBackground();
      drawParticles();

      spacecrafts.forEach(sc => {
        sc.x += sc.speedX;
        sc.alpha += sc.alphaSpeed;
        if (sc.alpha > 0.8 || sc.alpha < 0.3) sc.alphaSpeed = -sc.alphaSpeed;

        // Wrap around horizontally
        if (sc.x > width + 20) {
          sc.x = -20;
          sc.y = Math.random() * height * 0.7 + height * 0.1;
          sc.symbolIndex = Math.floor(Math.random() * codeSymbols.length);
        }

        drawSpacecraft(sc);
      });

      requestAnimationFrame(draw);
    };

    requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-screen h-screen pointer-events-none z-0"
      style={{ width: '100vw', height: '100vh' }}
    />
  );
};

export default ParticleBackground;
