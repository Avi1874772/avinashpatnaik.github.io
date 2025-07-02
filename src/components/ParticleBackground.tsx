
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

    // Neural network nodes
    const neuralNodes: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      pulse: number;
      connections: number[];
      layer: number;
      activation: number;
    }> = [];

    // Data streams
    const dataStreams: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      length: number;
      opacity: number;
      color: string;
      data: string;
    }> = [];

    // Binary particles
    const binaryParticles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      char: string;
      opacity: number;
      size: number;
    }> = [];

    // Initialize neural network nodes
    const initializeNeuralNodes = () => {
      const layers = 4;
      const nodesPerLayer = [6, 8, 6, 4];
      
      for (let layer = 0; layer < layers; layer++) {
        const layerNodes = nodesPerLayer[layer];
        for (let node = 0; node < layerNodes; node++) {
          const x = (canvas.width / (layers + 1)) * (layer + 1);
          const y = (canvas.height / (layerNodes + 1)) * (node + 1);
          
          neuralNodes.push({
            x: x + (Math.random() - 0.5) * 100,
            y: y + (Math.random() - 0.5) * 80,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: 3 + Math.random() * 4,
            pulse: Math.random(),
            connections: [],
            layer,
            activation: Math.random()
          });
        }
      }

      // Create connections between layers
      neuralNodes.forEach((node, index) => {
        const nextLayerNodes = neuralNodes.filter(n => n.layer === node.layer + 1);
        nextLayerNodes.forEach((nextNode, nextIndex) => {
          if (Math.random() < 0.7) {
            node.connections.push(neuralNodes.indexOf(nextNode));
          }
        });
      });
    };

    // Initialize data streams
    const initializeDataStreams = () => {
      const dataTypes = ['ML_MODEL', 'DATASET', 'PREDICTION', 'ANALYSIS', 'NEURAL_NET', 'AI_PROCESS'];
      
      for (let i = 0; i < 12; i++) {
        dataStreams.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          length: 50 + Math.random() * 100,
          opacity: 0.3 + Math.random() * 0.4,
          color: ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b'][Math.floor(Math.random() * 5)],
          data: dataTypes[Math.floor(Math.random() * dataTypes.length)]
        });
      }
    };

    // Initialize binary particles
    const initializeBinaryParticles = () => {
      const binaryChars = ['0', '1'];
      
      for (let i = 0; i < 80; i++) {
        binaryParticles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 1,
          vy: (Math.random() - 0.5) * 1,
          char: binaryChars[Math.floor(Math.random() * 2)],
          opacity: 0.1 + Math.random() * 0.3,
          size: 10 + Math.random() * 8
        });
      }
    };

    initializeNeuralNodes();
    initializeDataStreams();
    initializeBinaryParticles();

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
      
      // Clear canvas with dark gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, 'rgba(15, 23, 42, 0.95)');
      gradient.addColorStop(0.5, 'rgba(30, 41, 59, 0.90)');
      gradient.addColorStop(1, 'rgba(15, 23, 42, 0.95)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw digital grid
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.03)';
      ctx.lineWidth = 0.5;
      const gridSize = 60;
      
      for (let i = 0; i < canvas.width; i += gridSize) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
      }
      
      for (let i = 0; i < canvas.height; i += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
      }

      // Update and draw binary particles
      binaryParticles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Wrap around screen
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.y > canvas.height) particle.y = 0;
        if (particle.y < 0) particle.y = canvas.height;
        
        // Draw binary character
        ctx.font = `${particle.size}px monospace`;
        ctx.fillStyle = `rgba(100, 116, 139, ${particle.opacity})`;
        ctx.fillText(particle.char, particle.x, particle.y);
      });

      // Update and draw data streams
      dataStreams.forEach((stream) => {
        stream.x += stream.vx;
        stream.y += stream.vy;
        
        // Wrap around screen
        if (stream.x > canvas.width + stream.length) stream.x = -stream.length;
        if (stream.x < -stream.length) stream.x = canvas.width + stream.length;
        if (stream.y > canvas.height + 20) stream.y = -20;
        if (stream.y < -20) stream.y = canvas.height + 20;
        
        // Draw data stream trail
        const gradient = ctx.createLinearGradient(
          stream.x - stream.vx * stream.length,
          stream.y - stream.vy * stream.length,
          stream.x,
          stream.y
        );
        gradient.addColorStop(0, `${stream.color}00`);
        gradient.addColorStop(1, `${stream.color}${Math.floor(stream.opacity * 255).toString(16).padStart(2, '0')}`);
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(stream.x - stream.vx * stream.length, stream.y - stream.vy * stream.length);
        ctx.lineTo(stream.x, stream.y);
        ctx.stroke();
        
        // Draw data label occasionally
        if (Math.random() < 0.002) {
          ctx.font = '8px monospace';
          ctx.fillStyle = `${stream.color}80`;
          ctx.fillText(stream.data, stream.x + 10, stream.y);
        }
      });

      // Update and draw neural network
      neuralNodes.forEach((node, index) => {
        // Update node position slightly
        node.x += node.vx;
        node.y += node.vy;
        node.pulse = Math.sin(time * 2 + index * 0.5) * 0.5 + 0.5;
        node.activation = Math.sin(time * 1.5 + index * 0.3) * 0.5 + 0.5;
        
        // Bounce off edges
        if (node.x > canvas.width - 50 || node.x < 50) node.vx *= -1;
        if (node.y > canvas.height - 50 || node.y < 50) node.vy *= -1;
        
        // Draw connections
        node.connections.forEach(connectionIndex => {
          const targetNode = neuralNodes[connectionIndex];
          if (!targetNode) return;
          
          const distance = Math.sqrt(
            Math.pow(mouseX - node.x, 2) + Math.pow(mouseY - node.y, 2)
          );
          const isNearMouse = distance < 150;
          
          const alpha = 0.1 + node.activation * 0.3 + (isNearMouse ? 0.3 : 0);
          ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
          ctx.lineWidth = 1 + node.activation * 2;
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(targetNode.x, targetNode.y);
          ctx.stroke();
          
          // Draw signal pulse along connection
          if (Math.random() < 0.02) {
            const progress = Math.random();
            const pulseX = node.x + (targetNode.x - node.x) * progress;
            const pulseY = node.y + (targetNode.y - node.y) * progress;
            
            ctx.beginPath();
            ctx.arc(pulseX, pulseY, 2, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(139, 92, 246, 0.8)';
            ctx.fill();
          }
        });
        
        // Draw neural node
        const distance = Math.sqrt(
          Math.pow(mouseX - node.x, 2) + Math.pow(mouseY - node.y, 2)
        );
        const isHovered = distance < 100;
        
        const nodeSize = node.size + node.pulse * 2 + (isHovered ? 3 : 0);
        
        // Outer glow
        ctx.shadowBlur = 10 + node.activation * 10;
        ctx.shadowColor = node.layer === 0 ? '#3b82f6' : 
                         node.layer === 1 ? '#8b5cf6' : 
                         node.layer === 2 ? '#06b6d4' : '#10b981';
        
        ctx.beginPath();
        ctx.arc(node.x, node.y, nodeSize, 0, Math.PI * 2);
        ctx.fillStyle = `${ctx.shadowColor}${Math.floor((0.3 + node.activation * 0.4) * 255).toString(16).padStart(2, '0')}`;
        ctx.fill();
        
        // Inner core
        ctx.shadowBlur = 0;
        ctx.beginPath();
        ctx.arc(node.x, node.y, nodeSize * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fill();
        
        // Show layer info on hover
        if (isHovered) {
          ctx.font = '10px monospace';
          ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
          ctx.textAlign = 'center';
          ctx.fillText(`Layer ${node.layer}`, node.x, node.y - nodeSize - 10);
          ctx.fillText(`${Math.floor(node.activation * 100)}%`, node.x, node.y - nodeSize - 20);
        }
      });

      // Draw floating data labels
      if (Math.random() < 0.01) {
        const labels = ['Training...', 'Analyzing...', 'Predicting...', 'Processing...', 'Learning...'];
        const label = labels[Math.floor(Math.random() * labels.length)];
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        
        ctx.font = '12px monospace';
        ctx.fillStyle = 'rgba(34, 197, 94, 0.4)';
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
