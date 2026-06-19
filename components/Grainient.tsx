'use client';

import { useEffect, useRef } from 'react';
import './Grainient.css';

interface GrainientProps {
  color1?: string;
  color2?: string;
  color3?: string;
  timeSpeed?: number;
  colorBalance?: number;
  warpStrength?: number;
  warpFrequency?: number;
  warpSpeed?: number;
  warpAmplitude?: number;
  blendAngle?: number;
  blendSoftness?: number;
  rotationAmount?: number;
  noiseScale?: number;
  grainAmount?: number;
  grainScale?: number;
  grainAnimated?: boolean;
  contrast?: number;
  gamma?: number;
  saturation?: number;
  centerX?: number;
  centerY?: number;
  zoom?: number;
}

const Grainient: React.FC<GrainientProps> = ({
  color1 = '#FF9FFC',
  color2 = '#bbacf9',
  color3 = '#B497CF',
  timeSpeed = 0.25,
  colorBalance = 0,
  warpStrength = 1,
  warpFrequency = 5,
  warpSpeed = 2,
  warpAmplitude = 50,
  blendAngle = 0,
  blendSoftness = 0.05,
  rotationAmount = 500,
  noiseScale = 2,
  grainAmount = 0.1,
  grainScale = 2,
  grainAnimated = false,
  contrast = 1.5,
  gamma = 1,
  saturation = 1,
  centerX = 0,
  centerY = 0,
  zoom = 0.9,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let time = 0;

    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
          }
        : { r: 0, g: 0, b: 0 };
    };

    const c1 = hexToRgb(color1);
    const c2 = hexToRgb(color2);
    const c3 = hexToRgb(color3);

    const animate = () => {
      if (!ctx || !canvas) return;

      time += timeSpeed * 0.01;

      const w = canvas.width;
      const h = canvas.height;
      const imageData = ctx.createImageData(w, h);
      const data = imageData.data;

      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const i = (y * w + x) * 4;

          // Normalized coordinates
          const nx = ((x / w) - 0.5 - centerX) / zoom;
          const ny = ((y / h) - 0.5 - centerY) / zoom;

          // Warp effect
          const warpX = Math.sin(nx * warpFrequency + time * warpSpeed) * (warpAmplitude / 100);
          const warpY = Math.cos(ny * warpFrequency + time * warpSpeed) * (warpAmplitude / 100);

          const px = nx + warpX * warpStrength;
          const py = ny + warpY * warpStrength;

          // Rotation
          const angle = (rotationAmount / 100) * time;
          const cos = Math.cos(angle);
          const sin = Math.sin(angle);
          const rx = px * cos - py * sin;
          const ry = px * sin + py * cos;

          // Gradient calculation
          const dist = Math.sqrt(rx * rx + ry * ry);
          const blend = Math.atan2(ry, rx) / Math.PI * 0.5 + 0.5;

          let t = (dist + colorBalance) % 1;
          t = Math.pow(t, gamma);

          // Three-color gradient
          let r, g, b;
          if (t < 0.5) {
            const t2 = t * 2;
            r = c1.r + (c2.r - c1.r) * t2;
            g = c1.g + (c2.g - c1.g) * t2;
            b = c1.b + (c2.b - c1.b) * t2;
          } else {
            const t2 = (t - 0.5) * 2;
            r = c2.r + (c3.r - c2.r) * t2;
            g = c2.g + (c3.g - c2.g) * t2;
            b = c2.b + (c3.b - c2.b) * t2;
          }

          // Apply contrast
          r = ((r / 255 - 0.5) * contrast + 0.5) * 255;
          g = ((g / 255 - 0.5) * contrast + 0.5) * 255;
          b = ((b / 255 - 0.5) * contrast + 0.5) * 255;

          // Apply saturation
          const gray = r * 0.299 + g * 0.587 + b * 0.114;
          r = gray + (r - gray) * saturation;
          g = gray + (g - gray) * saturation;
          b = gray + (b - gray) * saturation;

          // Add grain
          const grainValue = grainAnimated
            ? (Math.random() - 0.5) * grainAmount * 255
            : (Math.sin(x * grainScale + y * grainScale + time) * 0.5 + 0.5 - 0.5) * grainAmount * 255;

          r = Math.max(0, Math.min(255, r + grainValue));
          g = Math.max(0, Math.min(255, g + grainValue));
          b = Math.max(0, Math.min(255, b + grainValue));

          data[i] = r;
          data[i + 1] = g;
          data[i + 2] = b;
          data[i + 3] = 255;
        }
      }

      ctx.putImageData(imageData, 0, 0);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [
    color1,
    color2,
    color3,
    timeSpeed,
    colorBalance,
    warpStrength,
    warpFrequency,
    warpSpeed,
    warpAmplitude,
    blendAngle,
    blendSoftness,
    rotationAmount,
    noiseScale,
    grainAmount,
    grainScale,
    grainAnimated,
    contrast,
    gamma,
    saturation,
    centerX,
    centerY,
    zoom,
  ]);

  return <canvas ref={canvasRef} className="grainient-canvas" />;
};

export default Grainient;
