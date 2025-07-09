import React, { useEffect, useRef } from 'react';

interface CodeLine {
  fullText: string;
  typedText: string;
  x: number;
  y: number;
  charIndex: number;
  isCurrentLine: boolean;
}

const leftCode = [
  "import pandas as pd",
  "import numpy as np",
  "",
  "df = pd.read_csv('data.csv')",
  "df.dropna(inplace=True)",
  "",
  "from sklearn.linear_model import LogisticRegression",
  "model = LogisticRegression()",
  "model.fit(X_train, y_train)",
  "",
  "print(model.score(X_test, y_test))",
  "# Evaluation complete"
];

const rightCode = [
  "SELECT id, name",
  "FROM users",
  "WHERE active = true;",
  "",
  "-- Total sales by region",
  "SELECT region, SUM(amount)",
  "FROM sales",
  "GROUP BY region;",
  "",
  "-- Top performing products",
  "SELECT product_id, AVG(rating)",
  "FROM reviews",
  "GROUP BY product_id",
  "ORDER BY AVG(rating) DESC;"
];

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Dynamically load Source Code Pro font
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Source+Code+Pro&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

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

    const lines: CodeLine[] = [];
    const padding = 40;
    const lineHeight = 28;
    const fontSize = 15;
    const leftStartX = padding;
    const rightStartX = canvas.width - 420;

    const maxLines = Math.max(leftCode.length, rightCode.length);

    for (let i = 0; i < maxLines; i++) {
      if (i < leftCode.length) {
        lines.push({
          fullText: leftCode[i],
          typedText: '',
          x: leftStartX,
          y: padding + i * lineHeight,
          charIndex: 0,
          isCurrentLine: i === 0
        });
      }
      if (i < rightCode.length) {
        lines.push({
          fullText: rightCode[i],
          typedText: '',
          x: rightStartX,
          y: padding + i * lineHeight,
          charIndex: 0,
          isCurrentLine: i === 0 && leftCode.length === 0
        });
      }
    }

    let currentLine = 0;
    let cursorVisible = true;

    setInterval(() => {
      cursorVisible = !cursorVisible;
    }, 600);

    const typeInterval = 80;
    let lastTime = 0;

    // Function to draw glowing text with layered shadows
    const drawGlowingText = (text: string, x: number, y: number) => {
      ctx.shadowColor = 'rgba(0, 255, 140, 0.15)';
      ctx.shadowBlur = 10;
      ctx.fillStyle = 'rgba(0, 255, 140, 0.15)';
      ctx.fillText(text, x, y);

      ctx.shadowColor = 'rgba(0, 255, 140, 0.4)';
      ctx.shadowBlur = 20;
      ctx.fillStyle = 'rgba(0, 255, 140, 0.4)';
      ctx.fillText(text, x, y);

      ctx.shadowColor = 'rgba(0, 255, 140, 1)';
      ctx.shadowBlur = 30;
      ctx.fillStyle = 'rgba(0, 255, 140, 1)';
      ctx.fillText(text, x, y);

      ctx.shadowBlur = 0;
    };

    const draw = (time: number) => {
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Darker background with central shading
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.max(canvas.width, canvas.height) / 1.5
      );
      gradient.addColorStop(0, '#000000');
      gradient.addColorStop(0.2, '#021f1f');
      gradient.addColorStop(1, '#000000');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px 'Source Code Pro', monospace`;
      ctx.textBaseline = 'top';

      if (time - lastTime > typeInterval) {
        const line = lines[currentLine];
        if (line && line.charIndex < line.fullText.length) {
          line.typedText += line.fullText[line.charIndex];
          line.charIndex++;
        } else {
          if (line) line.isCurrentLine = false;
          currentLine++;
          if (currentLine < lines.length) {
            lines[currentLine].isCurrentLine = true;
          }
        }
        lastTime = time;
      }

      lines.forEach((line) => {
        drawGlowingText(line.typedText, line.x, line.y);

        if (line.isCurrentLine && line.charIndex < line.fullText.length && cursorVisible) {
          const cursorX = line.x + ctx.measureText(line.typedText).width;
          drawGlowingText('|', cursorX, line.y);
        }
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
