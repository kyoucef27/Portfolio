"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  Code2, 
  MessageCircle, 
  Github, 
  Linkedin, 
  Download,
  Terminal,
  Zap,
  Globe
} from 'lucide-react';

function HomePage() {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const texts = [
    'Full-Stack Developer',
    'Linux Enthusiast', 
    'TypeScript Expert',
    'Node.js Developer',
    'React Specialist'
  ];


  useEffect(() => {
    const text = texts[currentIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    
    const timer = setTimeout(() => {
      if (!isDeleting && currentText !== text) {
        setCurrentText(text.slice(0, currentText.length + 1));
      } else if (isDeleting && currentText !== '') {
        setCurrentText(text.slice(0, currentText.length - 1));
      } else if (!isDeleting && currentText === text) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % texts.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentText, currentIndex, isDeleting, texts]);

  const scrollToProjects = () => {

    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
  };

  const openChatbot = () => {

    const chatbotButton = document.querySelector('[class*="fixed bottom-5 right-5"] button');
    if (chatbotButton) {
      (chatbotButton as HTMLElement).click();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">

      {/* Background Elements - Optimized for mobile */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Code Snippets - Hidden on small screens for performance */}
        <div className="hidden sm:block absolute top-20 left-4 lg:left-10 opacity-10 animate-float">
          <code className="text-blue-400 text-xs sm:text-sm font-mono">
            const developer = "Youcef";
          </code>
        </div>
        <div className="hidden sm:block absolute top-40 right-4 lg:right-20 opacity-10 animate-float-delayed">
          <code className="text-green-400 text-xs sm:text-sm font-mono">
            npm install success
          </code>
        </div>
        <div className="hidden md:block absolute bottom-40 left-4 lg:left-20 opacity-10 animate-float">
          <code className="text-purple-400 text-xs sm:text-sm font-mono">
            git commit -m "awesome"
          </code>
        </div>
        
        {/* Gradient Orbs - Reduced size on mobile */}
        <div className="absolute top-1/4 -left-10 sm:-left-20 w-24 h-24 sm:w-40 sm:h-40 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-1/3 -right-10 sm:-right-20 w-24 h-24 sm:w-40 sm:h-40 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-24 h-24 sm:w-40 sm:h-40 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>


      {/* Main content - Mobile optimized */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 sm:py-0">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Profile Image - Responsive sizing */}
          <div className="mb-6 sm:mb-8 flex justify-center">
            <div className="relative">
              <div className="w-32 h-32 sm:w-48 sm:h-48 lg:w-60 lg:h-60 rounded-full overflow-hidden shadow-2xl border-2 sm:border-4 border-white/20 bg-gradient-to-br from-blue-400 to-purple-600">
                <img 
                  src="/20251019_231025.jpg" 
                  alt="Youcef - Full-Stack Developer" 
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Ping animation - smaller on mobile */}
              <div className="absolute inset-0 rounded-full border-1 sm:border-2 border-blue-400 animate-ping opacity-75"></div>
              {/* Status indicator - responsive */}
              <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-full border-2 sm:border-4 border-slate-900 flex items-center justify-center">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>


          {/* Heading - Mobile responsive typography */}
          <div className="mb-4 sm:mb-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 leading-tight">
              👋 Hi, I'm{' '}
              <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                Youcef
              </span>
            </h1>

            {/* Typewriter effect - responsive sizing */}
            <div className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-300 h-8 sm:h-10 md:h-12 flex items-center justify-center px-4">
              <span className="mr-2 hidden sm:inline">—</span>
              <span className="text-blue-400 text-center leading-tight">
                {currentText}
                <span className="animate-pulse">|</span>
              </span>
            </div>
          </div>


          {/* Description - Mobile optimized */}
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-2">
            I build{' '}
            <span className="text-blue-400 font-semibold">secure</span>,{' '}
            <span className="text-purple-400 font-semibold">scalable</span>, and{' '}
            <span className="text-green-400 font-semibold">intelligent</span>{' '}
            web applications using{' '}
            <span className="font-mono bg-slate-800 px-1 sm:px-2 py-1 rounded text-blue-300 text-sm sm:text-base">Next.js</span>,{' '}
            <span className="font-mono bg-slate-800 px-1 sm:px-2 py-1 rounded text-green-300 text-sm sm:text-base">Node.js</span>, and{' '}
            <span className="font-mono bg-slate-800 px-1 sm:px-2 py-1 rounded text-purple-300 text-sm sm:text-base">TypeScript</span>.
          </p>


          {/* Tech Stack - Mobile responsive */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-6 mb-8 sm:mb-12 opacity-70 px-4">
            <div className="flex items-center space-x-1 sm:space-x-2 text-blue-400">
              <Code2 size={16} className="sm:w-5 sm:h-5" />
              <span className="text-xs sm:text-sm font-mono">Next.js</span>
            </div>
            <div className="flex items-center space-x-1 sm:space-x-2 text-green-400">
              <Terminal size={16} className="sm:w-5 sm:h-5" />
              <span className="text-xs sm:text-sm font-mono">Node.js</span>
            </div>
            <div className="flex items-center space-x-1 sm:space-x-2 text-purple-400">
              <Zap size={16} className="sm:w-5 sm:h-5" />
              <span className="text-xs sm:text-sm font-mono">TypeScript</span>
            </div>
            <div className="flex items-center space-x-1 sm:space-x-2 text-orange-400">
              <Globe size={16} className="sm:w-5 sm:h-5" />
              <span className="text-xs sm:text-sm font-mono">Linux</span>
            </div>
          </div>


          {/* CTA Buttons - Mobile optimized with better touch targets */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-8 sm:mb-12 px-4">
            <Link
              href="/projects"
              className="w-full sm:w-auto group bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-6 sm:px-8 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl flex items-center justify-center space-x-3 min-h-[56px] touch-manipulation"
            >
              <Code2 size={20} />
              <span>View Projects</span>
              <ArrowRight 
                size={20} 
                className="group-hover:translate-x-1 transition-transform duration-300" 
              />
            </Link>

            <button
              onClick={openChatbot}
              className="w-full sm:w-auto group bg-slate-800 hover:bg-slate-700 text-white font-semibold py-4 px-6 sm:px-8 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-xl border border-slate-600 hover:border-slate-500 flex items-center justify-center space-x-3 min-h-[56px] touch-manipulation"
            >
              <MessageCircle size={20} />
              <span className="hidden sm:inline">Talk to My Chatbot</span>
              <span className="sm:hidden">Chat with AI</span>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </button>
          </div>

          {/* Social Links - Mobile optimized with better touch targets */}
          <div className="flex justify-center space-x-8 sm:space-x-6 mb-8">
            <a
              href="https://github.com/kyoucef27"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors duration-300 transform hover:scale-110 active:scale-95 p-2 rounded-full hover:bg-white/10 touch-manipulation"
              aria-label="GitHub Profile"
            >
              <Github size={24} className="sm:w-6 sm:h-6" />
            </a>
            <a
              href="https://linkedin.com/in/youcef"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors duration-300 transform hover:scale-110 active:scale-95 p-2 rounded-full hover:bg-blue-400/10 touch-manipulation"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={24} className="sm:w-6 sm:h-6" />
            </a>
            <button 
              className="text-gray-400 hover:text-green-400 transition-colors duration-300 transform hover:scale-110 active:scale-95 p-2 rounded-full hover:bg-green-400/10 touch-manipulation"
              aria-label="Download Resume"
            >
              <Download size={24} className="sm:w-6 sm:h-6" />
            </button>
          </div>


          {/* Scroll Indicator - Hidden on mobile to save space */}
          <div className="hidden sm:block absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="animate-bounce">
              <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Mobile-optimized styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float 6s ease-in-out infinite;
          animation-delay: 2s;
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        /* Mobile performance optimizations */
        @media (max-width: 640px) {
          .animate-blob {
            animation-duration: 10s; /* Slower animations on mobile */
          }
          .animate-float, .animate-float-delayed {
            animation-duration: 8s; /* Reduce animation frequency */
          }
        }
        
        /* Reduce motion for users who prefer it */
        @media (prefers-reduced-motion: reduce) {
          .animate-float, .animate-float-delayed, .animate-blob, .animate-bounce, .animate-ping, .animate-pulse {
            animation: none;
          }
        }
        
        /* Ensure touch targets are properly sized */
        .touch-manipulation {
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
        }
      `}</style>
    </div>
  );
}

export default HomePage;