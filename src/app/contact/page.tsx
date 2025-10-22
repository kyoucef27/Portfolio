"use client";

import React from 'react';
import { 
  Mail,
  Github,
  Linkedin,
  ExternalLink,

} from 'lucide-react';


function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      
      <div className="absolute inset-0 overflow-hidden">
        
        <div className="absolute top-20 left-10 opacity-10 animate-float">
          <code className="text-blue-400 text-sm font-mono">
            const contact = true;
          </code>
        </div>
        <div className="absolute top-40 right-20 opacity-10 animate-float-delayed">
          <code className="text-green-400 text-sm font-mono">
            async function sendEmail()
          </code>
        </div>
        <div className="absolute bottom-40 left-20 opacity-10 animate-float">
          <code className="text-purple-400 text-sm font-mono">
            await response.json()
          </code>
        </div>
        
        
        <div className="absolute top-1/4 -left-20 w-40 h-40 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-1/3 -right-20 w-40 h-40 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-40 h-40 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 text-white border border-slate-700">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-6 flex items-center justify-center">
              <Mail className="mr-2" size={24} />
              📫 Let's Connect
            </h2>
            
            <p className="text-gray-300 mb-8 text-lg">
              Ready to collaborate? I'm always open to discussing new opportunities and interesting projects.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <a
                href="mailto:kefifyoucef2020@gmail.com"
                className="flex items-center space-x-2 bg-slate-700/50 hover:bg-slate-600/70 px-4 py-2 rounded-lg transition-colors border border-slate-600"
              >
                <Mail size={18} />
                <span>Email</span>
              </a>
              
              <a
                href="https://github.com/kyoucef27"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-slate-700/50 hover:bg-slate-600/70 px-4 py-2 rounded-lg transition-colors border border-slate-600"
              >
                <Github size={18} />
                <span>GitHub</span>
              </a>
              
              <a
                href="https://linkedin.com/in/kyoucef27"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-slate-700/50 hover:bg-slate-600/70 px-4 py-2 rounded-lg transition-colors border border-slate-600"
              >
                <Linkedin size={18} />
                <span>LinkedIn</span>
              </a>
              
              <a
                href="https://youcefcodes.me"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-slate-700/50 hover:bg-slate-600/70 px-4 py-2 rounded-lg transition-colors border border-slate-600"
              >
                <ExternalLink size={18} />
                <span>Portfolio</span>
              </a>
            </div>

            <p className="text-gray-400 text-sm">
              Based in Algeria • Available for remote opportunities worldwide
            </p>
          </div>
        </div>
      </div>

      
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
      `}</style>
    </div>
  )
}

export default ContactPage