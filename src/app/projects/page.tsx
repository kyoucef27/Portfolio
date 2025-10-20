"use client";

import React from "react";

function ProjectsPage() {
  const projects = [
  {
    title: "Portfolio Website",
    description:
      "Built with Next.js + TypeScript, featuring a chatbot overlay and modern UI.",
    tech: ["Next.js", "TypeScript", "TailwindCSS", "Socket.IO"],
    color: "from-blue-500 to-purple-600",
  },
  {
    title: "E-commerce Platforms (MERN)",
    description:
      "Secure full-stack app with authentication, online payment integration, and admin dashboard.",
    tech: ["MongoDB", "Express.js", "React", "Node.js"],
    color: "from-green-500 to-teal-600",
  },
  {
    title: "Micro-services Marketplace",
    description:
      "AI-powered identity verification, local payment solutions, and optimized performance for Algerian market.",
    tech: ["Microservices", "AI/ML", "PostgreSQL", "Docker"],
    color: "from-orange-500 to-red-600",
  },
  {
    title: "AI Plant Identifier",
    description:
      "Web app that identifies any type of plant using AI image recognition and a modern UI.",
    tech: ["Next.js", "TensorFlow.js", "TailwindCSS", "Vercel"],
    color: "from-lime-500 to-green-600",
  },
];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      
      <div className="absolute inset-0 overflow-hidden">
        
        <div className="absolute top-20 left-10 opacity-10 animate-float">
          <code className="text-blue-400 text-sm font-mono">
            const projects = [];
          </code>
        </div>
        <div className="absolute top-40 right-20 opacity-10 animate-float-delayed">
          <code className="text-green-400 text-sm font-mono">
            npm run build --prod
          </code>
        </div>
        <div className="absolute bottom-40 left-20 opacity-10 animate-float">
          <code className="text-purple-400 text-sm font-mono">
            git push origin main
          </code>
        </div>
        
        
        <div className="absolute top-1/4 -left-20 w-40 h-40 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-1/3 -right-20 w-40 h-40 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-40 h-40 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-12 border border-slate-700">
          <div className="flex items-center mb-8">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mr-3">
              <span className="text-white text-lg">🚀</span>
            </div>
            <h2 className="text-2xl font-bold text-white">Projects</h2>
          </div>

          <div className="space-y-6">
            {projects.map((project, index) => (
              <div
                key={index}
                className="border border-slate-600 rounded-xl p-6 hover:shadow-lg hover:border-slate-500 transition-all bg-slate-700/30"
              >
                <div
                  className={`inline-block px-3 py-1 rounded-full text-white text-sm font-medium mb-3 bg-gradient-to-r ${project.color}`}
                >
                  Featured Project
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-slate-600 text-gray-200 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
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
  );
}

export default ProjectsPage;
