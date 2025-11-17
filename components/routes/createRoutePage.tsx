import { getTranslations } from 'next-intl/server';
import RouteHero from '@/components/routes/RouteHero';

export default function createRoutePage(routeKey: string) {
  return async function RoutePage() {
    const t = await getTranslations('Routes');
    return (
      <RouteHero
        eyebrow={t(`${routeKey}.eyebrow`)}
        title={t(`${routeKey}.title`)}
        description={t(`${routeKey}.description`)}
      />
    );
  };
}
