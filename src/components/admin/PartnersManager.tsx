import React, { useCallback, useEffect, useState } from 'react';
import { ArrowDown, ArrowUp, Loader2, Pencil, Plus, Trash2 } from 'lucide-react';
import { deletePartner, getPartners, reorderPartners, savePartner } from '../../lib/api';
import type { PartnerItem } from '../../types/content';
import { Field, ImageUpload, btnDanger, btnGhost, btnPrimary, inputCls } from './ui';

interface Props {
  notify: (kind: 'ok' | 'err', text: string) => void;
}

type Draft = { id?: string; name: string; url: string; logo_light: string | null; logo_dark: string | null; sort_order?: number };
const EMPTY: Draft = { name: '', url: '', logo_light: null, logo_dark: null };

export const PartnersManager: React.FC<Props> = ({ notify }) => {
  const [items, setItems] = useState<PartnerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    try {
      setItems(await getPartners());
    } catch (e) {
      notify('err', e instanceof Error ? e.message : 'Failed to load partners');
    } finally {
      setLoading(false);
    }
  }, [notify]);

  useEffect(() => {
    load();
  }, [load]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft) return;
    const url = draft.url.trim();
    if (!draft.name.trim() || !url) return notify('err', 'Name and link are required.');
    if (!/^https?:\/\//i.test(url)) return notify('err', 'Link must start with http:// or https://');
    if (!draft.logo_light && !draft.logo_dark) return notify('err', 'Upload at least one logo.');

    setSaving(true);
    try {
      await savePartner({
        id: draft.id,
        name: draft.name.trim(),
        url,
        // if only one logo is provided, use it for both themes
        logo_light: (draft.logo_light || draft.logo_dark)!,
        logo_dark: (draft.logo_dark || draft.logo_light)!,
        sort_order: draft.sort_order ?? items.length,
      });
      notify('ok', draft.id ? 'Partner updated' : 'Partner added');
      setDraft(null);
      await load();
    } catch (err) {
      notify('err', err instanceof Error ? err.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const remove = async (p: PartnerItem) => {
    if (!window.confirm(`Delete partner “${p.name}”?`)) return;
    try {
      await deletePartner(p);
      notify('ok', 'Partner deleted');
      await load();
    } catch (err) {
      notify('err', err instanceof Error ? err.message : 'Delete failed');
    }
  };

  const move = async (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    setItems(next);
    try {
      await reorderPartners(next);
    } catch (err) {
      notify('err', err instanceof Error ? err.message : 'Reorder failed');
      await load();
    }
  };

  if (draft) {
    return (
      <form onSubmit={submit} className="mx-auto max-w-2xl space-y-5">
        <h2 className="text-xl font-bold">{draft.id ? 'Edit partner' : 'Add partner'}</h2>
        <Field label="Name">
          <input className={inputCls} value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} placeholder="Uzcosmos Agency" />
        </Field>
        <Field label="Website / link">
          <input className={inputCls} value={draft.url} onChange={(e) => setDraft({ ...draft, url: e.target.value })} placeholder="https://…" inputMode="url" />
        </Field>
        <div className="grid gap-5 sm:grid-cols-2">
          <ImageUpload label="Logo — light theme" folder="partners" value={draft.logo_light} onChange={(u) => setDraft({ ...draft, logo_light: u })} onError={(m) => notify('err', m)} />
          <ImageUpload label="Logo — dark theme (white logo)" folder="partners" dark value={draft.logo_dark} onChange={(u) => setDraft({ ...draft, logo_dark: u })} onError={(m) => notify('err', m)} />
        </div>
        <div className="flex gap-3">
          <button type="submit" disabled={saving} className={btnPrimary}>
            {saving && <Loader2 className="h-4 w-4 animate-spin" />} Save
          </button>
          <button type="button" onClick={() => setDraft(null)} className={btnGhost}>
            Cancel
          </button>
        </div>
      </form>
    );
  }

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-bold">Partners ({items.length})</h2>
        <button type="button" onClick={() => setDraft(EMPTY)} className={btnPrimary}>
          <Plus className="h-4 w-4" /> Add partner
        </button>
      </div>

      {loading ? (
        <Loader2 className="mx-auto h-6 w-6 animate-spin text-[var(--ink-muted)]" />
      ) : items.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-[var(--line-strong)] p-10 text-center text-[var(--ink-muted)]">
          No partners yet. The site shows the built-in partners until you add one.
        </p>
      ) : (
        <ul className="space-y-3">
          {items.map((p, i) => (
            <li key={p.id} className="flex items-center gap-4 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-3">
              <div className="flex flex-col">
                <button type="button" onClick={() => move(i, -1)} disabled={i === 0} className="cursor-pointer p-0.5 text-[var(--ink-muted)] hover:text-[var(--ink)] disabled:opacity-30" aria-label="Move up">
                  <ArrowUp className="h-4 w-4" />
                </button>
                <button type="button" onClick={() => move(i, 1)} disabled={i === items.length - 1} className="cursor-pointer p-0.5 text-[var(--ink-muted)] hover:text-[var(--ink)] disabled:opacity-30" aria-label="Move down">
                  <ArrowDown className="h-4 w-4" />
                </button>
              </div>
              <div className="flex h-14 w-24 shrink-0 items-center justify-center rounded-lg bg-white p-1.5">
                <img src={p.logo_light} alt="" className="max-h-full max-w-full object-contain" />
              </div>
              <div className="flex h-14 w-24 shrink-0 items-center justify-center rounded-lg bg-slate-900 p-1.5">
                <img src={p.logo_dark} alt="" className="max-h-full max-w-full object-contain" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold">{p.name}</p>
                <p className="truncate text-xs text-[var(--ink-muted)]">{p.url}</p>
              </div>
              <button
                type="button"
                onClick={() => setDraft({ id: p.id, name: p.name, url: p.url, logo_light: p.logo_light, logo_dark: p.logo_dark, sort_order: p.sort_order })}
                className={btnGhost}
                aria-label="Edit"
              >
                <Pencil className="h-4 w-4" />
              </button>
              <button type="button" onClick={() => remove(p)} className={btnDanger} aria-label="Delete">
                <Trash2 className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
