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

    // Simple data nodes for digital signals
    const dataNodes: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      pulse: number;
      color: string;
      connections: number[];
    }> = [];

    // Create scattered data nodes
    for (let i = 0; i < 12; i++) {
      dataNodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: 2 + Math.random() * 3,
        pulse: Math.random(),
        color: ['rgba(59, 130, 246, ', 'rgba(168, 85, 247, ', 'rgba(34, 197, 94, '][Math.floor(Math.random() * 3)],
        connections: []
      });
    }

    // Create connections between nearby nodes
    dataNodes.forEach((node, index) => {
      const nearbyNodes = dataNodes
        .map((otherNode, otherIndex) => ({
          index: otherIndex,
          distance: Math.sqrt(Math.pow(node.x - otherNode.x, 2) + Math.pow(node.y - otherNode.y, 2))
        }))
        .filter(item => item.index !== index && item.distance < 300)
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 3);

      node.connections = nearbyNodes.map(n => n.index);
    });

    // Data packets for signals
    const dataPackets: Array<{
      x: number;
      y: number;
      targetX: number;
      targetY: number;
      progress: number;
      speed: number;
      color: string;
      size: number;
    }> = [];

    let time = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const createDataPacket = () => {
      if (dataPackets.length < 8 && Math.random() < 0.05) {
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
            color: fromNode.color,
            size: 1.5 + Math.random() * 1
          });
        }
      }
    };

    const animate = () => {
      time += 0.01;
      
      // Simple dark background
      ctx.fillStyle = 'rgba(15, 23, 42, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw subtle grid lines
      for (let i = 0; i < 6; i++) {
        const opacity = 0.03 + Math.sin(time * 1.5 + i) * 0.01;
        ctx.strokeStyle = `rgba(100, 116, 139, ${opacity})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(0, (i / 5) * canvas.height);
        ctx.lineTo(canvas.width, (i / 5) * canvas.height);
        ctx.stroke();
      }

      for (let i = 0; i < 8; i++) {
        const opacity = 0.03 + Math.sin(time * 1.2 + i) * 0.01;
        ctx.strokeStyle = `rgba(100, 116, 139, ${opacity})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo((i / 7) * canvas.width, 0);
        ctx.lineTo((i / 7) * canvas.width, canvas.height);
        ctx.stroke();
      }

      // Update and draw data nodes
      dataNodes.forEach((node, index) => {
        // Update node position with slow drift
        node.x += node.vx;
        node.y += node.vy;
        
        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
        
        // Keep nodes in bounds
        node.x = Math.max(0, Math.min(canvas.width, node.x));
        node.y = Math.max(0, Math.min(canvas.height, node.y));

        // Update pulse
        node.pulse = 0.5 + Math.sin(time * 2 + index) * 0.3;

        // Mouse interaction
        const dx = mouseX - node.x;
        const dy = mouseY - node.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const isHovered = distance < 80;

        // Draw connections
        node.connections.forEach(connectionIndex => {
          const targetNode = dataNodes[connectionIndex];
          const baseOpacity = 0.1;
          const animatedOpacity = baseOpacity + Math.sin(time * 1.5 + index) * 0.05;
          const finalOpacity = animatedOpacity + (isHovered ? 0.2 : 0);
          
          ctx.strokeStyle = node.color + finalOpacity + ')';
          ctx.lineWidth = 1 + (isHovered ? 1 : 0);
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(targetNode.x, targetNode.y);
          ctx.stroke();

          // Data flow pulses along connections
          if (Math.random() < 0.02) {
            const flowProgress = Math.random();
            const flowX = node.x + (targetNode.x - node.x) * flowProgress;
            const flowY = node.y + (targetNode.y - node.y) * flowProgress;
            
            ctx.beginPath();
            ctx.arc(flowX, flowY, 1.5, 0, Math.PI * 2);
            ctx.fillStyle = node.color + '0.4)';
            ctx.fill();
          }
        });

        // Draw nodes
        const nodeSize = node.size + node.pulse * 1.5 + (isHovered ? 2 : 0);
        
        // Outer glow
        ctx.shadowBlur = 10 + node.pulse * 5;
        ctx.shadowColor = node.color + '0.3)';
        ctx.beginPath();
        ctx.arc(node.x, node.y, nodeSize, 0, Math.PI * 2);
        ctx.fillStyle = node.color + (0.2 + node.pulse * 0.1) + ')';
        ctx.fill();
        
        // Inner core
        ctx.shadowBlur = 0;
        ctx.beginPath();
        ctx.arc(node.x, node.y, nodeSize * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.fill();
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
        packet.x = packet.x + (packet.targetX - packet.x) * packet.speed * 10;
        packet.y = packet.y + (packet.targetY - packet.y) * packet.speed * 10;

        // Draw packet
        const alpha = (1 - packet.progress * 0.3) * 0.6;
        ctx.beginPath();
        ctx.arc(packet.x, packet.y, packet.size, 0, Math.PI * 2);
        ctx.fillStyle = packet.color + alpha + ')';
        ctx.fill();
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
