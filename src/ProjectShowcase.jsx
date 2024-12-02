import React from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';

const ProjectShowcase = ({
  title,
  description,
  technologies = [],
  githubUrl,
  liveUrl,
  imageSrc,
  isReverse = false
}) => {
  return (
    <div className="relative grid grid-cols-12 gap-4 mb-32">
      {/* Project Image Side */}
      {imageSrc && (
        <motion.div 
          className={`relative rounded-lg overflow-hidden group col-span-12 lg:col-span-7 ${
            isReverse ? 'lg:col-start-6' : 'lg:col-start-1'
          }`}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <a href={liveUrl || '#'} className="block">
            <div className="absolute inset-0 bg-[#9448ff] opacity-20 mix-blend-multiply transition-opacity duration-300 group-hover:opacity-0 z-10"></div>
            <img 
              src={imageSrc}
              alt={`${title} Preview`}
              className="w-full h-auto transition-all duration-300 group-hover:brightness-100 brightness-90"
            />
          </a>
        </motion.div>
      )}

      {/* Project Info Side */}
      <div className={`col-span-12 lg:col-span-7 ${
        isReverse ? 'lg:col-start-1' : 'lg:col-start-6'
      } lg:row-start-1 relative z-20`}>
        <div className={`text-${isReverse ? 'left' : 'right'}`}>
          <p className="text-[#9448ff] font-urbanist text-sm font-medium mb-2">
            Featured Project
          </p>
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            {title}
          </h3>
        </div>

        <div className="relative p-6 rounded-lg bg-white shadow-xl backdrop-blur-sm bg-opacity-90 mb-4">
          <p className="text-gray-600 text-sm leading-relaxed font-urbanist">
            {description}
          </p>
        </div>

        {/* Tech Stack */}
        <div className={`flex flex-wrap gap-2 mb-4 ${isReverse ? 'justify-start' : 'justify-end'}`}>
          {technologies.map((tech) => (
            <span 
              key={tech} 
              className="px-3 py-1 text-sm rounded-full bg-opacity-10 text-[#9448ff] bg-[#9448ff] font-urbanist"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        {(githubUrl || liveUrl) && (
          <div className={`flex gap-4 ${isReverse ? 'justify-start' : 'justify-end'}`}>
            {githubUrl && (
              <a 
                href={githubUrl}
                className="text-gray-600 hover:text-[#9448ff] transition-colors"
                aria-label="GitHub Repository"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={22} />
              </a>
            )}
            {liveUrl && (
              <a 
                href={liveUrl}
                className="text-gray-600 hover:text-[#9448ff] transition-colors"
                aria-label="Live Demo"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink size={22} />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const ProjectsSection = () => {
  const projects = [
    {
      title: "Halcyon Theme",
      description: "A minimal, dark blue theme for VS Code, Sublime Text, Atom, iTerm, and more. Available on Visual Studio Marketplace, Package Control, Atom Package Manager, and npm.",
      technologies: ["VS Code", "Sublime Text", "Atom", "iTerm2", "Hyper"],
      githubUrl: "https://github.com/yourusername/halcyon-theme",
      liveUrl: "https://halcyon-theme.netlify.app",
      imageSrc: "/api/placeholder/800/600"
    },
    {
      title: "Spotify Profile",
      description: "A web app for visualizing personalized Spotify data. View your top artists, top tracks, recently played tracks, and detailed audio information about each track. Create and save new playlists of recommended tracks based on your existing playlists and more.",
      technologies: ["React", "Styled Components", "Express", "Spotify API", "Heroku"],
      githubUrl: "https://github.com/yourusername/spotify-profile",
      liveUrl: "https://your-spotify-profile.com",
      imageSrc: "/api/placeholder/800/600"
    }
  ];

  return (
    <section className="min-h-screen bg-gray-50 px-6 py-24">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-4 text-2xl sm:text-3xl font-semibold mb-24">
          <span className="text-[#9448ff] font-urbanist text-xl sm:text-2xl">03.</span>
          <h2 className="text-gray-900">Some Things I've Built</h2>
          <div className="flex-1 h-[1px] bg-gray-200"></div>
        </div>

        {/* Projects */}
        <div className="space-y-32">
          {projects.map((project, index) => (
            <ProjectShowcase 
              key={project.title}
              {...project}
              isReverse={index % 2 !== 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;