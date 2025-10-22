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
    console.log('🚀 Starting page preloading for instant navigation...');
    
    for (const page of PAGES_TO_PRELOAD) {
      try {
        setCurrentlyLoading(page.name);
        router.prefetch(page.path);
        await new Promise(resolve => setTimeout(resolve, 300));
        setPreloadedPages(prev => new Set([...prev, page.path]));
        console.log(`${page.name} page preloaded`);
      } catch (error) {
        console.log(` Failed to preload ${page.path}:`, error);
      }
    }
    
    setIsPreloading(false);
    setCurrentlyLoading('');
    console.log('🎉 All pages preloaded! Navigation will now be instant.');
  };

 
  if (typeof window === 'undefined') {
    return null;
  }

  return (
    <>      
      
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-2 left-2 z-[90] bg-black/90 text-white text-xs px-4 py-2 rounded-xl backdrop-blur-sm shadow-lg border border-gray-700">
          {isPreloading ? (
            <div className="flex items-center space-x-3">
              <div className="flex space-x-1">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
              <span>Preloading {currentlyLoading}... ({preloadedPages.size}/{PAGES_TO_PRELOAD.length})</span>
            </div>
          ) : preloadedPages.size === PAGES_TO_PRELOAD.length ? (
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>All pages ready ⚡</span>
            </div>
          ) : null}
        </div>
      )}
    </>
  );
}