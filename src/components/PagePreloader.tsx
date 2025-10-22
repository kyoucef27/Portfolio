"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';


const AboutPage = dynamic(() => import('../app/about/page'), { 
  ssr: false,
  loading: () => null 
});

const ProjectsPage = dynamic(() => import('../app/projects/page'), { 
  ssr: false,
  loading: () => null 
});

const ContactPage = dynamic(() => import('../app/contact/page'), { 
  ssr: false,
  loading: () => null 
});

const PAGES_TO_PRELOAD = [
  { path: '/about', component: AboutPage, name: 'About' },
  { path: '/projects', component: ProjectsPage, name: 'Projects' },
  { path: '/contact', component: ContactPage, name: 'Contact' },
];

export default function PagePreloader() {
  const [preloadedPages, setPreloadedPages] = useState<Set<string>>(new Set());
  const [isPreloading, setIsPreloading] = useState(false);
  const [currentlyLoading, setCurrentlyLoading] = useState<string>('');
  const router = useRouter();

  useEffect(() => {

    const preloadTimer = setTimeout(() => {
      startPreloading();
    }, 200);
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
        
        
      } catch (error) {
        
      }
    }
    
    setIsPreloading(false);
    setCurrentlyLoading('');
  };

  return (
    <>
      <div className="fixed top-[-10000px] left-[-10000px] opacity-0 pointer-events-none select-none" aria-hidden="true" style={{ zIndex: -1000 }}>
        {PAGES_TO_PRELOAD.map((page) => (
          <div key={page.path} className="w-0 h-0 overflow-hidden">
            {preloadedPages.has(page.path) && (
              <div style={{ transform: 'scale(0.01)' }}>
                <page.component />
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}