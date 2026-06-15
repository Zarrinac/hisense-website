'use client';

// Quick-jump pill that smooth-scrolls the page to the specs section.
// Specs live at the bottom of the detail page; this surfaces them near the
// title so users don't have to scroll the whole page to reach them.
import { HiArrowDown } from 'react-icons/hi2';

type SpecsJumpButtonProps = {
  targetId: string;
  lang: 'fa' | 'en';
};

// Offset (px) so the target isn't hidden behind the sticky desktop header.
const HEADER_OFFSET = 96;
// Duration scales with distance (ms per px) so long pages don't whip past at a
// high peak speed — clamped so short/long jumps both feel gentle.
const MS_PER_PX = 0.7;
const MIN_DURATION = 1400;
const MAX_DURATION = 5000;

// easeInOutCubic — slow start/end, smooth middle.
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

const SpecsJumpButton = ({ targetId, lang }: SpecsJumpButtonProps) => {
  const handleClick = () => {
    const target = document.getElementById(targetId);
    if (!target) return;

    // Live destination — recomputed each frame so lazy-loaded media above the
    // specs (which shifts layout mid-scroll) doesn't leave us short of the target.
    const destinationNow = () =>
      target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      window.scrollTo(0, destinationNow());
      return;
    }

    const start = window.scrollY;
    const duration = Math.min(
      Math.max(Math.abs(destinationNow() - start) * MS_PER_PX, MIN_DURATION),
      MAX_DURATION,
    );
    let startTime: number | null = null;

    const step = (now: number) => {
      startTime ??= now;
      const progress = Math.min((now - startTime) / duration, 1);
      window.scrollTo(0, start + (destinationNow() - start) * easeInOutCubic(progress));
      if (progress < 1) window.requestAnimationFrame(step);
    };

    window.requestAnimationFrame(step);
  };

  return (
    <div className="flex justify-center w-full px-4 mx-auto max-w-360">
      <button
        type="button"
        onClick={handleClick}
        className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white transition rounded-full shadow-sm hover:opacity-90 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-(--brand-color) sm:text-base"
        style={{ backgroundImage: 'var(--brand-gradient)' }}
      >
        <span>{lang === 'fa' ? 'مشاهده مشخصات فنی' : 'View specifications'}</span>
        <HiArrowDown aria-hidden className="w-4 h-4" />
      </button>
    </div>
  );
};

export default SpecsJumpButton;
