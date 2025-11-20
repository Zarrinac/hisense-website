'use client';

import { useEffect, useRef } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

type SearchOverlayProps = {
  isOpen: boolean;
  onClose: () => void;
  placeholder: string;
  locale: string;
  closeLabel: string;
};

export default function SearchOverlay({
  isOpen,
  onClose,
  placeholder,
  locale,
  closeLabel,
}: SearchOverlayProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const isRTL = locale === 'fa';

  return (
    <div className="fixed inset-x-0 top-0 z-60 flex justify-center px-4 pt-4 sm:px-6">
      <div className="absolute inset-0 bg-(--overlay-color)" onClick={onClose} aria-hidden="true" />
      <div className="relative w-full max-w-full lg:max-w-5xl">
        <div className="relative flex items-center gap-3 rounded-full bg-white px-4 py-3 shadow-2xl ring-1 ring-(--border-color)">
          <SearchIcon className="text-(--text-muted-color)" fontSize="small" />
          <input
            ref={inputRef}
            type="search"
            dir={isRTL ? 'rtl' : 'ltr'}
            placeholder={placeholder}
            className="h-10 flex-1 border-0 bg-transparent text-base text-(--default-black-font) outline-none placeholder-(--text-muted-color)"
          />
          <button
            type="button"
            onClick={onClose}
            className="ml-auto inline-flex h-8 w-8 items-center justify-center rounded-full bg-(--brand-color) text-white transition hover:bg-(--brand-color-dark) focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-(--brand-color)"
            aria-label={closeLabel}
            title={closeLabel}
          >
            <CloseIcon fontSize="small" />
          </button>
        </div>
      </div>
    </div>
  );
}
