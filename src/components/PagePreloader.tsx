"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const PAGES_TO_PRELOAD = [
  { path: '/about', name: 'About' },
  { path: '/projects', name: 'Projects' },
  { path: '/contact', name: 'Contact' },
];

export default function PagePreloader() {
  const [preloadedPages, setPreloadedPages] = useState<Set<string>>(new Set());
  const [isPreloading, setIsPreloading] = useState(false);
  const [currentlyLoading, setCurrentlyLoading] = useState<string>('');
  const router = useRouter();

  useEffect(() => {

    if (typeof window === 'undefined') return;
    
    const preloadTimer = setTimeout(() => {
      startPreloading();
    }, 2000);
    return () => clearTimeout(preloadTimer);
  }, []);

  const startPreloading = async () => {
    setIsPreloading(true);
   
    
    for (const page of PAGES_TO_PRELOAD) {
      try {
        setCurrentlyLoading(page.name);
        router.prefetch(page.path);
        await new Promise(resolve => setTimeout(resolve, 300));
        setPreloadedPages(prev => new Set([...prev, page.path]));
      } catch (error) {
        console.log(` Failed to preload ${page.path}:`, error);
      }
    }
    
    setIsPreloading(false);
    setCurrentlyLoading('');
    
  };

 
  if (typeof window === 'undefined') {
    return null;
  }

  
}