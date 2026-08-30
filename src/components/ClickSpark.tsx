import React, { useRef, useEffect, useCallback, ReactNode } from 'react';

export interface ClickSparkProps {
  children?: ReactNode;
  sparkColor?: string;
  sparkSize?: number;
  sparkRadius?: number;
  sparkCount?: number;
  duration?: number;
  easing?: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';
  extraScale?: number;
  className?: string;
}

interface Spark {
  x: number;
  y: number;
  angle: number;
  startTime: number;
  color: string;
}

const PASTEL_SPARK_COLORS = ['#F472B6', '#FBBF24', '#34D399', '#818CF8', '#FB7185', '#FDE68A', '#A78BFA'];

export const ClickSpark: React.FC<ClickSparkProps> = ({
  children,
  sparkColor = '#F472B6',
  sparkSize = 16,
  sparkRadius = 32,
  sparkCount = 10,
  duration = 500,
  easing = 'ease-out',
  extraScale = 1.3,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sparksRef = useRef<Spark[]>([]);
  const animationFrameId = useRef<number | null>(null);

  // Resize canvas to cover the whole viewport
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
    }
  }, []);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [resizeCanvas]);

  const easeFunc = useCallback(
    (t: number) => {
      switch (easing) {
        case 'linear':
          return t;
        case 'ease-in':
          return t * t;
        case 'ease-in-out':
          return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        case 'ease-out':
        default:
          return t * (2 - t);
      }
    },
    [easing]
  );

  const draw = useCallback(
    (currentTime: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const width = window.innerWidth;
      const height = window.innerHeight;

      ctx.clearRect(0, 0, width, height);

      sparksRef.current = sparksRef.current.filter((spark) => {
        const elapsed = currentTime - spark.startTime;
        if (elapsed >= duration) {
          return false;
        }

        const progress = elapsed / duration;
        const easedProgress = easeFunc(progress);

        const distance = easedProgress * sparkRadius * extraScale;
        const lineLength = sparkSize * (1 - easedProgress);

        const x1 = spark.x + distance * Math.cos(spark.angle);
        const y1 = spark.y + distance * Math.sin(spark.angle);
        const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
        const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

        // Alpha fade out
        const opacity = Math.max(0, 1 - progress);

        ctx.save();
        ctx.strokeStyle = spark.color;
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.globalAlpha = opacity;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        ctx.restore();

        return true;
      });

      if (sparksRef.current.length > 0) {
        animationFrameId.current = requestAnimationFrame(draw);
      } else {
        animationFrameId.current = null;
      }
    },
    [duration, easeFunc, extraScale, sparkRadius, sparkSize]
  );

  // Listen to window pointerdown or click events to catch every button and element
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const clickX = e.clientX;
      const clickY = e.clientY;
      const now = performance.now();

      const newSparks: Spark[] = [];
      for (let i = 0; i < sparkCount; i++) {
        const angle = (i * 2 * Math.PI) / sparkCount + (Math.random() * 0.2 - 0.1);
        const color = PASTEL_SPARK_COLORS[Math.floor(Math.random() * PASTEL_SPARK_COLORS.length)];
        newSparks.push({
          x: clickX,
          y: clickY,
          angle,
          startTime: now,
          color,
        });
      }

      sparksRef.current.push(...newSparks);

      if (!animationFrameId.current) {
        animationFrameId.current = requestAnimationFrame(draw);
      }
    };

    window.addEventListener('pointerdown', handleGlobalClick, { passive: true });
    return () => {
      window.removeEventListener('pointerdown', handleGlobalClick);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [draw, sparkCount]);

  return (
    <div className={`relative w-full min-h-screen ${className}`}>
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-[99999] w-screen h-screen"
      />
      {children}
    </div>
  );
};
