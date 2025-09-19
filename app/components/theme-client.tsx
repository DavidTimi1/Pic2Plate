'use client';

import { useEffect, useState } from 'react';
import { changeTheme, getTheme, initTheme } from '@/app/lib/theme';

export default function ThemeClient() {
  useEffect(() => {
    initTheme();
  }, []);

  return null; // this component only runs the effect
}

export function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>(getTheme());

  useEffect(() => {
    const handleStorageChange = () => {
      setTheme(getTheme());
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const change = () => {
    changeTheme();
    setTheme(getTheme());
  };

  return {theme, change};
}