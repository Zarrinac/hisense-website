'use client';

// Full-screen search overlay; currently captures input without issuing a query.
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
    <div
      className="fixed inset-0 z-60 flex items-start justify-center bg-(--overlay-color)"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative w-full lg:w-1/2 flex justify-center bg-(--brand-color)">
        <div className="flex w-full items-center gap-3 px-2 py-2 shadow-2xl md:px-4 md:py-3">
          <div className="flex flex-1 items-center gap-3 rounded-full bg-white px-2 py-1 md:px-3 md:py-2 shadow-sm ring-1 ring-(--border-color)">
            <SearchIcon className="text-(--text-muted-color)" fontSize="small" />
            <input
              ref={inputRef}
              type="search"
              dir={isRTL ? 'rtl' : 'ltr'}
              placeholder={placeholder}
              className="h-10 flex-1 border-0 bg-transparent text-sm md:text-base text-(--default-black-font) outline-none placeholder-(--text-muted-color)"
            />
            <button
              type="button"
              onClick={onClose}
              className="ml-auto inline-flex h-6 w-6 md:h-8 md:w-8 items-center justify-center rounded-full bg-(--brand-color) text-white transition hover:bg-(--brand-color) focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-(--brand-color)"
              aria-label={closeLabel}
              title={closeLabel}
            >
              <CloseIcon fontSize="small" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
