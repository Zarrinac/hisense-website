import { NextResponse } from 'next/server';
import {
  createAdminSession,
  getAdminAuthConfig,
  setAdminSessionCookie,
  verifyAdminCredentials,
} from '@/lib/admin/auth';
import { createAdminRedirectUrl } from '@/lib/admin/url';

function normalizeNextPath(value: FormDataEntryValue | null) {
  const nextPath = typeof value === 'string' ? value : '';

  if (!nextPath || !nextPath.startsWith('/admin') || nextPath.startsWith('/admin/login')) {
    return '/admin';
  }

  return nextPath;
}

function loginRedirect(request: Request, error: 'invalid' | 'config', nextPath: string) {
  const url = createAdminRedirectUrl('/admin/login', request);
  url.searchParams.set('error', error);
  url.searchParams.set('next', nextPath);

  return NextResponse.redirect(url, { status: 303 });
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const username = formData.get('username');
  const password = formData.get('password');
  const nextPath = normalizeNextPath(formData.get('next'));

  if (!getAdminAuthConfig()) {
    return loginRedirect(request, 'config', nextPath);
  }

  if (typeof username !== 'string' || typeof password !== 'string') {
    return loginRedirect(request, 'invalid', nextPath);
  }

  const isValid = await verifyAdminCredentials(username, password);

  if (!isValid) {
    return loginRedirect(request, 'invalid', nextPath);
  }

  const token = await createAdminSession(username);

  if (!token) {
    return loginRedirect(request, 'config', nextPath);
  }

  const response = NextResponse.redirect(createAdminRedirectUrl(nextPath, request), {
    status: 303,
  });
  setAdminSessionCookie(response, token);

  return response;
}
