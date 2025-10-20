"use client";

import React from 'react';
import { 
  Code2, 
  Database, 
  Globe, 
  Server, 
  Shield, 
  Terminal,
  Mail,
  Github,
  Linkedin,
  ExternalLink,
  MapPin,
  Heart,
  Cpu,
  Layers,
  Settings
} from 'lucide-react';

function AboutPage() {
  const skills = {
    languages: [
      { name: 'JavaScript / TypeScript', icon: Code2, color: 'text-yellow-600' },
      { name: 'MIPS Assembly', icon: Cpu, color: 'text-red-600' },
      { name: 'HTML / CSS / TailwindCSS', icon: Globe, color: 'text-blue-600' },
      { name: 'SQL (PostgreSQL) / NoSQL (MongoDB)', icon: Database, color: 'text-green-600' }
    ],
    frameworks: [
      { name: 'Next.js / React', icon: Code2, color: 'text-blue-500' },
      { name: 'Express.js / Node.js', icon: Server, color: 'text-green-500' },
      { name: 'RESTful APIs & Middleware', icon: Layers, color: 'text-purple-500' },
      { name: 'Authentication (OAuth, JWT, Session-based)', icon: Shield, color: 'text-orange-500' }
    ],
    tools: [
      { name: 'MongoDB, PostgreSQL', icon: Database, color: 'text-green-600' },
      { name: 'Prisma ORM, Mongoose', icon: Database, color: 'text-blue-600' },
      { name: 'Git, GitHub', icon: Github, color: 'text-gray-700' },
      { name: 'Docker (basics)', icon: Layers, color: 'text-blue-500' },
      { name: 'Cloudinary, Vercel deployment', icon: Globe, color: 'text-purple-600' }
    ],
    environment: [
      { name: 'Arch Linux', icon: Terminal, color: 'text-blue-400' },
      { name: 'VS Code / Neovim', icon: Code2, color: 'text-blue-600' },
      { name: 'Postman, Insomnia', icon: Server, color: 'text-orange-500' },
      { name: 'Bash scripting', icon: Terminal, color: 'text-green-500' }
    ]
  };

  const projects = [
    {
      title: 'Portfolio Website',
      description: 'Built with Next.js + TypeScript, featuring a chatbot overlay and modern UI.',
      tech: ['Next.js', 'TypeScript', 'TailwindCSS', 'Socket.IO'],
      color: 'from-blue-500 to-purple-600'
    },
    {
      title: 'E-commerce Platform (MERN)',
      description: 'Secure full-stack app with authentication, online payment integration, and admin dashboard.',
      tech: ['MongoDB', 'Express.js', 'React', 'Node.js'],
      color: 'from-green-500 to-teal-600'
    },
    {
      title: 'Micro-services Marketplace',
      description: 'AI-powered identity verification, local payment solutions, and optimized performance for Algerian market.',
      tech: ['Microservices', 'AI/ML', 'PostgreSQL', 'Docker'],
      color: 'from-orange-500 to-red-600'
    }
  ];

  const interests = [
    'Linux customization & performance tuning',
    'Web security & authentication',
    'Artificial Intelligence & automation',
    'Learning languages (currently improving French and German)'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8">

      <div className="absolute inset-0 overflow-hidden">
        
        <div className="absolute top-20 left-10 opacity-10 animate-float">
          <code className="text-blue-400 text-sm font-mono">
            const developer = "Youcef";
          </code>
        </div>
        <div className="absolute top-40 right-20 opacity-10 animate-float-delayed">
          <code className="text-green-400 text-sm font-mono">
            skills: ["Next.js", "Node.js"]
          </code>
        </div>
        <div className="absolute bottom-40 left-20 opacity-10 animate-float">
          <code className="text-purple-400 text-sm font-mono">
            location: "Algeria"
          </code>
        </div>
        

        <div className="absolute top-1/4 -left-20 w-40 h-40 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-1/3 -right-20 w-40 h-40 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-40 h-40 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="relative inline-block mb-8">
            
            <div className="w-60 h-60 mx-auto rounded-full overflow-hidden shadow-xl border-4 border-white bg-gradient-to-br from-blue-500 to-purple-600">
              <img 
                src="/20251019_231025.jpg" 
                alt="Youcef - Full-Stack Developer" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
            </div>
          </div>
          
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            🧑‍💻 About Me
          </h1>
          
          <div className="flex items-center justify-center space-x-2 text-gray-300 mb-6">
            <MapPin size={16} />
            <span>Algeria</span>
            <span className="mx-2">•</span>
            <span>Full-Stack Developer</span>
          </div>
        </div>

        <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-12 border border-slate-700">
          <div className="flex items-center mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
              <span className="text-white text-lg">👋</span>
            </div>
            <h2 className="text-2xl font-bold text-white">Introduction</h2>
          </div>
          
          <p className="text-gray-300 leading-relaxed text-lg">
            Hi, I'm <span className="font-semibold text-blue-400">Youcef</span>, a passionate Full-Stack Developer based in Algeria, 
            with experience building modern web applications using <span className="font-medium text-white">JavaScript, TypeScript, Node.js, and React (Next.js)</span>.
          </p>
          <p className="text-gray-300 leading-relaxed text-lg mt-4">
            I love creating fast, scalable, and secure apps — from backend APIs to polished front-end experiences.
          </p>
          <p className="text-gray-300 leading-relaxed text-lg mt-4">
            I also have a background in <span className="font-medium text-purple-400">low-level programming</span>, particularly MIPS Assembly, 
            which gives me a strong understanding of how systems work under the hood.
          </p>
          <p className="text-gray-300 leading-relaxed text-lg mt-4">
            I use <span className="font-medium text-blue-400">Arch Linux</span> as my main environment, and I enjoy customizing 
            and optimizing my dev setup for productivity and performance.
          </p>
        </div>


        <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-12 border border-slate-700">
          <div className="flex items-center mb-8">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg flex items-center justify-center mr-3">
              <Settings className="text-white" size={18} />
            </div>
            <h2 className="text-2xl font-bold text-white">⚙️ Technical Skills</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">

            <div>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Code2 className="mr-2 text-purple-400" size={20} />
                💻 Languages
              </h3>
              <div className="space-y-3">
                {skills.languages.map((skill, index) => (
                  <div key={index} className="flex items-center p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors">
                    <skill.icon className={`${skill.color} mr-3`} size={18} />
                    <span className="text-gray-200">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>


            <div>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Layers className="mr-2 text-blue-400" size={20} />
                🧠 Frameworks & Libraries
              </h3>
              <div className="space-y-3">
                {skills.frameworks.map((skill, index) => (
                  <div key={index} className="flex items-center p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors">
                    <skill.icon className={`${skill.color} mr-3`} size={18} />
                    <span className="text-gray-200">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Database className="mr-2 text-green-400" size={20} />
                🗃️ Databases & Tools
              </h3>
              <div className="space-y-3">
                {skills.tools.map((skill, index) => (
                  <div key={index} className="flex items-center p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors">
                    <skill.icon className={`${skill.color} mr-3`} size={18} />
                    <span className="text-gray-200">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>


            <div>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Terminal className="mr-2 text-orange-400" size={20} />
                🧰 Dev Environment
              </h3>
              <div className="space-y-3">
                {skills.environment.map((skill, index) => (
                  <div key={index} className="flex items-center p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors">
                    <skill.icon className={`${skill.color} mr-3`} size={18} />
                    <span className="text-gray-200">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-12 border border-slate-700">
          <div className="flex items-center mb-8">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mr-3">
              <span className="text-white text-lg">🚀</span>
            </div>
            <h2 className="text-2xl font-bold text-white">🚀 Projects</h2>
          </div>

          <div className="space-y-6">
            {projects.map((project, index) => (
              <div key={index} className="border border-slate-600 rounded-xl p-6 hover:shadow-lg hover:border-slate-500 transition-all bg-slate-700/30">
                <div className={`inline-block px-3 py-1 rounded-full text-white text-sm font-medium mb-3 bg-gradient-to-r ${project.color}`}>
                  Featured Project
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <span key={techIndex} className="px-3 py-1 bg-slate-600 text-gray-200 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>


        <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-12 border border-slate-700">
          <div className="flex items-center mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-red-600 rounded-lg flex items-center justify-center mr-3">
              <Heart className="text-white" size={18} />
            </div>
            <h2 className="text-2xl font-bold text-white">💡 Interests</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {interests.map((interest, index) => (
              <div key={index} className="flex items-center p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                <span className="text-gray-200">{interest}</span>
              </div>
            ))}
          </div>
        </div>


        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl p-8 text-white">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-6 flex items-center justify-center">
              <Mail className="mr-2" size={24} />
              📫 Let's Connect
            </h2>
            
            <p className="text-blue-100 mb-8 text-lg">
              Ready to collaborate? I'm always open to discussing new opportunities and interesting projects.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <a
                href="mailto:youcef.example@email.com"
                className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
              >
                <Mail size={18} />
                <span>Email</span>
              </a>
              
              <a
                href="https://github.com/kyoucef27"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
              >
                <Github size={18} />
                <span>GitHub</span>
              </a>
              
              <a
                href="https://linkedin.com/in/kyoucef27"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
              >
                <Linkedin size={18} />
                <span>LinkedIn</span>
              </a>
              
              <a
                href="https://youcefcodes.me"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
              >
                <ExternalLink size={18} />
                <span>Portfolio</span>
              </a>
            </div>

            <p className="text-blue-100 text-sm">
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
  );
}

export default AboutPage;