import { getLocale, getTranslations } from 'next-intl/server';
import RouteHero from '@/components/routes/RouteHero';
import UnderConstruction, { type UnderConstructionAction } from '@/components/UnderConstruction';

// Factory that produces a locale-aware route page with optional under-construction content.

type RoutePageOptions = {
  underConstruction?: boolean;
  actions?: UnderConstructionAction[];
};

export default function createRoutePage(routeKey: string, options?: RoutePageOptions) {
  return async function RoutePage() {
    const [routeTranslations, underConstructionTranslations] = await Promise.all([
      getTranslations('Routes'),
      getTranslations('UnderConstruction'),
    ]);
    const locale = (await getLocale()) ?? 'fa';
    const statusItems = [
      underConstructionTranslations('status.content'),
      underConstructionTranslations('status.links'),
    ];
    const defaultActions: UnderConstructionAction[] = [
      { label: underConstructionTranslations('actions.backHome'), href: `/${locale}` },
      {
        label: underConstructionTranslations('actions.viewProducts'),
        href: `/${locale}/tv-hisense`,
      },
      {
        label: underConstructionTranslations('actions.contact'),
        href: 'mailto:info@hisense-ir.com',
      },
    ];
    const actions = options?.actions ?? defaultActions;
    const showUnderConstruction = options?.underConstruction ?? true;
    return (
      <>
        <RouteHero
          eyebrow={routeTranslations(`${routeKey}.eyebrow`)}
          title={routeTranslations(`${routeKey}.title`)}
          description={routeTranslations(`${routeKey}.description`)}
        />
        {showUnderConstruction && (
          <div className="py-10 sm:py-14 lg:py-16">
            <UnderConstruction
              eyebrow={underConstructionTranslations('eyebrow')}
              title={underConstructionTranslations('title')}
              description={underConstructionTranslations('description')}
              supportingText={underConstructionTranslations('supporting')}
              locale={locale}
              statusItems={statusItems}
              actions={actions}
            />
          </div>
        )}
      </>
    );
  };
}
