import React, { useEffect, useState, useRef } from 'react';
import { STATS } from '../data/content';

export const StatsStrip: React.FC = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section ref={sectionRef} className="py-12 bg-[#000000] relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#111111]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Subtle red accent line on top */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E10600] to-transparent opacity-90" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 divide-y md:divide-y-0 md:divide-x divide-white/10">
            {STATS.map((stat, idx) => (
              <StatItem
                key={stat.label}
                stat={stat}
                hasAnimated={hasAnimated}
                isFirst={idx === 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

interface StatItemProps {
  stat: { value: number; suffix: string; label: string; desc: string };
  hasAnimated: boolean;
  isFirst: boolean;
}

const StatItem: React.FC<StatItemProps> = ({ stat, hasAnimated, isFirst }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!hasAnimated) return;

    let start = 0;
    const end = stat.value;
    const duration = 1800;
    const stepTime = 30;
    const totalSteps = duration / stepTime;
    const increment = end / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [hasAnimated, stat.value]);

  return (
    <div className={`flex flex-col items-center text-center ${!isFirst ? 'pt-6 md:pt-0' : ''} px-2`}>
      <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white font-heading tracking-tight flex items-baseline">
        <span className="tabular-nums">
          {hasAnimated ? count.toLocaleString() : '0'}
        </span>
        <span className="red-gradient-text ml-0.5">{stat.suffix}</span>
      </div>
      <div className="text-sm font-semibold text-neutral-200 mt-2 font-heading">
        {stat.label}
      </div>
      <div className="text-xs text-[#A3A3A3] mt-0.5">
        {stat.desc}
      </div>
    </div>
  );
};
