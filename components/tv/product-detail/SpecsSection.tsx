// Simple specs list; labels switch between FA/EN.
type SpecsSectionProps = {
  items: string[];
  lang: 'fa' | 'en';
};

const SpecsSection = ({ items, lang }: SpecsSectionProps) => (
  <div className="w-full mx-auto space-y-12 max-w-360">
    <div className="space-y-4 rounded-3xl border border-(--border-color) bg-(--surface-color) p-6 shadow-sm md:p-8">
      <h2 className="text-2xl font-bold text-center sm:text-3xl">
        {lang === 'fa' ? 'مشخصات فنی' : 'Specifications'}
      </h2>
      <ul className="grid gap-3 text-sm text-(--default-black-font) sm:grid-cols-2 md:text-base">
        {items.map((item, idx) => (
          <li
            key={idx}
            className="flex items-start gap-2 rounded-xl bg-(--surface-color-2) px-3 py-2"
          >
            <span aria-hidden className="mt-2 h-2 w-2 rounded-full bg-(--brand-color)" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default SpecsSection;
