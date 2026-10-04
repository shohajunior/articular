import React, { useEffect, useRef } from 'react';
import { legalContent } from '../../data/legal';
import { X, ShieldCheck, FileText } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  docKey: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ isOpen, docKey, onClose }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && docKey) {
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
  }, [isOpen, docKey]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    // Fallback light-dismiss for browsers without native closedby support
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

  if (!isOpen || !docKey) return null;

  const content = legalContent[docKey];

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="legal-modal-title"
      className="m-auto w-[92%] max-w-2xl rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-0 text-[var(--ink)] shadow-2xl backdrop:bg-black/50 backdrop:backdrop-blur-sm"
    >
      <div className="flex max-h-[85vh] flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--line)] px-6 py-4 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--accent-tint)] text-[var(--accent)]">
              {docKey === 'privacy' ? (
                <ShieldCheck className="h-5 w-5" />
              ) : (
                <FileText className="h-5 w-5" />
              )}
            </div>
            <div>
              <h2 id="legal-modal-title" className="text-base font-bold text-[var(--ink)] sm:text-lg">
                {content.title}
              </h2>
              <div className="text-xs text-[var(--ink-muted)]">
                Last updated: {content.updated}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--line)] text-[var(--ink-muted)] transition-colors hover:border-[var(--line-strong)] hover:text-[var(--ink)]"
            aria-label="Close dialog"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-8">
          <div className="mb-6 rounded-xl border border-[var(--line)] bg-[var(--bg)] p-3.5 text-xs text-[var(--ink-muted)]">
            {content.subtitle}
          </div>

          <div className="space-y-6">
            {content.sections.map((section, idx) => (
              <div key={idx} className="space-y-1.5">
                <h3 className="text-sm font-bold text-[var(--ink)]">
                  {section.heading}
                </h3>
                <p className="text-xs leading-relaxed text-[var(--ink-muted)] sm:text-sm">
                  {section.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-[var(--line)] bg-[var(--bg)] px-6 py-3.5 sm:px-8">
          <span className="text-[11px] text-[var(--ink-dim)]">
            Republic of Uzbekistan  Official Tournament
          </span>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-[var(--accent)] px-5 py-2 text-xs font-semibold text-[var(--accent-contrast)] transition-colors hover:bg-[var(--accent-hover)]"
          >
            I Understand
          </button>
        </div>
      </div>
    </dialog>
  );
};
