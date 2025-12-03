import Breadcrumbs, { type BreadcrumbItem } from './Breadcrumbs';

type MobileHeaderProps = {
  breadcrumbItems: BreadcrumbItem[];
  lang: 'fa' | 'en';
  seriesDisplay: string;
  copyName: string;
  availableSizes: string[];
};

const MobileHeader = ({
  breadcrumbItems,
  lang,
  seriesDisplay,
  copyName,
  availableSizes,
}: MobileHeaderProps) => (
  <div
    className={`sm:hidden w-full mx-auto max-w-360 px-4 space-y-3 ${
      lang === 'fa' ? 'text-right' : 'text-left'
    }`}
  >
    <Breadcrumbs
      items={breadcrumbItems}
      lang={lang}
      className="text-xs font-semibold text-(--text-muted-color)"
      separatorClassName="text-(--border-color)"
    />
    <div className="space-y-2">
      <h1 className="text-2xl font-black text-(--default-black-font)">
        {seriesDisplay || copyName}
      </h1>
      {availableSizes.length > 0 && (
        <ul className="flex flex-wrap items-center gap-3 text-xs sm:text-base text-(--text-muted-color)">
          {availableSizes.map((size, idx) => (
            <li key={`${size}-${idx}`} className="flex items-center gap-2">
              <span className="inline-flex h-2 w-2 items-center justify-center rounded-full border border-(--brand-color)" />
              <span className="font-semibold text-(--default-black-font)">{size}</span>
              {idx < availableSizes.length - 1 && (
                <span aria-hidden className="text-(--border-color)">
                  |
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
);

export default MobileHeader;
