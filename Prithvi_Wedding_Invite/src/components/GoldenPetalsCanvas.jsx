import React, { useEffect, useRef } from "react";

export default function GoldenPetalsCanvas({ active = true }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Subtle royal palette: champagne gold, warm marigold, soft rose-gold, and antique bronze
    const petalColors = [
      "rgba(212, 175, 55, 0.55)",
      "rgba(243, 229, 171, 0.45)",
      "rgba(245, 158, 11, 0.40)",
      "rgba(225, 145, 145, 0.38)",
      "rgba(184, 134, 11, 0.50)",
    ];

    const PETAL_COUNT = 30;
    const petals = Array.from({ length: PETAL_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      sizeW: 6 + Math.random() * 7,
      sizeH: 4 + Math.random() * 5,
      speedY: 0.4 + Math.random() * 0.7,
      speedX: -0.3 + Math.random() * 0.6,
      swayAmp: 0.4 + Math.random() * 0.8,
      swaySpeed: 0.01 + Math.random() * 0.02,
      swayOffset: Math.random() * Math.PI * 2,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      flip: Math.random() * Math.PI,
      flipSpeed: 0.015 + Math.random() * 0.025,
      color: petalColors[Math.floor(Math.random() * petalColors.length)],
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      petals.forEach((p) => {
        p.swayOffset += p.swaySpeed;
        p.x += p.speedX + Math.sin(p.swayOffset) * p.swayAmp;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;
        p.flip += p.flipSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);

        const flipScale = Math.cos(p.flip);
        ctx.scale(1, Math.max(Math.abs(flipScale), 0.25));

        ctx.beginPath();
        ctx.moveTo(0, -p.sizeH);
        ctx.bezierCurveTo(p.sizeW, -p.sizeH, p.sizeW, p.sizeH, 0, p.sizeH);
        ctx.bezierCurveTo(-p.sizeW, p.sizeH, -p.sizeW, -p.sizeH, 0, -p.sizeH);
        ctx.closePath();

        ctx.fillStyle = p.color;
        ctx.shadowColor = "rgba(212, 175, 55, 0.35)";
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [active]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-30"
      aria-hidden="true"
    />
  );
}
