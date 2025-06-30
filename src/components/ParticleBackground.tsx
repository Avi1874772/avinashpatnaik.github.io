
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

    // Neural Network Nodes
    const neuralNodes: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;
      pulsePhase: number;
      layer: number;
      activation: number;
      connections: number[];
    }> = [];

    // Circuit Elements
    const circuitElements: Array<{
      x: number;
      y: number;
      width: number;
      height: number;
      type: 'resistor' | 'capacitor' | 'chip' | 'trace';
      opacity: number;
      pulsePhase: number;
      color: string;
    }> = [];

    // AI Processing Particles
    const aiParticles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;
      trail: Array<{x: number, y: number, opacity: number}>;
      type: 'data' | 'signal' | 'process';
    }> = [];

    // Floating Code/AI Text
    const floatingText: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      text: string;
      opacity: number;
      size: number;
      color: string;
      rotation: number;
      rotationSpeed: number;
    }> = [];

    // Digital Rain (Matrix style)
    const digitalRain: Array<{
      x: number;
      y: number;
      speed: number;
      chars: string[];
      opacity: number;
      color: string;
      glitch: boolean;
    }> = [];

    // Holographic Grid Lines
    const gridLines: Array<{
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      opacity: number;
      pulsePhase: number;
      type: 'horizontal' | 'vertical' | 'diagonal';
    }> = [];

    const techColors = [
      'rgba(0, 255, 255, ', // Cyan - AI/Tech
      'rgba(0, 255, 0, ',   // Green - Matrix/Digital
      'rgba(255, 0, 255, ', // Magenta - Neon tech
      'rgba(255, 165, 0, ', // Orange - Processing
      'rgba(138, 43, 226, ', // Blue Violet - Neural
      'rgba(255, 20, 147, ', // Deep Pink - AI
      'rgba(0, 191, 255, ', // Deep Sky Blue - Data
    ];

    const aiTerms = ['AI', 'ML', 'DL', 'CNN', 'RNN', 'GPU', 'CPU', 'API', 'NLP', 'CV', 'GAN', 'LSTM', 'BERT', 'GPT', 'TensorFlow', 'PyTorch', 'Neural', 'Deep', 'Learn', 'Train', 'Model', 'Data', 'Algorithm', 'Matrix', 'Vector', 'Tensor'];
    const digitalChars = ['0', '1', 'α', 'β', 'γ', 'δ', 'λ', 'π', 'Σ', '∞', '∆', '∇', '∈', '∋', '∅', '∪', '∩', '⊂', '⊃', '→', '←', '↑', '↓', '⟨', '⟩', '≈', '≠', '≤', '≥'];

    // Initialize Neural Network Nodes
    for (let i = 0; i < 30; i++) {
      neuralNodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 12 + 6,
        opacity: Math.random() * 0.8 + 0.2,
        color: techColors[Math.floor(Math.random() * techColors.length)],
        pulsePhase: Math.random() * Math.PI * 2,
        layer: Math.floor(Math.random() * 5),
        activation: Math.random(),
        connections: [],
      });
    }

    // Initialize Circuit Elements
    for (let i = 0; i < 20; i++) {
      const types = ['resistor', 'capacitor', 'chip', 'trace'] as const;
      circuitElements.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        width: Math.random() * 40 + 20,
        height: Math.random() * 20 + 10,
        type: types[Math.floor(Math.random() * types.length)],
        opacity: Math.random() * 0.6 + 0.2,
        pulsePhase: Math.random() * Math.PI * 2,
        color: techColors[Math.floor(Math.random() * techColors.length)],
      });
    }

    // Initialize AI Particles
    for (let i = 0; i < 40; i++) {
      const types = ['data', 'signal', 'process'] as const;
      aiParticles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 3,
        vy: (Math.random() - 0.5) * 3,
        size: Math.random() * 4 + 2,
        opacity: Math.random() * 0.8 + 0.2,
        color: techColors[Math.floor(Math.random() * techColors.length)],
        trail: [],
        type: types[Math.floor(Math.random() * types.length)],
      });
    }

    // Initialize Floating Text
    for (let i = 0; i < 15; i++) {
      floatingText.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        text: aiTerms[Math.floor(Math.random() * aiTerms.length)],
        opacity: Math.random() * 0.5 + 0.1,
        size: Math.random() * 16 + 12,
        color: techColors[Math.floor(Math.random() * techColors.length)],
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
      });
    }

    // Initialize Digital Rain
    for (let i = 0; i < 25; i++) {
      digitalRain.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        speed: Math.random() * 4 + 2,
        chars: Array(Math.floor(Math.random() * 20 + 10)).fill(0).map(() => 
          digitalChars[Math.floor(Math.random() * digitalChars.length)]
        ),
        opacity: Math.random() * 0.7 + 0.3,
        color: techColors[Math.floor(Math.random() * techColors.length)],
        glitch: Math.random() < 0.3,
      });
    }

    // Initialize Holographic Grid
    for (let i = 0; i < 15; i++) {
      const types = ['horizontal', 'vertical', 'diagonal'] as const;
      const type = types[Math.floor(Math.random() * types.length)];
      let x1, y1, x2, y2;
      
      switch (type) {
        case 'horizontal':
          x1 = 0; x2 = canvas.width;
          y1 = y2 = Math.random() * canvas.height;
          break;
        case 'vertical':
          y1 = 0; y2 = canvas.height;
          x1 = x2 = Math.random() * canvas.width;
          break;
        case 'diagonal':
          x1 = Math.random() * canvas.width;
          y1 = Math.random() * canvas.height;
          x2 = Math.random() * canvas.width;
          y2 = Math.random() * canvas.height;
          break;
      }
      
      gridLines.push({
        x1, y1, x2, y2,
        opacity: Math.random() * 0.3 + 0.1,
        pulsePhase: Math.random() * Math.PI * 2,
        type,
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

    const drawCircuitElement = (element: typeof circuitElements[0]) => {
      ctx.save();
      ctx.translate(element.x, element.y);
      ctx.globalAlpha = element.opacity + Math.sin(element.pulsePhase) * 0.2;
      
      switch (element.type) {
        case 'chip':
          // Draw microchip
          ctx.strokeStyle = element.color + '0.8)';
          ctx.fillStyle = element.color + '0.3)';
          ctx.lineWidth = 2;
          ctx.fillRect(-element.width/2, -element.height/2, element.width, element.height);
          ctx.strokeRect(-element.width/2, -element.height/2, element.width, element.height);
          
          // Add pins
          for (let i = 0; i < 6; i++) {
            const pinY = -element.height/2 + (i * element.height/5);
            ctx.fillRect(-element.width/2 - 3, pinY, 6, 2);
            ctx.fillRect(element.width/2 - 3, pinY, 6, 2);
          }
          break;
          
        case 'resistor':
          // Draw resistor zigzag
          ctx.strokeStyle = element.color + '0.8)';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(-element.width/2, 0);
          for (let i = 0; i < 5; i++) {
            const x = -element.width/2 + (i * element.width/4);
            const y = (i % 2 === 0) ? -5 : 5;
            ctx.lineTo(x, y);
          }
          ctx.lineTo(element.width/2, 0);
          ctx.stroke();
          break;
          
        case 'capacitor':
          // Draw capacitor
          ctx.strokeStyle = element.color + '0.8)';
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.moveTo(-5, -element.height/2);
          ctx.lineTo(-5, element.height/2);
          ctx.moveTo(5, -element.height/2);
          ctx.lineTo(5, element.height/2);
          ctx.stroke();
          break;
          
        case 'trace':
          // Draw circuit trace
          ctx.strokeStyle = element.color + '0.6)';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(-element.width/2, 0);
          ctx.lineTo(element.width/2, 0);
          ctx.stroke();
          break;
      }
      
      ctx.restore();
    };

    const animate = () => {
      time += 0.02;
      
      // Create futuristic gradient background
      const gradient = ctx.createRadialGradient(
        canvas.width/2, canvas.height/2, 0,
        canvas.width/2, canvas.height/2, Math.max(canvas.width, canvas.height)
      );
      gradient.addColorStop(0, 'rgba(0, 10, 20, 0.95)');
      gradient.addColorStop(0.5, 'rgba(5, 15, 35, 0.95)');
      gradient.addColorStop(1, 'rgba(0, 5, 15, 0.95)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw holographic grid
      gridLines.forEach(line => {
        line.pulsePhase += 0.05;
        const alpha = line.opacity + Math.sin(line.pulsePhase) * 0.2;
        ctx.strokeStyle = `rgba(0, 255, 255, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.setLineDash([10, 10]);
        ctx.beginPath();
        ctx.moveTo(line.x1, line.y1);
        ctx.lineTo(line.x2, line.y2);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // Update and draw neural network nodes
      neuralNodes.forEach((node, index) => {
        // Mouse interaction
        const dx = mouseX - node.x;
        const dy = mouseY - node.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          const force = (150 - distance) / 150;
          node.vx += (dx / distance) * force * 0.01;
          node.vy += (dy / distance) * force * 0.01;
        }

        // AI-like pulsing movement
        node.x += node.vx + Math.sin(time + node.layer) * 0.5;
        node.y += node.vy + Math.cos(time + node.layer * 0.5) * 0.5;
        node.pulsePhase += 0.04;
        
        // Boundaries with wrapping
        if (node.x < 0) node.x = canvas.width;
        if (node.x > canvas.width) node.x = 0;
        if (node.y < 0) node.y = canvas.height;
        if (node.y > canvas.height) node.y = 0;

        const pulseSize = node.size + Math.sin(node.pulsePhase) * 3;
        
        // Draw neural node with AI-style glow
        ctx.shadowBlur = 20;
        ctx.shadowColor = node.color + '1)';
        ctx.beginPath();
        ctx.arc(node.x, node.y, pulseSize, 0, Math.PI * 2);
        ctx.fillStyle = node.color + node.opacity + ')';
        ctx.fill();
        
        // Draw inner core
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(node.x, node.y, pulseSize * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fill();
        ctx.shadowBlur = 0;

        // Draw neural connections
        neuralNodes.slice(index + 1).forEach(otherNode => {
          const dx = node.x - otherNode.x;
          const dy = node.y - otherNode.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 200) {
            const opacity = 0.6 * (1 - distance / 200);
            
            // Animated connection
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(otherNode.x, otherNode.y);
            ctx.strokeStyle = node.color + opacity + ')';
            ctx.lineWidth = 2 + Math.sin(time * 2) * 1;
            ctx.stroke();

            // Neural signal pulses
            if (Math.random() < 0.03) {
              const signalX = node.x + (otherNode.x - node.x) * Math.random();
              const signalY = node.y + (otherNode.y - node.y) * Math.random();
              ctx.beginPath();
              ctx.arc(signalX, signalY, 3, 0, Math.PI * 2);
              ctx.fillStyle = 'rgba(255, 255, 255, 1)';
              ctx.fill();
            }
          }
        });
      });

      // Update and draw circuit elements
      circuitElements.forEach(element => {
        element.pulsePhase += 0.03;
        drawCircuitElement(element);
      });

      // Update and draw AI particles with trails
      aiParticles.forEach(particle => {
        // Add current position to trail
        particle.trail.push({
          x: particle.x,
          y: particle.y,
          opacity: particle.opacity
        });
        
        // Limit trail length
        if (particle.trail.length > 15) {
          particle.trail.shift();
        }

        // Update position with AI-like intelligence
        particle.x += particle.vx + Math.sin(time * 2 + particle.x * 0.01) * 0.5;
        particle.y += particle.vy + Math.cos(time * 2 + particle.y * 0.01) * 0.5;
        
        // Boundaries
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle trail
        particle.trail.forEach((point, index) => {
          const trailOpacity = (index / particle.trail.length) * particle.opacity;
          const size = particle.size * (index / particle.trail.length);
          
          ctx.beginPath();
          ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
          ctx.fillStyle = particle.color + trailOpacity + ')';
          ctx.fill();
        });

        // Draw main particle
        ctx.shadowBlur = 15;
        ctx.shadowColor = particle.color + '1)';
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color + particle.opacity + ')';
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Update and draw floating AI text
      floatingText.forEach(text => {
        text.x += text.vx;
        text.y += text.vy;
        text.rotation += text.rotationSpeed;
        
        // Boundaries
        if (text.x < -100) text.x = canvas.width + 100;
        if (text.x > canvas.width + 100) text.x = -100;
        if (text.y < -50) text.y = canvas.height + 50;
        if (text.y > canvas.height + 50) text.y = -50;

        ctx.save();
        ctx.translate(text.x, text.y);
        ctx.rotate(text.rotation);
        ctx.font = `${text.size}px 'Courier New', monospace`;
        ctx.fillStyle = text.color + text.opacity + ')';
        ctx.textAlign = 'center';
        ctx.shadowBlur = 10;
        ctx.shadowColor = text.color + '0.8)';
        ctx.fillText(text.text, 0, 0);
        ctx.restore();
      });

      // Update and draw digital rain
      digitalRain.forEach(rain => {
        rain.y += rain.speed;
        
        if (rain.y > canvas.height + 200) {
          rain.y = -200;
          rain.x = Math.random() * canvas.width;
          if (Math.random() < 0.3) {
            rain.chars = rain.chars.map(() => 
              digitalChars[Math.floor(Math.random() * digitalChars.length)]
            );
          }
        }

        // Draw digital characters
        ctx.font = '14px monospace';
        ctx.textAlign = 'center';
        rain.chars.forEach((char, index) => {
          const charY = rain.y + index * 18;
          let alpha = Math.max(0, rain.opacity - (index * 0.05));
          
          if (rain.glitch && Math.random() < 0.1) {
            alpha *= Math.random();
            char = digitalChars[Math.floor(Math.random() * digitalChars.length)];
          }
          
          ctx.fillStyle = rain.color + alpha + ')';
          ctx.fillText(char, rain.x, charY);
          
          // Random glow effect
          if (Math.random() < 0.2) {
            ctx.shadowBlur = 15;
            ctx.shadowColor = rain.color + '1)';
            ctx.fillText(char, rain.x, charY);
            ctx.shadowBlur = 0;
          }
        });
      });

      // Add AI processing indicators
      if (Math.random() < 0.05) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const processes = ['PROCESSING...', 'ANALYZING...', 'LEARNING...', 'COMPUTING...', 'OPTIMIZING...', 'TRAINING...'];
        const process = processes[Math.floor(Math.random() * processes.length)];
        
        ctx.font = '16px monospace';
        ctx.fillStyle = 'rgba(0, 255, 255, 0.7)';
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(0, 255, 255, 1)';
        ctx.fillText(process, x, y);
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
