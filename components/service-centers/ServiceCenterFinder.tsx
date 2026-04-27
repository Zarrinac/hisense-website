'use client';

import { useMemo, useState } from 'react';
import type { Locale } from '@/i18n/routing';
import type { ServiceCenter, ServiceKind } from '@/content/service-centers/serviceCenters';
import { serviceKindLabels } from '@/content/service-centers/serviceCenters';

type LocationOption = {
  id: string;
  label: string;
  cities: Array<{
    id: string;
    label: string;
  }>;
};

type ServiceCenterFinderCopy = {
  provinceLabel: string;
  cityLabel: string;
  serviceKindLabel: string;
  allCities: string;
  allServiceKinds: string;
  provincePlaceholder: string;
  cityPlaceholder: string;
  serviceKindPlaceholder: string;
  submitLabel: string;
  resetLabel: string;
  resultCount: string;
  emptyTitle: string;
  emptyDescription: string;
  noDataTitle: string;
  noDataDescription: string;
  headers: {
    province: string;
    city: string;
    serviceKind: string;
    representativeName: string;
    representativeCode: string;
    primaryPhone: string;
    mobilePhone: string;
    address: string;
  };
};

type ServiceCenterFinderProps = {
  locale: Locale;
  centers: ServiceCenter[];
  locations: LocationOption[];
  copy: ServiceCenterFinderCopy;
};

const SERVICE_KIND_ORDER: ServiceKind[] = ['tv', 'ha', 'rac', 'cac', 'vrf'];

function formatCount(template: string, count: number, locale: Locale) {
  const numberLocale = locale === 'fa' ? 'fa-IR' : 'en-US';

  return template.replace('{count}', new Intl.NumberFormat(numberLocale).format(count));
}

