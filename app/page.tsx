import { redirect } from 'next/navigation';
import { routing } from '@/i18n/routing';

// Redirect root requests to the default locale homepage.

export default function IndexPage() {
  redirect(`/${routing.defaultLocale}`);
}
