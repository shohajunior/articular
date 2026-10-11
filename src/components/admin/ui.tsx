import React, { useRef, useState } from 'react';
import { ImagePlus, Loader2, X } from 'lucide-react';
import { uploadImage } from '../../lib/api';

export const inputCls =
  'w-full rounded-xl border border-[var(--line)] bg-[var(--bg)] px-3.5 py-2.5 text-sm text-[var(--ink)] outline-none transition-colors placeholder:text-[var(--ink-dim)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-tint)]';

export const btnPrimary =
  'inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-[var(--accent-contrast)] transition-colors hover:bg-[var(--accent-hover)] disabled:cursor-not-allowed disabled:opacity-50';

export const btnGhost =
  'inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface)] px-4 py-2 text-sm font-semibold text-[var(--ink)] transition-colors hover:bg-[var(--surface-elevated)] disabled:cursor-not-allowed disabled:opacity-50';

export const btnDanger =
  'inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-500 transition-colors hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-50';

export const Field: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <label className="block">
    <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-[var(--ink-muted)]">{label}</span>
    {children}
  </label>
);

interface ImageUploadProps {
  label: string;
  value: string | null;
  folder: 'news' | 'partners';
  onChange: (url: string | null) => void;
  onError: (msg: string) => void;
  /** dark preview background (for white logos) */
  dark?: boolean;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ label, value, folder, onChange, onError, dark }) => {
  const input = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [drag, setDrag] = useState(false);

  const handle = async (file?: File) => {
    if (!file) return;
    setBusy(true);
    try {
      onChange(await uploadImage(file, folder));
    } catch (e) {
      onError(e instanceof Error ? e.message : 'Upload failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <Field label={label}>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDrag(true);
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDrag(false);
          handle(e.dataTransfer.files?.[0]);
        }}
        className={`relative flex min-h-[132px] items-center justify-center overflow-hidden rounded-xl border-2 border-dashed transition-colors ${
          drag ? 'border-[var(--accent)] bg-[var(--accent-tint)]' : 'border-[var(--line-strong)]'
        } ${dark ? 'bg-slate-900' : 'bg-[var(--surface-elevated)]'}`}
      >
        {value ? (
          <>
            <img src={value} alt="" className="max-h-[200px] w-full object-contain" />
            <button
              type="button"
              onClick={() => onChange(null)}
              className="absolute right-2 top-2 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
              aria-label="Remove image"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => input.current?.click()}
            className="flex cursor-pointer flex-col items-center gap-2 p-6 text-sm text-[var(--ink-muted)]"
          >
            {busy ? <Loader2 className="h-6 w-6 animate-spin" /> : <ImagePlus className="h-6 w-6" />}
            <span>{busy ? 'Uploading…' : 'Click or drop an image'}</span>
          </button>
        )}
        {busy && value && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <Loader2 className="h-6 w-6 animate-spin text-white" />
          </div>
        )}
      </div>
      {value && (
        <button
          type="button"
          onClick={() => input.current?.click()}
          className="mt-2 cursor-pointer text-xs font-semibold text-[var(--accent)] hover:underline"
        >
          Replace image
        </button>
      )}
      <input
        ref={input}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => {
          handle(e.target.files?.[0]);
          e.target.value = '';
        }}
      />
    </Field>
  );
};

export interface Toast {
  kind: 'ok' | 'err';
  text: string;
}

export const ToastBar: React.FC<{ toast: Toast | null }> = ({ toast }) =>
  toast ? (
    <div
      role="status"
      className={`fixed bottom-6 left-1/2 z-[70] -translate-x-1/2 rounded-full px-5 py-2.5 text-sm font-semibold shadow-xl ${
        toast.kind === 'ok' ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'
      }`}
    >
      {toast.text}
    </div>
  ) : null;
