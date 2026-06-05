import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number; y: number; vx: number; vy: number;
  size: number; opacity: number; color: string;
}

interface DataNode {
  x: number; y: number; vx: number; vy: number;
  connections: number[];
}

const COLORS = ['#00d4ff', '#3b82f6', '#7c3aed', '#10b981'];

const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const nodes = useRef<DataNode[]>([]);
  const mousePos = useRef({ x: 0, y: 0 });
  const animRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
      initNodes();
    };

    const initParticles = () => {
      particles.current = Array.from({ length: 60 }, (_: unknown) => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      }));
    };

    const initNodes = () => {
      const count = 20;
      nodes.current = Array.from({ length: count }, (_: unknown) => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        connections: [],
      }));
      nodes.current.forEach((node, i) => {
        node.connections = [];
        nodes.current.forEach((other, j) => {
          if (i !== j) {
            const dist = Math.hypot(node.x - other.x, node.y - other.y);
            if (dist < 200) node.connections.push(j);
          }
        });
      });
    };

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw data network nodes
      nodes.current.forEach((node, i) => {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        const dx = mousePos.current.x - node.x;
        const dy = mousePos.current.y - node.y;
        const mouseDist = Math.hypot(dx, dy);
        if (mouseDist < 120) {
          node.x -= dx * 0.01;
          node.y -= dy * 0.01;
        }

        // Draw connections
        nodes.current.forEach((other, j) => {
          if (j <= i) return;
          const dist = Math.hypot(node.x - other.x, node.y - other.y);
          if (dist < 180) {
            const alpha = (1 - dist / 180) * 0.15;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);
            const grad = ctx.createLinearGradient(node.x, node.y, other.x, other.y);
            grad.addColorStop(0, `rgba(0,212,255,${alpha})`);
            grad.addColorStop(1, `rgba(124,58,237,${alpha})`);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        });

        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,212,255,0.4)`;
        ctx.fill();
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#00d4ff';
      });

      ctx.shadowBlur = 0;

      // Draw floating particles
      particles.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.floor(p.opacity * 255).toString(16).padStart(2, '0');
        ctx.fill();
      });

      // Draw data flow lines (horizontal)
      const time = Date.now() * 0.001;
      for (let i = 0; i < 4; i++) {
        const y = (canvas.height / 5) * (i + 1);
        const offset = (time * 60 + i * 200) % canvas.width;
        const grad = ctx.createLinearGradient(offset - 200, y, offset + 100, y);
        grad.addColorStop(0, 'rgba(0,212,255,0)');
        grad.addColorStop(0.5, `rgba(0,212,255,0.06)`);
        grad.addColorStop(1, 'rgba(0,212,255,0)');
        ctx.beginPath();
        ctx.moveTo(offset - 200, y);
        ctx.lineTo(offset + 100, y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', resize);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.7,
      }}
    />
  );
};

export default AnimatedBackground;
