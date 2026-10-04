import React, { useEffect, useState } from 'react';

interface CountUpProps {
  value: string;
  duration?: number;
  start?: boolean;
}

export const CountUp: React.FC<CountUpProps> = ({
  value,
  duration = 1400,
  start = true,
}) => {
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : '';

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!start) {
      setCurrent(0);
      return;
    }

    let startTime: number | null = null;
    let animFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth ease-out expo curve
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const val = Math.round(ease * target);

      setCurrent(val);

      if (progress < 1) {
        animFrame = requestAnimationFrame(animate);
      } else {
        setCurrent(target);
      }
    };

    animFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animFrame);
  }, [target, duration, start]);

  return (
    <span>
      {current}
      {suffix}
    </span>
  );
};
