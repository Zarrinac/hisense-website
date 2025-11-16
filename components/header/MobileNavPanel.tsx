import Image from 'next/image';
import CloseIcon from '@mui/icons-material/Close';
import { HiChevronRight, HiChevronLeft } from 'react-icons/hi2';
import Logo from '@/public/icons/hisense-logo-full.svg';
import { NavKey, SubMenuItem } from './navigationData';

type LabeledNavItem = {
  key: NavKey;
  href: string;
  label: string;
};

type MobileNavPanelProps = {
  isOpen: boolean;
  onClose: () => void;
  locale: string;
  iconButtonClass: string;
  allNavItems: LabeledNavItem[];
  mobileActiveMenuKey: NavKey | null;
  onMobileMenuKeyChange: (key: NavKey | null) => void;
  mobileActiveNavLabel: string;
  mobileActiveSubMenuItems: SubMenuItem[] | null;
  searchLabel: string;
  closeLabel: string;
};

export default function MobileNavPanel({
  isOpen,
  onClose,
  locale,
  iconButtonClass,
  allNavItems,
  mobileActiveMenuKey,
  onMobileMenuKeyChange,
  mobileActiveNavLabel,
  mobileActiveSubMenuItems,
  searchLabel,
  closeLabel,
}: MobileNavPanelProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="absolute inset-0 bg-(--overlay-color)" onClick={onClose} aria-hidden="true" />
      <aside className="relative ml-auto flex h-full w-full max-w-md flex-col bg-(--surface-color) p-6 shadow-(--panel-shadow)">
        <div className="flex items-start justify-between">
          <Image alt="Hisense Logo" src={Logo} className="h-5 w-[92px]" priority />
          <button
            type="button"
            className={iconButtonClass}
            onClick={onClose}
            aria-label={closeLabel}
            title={closeLabel}
          >
            <CloseIcon fontSize="small" />
          </button>
        </div>

        <div className="relative mt-10 flex-1 overflow-hidden">
          <nav
            className={`absolute inset-0 flex flex-col gap-6 overflow-y-auto text-lg font-semibold text-(--default-black-font) transition-transform duration-300 ease-out ${
              mobileActiveMenuKey ? '-translate-x-full' : 'translate-x-0'
            }`}
            aria-hidden={mobileActiveMenuKey ? 'true' : 'false'}
          >
            {allNavItems.map((item) => (
              <button
                type="button"
                key={item.key}
                className="flex items-center justify-between border-b border-(--border-color) pb-4 text-left transition-colors hover:text-(--brand-color)"
                onClick={() => onMobileMenuKeyChange(item.key)}
              >
                <span className="text-(--default-black-font)">{item.label}</span>
                {locale === 'fa' ? <HiChevronLeft /> : <HiChevronRight />}
              </button>
            ))}
          </nav>

          <div
            className={`absolute inset-0 flex h-full flex-col overflow-y-auto transition-transform duration-300 ease-out ${
              mobileActiveMenuKey ? 'translate-x-0' : 'translate-x-full'
            }`}
            aria-hidden={mobileActiveMenuKey ? 'false' : 'true'}
          >
            <button
              type="button"
              className="flex items-center gap-2 text-left text-lg font-semibold text-(--text-muted-color)"
              onClick={() => onMobileMenuKeyChange(null)}
            >
              {locale === 'fa' ? <HiChevronRight /> : <HiChevronLeft />}
              <span className="text-(--default-black-font)">{mobileActiveNavLabel}</span>
            </button>

            <div className="mt-6 flex flex-col gap-4 pb-10">
              {mobileActiveSubMenuItems?.map((subItem) => (
                <div
                  key={subItem.title}
                  className="rounded-2xl border border-(--border-color) bg-(--surface-muted-color) p-4"
                >
                  <p className="text-base font-semibold text-(--default-black-font)">
                    {subItem.title}
                  </p>
                  <p className="mt-1 text-sm text-(--text-muted-color)">{subItem.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-auto pt-10">
          <button
            type="button"
            className="flex w-full items-center justify-center rounded-full border border-(--border-color) px-4 py-3 text-sm font-semibold text-(--text-muted-color) transition-colors hover:border-(--brand-color) hover:text-(--brand-color)"
          >
            {searchLabel}
          </button>
        </div>
      </aside>
    </div>
  );
}