export default function ServiceCenterFinder({
  locale,
  centers,
  locations,
  copy,
}: ServiceCenterFinderProps) {
  const [draftProvinceId, setDraftProvinceId] = useState('');
  const [draftCityId, setDraftCityId] = useState('');
  const [draftServiceKind, setDraftServiceKind] = useState<ServiceKind | ''>('');
  const [appliedProvinceId, setAppliedProvinceId] = useState('');
  const [appliedCityId, setAppliedCityId] = useState('');
  const [appliedServiceKind, setAppliedServiceKind] = useState<ServiceKind | ''>('');
  const isRTL = locale === 'fa';

  const cityOptions = useMemo(() => {
    return locations.find((location) => location.id === draftProvinceId)?.cities ?? [];
  }, [draftProvinceId, locations]);

  const filteredCenters = useMemo(() => {
    return centers.filter((center) => {
      if (appliedProvinceId && center.provinceId !== appliedProvinceId) {
        return false;
      }

      if (appliedCityId && center.cityId !== appliedCityId) {
        return false;
      }

      if (appliedServiceKind && center.serviceKind !== appliedServiceKind) {
        return false;
      }

      return true;
    });
  }, [appliedCityId, appliedProvinceId, appliedServiceKind, centers]);

  const locationById = useMemo(() => {
    const map = new Map<string, LocationOption>();
    locations.forEach((location) => {
      map.set(location.id, location);
    });
    return map;
  }, [locations]);

  const cityLabelByKey = useMemo(() => {
    const map = new Map<string, string>();
    locations.forEach((location) => {
      location.cities.forEach((city) => {
        map.set(`${location.id}:${city.id}`, city.label);
      });
    });
    return map;
  }, [locations]);

  const hasAnyCenters = centers.length > 0;

  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="border border-(--border-color) bg-(--surface-color) p-5 shadow-lg sm:p-6">
        <div className="grid gap-4">
          <label className="grid gap-2 text-sm font-medium text-(--default-black-font)">
            <span>{copy.provinceLabel}</span>
            <select
              value={draftProvinceId}
              onChange={(event) => {
                setDraftProvinceId(event.target.value);
                setDraftCityId('');
              }}
              className="min-h-12 w-full rounded-lg border border-(--border-color) bg-(--surface-color) px-3 py-2 text-(--default-black-font) outline-none transition focus:border-(--brand-color)"
            >
              <option value="">{copy.provincePlaceholder}</option>
              {locations.map((location) => (
                <option key={location.id} value={location.id}>
                  {location.label}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2 text-sm font-medium text-(--default-black-font)">
            <span>{copy.cityLabel}</span>
            <select
              value={draftCityId}
              onChange={(event) => setDraftCityId(event.target.value)}
              disabled={!draftProvinceId}
              className="min-h-12 w-full rounded-lg border border-(--border-color) bg-(--surface-color) px-3 py-2 text-(--default-black-font) outline-none transition focus:border-(--brand-color) disabled:cursor-not-allowed disabled:opacity-60"
            >
              <option value="">{draftProvinceId ? copy.allCities : copy.cityPlaceholder}</option>
              {cityOptions.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.label}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2 text-sm font-medium text-(--default-black-font)">
            <span>{copy.serviceKindLabel}</span>
            <select
              value={draftServiceKind}
              onChange={(event) => setDraftServiceKind(event.target.value as ServiceKind | '')}
              className="min-h-12 w-full rounded-lg border border-(--border-color) bg-(--surface-color) px-3 py-2 text-(--default-black-font) outline-none transition focus:border-(--brand-color)"
            >
              <option value="">{copy.serviceKindPlaceholder}</option>
              <option value="">{copy.allServiceKinds}</option>
              {SERVICE_KIND_ORDER.map((kind) => (
                <option key={kind} value={kind}>
                  {serviceKindLabels[kind][locale]}
                </option>
              ))}
            </select>
          </label>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            <button
              type="button"
              onClick={() => {
                setAppliedProvinceId(draftProvinceId);
                setAppliedCityId(draftCityId);
                setAppliedServiceKind(draftServiceKind);
              }}
              className="rounded-lg bg-[#d7b44a] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#c29d31] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d7b44a]"
            >
              {copy.submitLabel}
            </button>
            <button
              type="button"
              onClick={() => {
                setDraftProvinceId('');
                setDraftCityId('');
                setDraftServiceKind('');
                setAppliedProvinceId('');
                setAppliedCityId('');
                setAppliedServiceKind('');
              }}
              className="rounded-lg border border-(--border-color) px-5 py-3 text-sm font-bold text-(--text-muted-color) transition hover:border-(--brand-color) hover:text-(--brand-color)"
            >
              {copy.resetLabel}
            </button>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between gap-3 text-sm text-(--text-muted-color)">
          <p>{formatCount(copy.resultCount, filteredCenters.length, locale)}</p>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="min-w-[62rem] w-full border-collapse text-center text-sm">
            <thead>
              <tr className="bg-[#d7b44a] text-white">
                <th className="border border-[#e6d28c] px-3 py-4 font-bold">
                  {copy.headers.province}
                </th>
                <th className="border border-[#e6d28c] px-3 py-4 font-bold">{copy.headers.city}</th>
                <th className="border border-[#e6d28c] px-3 py-4 font-bold">
                  {copy.headers.serviceKind}
                </th>
                <th className="border border-[#e6d28c] px-3 py-4 font-bold">
                  {copy.headers.representativeName}
                </th>
                <th className="border border-[#e6d28c] px-3 py-4 font-bold">
                  {copy.headers.representativeCode}
                </th>
                <th className="border border-[#e6d28c] px-3 py-4 font-bold">
                  {copy.headers.primaryPhone}
                </th>
                <th className="border border-[#e6d28c] px-3 py-4 font-bold">
                  {copy.headers.mobilePhone}
                </th>
                <th className="border border-[#e6d28c] px-3 py-4 font-bold">
                  {copy.headers.address}
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredCenters.map((center) => {
                const provinceLabel =
                  locationById.get(center.provinceId)?.label ?? center.provinceId;
                const cityLabel =
                  cityLabelByKey.get(`${center.provinceId}:${center.cityId}`) ?? center.cityId;

                return (
                  <tr
                    key={center.id}
                    className="odd:bg-(--surface-color) even:bg-(--surface-muted-color)"
                  >
                    <td className="border border-(--border-color) px-3 py-4">{provinceLabel}</td>
                    <td className="border border-(--border-color) px-3 py-4">{cityLabel}</td>
                    <td className="border border-(--border-color) px-3 py-4">
                      {serviceKindLabels[center.serviceKind][locale]}
                    </td>
                    <td className="border border-(--border-color) px-3 py-4">
                      {center.representativeName[locale]}
                    </td>
                    <td className="border border-(--border-color) px-3 py-4" dir="ltr">
                      {center.representativeCode}
                    </td>
                    <td className="border border-(--border-color) px-3 py-4" dir="ltr">
                      {center.primaryPhone}
                    </td>
                    <td className="border border-(--border-color) px-3 py-4" dir="ltr">
                      {center.mobilePhone}
                    </td>
                    <td className="border border-(--border-color) px-3 py-4 leading-7">
                      {center.address[locale]}
                    </td>
                  </tr>
                );
              })}
              {filteredCenters.length === 0 ? (
                <tr>
                  <td colSpan={8} className="border border-(--border-color) px-4 py-10 text-center">
                    <p className="text-base font-bold text-(--default-black-font)">
                      {hasAnyCenters ? copy.emptyTitle : copy.noDataTitle}
                    </p>
                    <p className="mx-auto mt-2 max-w-2xl text-sm leading-7 text-(--text-muted-color)">
                      {hasAnyCenters ? copy.emptyDescription : copy.noDataDescription}
                    </p>
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
