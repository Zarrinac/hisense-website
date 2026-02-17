import { redirect } from 'next/navigation';

type PageParams = {
  locale?: string;
};

type PageProps = {
  params: PageParams | Promise<PageParams>;
};

export default async function RacRoutePage({ params }: PageProps) {
  const resolved = await params;
  const locale = resolved?.locale ?? 'fa';
  redirect(`/${locale}/products/rac`);
}
