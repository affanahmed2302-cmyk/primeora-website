'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthHashListener() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const hash = window.location.hash;
    if (hash && (hash.includes('access_token=') || hash.includes('type=recovery'))) {
      if (!window.location.pathname.startsWith('/admin/update-password')) {
        router.replace(`/admin/update-password${hash}`);
      }
    }
  }, [router]);

  return null;
}
