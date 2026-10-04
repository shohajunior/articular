import React, { useEffect, useRef } from 'react';
import { X, ZoomIn } from 'lucide-react';

export interface LightboxItem {
  src: string;
  alt: string;
  title: string;
  tag?: string;
}

interface LightboxModalProps {
  item: LightboxItem | null;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({ item, onClose }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (item) {
      if (!dialog.open) {
        dialog.showModal();
      }
      document.body.style.overflow = 'hidden';
    } else {
      if (dialog.open) {
        dialog.close();
      }
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [item]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleDialogClick = (event: MouseEvent) => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      const isDialogContent =
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width;

      if (!isDialogContent) {
        onClose();
      }
    };

    const handleCancel = (e: Event) => {
      e.preventDefault();
      onClose();
    };

    dialog.addEventListener('click', handleDialogClick);
    dialog.addEventListener('cancel', handleCancel);

    return () => {
      dialog.removeEventListener('click', handleDialogClick);
      dialog.removeEventListener('cancel', handleCancel);
    };
  }, [onClose]);

  if (!item) return null;

  return (
    <dialog
      ref={dialogRef}
      aria-label={item.title}
      className="m-auto w-[92%] max-w-4xl rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-0 text-[var(--ink)] shadow-2xl backdrop:bg-black/75 backdrop:backdrop-blur-md"
    >
      <div className="flex flex-col overflow-hidden">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between border-b border-[var(--line)] px-6 py-3.5">
          <div className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent-tint)] text-[var(--accent)]">
              <ZoomIn className="h-3.5 w-3.5" />
            </span>
            <div>
              <div className="text-sm font-bold text-[var(--ink)]">{item.title}</div>
              {item.tag && (
                <div className="text-[11px] text-[var(--ink-muted)]">{item.tag}</div>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--line)] text-[var(--ink-muted)] transition-colors hover:border-[var(--line-strong)] hover:text-[var(--ink)]"
            aria-label="Close image preview"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Big Image View */}
        <div className="relative max-h-[75vh] overflow-hidden bg-black/5 p-2">
          <img
            src={item.src}
            alt={item.alt}
            className="mx-auto max-h-[72vh] w-auto rounded-2xl object-contain shadow-sm"
          />
        </div>

        {/* Bottom Details Bar */}
        <div className="flex items-center justify-between border-t border-[var(--line)] bg-[var(--bg)] px-6 py-3 text-xs text-[var(--ink-dim)]">
          <span>ArticularUZ  Official Archive</span>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-[var(--accent)] px-4 py-1.5 text-xs font-semibold text-[var(--accent-contrast)] transition-colors hover:bg-[var(--accent-hover)]"
          >
            Close [Esc]
          </button>
        </div>
      </div>
    </dialog>
  );
};
