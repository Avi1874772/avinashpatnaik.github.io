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

    // Digital numbers (1s and 0s) for signals
    const digitalNumbers: Array<{
      x: number;
      y: number;
      value: string;
      opacity: number;
      fadeDirection: number;
      color: string;
      size: number;
    }> = [];

    // Create random digital numbers
    for (let i = 0; i < 25; i++) {
      digitalNumbers.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        value: Math.random() > 0.5 ? '1' : '0',
        opacity: Math.random(),
        fadeDirection: Math.random() > 0.5 ? 1 : -1,
        color: ['rgba(59, 130, 246, ', 'rgba(168, 85, 247, ', 'rgba(34, 197, 94, '][Math.floor(Math.random() * 3)],
        size: 12 + Math.random() * 8
      });
    }

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
      
      // Clear with dark background
      ctx.fillStyle = 'rgba(15, 23, 42, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw digital numbers
      digitalNumbers.forEach((number, index) => {
        // Update opacity for blinking effect
        number.opacity += number.fadeDirection * 0.02;
        
        if (number.opacity <= 0) {
          number.opacity = 0;
          number.fadeDirection = 1;
          // Change value randomly when fading in
          if (Math.random() < 0.3) {
            number.value = Math.random() > 0.5 ? '1' : '0';
          }
        } else if (number.opacity >= 1) {
          number.opacity = 1;
          number.fadeDirection = -1;
        }

        // Occasionally change position
        if (Math.random() < 0.001) {
          number.x = Math.random() * canvas.width;
          number.y = Math.random() * canvas.height;
        }

        // Mouse interaction - brighten nearby numbers
        const dx = mouseX - number.x;
        const dy = mouseY - number.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const mouseEffect = distance < 100 ? (100 - distance) / 100 * 0.5 : 0;

        // Draw digital number
        ctx.font = `${number.size}px 'Courier New', monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        const finalOpacity = Math.min(1, number.opacity + mouseEffect);
        ctx.fillStyle = number.color + finalOpacity + ')';
        ctx.fillText(number.value, number.x, number.y);

        // Add subtle glow effect
        if (finalOpacity > 0.5) {
          ctx.shadowBlur = 5;
          ctx.shadowColor = number.color + '0.3)';
          ctx.fillText(number.value, number.x, number.y);
          ctx.shadowBlur = 0;
        }
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
      className="fixed top-0 left-0 w-screen h-screen pointer-events-none z-0"
      style={{ width: '100vw', height: '100vh' }}
    />
  );
};

export default ParticleBackground;
