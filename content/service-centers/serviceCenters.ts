import type { Locale } from '@/i18n/routing';

export type ServiceKind = 'tv' | 'ha' | 'rac' | 'cac' | 'vrf';

export type LocalizedText = Record<Locale, string>;

export type ServiceCenter = {
  id: string;
  provinceId: string;
  cityId: string;
  serviceKind: ServiceKind;
  representativeName: LocalizedText;
  representativeCode: string;
  primaryPhone: string;
  mobilePhone: string;
  address: LocalizedText;
};

export const serviceKindLabels: Record<ServiceKind, LocalizedText> = {
  tv: {
    fa: 'تلویزیون (TV)',
    en: 'Television (TV)',
  },
  ha: {
    fa: 'لوازم خانگی (HA)',
    en: 'Home appliances (HA)',
  },
  rac: {
    fa: 'کولرگازی خانگی (RAC)',
    en: 'Residential air conditioner (RAC)',
  },
  cac: {
    fa: 'کولرگازی صنعتی (CAC)',
    en: 'Commercial air conditioner (CAC)',
  },
  vrf: {
    fa: 'کولرگازی صنعتی (VRF)',
    en: 'Commercial air conditioner (VRF)',
  },
};

// Add approved after-sales representative rows here when the official data is ready.
export const serviceCenters: ServiceCenter[] = [];
