
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

    // Data streams and nodes
    const dataNodes: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;
      dataType: string;
      pulsePhase: number;
      connections: number[];
    }> = [];

    // Code rain drops
    const codeRain: Array<{
      x: number;
      y: number;
      speed: number;
      chars: string[];
      opacity: number;
      color: string;
    }> = [];

    // Floating charts/graphs
    const floatingCharts: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      rotation: number;
      rotationSpeed: number;
      type: 'bar' | 'line' | 'pie';
      opacity: number;
      data: number[];
    }> = [];

    // Binary streams
    const binaryStreams: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      binary: string;
      opacity: number;
      length: number;
    }> = [];

    const dataColors = [
      'rgba(34, 197, 94, ', // Green for success/growth
      'rgba(59, 130, 246, ', // Blue for data
      'rgba(168, 85, 247, ', // Purple for AI/ML
      'rgba(236, 72, 153, ', // Pink for analytics
      'rgba(249, 115, 22, ', // Orange for insights
      'rgba(14, 165, 233, ', // Sky blue for cloud
    ];

    const codeChars = ['0', '1', 'α', 'β', 'λ', 'π', 'Σ', '∑', '∫', '∆', 'μ', 'σ', '{', '}', '[', ']', '<', '>', 'ML', 'AI', 'df', 'np', 'pd'];
    const binaryChars = ['0', '1'];

    // Initialize data nodes
    for (let i = 0; i < 25; i++) {
      dataNodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        size: Math.random() * 8 + 4,
        opacity: Math.random() * 0.7 + 0.3,
        color: dataColors[Math.floor(Math.random() * dataColors.length)],
        dataType: ['CSV', 'JSON', 'SQL', 'API', 'ML', 'AI'][Math.floor(Math.random() * 6)],
        pulsePhase: Math.random() * Math.PI * 2,
        connections: [],
      });
    }

    // Initialize code rain
    for (let i = 0; i < 15; i++) {
      codeRain.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        speed: Math.random() * 3 + 1,
        chars: Array(Math.floor(Math.random() * 15 + 5)).fill(0).map(() => 
          codeChars[Math.floor(Math.random() * codeChars.length)]
        ),
        opacity: Math.random() * 0.6 + 0.2,
        color: dataColors[Math.floor(Math.random() * dataColors.length)],
      });
    }

    // Initialize floating charts
    for (let i = 0; i < 8; i++) {
      floatingCharts.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 30 + 20,
        rotation: 0,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        type: ['bar', 'line', 'pie'][Math.floor(Math.random() * 3)] as 'bar' | 'line' | 'pie',
        opacity: Math.random() * 0.4 + 0.1,
        data: Array(5).fill(0).map(() => Math.random()),
      });
    }

    // Initialize binary streams
    for (let i = 0; i < 20; i++) {
      binaryStreams.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        binary: Array(Math.floor(Math.random() * 20 + 10)).fill(0).map(() => 
          binaryChars[Math.floor(Math.random() * 2)]
        ).join(''),
        opacity: Math.random() * 0.3 + 0.1,
        length: Math.random() * 100 + 50,
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

    const drawChart = (chart: typeof floatingCharts[0]) => {
      ctx.save();
      ctx.translate(chart.x, chart.y);
      ctx.rotate(chart.rotation);
      ctx.globalAlpha = chart.opacity;

      const size = chart.size;
      
      switch (chart.type) {
        case 'bar':
          // Draw bar chart
          const barWidth = size / chart.data.length;
          chart.data.forEach((value, index) => {
            const height = value * size;
            ctx.fillStyle = chart.opacity > 0.2 ? 'rgba(59, 130, 246, 0.6)' : 'rgba(59, 130, 246, 0.3)';
            ctx.fillRect(index * barWidth - size/2, -height/2, barWidth * 0.8, height);
          });
          break;
          
        case 'line':
          // Draw line chart
          ctx.strokeStyle = chart.opacity > 0.2 ? 'rgba(34, 197, 94, 0.8)' : 'rgba(34, 197, 94, 0.4)';
          ctx.lineWidth = 2;
          ctx.beginPath();
          chart.data.forEach((value, index) => {
            const x = (index / (chart.data.length - 1)) * size - size/2;
            const y = (value - 0.5) * size;
            if (index === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          });
          ctx.stroke();
          break;
          
        case 'pie':
          // Draw pie chart
          let currentAngle = 0;
          chart.data.forEach((value, index) => {
            const sliceAngle = (value / chart.data.reduce((a, b) => a + b, 0)) * Math.PI * 2;
            ctx.fillStyle = `hsl(${index * 60}, 70%, 60%)`;
            ctx.globalAlpha = chart.opacity;
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.arc(0, 0, size/2, currentAngle, currentAngle + sliceAngle);
            ctx.closePath();
            ctx.fill();
            currentAngle += sliceAngle;
          });
          break;
      }
      
      ctx.restore();
    };

    const animate = () => {
      time += 0.01;
      
      // Clear with data-themed gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, 'rgba(15, 23, 42, 0.95)');
      gradient.addColorStop(0.5, 'rgba(30, 41, 59, 0.95)');
      gradient.addColorStop(1, 'rgba(15, 23, 42, 0.95)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw data nodes
      dataNodes.forEach((node, index) => {
        // Mouse interaction
        const dx = mouseX - node.x;
        const dy = mouseY - node.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 200) {
          const force = (200 - distance) / 200;
          node.vx += (dx / distance) * force * 0.005;
          node.vy += (dy / distance) * force * 0.005;
        }

        // Update position with data flow
        node.x += node.vx + Math.sin(time + node.y * 0.01) * 0.3;
        node.y += node.vy + Math.cos(time + node.x * 0.01) * 0.3;
        
        // Update pulse
        node.pulsePhase += 0.03;
        const pulseSize = node.size + Math.sin(node.pulsePhase) * 2;

        // Boundaries
        if (node.x < 0) node.x = canvas.width;
        if (node.x > canvas.width) node.x = 0;
        if (node.y < 0) node.y = canvas.height;
        if (node.y > canvas.height) node.y = 0;

        // Draw data node with glow
        ctx.shadowBlur = 15;
        ctx.shadowColor = node.color + '0.8)';
        ctx.beginPath();
        ctx.arc(node.x, node.y, pulseSize, 0, Math.PI * 2);
        ctx.fillStyle = node.color + node.opacity + ')';
        ctx.fill();
        
        // Draw data type label
        ctx.shadowBlur = 0;
        ctx.font = '10px monospace';
        ctx.fillStyle = node.color + '0.7)';
        ctx.textAlign = 'center';
        ctx.fillText(node.dataType, node.x, node.y - pulseSize - 5);

        // Draw connections between nearby nodes
        dataNodes.slice(index + 1).forEach(otherNode => {
          const dx = node.x - otherNode.x;
          const dy = node.y - otherNode.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            const opacity = 0.4 * (1 - distance / 150);
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(otherNode.x, otherNode.y);
            ctx.strokeStyle = node.color + opacity + ')';
            ctx.lineWidth = 1 + Math.sin(time * 3) * 0.5;
            ctx.stroke();

            // Data flow particles along connections
            if (Math.random() < 0.02) {
              const flowX = node.x + (otherNode.x - node.x) * Math.random();
              const flowY = node.y + (otherNode.y - node.y) * Math.random();
              ctx.beginPath();
              ctx.arc(flowX, flowY, 2, 0, Math.PI * 2);
              ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
              ctx.fill();
            }
          }
        });
      });

      // Update and draw code rain
      codeRain.forEach(rain => {
        rain.y += rain.speed;
        
        if (rain.y > canvas.height + 100) {
          rain.y = -100;
          rain.x = Math.random() * canvas.width;
        }

        // Draw code characters
        ctx.font = '12px monospace';
        ctx.textAlign = 'center';
        rain.chars.forEach((char, index) => {
          const charY = rain.y + index * 15;
          const alpha = Math.max(0, rain.opacity - (index * 0.1));
          ctx.fillStyle = rain.color + alpha + ')';
          ctx.fillText(char, rain.x, charY);
          
          // Add glow effect to some characters
          if (Math.random() < 0.1) {
            ctx.shadowBlur = 10;
            ctx.shadowColor = rain.color + '0.8)';
            ctx.fillText(char, rain.x, charY);
            ctx.shadowBlur = 0;
          }
        });
      });

      // Update and draw floating charts
      floatingCharts.forEach(chart => {
        chart.x += chart.vx;
        chart.y += chart.vy;
        chart.rotation += chart.rotationSpeed;
        
        // Boundaries
        if (chart.x < -50) chart.x = canvas.width + 50;
        if (chart.x > canvas.width + 50) chart.x = -50;
        if (chart.y < -50) chart.y = canvas.height + 50;
        if (chart.y > canvas.height + 50) chart.y = -50;

        // Animate chart data
        if (Math.random() < 0.01) {
          chart.data = chart.data.map(() => Math.random());
        }

        drawChart(chart);
      });

      // Update and draw binary streams
      binaryStreams.forEach(stream => {
        stream.x += stream.vx;
        stream.y += stream.vy;
        
        // Boundaries
        if (stream.x < -stream.length) stream.x = canvas.width + stream.length;
        if (stream.x > canvas.width + stream.length) stream.x = -stream.length;
        if (stream.y < -20) stream.y = canvas.height + 20;
        if (stream.y > canvas.height + 20) stream.y = -20;

        // Draw binary stream
        ctx.font = '10px monospace';
        ctx.fillStyle = `rgba(34, 197, 94, ${stream.opacity})`;
        ctx.fillText(stream.binary, stream.x, stream.y);

        // Occasionally update binary
        if (Math.random() < 0.05) {
          stream.binary = Array(stream.binary.length).fill(0).map(() => 
            binaryChars[Math.floor(Math.random() * 2)]
          ).join('');
        }
      });

      // Add data processing indicators
      if (Math.random() < 0.1) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const indicators = ['Processing...', 'Analyzing...', 'Computing...', 'Learning...', 'Predicting...'];
        const indicator = indicators[Math.floor(Math.random() * indicators.length)];
        
        ctx.font = '14px monospace';
        ctx.fillStyle = 'rgba(168, 85, 247, 0.6)';
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
