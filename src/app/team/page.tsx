import { redirect } from 'next/navigation';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Founding Partners | Primeora Solutions',
  description: 'Direct senior engineering and strategy execution from Primeora Solutions founding partners.',
  alternates: {
    canonical: 'https://primeora-solutions.netlify.app/founders',
  },
};

export default function TeamPage() {
  redirect('/founders');
}
