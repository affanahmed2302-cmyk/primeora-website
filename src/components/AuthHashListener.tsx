'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthHashListener() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const hash = window.location.hash;
    if (hash && (hash.includes('access_token=') || hash.includes('type=recovery'))) {
      if (hash.includes('type=recovery')) {
        if (!window.location.pathname.startsWith('/admin/reset-password')) {
          router.replace(`/admin/reset-password${hash}`);
        }
      } else {
        if (
          !window.location.pathname.startsWith('/admin/update-password') &&
          !window.location.pathname.startsWith('/admin/reset-password')
        ) {
          router.replace(`/admin/update-password${hash}`);
        }
      }
    }
  }, [router]);

  return null;
}
