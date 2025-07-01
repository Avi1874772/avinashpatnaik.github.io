
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

    // World map coordinates (simplified major cities)
    const worldCities = [
      { name: 'New York', x: 0.25, y: 0.35, continent: 'NA' },
      { name: 'London', x: 0.48, y: 0.32, continent: 'EU' },
      { name: 'Paris', x: 0.49, y: 0.34, continent: 'EU' },
      { name: 'Rome', x: 0.51, y: 0.38, continent: 'EU' },
      { name: 'Tokyo', x: 0.85, y: 0.4, continent: 'AS' },
      { name: 'Sydney', x: 0.9, y: 0.75, continent: 'OC' },
      { name: 'Mumbai', x: 0.72, y: 0.45, continent: 'AS' },
      { name: 'São Paulo', x: 0.32, y: 0.65, continent: 'SA' },
      { name: 'Cairo', x: 0.54, y: 0.42, continent: 'AF' },
      { name: 'Dubai', x: 0.62, y: 0.43, continent: 'AS' },
      { name: 'Singapore', x: 0.78, y: 0.55, continent: 'AS' },
      { name: 'Toronto', x: 0.22, y: 0.32, continent: 'NA' },
      { name: 'Berlin', x: 0.51, y: 0.31, continent: 'EU' },
      { name: 'Moscow', x: 0.58, y: 0.28, continent: 'EU' },
      { name: 'Beijing', x: 0.82, y: 0.35, continent: 'AS' },
      { name: 'Seoul', x: 0.86, y: 0.37, continent: 'AS' },
      { name: 'Los Angeles', x: 0.15, y: 0.42, continent: 'NA' },
      { name: 'Mexico City', x: 0.18, y: 0.45, continent: 'NA' },
      { name: 'Lagos', x: 0.50, y: 0.55, continent: 'AF' },
      { name: 'Cape Town', x: 0.52, y: 0.72, continent: 'AF' }
    ];

    // Data nodes based on world cities
    const dataNodes: Array<{
      x: number;
      y: number;
      name: string;
      continent: string;
      pulse: number;
      connections: number[];
      dataActivity: number;
      dataType: string;
      lastPulse: number;
    }> = [];

    // Initialize data nodes
    worldCities.forEach((city, index) => {
      dataNodes.push({
        x: city.x * canvas.width,
        y: city.y * canvas.height,
        name: city.name,
        continent: city.continent,
        pulse: 0,
        connections: [],
        dataActivity: Math.random(),
        dataType: ['ML', 'AI', 'Analytics', 'BigData', 'IoT'][Math.floor(Math.random() * 5)],
        lastPulse: Date.now() + Math.random() * 5000
      });
    });

    // Create connections between nodes
    dataNodes.forEach((node, index) => {
      // Connect to 2-4 random other nodes
      const connectionCount = Math.floor(Math.random() * 3) + 2;
      const possibleConnections = dataNodes
        .map((_, i) => i)
        .filter(i => i !== index);
      
      for (let i = 0; i < connectionCount && possibleConnections.length > 0; i++) {
        const randomIndex = Math.floor(Math.random() * possibleConnections.length);
        const connectionIndex = possibleConnections.splice(randomIndex, 1)[0];
        if (!node.connections.includes(connectionIndex)) {
          node.connections.push(connectionIndex);
        }
      }
    });

    // Floating data packets
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
    }> = [];

    // Digital grid lines
    const gridLines: Array<{
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      opacity: number;
      type: 'lat' | 'lng';
    }> = [];

    // Create grid lines
    for (let i = 0; i < 12; i++) {
      // Latitude lines
      gridLines.push({
        x1: 0,
        y1: (i / 11) * canvas.height,
        x2: canvas.width,
        y2: (i / 11) * canvas.height,
        opacity: 0.1 + Math.random() * 0.1,
        type: 'lat'
      });
    }

    for (let i = 0; i < 24; i++) {
      // Longitude lines (curved)
      gridLines.push({
        x1: (i / 23) * canvas.width,
        y1: 0,
        x2: (i / 23) * canvas.width,
        y2: canvas.height,
        opacity: 0.1 + Math.random() * 0.1,
        type: 'lng'
      });
    }

    // Satellite traces
    const satellites: Array<{
      angle: number;
      radius: number;
      speed: number;
      trail: Array<{ x: number; y: number; opacity: number }>;
    }> = [];

    for (let i = 0; i < 3; i++) {
      satellites.push({
        angle: Math.random() * Math.PI * 2,
        radius: 100 + Math.random() * 200,
        speed: 0.005 + Math.random() * 0.01,
        trail: []
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

    const continentColors = {
      'NA': 'rgba(59, 130, 246, ',    // Blue
      'EU': 'rgba(34, 197, 94, ',     // Green
      'AS': 'rgba(168, 85, 247, ',    // Purple
      'AF': 'rgba(249, 115, 22, ',    // Orange
      'SA': 'rgba(236, 72, 153, ',    // Pink
      'OC': 'rgba(14, 165, 233, '     // Sky blue
    };

    const createDataPacket = () => {
      if (dataPackets.length < 15 && Math.random() < 0.02) {
        const fromIndex = Math.floor(Math.random() * dataNodes.length);
        const fromNode = dataNodes[fromIndex];
        
        if (fromNode.connections.length > 0) {
          const toIndex = fromNode.connections[Math.floor(Math.random() * fromNode.connections.length)];
          const toNode = dataNodes[toIndex];
          
          dataPackets.push({
            x: fromNode.x,
            y: fromNode.y,
            targetX: toNode.x,
            targetY: toNode.y,
            progress: 0,
            speed: 0.005 + Math.random() * 0.01,
            fromNode: fromIndex,
            toNode: toIndex,
            data: ['JSON', 'CSV', 'API', 'ML', 'AI'][Math.floor(Math.random() * 5)],
            color: continentColors[fromNode.continent] || 'rgba(255, 255, 255, '
          });
        }
      }
    };

    const animate = () => {
      time += 0.01;
      
      // Create elegant gradient background
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, Math.max(canvas.width, canvas.height)
      );
      gradient.addColorStop(0, 'rgba(15, 23, 42, 0.98)');
      gradient.addColorStop(0.5, 'rgba(30, 41, 59, 0.95)');
      gradient.addColorStop(1, 'rgba(15, 23, 42, 0.98)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid lines with subtle animation
      gridLines.forEach(line => {
        ctx.strokeStyle = `rgba(100, 116, 139, ${line.opacity + Math.sin(time * 2) * 0.05})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        
        if (line.type === 'lat') {
          ctx.moveTo(line.x1, line.y1);
          ctx.lineTo(line.x2, line.y2);
        } else {
          // Curved longitude lines
          const midY = canvas.height / 2;
          const curve = Math.sin((line.x1 / canvas.width) * Math.PI) * 50;
          ctx.moveTo(line.x1, 0);
          ctx.quadraticCurveTo(line.x1 + curve, midY, line.x1, canvas.height);
        }
        ctx.stroke();
      });

      // Update and draw satellites
      satellites.forEach(satellite => {
        satellite.angle += satellite.speed;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const x = centerX + Math.cos(satellite.angle) * satellite.radius;
        const y = centerY + Math.sin(satellite.angle) * satellite.radius * 0.3;

        // Add to trail
        satellite.trail.push({ x, y, opacity: 1 });
        if (satellite.trail.length > 20) {
          satellite.trail.shift();
        }

        // Draw trail
        satellite.trail.forEach((point, index) => {
          const opacity = (index / satellite.trail.length) * 0.5;
          ctx.beginPath();
          ctx.arc(point.x, point.y, 1, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(14, 165, 233, ${opacity})`;
          ctx.fill();
        });

        // Draw satellite
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(14, 165, 233, 0.8)';
        ctx.fill();
      });

      // Update and draw data nodes
      dataNodes.forEach((node, index) => {
        // Update pulse
        const now = Date.now();
        if (now - node.lastPulse > 3000 + Math.random() * 2000) {
          node.pulse = 1;
          node.lastPulse = now;
        }
        node.pulse *= 0.95;

        // Mouse interaction
        const dx = mouseX - node.x;
        const dy = mouseY - node.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const isHovered = distance < 100;

        // Draw node connections
        node.connections.forEach(connectionIndex => {
          const targetNode = dataNodes[connectionIndex];
          const connectionOpacity = 0.2 + (isHovered ? 0.3 : 0) + Math.sin(time * 3 + index) * 0.1;
          
          ctx.strokeStyle = continentColors[node.continent] + connectionOpacity + ')';
          ctx.lineWidth = 1 + (isHovered ? 1 : 0);
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(targetNode.x, targetNode.y);
          ctx.stroke();

          // Data flow indicators
          if (Math.random() < 0.01) {
            const flowProgress = Math.random();
            const flowX = node.x + (targetNode.x - node.x) * flowProgress;
            const flowY = node.y + (targetNode.y - node.y) * flowProgress;
            
            ctx.beginPath();
            ctx.arc(flowX, flowY, 2, 0, Math.PI * 2);
            ctx.fillStyle = continentColors[node.continent] + '0.8)';
            ctx.fill();
          }
        });

        // Draw node with glow effect
        const nodeSize = 4 + node.pulse * 3 + (isHovered ? 2 : 0);
        
        ctx.shadowBlur = 15 + node.pulse * 10;
        ctx.shadowColor = continentColors[node.continent] + '0.8)';
        ctx.beginPath();
        ctx.arc(node.x, node.y, nodeSize, 0, Math.PI * 2);
        ctx.fillStyle = continentColors[node.continent] + (0.8 + node.pulse * 0.2) + ')';
        ctx.fill();
        
        // Inner core
        ctx.shadowBlur = 0;
        ctx.beginPath();
        ctx.arc(node.x, node.y, nodeSize * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fill();

        // Show city name and data type on hover
        if (isHovered) {
          ctx.font = '12px monospace';
          ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
          ctx.textAlign = 'center';
          ctx.fillText(node.name, node.x, node.y - nodeSize - 15);
          ctx.fillText(node.dataType, node.x, node.y - nodeSize - 5);
        }
      });

      // Create new data packets
      createDataPacket();

      // Update and draw data packets
      dataPackets.forEach((packet, index) => {
        packet.progress += packet.speed;
        
        if (packet.progress >= 1) {
          dataPackets.splice(index, 1);
          return;
        }

        // Interpolate position
        packet.x = packet.x + (packet.targetX - packet.x) * packet.speed * 20;
        packet.y = packet.y + (packet.targetY - packet.y) * packet.speed * 20;

        // Draw packet
        ctx.beginPath();
        ctx.arc(packet.x, packet.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = packet.color + (1 - packet.progress) + ')';
        ctx.fill();

        // Draw data label
        ctx.font = '10px monospace';
        ctx.fillStyle = packet.color + (0.8 - packet.progress * 0.5) + ')';
        ctx.textAlign = 'center';
        ctx.fillText(packet.data, packet.x, packet.y - 8);
      });

      // Add real-time data indicators
      if (Math.random() < 0.05) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const indicators = ['Processing', 'Analyzing', 'Computing', 'Learning', 'Predicting'];
        const indicator = indicators[Math.floor(Math.random() * indicators.length)];
        
        ctx.font = '10px monospace';
        ctx.fillStyle = 'rgba(168, 85, 247, 0.4)';
        ctx.fillText(indicator + '...', x, y);
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
