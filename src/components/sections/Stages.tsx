import React, { useState } from 'react';
import { siteData } from '../../data/site';

export const Stages: React.FC = () => {
  const [activeStage, setActiveStage] = useState(0);

  return (
    <section id="stages" className="py-20">
      <div className="mx-auto max-w-[1140px] px-6">
        <div className="mb-12">
          <span className="font-mono-tag text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
            Tournament Structure
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-[var(--ink)] sm:text-4xl">
            Four stages to{' '}
            <span className="font-serif-italic text-[var(--accent)]">national defense</span>
          </h2>
          <p className="mt-2 text-sm text-[var(--ink-muted)]">
            How student teams progress from initial research to official credentials.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          {/* Stage Cards */}
          <div className="flex flex-col gap-3">
            {siteData.stages.map((stage, idx) => {
              const isActive = activeStage === idx;
              return (
                <div
                  key={stage.num}
                  onMouseEnter={() => setActiveStage(idx)}
                  onClick={() => setActiveStage(idx)}
                  className={`cursor-pointer rounded-2xl border p-5 transition-all duration-300 ${
                    isActive
                      ? 'border-[var(--accent)] bg-[var(--surface)] shadow-sm'
                      : 'border-[var(--line)] bg-transparent hover:border-[var(--line-strong)] hover:bg-[var(--surface-elevated)]'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <span
                      className={`font-serif-italic text-2xl font-bold transition-colors ${
                        isActive ? 'text-[var(--accent)]' : 'text-[var(--ink-dim)]'
                      }`}
                    >
                      {stage.num}
                    </span>
                    <div className="flex-1">
                      <h3 className="text-base font-bold text-[var(--ink)]">
                        {stage.title}
                      </h3>
                      <p className="mt-1 text-xs text-[var(--ink-muted)] sm:text-sm">
                        {stage.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Stage Preview Photo */}
          <div className="overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-2 shadow-sm">
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
              <img
                key={siteData.stages[activeStage].photo}
                src={siteData.stages[activeStage].photo}
                alt={siteData.stages[activeStage].caption}
                className="h-full w-full object-cover transition-opacity duration-300"
              />
              <div className="absolute bottom-3 left-3 right-3 rounded-full border border-[var(--line)] bg-[var(--header-bg)] px-4 py-1.5 text-xs font-medium text-[var(--ink)] backdrop-blur-md">
                {siteData.stages[activeStage].caption}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
