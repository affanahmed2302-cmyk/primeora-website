'use client';

import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className = '' }: ThemeToggleProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'dark' : 'light');
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);

    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
      try {
        localStorage.setItem('primeora-theme', 'dark');
      } catch {
        // ignore storage error
      }
    } else {
      document.documentElement.classList.remove('dark');
      try {
        localStorage.setItem('primeora-theme', 'light');
      } catch {
        // ignore storage error
      }
    }
  };

  // Prevent hydration mismatch while preserving layout space
  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        className={`p-2 rounded-lg border border-[#E6DFD5] dark:border-[#2C2926] bg-[#F7F4EE] dark:bg-[#1A1917] text-[#6E6862] dark:text-[#A8A29A] transition-colors ${className}`}
      >
        <span className="w-4 h-4 block" />
      </button>
    );
  }

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to Day mode' : 'Switch to Night mode'}
      title={isDark ? 'Switch to Day mode' : 'Switch to Night mode'}
      className={`inline-flex items-center justify-center p-2 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#C25E38] ${
        isDark
          ? 'bg-[#1A1917] hover:bg-[#242220] border-[#2C2926] text-amber-400 hover:text-amber-300'
          : 'bg-[#F7F4EE] hover:bg-[#EDE8DF] border-[#E6DFD5] text-[#191817] hover:text-[#C25E38]'
      } ${className}`}
    >
      {isDark ? (
        <Sun className="w-4 h-4 transition-transform hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 transition-transform hover:-rotate-12" />
      )}
      <span className="sr-only">
        {isDark ? 'Activate Day mode' : 'Activate Night mode'}
      </span>
    </button>
  );
}
