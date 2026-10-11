import React, { useCallback, useEffect, useState } from 'react';
import { Loader2, Pencil, Plus, Trash2 } from 'lucide-react';
import { deleteNews, getNews, saveNews } from '../../lib/api';
import type { NewsItem } from '../../types/content';
import { Field, ImageUpload, btnDanger, btnGhost, btnPrimary, inputCls } from './ui';

interface Props {
  notify: (kind: 'ok' | 'err', text: string) => void;
}

type Draft = { id?: string; title: string; description: string; image_url: string | null };
const EMPTY: Draft = { title: '', description: '', image_url: null };

export const NewsManager: React.FC<Props> = ({ notify }) => {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    try {
      setItems(await getNews());
    } catch (e) {
      notify('err', e instanceof Error ? e.message : 'Failed to load news');
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
    if (!draft.title.trim() || !draft.description.trim()) {
      notify('err', 'Title and description are required.');
      return;
    }
    setSaving(true);
    try {
      await saveNews({ ...draft, title: draft.title.trim(), description: draft.description.trim() });
      notify('ok', draft.id ? 'News updated' : 'News added');
      setDraft(null);
      await load();
    } catch (err) {
      notify('err', err instanceof Error ? err.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const remove = async (n: NewsItem) => {
    if (!window.confirm(`Delete “${n.title}”?`)) return;
    try {
      await deleteNews(n);
      notify('ok', 'News deleted');
      await load();
    } catch (err) {
      notify('err', err instanceof Error ? err.message : 'Delete failed');
    }
  };

  if (draft) {
    return (
      <form onSubmit={submit} className="mx-auto max-w-2xl space-y-5">
        <h2 className="text-xl font-bold">{draft.id ? 'Edit news' : 'Add news'}</h2>
        <ImageUpload
          label="Photo"
          folder="news"
          value={draft.image_url}
          onChange={(url) => setDraft({ ...draft, image_url: url })}
          onError={(m) => notify('err', m)}
        />
        <Field label="Title">
          <input
            className={inputCls}
            value={draft.title}
            maxLength={140}
            onChange={(e) => setDraft({ ...draft, title: e.target.value })}
            placeholder="Headline"
          />
        </Field>
        <Field label="Description">
          <textarea
            className={`${inputCls} min-h-[160px] resize-y`}
            value={draft.description}
            onChange={(e) => setDraft({ ...draft, description: e.target.value })}
            placeholder="Write the news text…"
          />
        </Field>
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
        <h2 className="text-xl font-bold">News ({items.length})</h2>
        <button type="button" onClick={() => setDraft(EMPTY)} className={btnPrimary}>
          <Plus className="h-4 w-4" /> Add news
        </button>
      </div>

      {loading ? (
        <Loader2 className="mx-auto h-6 w-6 animate-spin text-[var(--ink-muted)]" />
      ) : items.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-[var(--line-strong)] p-10 text-center text-[var(--ink-muted)]">
          No news yet. Add the first one.
        </p>
      ) : (
        <ul className="space-y-3">
          {items.map((n) => (
            <li key={n.id} className="flex items-center gap-4 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-3">
              <div className="h-16 w-24 shrink-0 overflow-hidden rounded-lg bg-[var(--surface-elevated)]">
                {n.image_url && <img src={n.image_url} alt="" className="h-full w-full object-cover" />}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold">{n.title}</p>
                <p className="truncate text-xs text-[var(--ink-muted)]">
                  {new Date(n.created_at).toLocaleDateString('en-GB')} · {n.description}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setDraft({ id: n.id, title: n.title, description: n.description, image_url: n.image_url })}
                className={btnGhost}
                aria-label="Edit"
              >
                <Pencil className="h-4 w-4" />
              </button>
              <button type="button" onClick={() => remove(n)} className={btnDanger} aria-label="Delete">
                <Trash2 className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
