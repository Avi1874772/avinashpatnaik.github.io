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
  "from fastapi import fastapi, request",
  "from pydantic import baseModel",
  "from portfolio.models import project, blog",
  "from sklearn.feature_extraction.text import tficfvectorizer",
  "from sklearn.metrics.pairwise import cosine_similarity",
  "",
  "app = fastapi()",
  "",
  "class userquery(baseModel):",
  "    message: str",
  "",
  "@app.post('/api/query')",
  "async def handle_query(data: userquery):",
  "    projects = project.get_all()",
  "    texts = [p.description for p in projects]",
  "    vectorizer = tficfvectorizer()",
  "    matrix = vectorizer.fit_transform(texts)",
  "    query_vec = vectorizer.transform([data.message])",
  "    scores = cosine_similarity(query_vec, matrix).flatten()",
  "    top_idx = scores.argmax()",
  "    return { 'match': projects[top_idx].title }",
  "",
  "@app.get('/')",
  "def homepage():",
  "    return { 'message': 'WELCOME TO AVI'S PORTFOLIO' }"
];

const rightCode = [
  "SELECT id, title, description",
  "FROM projects",
  "WHERE visibility = 'PUBLIC'",
  "ORDER BY created_at DESC;",
  "",
  "INSERT INTO page_visits(user_ip, visited_at)",
  "VALUES ('192.168.1.1', CURRENT_TIMESTAMP);",
  "",
  "SELECT COUNT(*) FROM page_visits",
  "WHERE visited_at > CURRENT_DATE - INTERVAL '7 days';",
  "",
  "SELECT blog.id, blog.title, COUNT(comments.id) AS comment_count",
  "FROM blog",
  "LEFT JOIN comments ON blog.id = comments.blog_id",
  "GROUP BY blog.id, blog.title",
  "ORDER BY comment_count DESC;",
  "",
  "SELECT p.title, ARRAY_AGG(s.name) AS skills",
  "FROM project_skills ps",
  "JOIN skills s ON s.id = ps.skill_id",
  "JOIN projects p ON p.id = ps.project_id",
  "GROUP BY p.title;",
  "",
  "UPDATE users SET last_login = NOW()",
  "WHERE id = 1;"
];

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
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
    const lineHeight = 20;
    const fontSize = 12;
    const leftStartX = padding;
    const rightStartX = canvas.width - 300; // SQL pushed further right

    const maxLines = Math.max(leftCode.length, rightCode.length);

    for (let i = 0; i < maxLines; i++) {
      if (i < leftCode.length) {
        lines.push({
          fullText: leftCode[i].toUpperCase(),
          typedText: '',
          x: leftStartX,
          y: padding + i * lineHeight,
          charIndex: 0,
          isCurrentLine: i === 0
        });
      }
      if (i < rightCode.length) {
        lines.push({
          fullText: rightCode[i].toUpperCase(),
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

    const typeInterval = 30;
    let lastTime = 0;

    // Reduced brightness & contrast glowing text
    const drawGlowingText = (text: string, x: number, y: number, opacity: number) => {
      const baseColor = `rgba(0, 255, 140, ${0.2 * opacity})`;

      ctx.shadowColor = `rgba(0, 255, 140, ${0.03 * opacity})`;
      ctx.shadowBlur = 3;
      ctx.fillStyle = baseColor;
      ctx.fillText(text, x, y);

      ctx.shadowColor = `rgba(0, 255, 140, ${0.1 * opacity})`;
      ctx.shadowBlur = 6;
      ctx.fillStyle = baseColor;
      ctx.fillText(text, x, y);

      ctx.shadowColor = `rgba(0, 255, 140, ${0.3 * opacity})`;
      ctx.shadowBlur = 12;
      ctx.fillStyle = baseColor;
      ctx.fillText(text, x, y);

      ctx.shadowBlur = 0;
    };

    const draw = (time: number) => {
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Softer dark radial background gradient
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.max(canvas.width, canvas.height) / 1.5
      );
      gradient.addColorStop(0, '#000000');
      gradient.addColorStop(0.2, '#031f1f');
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

      // Center fade zone between 40% - 60% width
      const centerStart = canvas.width * 0.4;
      const centerEnd = canvas.width * 0.6;

      lines.forEach((line) => {
        // Calculate opacity fade if line x is inside the center zone
        const midX = line.x;
        let opacity = 1.0;

        if (midX > centerStart && midX < centerEnd) {
          const distToCenter = Math.abs(midX - canvas.width / 2);
          opacity = Math.max(0.15, 1 - distToCenter / (canvas.width * 0.1));
        }

        drawGlowingText(line.typedText, line.x, line.y, opacity);

        if (line.isCurrentLine && line.charIndex < line.fullText.length && cursorVisible) {
          const cursorX = line.x + ctx.measureText(line.typedText).width;
          drawGlowingText('|', cursorX, line.y, opacity);
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
