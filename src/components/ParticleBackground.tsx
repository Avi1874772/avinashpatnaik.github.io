
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

    // World map outline coordinates (simplified continental outlines)
    const worldMapOutline = [
      // North America
      { x: 0.15, y: 0.25 }, { x: 0.18, y: 0.22 }, { x: 0.25, y: 0.20 }, { x: 0.30, y: 0.25 },
      { x: 0.32, y: 0.30 }, { x: 0.28, y: 0.35 }, { x: 0.25, y: 0.40 }, { x: 0.20, y: 0.45 },
      { x: 0.15, y: 0.42 }, { x: 0.12, y: 0.38 }, { x: 0.10, y: 0.32 }, { x: 0.15, y: 0.25 },
      
      // South America
      { x: 0.25, y: 0.50 }, { x: 0.28, y: 0.48 }, { x: 0.32, y: 0.52 }, { x: 0.35, y: 0.60 },
      { x: 0.33, y: 0.70 }, { x: 0.30, y: 0.75 }, { x: 0.26, y: 0.72 }, { x: 0.22, y: 0.65 },
      { x: 0.20, y: 0.55 }, { x: 0.25, y: 0.50 },
      
      // Europe
      { x: 0.45, y: 0.22 }, { x: 0.50, y: 0.20 }, { x: 0.55, y: 0.25 }, { x: 0.52, y: 0.30 },
      { x: 0.48, y: 0.32 }, { x: 0.45, y: 0.28 }, { x: 0.45, y: 0.22 },
      
      // Africa
      { x: 0.45, y: 0.35 }, { x: 0.50, y: 0.33 }, { x: 0.55, y: 0.38 }, { x: 0.58, y: 0.45 },
      { x: 0.56, y: 0.55 }, { x: 0.52, y: 0.65 }, { x: 0.48, y: 0.70 }, { x: 0.45, y: 0.68 },
      { x: 0.42, y: 0.60 }, { x: 0.40, y: 0.50 }, { x: 0.43, y: 0.40 }, { x: 0.45, y: 0.35 },
      
      // Asia
      { x: 0.60, y: 0.20 }, { x: 0.70, y: 0.18 }, { x: 0.80, y: 0.22 }, { x: 0.85, y: 0.28 },
      { x: 0.82, y: 0.35 }, { x: 0.75, y: 0.40 }, { x: 0.70, y: 0.45 }, { x: 0.65, y: 0.42 },
      { x: 0.60, y: 0.38 }, { x: 0.58, y: 0.30 }, { x: 0.60, y: 0.20 },
      
      // Australia
      { x: 0.85, y: 0.65 }, { x: 0.90, y: 0.63 }, { x: 0.93, y: 0.68 }, { x: 0.90, y: 0.72 },
      { x: 0.85, y: 0.70 }, { x: 0.85, y: 0.65 }
    ];

    // Enhanced world cities for data nodes
    const worldCities = [
      { name: 'New York', x: 0.25, y: 0.35, continent: 'NA', type: 'Financial' },
      { name: 'London', x: 0.48, y: 0.32, continent: 'EU', type: 'Financial' },
      { name: 'Paris', x: 0.49, y: 0.34, continent: 'EU', type: 'Research' },
      { name: 'Rome', x: 0.51, y: 0.38, continent: 'EU', type: 'Cultural' },
      { name: 'Tokyo', x: 0.85, y: 0.4, continent: 'AS', type: 'Tech' },
      { name: 'Sydney', x: 0.9, y: 0.75, continent: 'OC', type: 'Mining' },
      { name: 'Mumbai', x: 0.72, y: 0.45, continent: 'AS', type: 'Tech' },
      { name: 'São Paulo', x: 0.32, y: 0.65, continent: 'SA', type: 'Industrial' },
      { name: 'Cairo', x: 0.54, y: 0.42, continent: 'AF', type: 'Historical' },
      { name: 'Dubai', x: 0.62, y: 0.43, continent: 'AS', type: 'Trade' },
      { name: 'Singapore', x: 0.78, y: 0.55, continent: 'AS', type: 'Finance' },
      { name: 'Toronto', x: 0.22, y: 0.32, continent: 'NA', type: 'Finance' },
      { name: 'Berlin', x: 0.51, y: 0.31, continent: 'EU', type: 'Tech' },
      { name: 'Moscow', x: 0.58, y: 0.28, continent: 'EU', type: 'Energy' },
      { name: 'Beijing', x: 0.82, y: 0.35, continent: 'AS', type: 'Tech' },
      { name: 'Seoul', x: 0.86, y: 0.37, continent: 'AS', type: 'Tech' },
      { name: 'Los Angeles', x: 0.15, y: 0.42, continent: 'NA', type: 'Media' },
      { name: 'Mexico City', x: 0.18, y: 0.45, continent: 'NA', type: 'Manufacturing' },
      { name: 'Lagos', x: 0.50, y: 0.55, continent: 'AF', type: 'Oil' },
      { name: 'Cape Town', x: 0.52, y: 0.72, continent: 'AF', type: 'Mining' },
      { name: 'San Francisco', x: 0.12, y: 0.38, continent: 'NA', type: 'Tech' },
      { name: 'Boston', x: 0.27, y: 0.33, continent: 'NA', type: 'Research' },
      { name: 'Frankfurt', x: 0.50, y: 0.30, continent: 'EU', type: 'Finance' },
      { name: 'Amsterdam', x: 0.49, y: 0.29, continent: 'EU', type: 'Trade' },
      { name: 'Hong Kong', x: 0.82, y: 0.43, continent: 'AS', type: 'Finance' },
      { name: 'Bangalore', x: 0.75, y: 0.48, continent: 'AS', type: 'Tech' },
      { name: 'Tel Aviv', x: 0.56, y: 0.40, continent: 'AS', type: 'Tech' },
      { name: 'Stockholm', x: 0.52, y: 0.26, continent: 'EU', type: 'Tech' }
    ];

    // Data nodes with enhanced connectivity
    const dataNodes: Array<{
      x: number;
      y: number;
      name: string;
      continent: string;
      type: string;
      pulse: number;
      connections: number[];
      dataActivity: number;
      lastPulse: number;
      importance: number;
    }> = [];

    // Initialize data nodes
    worldCities.forEach((city, index) => {
      dataNodes.push({
        x: city.x * canvas.width,
        y: city.y * canvas.height,
        name: city.name,
        continent: city.continent,
        type: city.type,
        pulse: 0,
        connections: [],
        dataActivity: Math.random(),
        lastPulse: Date.now() + Math.random() * 5000,
        importance: city.type === 'Tech' ? 0.8 : city.type === 'Finance' ? 0.7 : 0.5
      });
    });

    // Create highly connected network (each node connected to 4-8 others)
    dataNodes.forEach((node, index) => {
      const connectionCount = Math.floor(Math.random() * 5) + 4; // 4-8 connections
      const distances = dataNodes
        .map((otherNode, otherIndex) => ({
          index: otherIndex,
          distance: Math.sqrt(
            Math.pow(node.x - otherNode.x, 2) + Math.pow(node.y - otherNode.y, 2)
          )
        }))
        .filter(item => item.index !== index)
        .sort((a, b) => a.distance - b.distance);

      // Connect to closest nodes and some random distant ones for global connectivity
      for (let i = 0; i < connectionCount && i < distances.length; i++) {
        const targetIndex = i < connectionCount / 2 
          ? distances[i].index // Close connections
          : distances[Math.floor(Math.random() * distances.length)].index; // Random distant connections
        
        if (!node.connections.includes(targetIndex)) {
          node.connections.push(targetIndex);
        }
      }
    });

    // Data packets
    const dataPackets: Array<{
      x: number;
      y: number;
      targetX: number;
      targetY: number;
      progress: number;
      speed: number;
      fromNode: number;
      toNode: number;
      data: string;
      color: string;
      size: number;
    }> = [];

    // Continental color scheme
    const continentColors = {
      'NA': 'rgba(59, 130, 246, ',    // Blue
      'EU': 'rgba(34, 197, 94, ',     // Green
      'AS': 'rgba(168, 85, 247, ',    // Purple
      'AF': 'rgba(249, 115, 22, ',    // Orange
      'SA': 'rgba(236, 72, 153, ',    // Pink
      'OC': 'rgba(14, 165, 233, '     // Sky blue
    };

    let time = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const createDataPacket = () => {
      if (dataPackets.length < 25 && Math.random() < 0.05) {
        const fromIndex = Math.floor(Math.random() * dataNodes.length);
        const fromNode = dataNodes[fromIndex];
        
        if (fromNode.connections.length > 0) {
          const toIndex = fromNode.connections[Math.floor(Math.random() * fromNode.connections.length)];
          const toNode = dataNodes[toIndex];
          
          const dataTypes = ['ML Model', 'Dataset', 'Analytics', 'Prediction', 'Insights', 'Algorithm', 'Query', 'Report'];
          
          dataPackets.push({
            x: fromNode.x,
            y: fromNode.y,
            targetX: toNode.x,
            targetY: toNode.y,
            progress: 0,
            speed: 0.003 + Math.random() * 0.007,
            fromNode: fromIndex,
            toNode: toIndex,
            data: dataTypes[Math.floor(Math.random() * dataTypes.length)],
            color: continentColors[fromNode.continent] || 'rgba(255, 255, 255, ',
            size: 2 + Math.random() * 2
          });
        }
      }
    };

    const animate = () => {
      time += 0.01;
      
      // Create deep space gradient background
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height)
      );
      gradient.addColorStop(0, 'rgba(15, 23, 42, 0.98)');
      gradient.addColorStop(0.5, 'rgba(30, 41, 59, 0.95)');
      gradient.addColorStop(1, 'rgba(15, 23, 42, 0.98)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw world map outline
      ctx.strokeStyle = 'rgba(100, 116, 139, 0.3)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      
      worldMapOutline.forEach((point, index) => {
        const x = point.x * canvas.width;
        const y = point.y * canvas.height;
        
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.stroke();

      // Draw continental grid lines
      for (let i = 0; i < 8; i++) {
        const opacity = 0.1 + Math.sin(time * 2 + i) * 0.05;
        ctx.strokeStyle = `rgba(100, 116, 139, ${opacity})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(0, (i / 7) * canvas.height);
        ctx.lineTo(canvas.width, (i / 7) * canvas.height);
        ctx.stroke();
      }

      for (let i = 0; i < 12; i++) {
        const opacity = 0.1 + Math.sin(time * 1.5 + i) * 0.05;
        ctx.strokeStyle = `rgba(100, 116, 139, ${opacity})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo((i / 11) * canvas.width, 0);
        ctx.lineTo((i / 11) * canvas.width, canvas.height);
        ctx.stroke();
      }

      // Update and draw data nodes
      dataNodes.forEach((node, index) => {
        // Update pulse based on importance
        const now = Date.now();
        const pulseInterval = 2000 - (node.importance * 1000);
        if (now - node.lastPulse > pulseInterval) {
          node.pulse = 1;
          node.lastPulse = now;
        }
        node.pulse *= 0.92;

        // Mouse interaction
        const dx = mouseX - node.x;
        const dy = mouseY - node.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const isHovered = distance < 80;

        // Draw enhanced connections
        node.connections.forEach(connectionIndex => {
          const targetNode = dataNodes[connectionIndex];
          const connectionStrength = (node.importance + targetNode.importance) / 2;
          const baseOpacity = 0.2 + connectionStrength * 0.3;
          const animatedOpacity = baseOpacity + Math.sin(time * 3 + index) * 0.1;
          const finalOpacity = animatedOpacity + (isHovered ? 0.4 : 0);
          
          ctx.strokeStyle = continentColors[node.continent] + finalOpacity + ')';
          ctx.lineWidth = 1 + connectionStrength * 2 + (isHovered ? 1 : 0);
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(targetNode.x, targetNode.y);
          ctx.stroke();

          // Data flow pulses along connections
          if (Math.random() < 0.02 * connectionStrength) {
            const flowProgress = Math.random();
            const flowX = node.x + (targetNode.x - node.x) * flowProgress;
            const flowY = node.y + (targetNode.y - node.y) * flowProgress;
            
            ctx.beginPath();
            ctx.arc(flowX, flowY, 1.5, 0, Math.PI * 2);
            ctx.fillStyle = continentColors[node.continent] + '0.9)';
            ctx.fill();
          }
        });

        // Draw enhanced nodes
        const baseSize = 3 + node.importance * 4;
        const nodeSize = baseSize + node.pulse * 4 + (isHovered ? 3 : 0);
        
        // Outer glow
        ctx.shadowBlur = 20 + node.pulse * 15 + node.importance * 10;
        ctx.shadowColor = continentColors[node.continent] + '0.8)';
        ctx.beginPath();
        ctx.arc(node.x, node.y, nodeSize, 0, Math.PI * 2);
        ctx.fillStyle = continentColors[node.continent] + (0.6 + node.pulse * 0.3 + node.importance * 0.2) + ')';
        ctx.fill();
        
        // Inner core
        ctx.shadowBlur = 0;
        ctx.beginPath();
        ctx.arc(node.x, node.y, nodeSize * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
        ctx.fill();

        // Data type indicator
        if (isHovered) {
          ctx.font = 'bold 11px monospace';
          ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
          ctx.textAlign = 'center';
          ctx.fillText(node.name, node.x, node.y - nodeSize - 20);
          ctx.font = '9px monospace';
          ctx.fillStyle = continentColors[node.continent] + '0.9)';
          ctx.fillText(`${node.type} Hub`, node.x, node.y - nodeSize - 8);
        }
      });

      // Create and update data packets
      createDataPacket();
      dataPackets.forEach((packet, index) => {
        packet.progress += packet.speed;
        
        if (packet.progress >= 1) {
          dataPackets.splice(index, 1);
          return;
        }

        // Smooth interpolation
        packet.x = packet.x + (packet.targetX - packet.x) * packet.speed * 15;
        packet.y = packet.y + (packet.targetY - packet.y) * packet.speed * 15;

        // Draw packet with trail effect
        const alpha = 1 - packet.progress * 0.5;
        ctx.beginPath();
        ctx.arc(packet.x, packet.y, packet.size, 0, Math.PI * 2);
        ctx.fillStyle = packet.color + alpha + ')';
        ctx.fill();

        // Data label
        if (packet.progress < 0.8) {
          ctx.font = '8px monospace';
          ctx.fillStyle = packet.color + (alpha * 0.7) + ')';
          ctx.textAlign = 'center';
          ctx.fillText(packet.data, packet.x, packet.y - packet.size - 3);
        }
      });

      // Real-time data analytics indicators
      if (Math.random() < 0.03) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const indicators = ['Processing...', 'Analyzing...', 'Computing...', 'Learning...', 'Predicting...', 'Optimizing...'];
        const indicator = indicators[Math.floor(Math.random() * indicators.length)];
        
        ctx.font = '9px monospace';
        ctx.fillStyle = 'rgba(168, 85, 247, 0.4)';
        ctx.textAlign = 'left';
        ctx.fillText(indicator, x, y);
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
