import React, { useState, useEffect } from 'react';
import { Home } from 'lucide-react';
import { Github, ExternalLink } from 'lucide-react';
import ProjectShowcase from './ProjectShowcase';

const Header = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setHasAnimated(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      
      if (currentScrollPos === 0) {
        setVisible(true);
        setPrevScrollPos(currentScrollPos);
        return;
      }

      const isScrollingDown = currentScrollPos > prevScrollPos;
      
      setVisible(!isScrollingDown);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-reveal');
          }
        });
      },
      { threshold: 0.1 }
    );
  
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item) => observer.observe(item));
  
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <nav 
        className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-10 flex items-center transition-all duration-300 ${
          visible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
      >
        <div className={`logo-3d absolute ${hasAnimated ? 'animation-done' : ''}`} style={{ left: '-280px' }}></div>
        <div className="bg-white rounded-full shadow-md px-8 py-4 flex items-center gap-6">
          <button className="nav-link" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <Home className="w-6 h-6" />
          </button>
          <span className="divider">/</span>
          <button className="nav-link" onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}>
            About Me
          </button>
          <span className="divider">/</span>
          <button className="nav-link" onClick={() => document.getElementById('experience').scrollIntoView({ behavior: 'smooth' })}>
            Work Experience
          </button>
          <span className="divider">/</span>
          <button className="nav-link" onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}>
            Projects
          </button>
          <span className="divider">/</span>
          <button className="nav-link" onClick={() => document.getElementById('resume').scrollIntoView({ behavior: 'smooth' })}>
            Resume
          </button>
          <span className="divider">/</span>
          <button className="nav-link" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>
            Contact
          </button>
        </div>
      </nav>

      <div className="bg-gray-50 font-urbanist">
        <section className="min-h-screen flex flex-col justify-center max-w-7xl mx-auto pl-50">
          <div className="w-2/3">
            <h1 className="text-7xl font-extrabold mb-6 text-gray-900">
              Hello, <span className="gradient-text">I'm Anahad</span> <span className="wave">👋</span>
            </h1>
            <p className="text-2xl text-gray-600">Computer Engineering Student @ University of Waterloo</p>
          </div>
        </section>

        <section id="about" className="min-h-screen flex flex-col justify-center items-center px-6">
          <h2 className="text-4xl font-bold mb-6">About Me</h2>
          <div className="max-w-3xl text-center">
            <p className="text-lg text-gray-600">
              Your about content here...
            </p>
          </div>
        </section>

        <section id="experience" className="min-h-screen py-24 max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold mb-16 text-center">Work Experience</h2>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-[#9448ff] to-[#c861ff] opacity-20" />
            
            <div className="relative space-y-16">
              <div className="timeline-item opacity-0 flex justify-start w-full">
                <div className="w-[650px] pr-20 relative">
                  <div className="absolute right-0 top-1/2 transform translate-x-4 -translate-y-1/2 w-16 h-1 bg-gradient-to-r from-[#9448ff] to-[#c861ff]" />
                  <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                    <div className="text-gray-400 text-sm font-medium mb-2">JULY — AUG 2024</div>
                    <h3 className="flex items-center whitespace-nowrap text-2xl font-semibold mb-4">
                      <div className="flex items-center gap-2">
                        <span>Software Engineer Intern @ </span>
                        <a href="https://www.joinprequel.com/" 
                           target="_blank" 
                           rel="noopener noreferrer" 
                           className="gradient-text hover:opacity-80 transition-opacity inline-flex items-center gap-1"
                        >
                          Prequel
                          <svg className="w-4 h-4 inline-block ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                                  strokeWidth="2" 
                                  strokeLinecap="round" 
                                  strokeLinejoin="round"/>
                          </svg>
                        </a>
                      </div>
                    </h3>
                    <ul className="space-y-4 mb-6">
                      <li className="flex gap-3 text-gray-400">
                        <span className="text-[#9448ff] text-[17px] mt-1">▹</span>
                        At Prequel, I worked closely with their Software Engineers to further develop their AI model, Poppy, as well as to create new features for their website. I learned some pretty cool things, ranging from web design to product analytics.
                      </li>
                      <li className="flex gap-3 text-gray-400">
                        <span className="text-[#9448ff] text-[17px] mt-1">▹</span>
                        During my time, I developed a genetic algorithm that streamlined team assignments, saving up to 10 hours for student coordinators. I also trained their model by vector indexing over 30 hours of start-up meeting data, significantly improving its accuracy, and wrote a report analyzing the model's performance under various conditions.
                      </li>
                      <li className="flex gap-3 text-gray-400">
                        <span className="text-[#9448ff] text-[17px] mt-1">▹</span>
                        Overall, this internship taught me a great deal about the market research aspect of software development, as we continuously implemented improvements based on consumer feedback.
                      </li>
                    </ul>
                    <div className="flex flex-wrap gap-2">
                      {["React", "Typescript", "PostgresSQL", "Python", "Git", "UI/UX"].map((skill) => (
                        <span key={skill} className="px-3 py-1 text-sm rounded-full bg-opacity-10 text-[#9448ff] bg-[#9448ff]">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="timeline-item opacity-0 flex justify-end w-full">
                <div className="w-[650px] pl-20 relative">
                  <div className="absolute left-0 top-1/2 transform -translate-x-4 -translate-y-1/2 w-16 h-1 bg-gradient-to-l from-[#9448ff] to-[#c861ff]" />
                  <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                    <div className="text-gray-400 text-sm font-medium mb-2">SEPT 2023 — FEB 2024</div>
                    <h3 className="flex items-center whitespace-nowrap text-2xl font-semibold mb-4">
                      <div className="flex items-center gap-2">
                        <span>Software Engineer Intern @ </span>
                        <a href="https://virtuallabs.network/" 
                           target="_blank" 
                           rel="noopener noreferrer" 
                           className="gradient-text hover:opacity-80 transition-opacity inline-flex items-center gap-1"
                        >
                          Virtual Labs
                          <svg className="w-4 h-4 inline-block ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                                  strokeWidth="2" 
                                  strokeLinecap="round" 
                                  strokeLinejoin="round"/>
                          </svg>
                        </a>
                      </div>
                    </h3>
                    <ul className="space-y-4 mb-6">
                      <li className="flex gap-3 text-gray-400">
                        <span className="text-[#9448ff] text-[17px] mt-1">▹</span>
                        Virtual Labs was my first internship, where I got to learn about blockchain, smart contracts and how it connects with game development. Working with José Betancourt, former Yale student, and his team of Harvard-educated software engineers was an eye-opening experience.                      </li>
                      <li className="flex gap-3 text-gray-400">
                        <span className="text-[#9448ff] text-[17px] mt-1">▹</span>
                        During my time there, I worked on integrating their Unity SDK by creating my own 3D First-Person Shooter in Unity. I identified and reported any bugs or issues I encountered to the team before their Unity Software Development Kit was released to the market.                      </li>
                    </ul>
                    <div className="flex flex-wrap gap-2">
                      {["Unity", "C#", "Solidity", "Git"].map((skill) => (
                        <span key={skill} className="px-3 py-1 text-sm rounded-full bg-opacity-10 text-[#9448ff] bg-[#9448ff]">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="min-h-screen flex flex-col justify-center items-center px-6">
  <ProjectShowcase
    title="Spotify Profile"
    description="A web app for visualizing personalized Spotify data. View your top artists, top tracks, recently played tracks, and detailed audio information about each track. Create and save new playlists of recommended tracks based on your existing playlists and more."
    technologies={["React", "Styled Components", "Express", "Spotify API", "Heroku"]}
    githubUrl="https://github.com/yourusername/spotify-profile"
    liveUrl="https://your-spotify-profile.com"
    imageSrc="/api/placeholder/800/600"
  />
</section>

        <section id="resume" className="min-h-screen flex flex-col justify-center items-center px-6 bg-gray-100">
          <h2 className="text-4xl font-bold mb-6">Resume</h2>
          <div className="max-w-3xl">
            <p className="text-lg text-gray-600">
              Your resume content here...
            </p>
          </div>
        </section>

        <section id="contact" className="min-h-screen flex flex-col justify-center items-center px-6">
          <h2 className="text-4xl font-bold mb-6">Contact</h2>
          <div className="max-w-3xl text-center">
            <p className="text-lg text-gray-600">
              Your contact information here...
            </p>
          </div>
        </section>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Urbanist:wght@400;500;700;800&display=swap');
        
        body {
          margin: 0;
          padding: 0;
          font-family: "Urbanist", sans-serif;
          scroll-behavior: smooth;
        }

        .gradient-text {
          background: linear-gradient(135deg, #9448ff 0%, #c861ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .nav-link {
          font-weight: 500;
          font-size: 18px;
          color: #4b5563;
          transition: transform 0.2s, color 0.2s ease-in-out;
          cursor: pointer;
        }

        .nav-link:hover {
          transform: scale(1.02);
          color: #9448ff;
        }

        .divider {
          font-size: 17px;
          color: #d1d5db;
        }

        .wave {
          display: inline-block;
          animation: wave 2.5s infinite;
          transform-origin: 70% 70%;
        }

        @keyframes wave {
          0% { transform: rotate(0deg); }
          10% { transform: rotate(14deg); }
          20% { transform: rotate(-8deg); }
          30% { transform: rotate(14deg); }
          40% { transform: rotate(-4deg); }
          50% { transform: rotate(10deg); }
          60% { transform: rotate(0deg); }
          100% { transform: rotate(0deg); }
        }

        .logo-3d {
          font-size: 72px;
          font-weight: bold;
          line-height: 1;
          text-align: center;
          width: 72px;
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .logo-3d::after {
          content: "AD";
          font-size: 72px;
          background: linear-gradient(135deg, #9448ff 0%, #c861ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 0 5px rgba(148, 72, 255, 0.15));
        }

        .logo-3d:not(.animation-done) {
          animation: flip 3s ease-in-out;}

        @keyframes flip {
          0% { transform: rotateY(0deg); }
          50% { transform: rotateY(180deg); }
          100% { transform: rotateY(360deg); }
        }

        .timeline-item {
          transform: translateY(20px);
          transition: all 0.6s ease-out;
        }

        .animate-reveal {
          opacity: 1 !important;
          transform: translateY(0);
        }

        nav {
          transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
          will-change: transform, opacity;
        }
      `}</style>
    </>
  );
};

export default Header;