
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

    // Analog Signal Waves
    const signalWaves: Array<{
      amplitude: number;
      frequency: number;
      phase: number;
      speed: number;
      y: number;
      color: string;
      opacity: number;
      thickness: number;
    }> = [];

    // Data Points flowing along signals
    const dataPoints: Array<{
      x: number;
      y: number;
      vx: number;
      size: number;
      opacity: number;
      color: string;
      trail: Array<{x: number, y: number, opacity: number}>;
      waveIndex: number;
      progress: number;
    }> = [];

    // Elegant Grid Lines
    const gridLines: Array<{
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      opacity: number;
      type: 'major' | 'minor';
    }> = [];

    // Sophisticated Tech Nodes
    const techNodes: Array<{
      x: number;
      y: number;
      size: number;
      pulsePhase: number;
      connections: number[];
      color: string;
      opacity: number;
      type: 'primary' | 'secondary' | 'data';
    }> = [];

    // Floating Mathematical Symbols
    const mathSymbols: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      symbol: string;
      opacity: number;
      size: number;
      rotation: number;
      rotationSpeed: number;
    }> = [];

    const elegantColors = [
      'rgba(100, 181, 246, ', // Light Blue
      'rgba(129, 199, 212, ', // Cyan
      'rgba(174, 213, 129, ', // Light Green
      'rgba(255, 183, 77, ',  // Amber
      'rgba(206, 147, 216, ', // Purple
      'rgba(240, 98, 146, ',  // Pink
    ];

    const mathSymbols_list = ['∑', '∆', '∇', '∞', 'π', 'λ', 'α', 'β', 'γ', 'θ', '∈', '∋', '⊂', '⊃', '∪', '∩', '≈', '≠', '≤', '≥', '→', '←', '↑', '↓'];

    // Initialize elegant grid
    for (let x = 0; x <= canvas.width; x += canvas.width / 20) {
      gridLines.push({
        x1: x, y1: 0, x2: x, y2: canvas.height,
        opacity: x % (canvas.width / 5) === 0 ? 0.15 : 0.05,
        type: x % (canvas.width / 5) === 0 ? 'major' : 'minor'
      });
    }
    for (let y = 0; y <= canvas.height; y += canvas.height / 15) {
      gridLines.push({
        x1: 0, y1: y, x2: canvas.width, y2: y,
        opacity: y % (canvas.height / 5) === 0 ? 0.15 : 0.05,
        type: y % (canvas.height / 5) === 0 ? 'major' : 'minor'
      });
    }

    // Initialize analog signal waves
    for (let i = 0; i < 8; i++) {
      signalWaves.push({
        amplitude: Math.random() * 80 + 40,
        frequency: Math.random() * 0.02 + 0.005,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.02 + 0.01,
        y: (canvas.height / 9) * (i + 1),
        color: elegantColors[Math.floor(Math.random() * elegantColors.length)],
        opacity: Math.random() * 0.6 + 0.3,
        thickness: Math.random() * 3 + 1
      });
    }

    // Initialize data points
    for (let i = 0; i < 25; i++) {
      const waveIndex = Math.floor(Math.random() * signalWaves.length);
      dataPoints.push({
        x: Math.random() * canvas.width,
        y: signalWaves[waveIndex]?.y || canvas.height / 2,
        vx: Math.random() * 2 + 1,
        size: Math.random() * 6 + 3,
        opacity: Math.random() * 0.8 + 0.4,
        color: elegantColors[Math.floor(Math.random() * elegantColors.length)],
        trail: [],
        waveIndex,
        progress: Math.random()
      });
    }

    // Initialize tech nodes
    for (let i = 0; i < 15; i++) {
      const types = ['primary', 'secondary', 'data'] as const;
      techNodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 20 + 10,
        pulsePhase: Math.random() * Math.PI * 2,
        connections: [],
        color: elegantColors[Math.floor(Math.random() * elegantColors.length)],
        opacity: Math.random() * 0.6 + 0.2,
        type: types[Math.floor(Math.random() * types.length)]
      });
    }

    // Initialize floating math symbols
    for (let i = 0; i < 12; i++) {
      mathSymbols.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        symbol: mathSymbols_list[Math.floor(Math.random() * mathSymbols_list.length)],
        opacity: Math.random() * 0.4 + 0.1,
        size: Math.random() * 20 + 15,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.01
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
      time += 0.016;

      // Create sophisticated gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, 'rgba(15, 23, 42, 0.98)');
      gradient.addColorStop(0.3, 'rgba(30, 41, 59, 0.95)');
      gradient.addColorStop(0.7, 'rgba(51, 65, 85, 0.95)');
      gradient.addColorStop(1, 'rgba(15, 23, 42, 0.98)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw elegant grid
      gridLines.forEach(line => {
        ctx.strokeStyle = line.type === 'major' 
          ? `rgba(148, 163, 184, ${line.opacity})` 
          : `rgba(100, 116, 139, ${line.opacity})`;
        ctx.lineWidth = line.type === 'major' ? 1 : 0.5;
        ctx.beginPath();
        ctx.moveTo(line.x1, line.y1);
        ctx.lineTo(line.x2, line.y2);
        ctx.stroke();
      });

      // Draw analog signal waves
      signalWaves.forEach((wave, index) => {
        wave.phase += wave.speed;
        
        ctx.strokeStyle = wave.color + wave.opacity + ')';
        ctx.lineWidth = wave.thickness;
        ctx.shadowBlur = 15;
        ctx.shadowColor = wave.color + '0.5)';
        
        ctx.beginPath();
        for (let x = 0; x <= canvas.width; x += 2) {
          const y = wave.y + Math.sin(x * wave.frequency + wave.phase) * wave.amplitude;
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Add signal intensity indicators
        if (Math.random() < 0.02) {
          const x = Math.random() * canvas.width;
          const y = wave.y + Math.sin(x * wave.frequency + wave.phase) * wave.amplitude;
          
          ctx.beginPath();
          ctx.arc(x, y, 4, 0, Math.PI * 2);
          ctx.fillStyle = wave.color + '0.8)';
          ctx.fill();
          
          // Ripple effect
          ctx.beginPath();
          ctx.arc(x, y, 8, 0, Math.PI * 2);
          ctx.strokeStyle = wave.color + '0.4)';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      // Update and draw data points
      dataPoints.forEach(point => {
        // Follow the wave
        const wave = signalWaves[point.waveIndex];
        if (wave) {
          point.y = wave.y + Math.sin(point.x * wave.frequency + wave.phase) * wave.amplitude;
        }

        // Move along x-axis
        point.x += point.vx;
        if (point.x > canvas.width + 50) {
          point.x = -50;
        }

        // Add to trail
        point.trail.push({
          x: point.x,
          y: point.y,
          opacity: point.opacity
        });

        // Limit trail length
        if (point.trail.length > 8) {
          point.trail.shift();
        }

        // Draw trail
        point.trail.forEach((trailPoint, index) => {
          const trailOpacity = (index / point.trail.length) * point.opacity * 0.5;
          const size = point.size * (index / point.trail.length);
          
          ctx.beginPath();
          ctx.arc(trailPoint.x, trailPoint.y, size, 0, Math.PI * 2);
          ctx.fillStyle = point.color + trailOpacity + ')';
          ctx.fill();
        });

        // Draw main point
        ctx.shadowBlur = 12;
        ctx.shadowColor = point.color + '0.8)';
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.size, 0, Math.PI * 2);
        ctx.fillStyle = point.color + point.opacity + ')';
        ctx.fill();
        
        // Inner glow
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.size * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Update and draw tech nodes
      techNodes.forEach((node, index) => {
        node.pulsePhase += 0.03;
        const pulseSize = node.size + Math.sin(node.pulsePhase) * 4;

        // Mouse interaction
        const dx = mouseX - node.x;
        const dy = mouseY - node.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          const intensity = (100 - distance) / 100;
          ctx.shadowBlur = 25 * intensity;
          ctx.shadowColor = node.color + '1)';
        } else {
          ctx.shadowBlur = 8;
          ctx.shadowColor = node.color + '0.4)';
        }

        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, pulseSize, 0, Math.PI * 2);
        ctx.fillStyle = node.color + node.opacity + ')';
        ctx.fill();

        // Draw connections to nearby nodes
        techNodes.slice(index + 1).forEach(otherNode => {
          const dx = node.x - otherNode.x;
          const dy = node.y - otherNode.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            const opacity = 0.3 * (1 - distance / 150);
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(otherNode.x, otherNode.y);
            ctx.strokeStyle = node.color + opacity + ')';
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });

        ctx.shadowBlur = 0;
      });

      // Update and draw floating math symbols
      mathSymbols.forEach(symbol => {
        symbol.x += symbol.vx;
        symbol.y += symbol.vy;
        symbol.rotation += symbol.rotationSpeed;

        // Boundaries
        if (symbol.x < -50) symbol.x = canvas.width + 50;
        if (symbol.x > canvas.width + 50) symbol.x = -50;
        if (symbol.y < -50) symbol.y = canvas.height + 50;
        if (symbol.y > canvas.height + 50) symbol.y = -50;

        ctx.save();
        ctx.translate(symbol.x, symbol.y);
        ctx.rotate(symbol.rotation);
        ctx.font = `${symbol.size}px serif`;
        ctx.fillStyle = `rgba(148, 163, 184, ${symbol.opacity})`;
        ctx.textAlign = 'center';
        ctx.shadowBlur = 8;
        ctx.shadowColor = `rgba(148, 163, 184, 0.3)`;
        ctx.fillText(symbol.symbol, 0, 0);
        ctx.restore();
      });

      // Add elegant data flow indicators
      if (Math.random() < 0.03) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        
        ctx.font = '12px monospace';
        ctx.fillStyle = 'rgba(100, 181, 246, 0.6)';
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(100, 181, 246, 0.8)';
        
        const dataLabels = ['DATA FLOW', 'SIGNAL PROCESSING', 'ANALYTICS', 'MODELING', 'OPTIMIZATION'];
        const label = dataLabels[Math.floor(Math.random() * dataLabels.length)];
        ctx.fillText(label, x, y);
        ctx.shadowBlur = 0;
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
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
};

export default ParticleBackground;
