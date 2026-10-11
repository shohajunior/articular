import React, { useEffect, useState } from 'react';
import { ArrowDown, ArrowUp, Loader2 } from 'lucide-react';
import { getStats, saveStats } from '../../lib/api';
import { FALLBACK_STATS } from '../../lib/useContent';
import { CountUp } from '../ui/CountUp';
import type { StatItem } from '../../types/content';
import { btnGhost, btnPrimary, inputCls } from './ui';

interface Props {
  notify: (kind: 'ok' | 'err', text: string) => void;
}

export const StatsManager: React.FC<Props> = ({ notify }) => {
  const [stats, setStats] = useState<StatItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getStats()
      .then((s) => setStats(s.length ? s : FALLBACK_STATS))
      .catch((e) => {
        setStats(FALLBACK_STATS);
        notify('err', e instanceof Error ? e.message : 'Failed to load stats');
      })
      .finally(() => setLoading(false));
  }, [notify]);

  const update = (i: number, patch: Partial<StatItem>) =>
    setStats((prev) => prev.map((s, idx) => (idx === i ? { ...s, ...patch } : s)));

  const move = (i: number, dir: -1 | 1) =>
    setStats((prev) => {
      const j = i + dir;
      if (j < 0 || j >= prev.length) return prev;
      const next = [...prev];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });

  const save = async () => {
    if (stats.some((s) => !s.value.trim() || !s.label.trim())) {
      notify('err', 'Fill in every value and label.');
      return;
    }
    setSaving(true);
    try {
      await saveStats(stats);
      setStats(await getStats());
      notify('ok', 'Stats saved');
    } catch (e) {
      notify('err', e instanceof Error ? e.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader2 className="mx-auto h-6 w-6 animate-spin text-[var(--ink-muted)]" />;

  return (
    <div className="mx-auto max-w-2xl">
      <h2 className="mb-1 text-xl font-bold">Landing numbers</h2>
      <p className="mb-5 text-sm text-[var(--ink-muted)]">
        The first 3 rows are shown under the hero headline. Use the arrows to change order.
      </p>

      <ul className="space-y-3">
        {stats.map((s, i) => (
          <li
            key={s.id ?? i}
            className={`flex items-center gap-3 rounded-2xl border bg-[var(--surface)] p-3 ${
              i < 3 ? 'border-[var(--line)]' : 'border-dashed border-[var(--line-strong)] opacity-70'
            }`}
          >
            <div className="flex flex-col">
              <button type="button" onClick={() => move(i, -1)} disabled={i === 0} className="cursor-pointer p-0.5 text-[var(--ink-muted)] hover:text-[var(--ink)] disabled:opacity-30" aria-label="Move up">
                <ArrowUp className="h-4 w-4" />
              </button>
              <button type="button" onClick={() => move(i, 1)} disabled={i === stats.length - 1} className="cursor-pointer p-0.5 text-[var(--ink-muted)] hover:text-[var(--ink)] disabled:opacity-30" aria-label="Move down">
                <ArrowDown className="h-4 w-4" />
              </button>
            </div>
            <input
              className={`${inputCls} w-28 font-mono-tag font-bold`}
              value={s.value}
              onChange={(e) => update(i, { value: e.target.value })}
              placeholder="100%"
              aria-label="Value"
            />
            <input
              className={inputCls}
              value={s.label}
              onChange={(e) => update(i, { label: e.target.value })}
              placeholder="Label"
              aria-label="Label"
            />
            {i >= 3 && <span className="shrink-0 text-[10px] font-semibold uppercase text-[var(--ink-dim)]">hidden</span>}
          </li>
        ))}
      </ul>

      <div className="mt-8 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--ink-muted)]">Preview</p>
        <div className="grid grid-cols-3 gap-6">
          {stats.slice(0, 3).map((s, i) => (
            <div key={i}>
              <div className="font-mono-tag text-2xl font-bold tracking-tight sm:text-3xl">
                <CountUp value={s.value || '0'} duration={600} />
              </div>
              <div className="text-xs text-[var(--ink-muted)]">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <button type="button" onClick={save} disabled={saving} className={btnPrimary}>
          {saving && <Loader2 className="h-4 w-4 animate-spin" />} Save
        </button>
        <button type="button" onClick={() => setStats(FALLBACK_STATS)} className={btnGhost}>
          Reset to defaults
        </button>
      </div>
    </div>
  );
};
