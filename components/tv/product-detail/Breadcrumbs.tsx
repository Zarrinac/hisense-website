import type { FC } from 'react';

export type BreadcrumbItem = {
  label: string;
  href: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  lang: 'fa' | 'en';
  className?: string;
  separatorClassName?: string;
};

const Breadcrumbs: FC<BreadcrumbsProps> = ({
  items,
  lang,
  className = '',
  separatorClassName = '',
}) => (
  <nav
    aria-label={lang === 'fa' ? 'مسیر راهنما' : 'Breadcrumb'}
    className={className}
    itemScope
    itemType="https://schema.org/BreadcrumbList"
  >
    <ol className="flex flex-wrap items-center gap-2">
      {items.map((item, idx) => (
        <li
          key={item.href}
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
          className="flex items-center gap-2"
        >
          <a
            href={item.href}
            itemProp="item"
            className="hover:text-(--brand-color) transition-colors"
          >
            <span itemProp="name">{item.label}</span>
          </a>
          <meta itemProp="position" content={`${idx + 1}`} />
          {idx < items.length - 1 && (
            <span aria-hidden className={separatorClassName || undefined}>
              /
            </span>
          )}
        </li>
      ))}
    </ol>
  </nav>
);

export default Breadcrumbs;
