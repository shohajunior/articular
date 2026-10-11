import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, Loader2, LogOut, Lock } from 'lucide-react';
import type { Session } from '@supabase/supabase-js';
import { isSupabaseConfigured, supabase } from '../../lib/supabase';
import { NewsManager } from './NewsManager';
import { StatsManager } from './StatsManager';
import { PartnersManager } from './PartnersManager';
import { Field, Toast, ToastBar, btnGhost, btnPrimary, inputCls } from './ui';

type Tab = 'news' | 'stats' | 'partners';
const TABS: { id: Tab; label: string }[] = [
  { id: 'news', label: 'News' },
  { id: 'stats', label: 'Numbers' },
  { id: 'partners', label: 'Partners' },
];

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    const { error: err } = await supabase!.auth.signInWithPassword({ email: email.trim(), password });
    if (err) setError('Wrong email or password.');
    setBusy(false);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-12">
      {/* Brand Header & ArticularUZ Logo */}
      <div className="mb-8 flex flex-col items-center text-center">
        <a
          href="#/"
          className="group inline-flex items-center gap-3 transition-opacity hover:opacity-90"
          aria-label="ArticularUZ Home"
        >
          <img
            src="./assets/logo.png"
            alt="ArticularUZ Logo"
            className="h-11 w-11 shrink-0 object-contain drop-shadow-[0_0_14px_rgba(0,229,255,0.45)] transition-transform duration-300 group-hover:scale-105"
          />
          <div className="flex flex-col text-left justify-center">
            <span className="text-xl sm:text-2xl font-extrabold tracking-tight leading-none text-[var(--ink)]">
              ARTICULAR<span className="text-[#00e5ff] dark:text-[#38bdf8]">UZ</span>
            </span>
            <span className="font-mono text-[8.5px] sm:text-[9.5px] font-bold tracking-[0.24em] uppercase text-[var(--ink-muted)] leading-none mt-1">
              LEARN · THINK · ARTICULATE
            </span>
          </div>
        </a>
        <h2 className="mt-3.5 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--ink-muted)]">
          Administration Portal
        </h2>
      </div>

      <form onSubmit={submit} className="w-full max-w-sm space-y-5 rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-8 shadow-[var(--shadow-lg)]">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent-tint)] text-[var(--accent)]">
          <Lock className="h-5 w-5" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">Admin login</h1>
        <Field label="Email">
          <input className={inputCls} type="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </Field>
        <Field label="Password">
          <input className={inputCls} type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </Field>
        {error && <p className="text-sm font-medium text-red-500">{error}</p>}
        <button type="submit" disabled={busy} className={`${btnPrimary} w-full`}>
          {busy && <Loader2 className="h-4 w-4 animate-spin" />} Sign in
        </button>
        <a href="#/" className="block text-center text-xs font-semibold text-[var(--ink-muted)] hover:text-[var(--ink)]">
          ← Back to site
        </a>
      </form>
    </div>
  );
};

export const AdminPage: React.FC = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  const [tab, setTab] = useState<Tab>('news');
  const [toast, setToast] = useState<Toast | null>(null);
  const timer = useRef<number>(undefined);

  const notify = useCallback((kind: 'ok' | 'err', text: string) => {
    setToast({ kind, text });
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setToast(null), 3200);
  }, []);

  useEffect(() => {
    // keep the admin page out of search engines
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex,nofollow';
    document.head.appendChild(meta);
    const prev = document.title;
    document.title = 'Admin — ArticularUZ';
    return () => {
      meta.remove();
      document.title = prev;
    };
  }, []);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    const { data } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => data.subscription.unsubscribe();
  }, []);

  if (!isSupabaseConfigured) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6 text-center">
        <div className="max-w-md rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-8">
          <h1 className="mb-2 text-xl font-bold">Backend is not configured</h1>
          <p className="text-sm text-[var(--ink-muted)]">
            Set <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> (see <code>.env.example</code>) and rebuild.
          </p>
        </div>
      </div>
    );
  }

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-[var(--ink-muted)]" />
      </div>
    );
  }

  if (!session) return <Login />;

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)]">
      <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[var(--header-bg)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1000px] flex-wrap items-center justify-between gap-3 px-6 py-3">
          <div className="flex items-center gap-3">
            <a href="#/" className="flex items-center gap-1.5 rounded-full border border-[var(--line)] bg-[var(--surface)] px-3 py-1.5 text-xs font-semibold text-[var(--ink-muted)] hover:border-[var(--line-strong)] hover:text-[var(--ink)] transition-colors">
              <ArrowLeft className="h-3.5 w-3.5" /> Back to site
            </a>
            <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-[var(--line)]">
              <img src="./assets/logo.png" alt="ArticularUZ" className="h-6 w-6 object-contain" />
              <span className="text-sm font-bold tracking-tight text-[var(--ink)]">
                ARTICULAR<span className="text-[#00e5ff] dark:text-[#38bdf8]">UZ</span>
                <span className="ml-1.5 rounded bg-[var(--surface-elevated)] px-1.5 py-0.5 text-[9.5px] font-semibold text-[var(--accent)] uppercase tracking-wider">Admin</span>
              </span>
            </div>
          </div>
          <nav className="flex gap-1 rounded-full border border-[var(--line)] bg-[var(--surface)] p-1">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`cursor-pointer rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                  tab === t.id ? 'bg-[var(--accent)] text-[var(--accent-contrast)]' : 'text-[var(--ink-muted)] hover:text-[var(--ink)]'
                }`}
              >
                {t.label}
              </button>
            ))}
          </nav>
          <button type="button" onClick={() => supabase!.auth.signOut()} className={btnGhost}>
            <LogOut className="h-4 w-4" /> Logout
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-[1000px] px-6 py-10">
        {tab === 'news' && <NewsManager notify={notify} />}
        {tab === 'stats' && <StatsManager notify={notify} />}
        {tab === 'partners' && <PartnersManager notify={notify} />}
      </main>

      <ToastBar toast={toast} />
    </div>
  );
};
