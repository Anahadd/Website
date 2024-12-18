import React, { useState, useEffect } from 'react';
import { Home, Sun, Moon } from 'lucide-react';
import { Github, ExternalLink } from 'lucide-react';
import ProjectShowcase from './ProjectShowcase';

const Header = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

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

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <>
      <nav
        className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-10 flex items-center transition-all duration-300 ${
          visible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
      >
        <div
          className={`logo-3d absolute ${hasAnimated ? 'animation-done' : ''}`}
          style={{ left: '-280px' }}
        ></div>
        <div
          className={`${
            darkMode ? 'bg-gray-800/90' : 'bg-white'
          } rounded-full shadow-md px-8 py-4 flex items-center`}
        >
          <div className="flex items-center space-x-4">
            <button
              className="nav-link flex items-center"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <Home className="w-5 h-5" />
            </button>
            <span className="text-gray-300">/</span>
            <button
              className="nav-link"
              onClick={() => document.getElementById('about').scrollIntoView({ behavior: 'smooth' })}
            >
              About Me
            </button>
            <span className="text-gray-300">/</span>
            <button
              className="nav-link"
              onClick={() => document.getElementById('experience').scrollIntoView({ behavior: 'smooth' })}
            >
              Work Experience
            </button>
            <span className="text-gray-300">/</span>
            <button
              className="nav-link"
              onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
            >
              Projects
            </button>
            
            <span className="text-gray-300">/</span>
            <button
              className="nav-link"
              onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
            >
              Contact
            </button>
            <span className="text-gray-300">/</span>
            <button onClick={toggleDarkMode} className="nav-link">
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`${
          darkMode ? 'bg-[#1a1a2e]' : 'bg-gray-50'
        } font-urbanist transition-colors duration-300`}
      >
        <section className="min-h-screen flex flex-col justify-center max-w-7xl mx-auto pl-50">
          <div className="w-2/3">
            <h1
              className={`text-7xl font-extrabold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}
            >
              Hello, <span className="gradient-text">I'm Anahad</span>{' '}
              <span className="wave">👋</span>
            </h1>
            <p
              className={`text-2xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
            >
              Computer Engineering Student @ University of Waterloo
            </p>
          </div>
        </section>

        <section id="about" className="min-h-screen flex flex-col justify-center items-center px-6">
          <h2
            className={`text-6xl font-extrabold mb-16 relative ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            <span className="text-purple-500 font-urbanist">01.</span>
            <span className="ml-4">About Me</span>
            <div className="absolute -bottom-4 left-0 w-full h-[1px] bg-gradient-to-r from-purple-500/40 to-transparent"></div>
          </h2>
          <div className="max-w-3xl text-center">
            <p
              className={`text-lg font-medium ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              Your about content here...
            </p>
          </div>
        </section>

        <section id="experience" className="min-h-screen py-24 max-w-6xl mx-auto">
          <h2
            className={`text-6xl font-extrabold mb-16 relative ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            <span className="text-purple-500 font-urbanist">02.</span>
            <span className="ml-4">Work Experience</span>
            <div className="absolute -bottom-4 left-0 w-full h-[1px] bg-gradient-to-r from-purple-500/40 to-transparent"></div>
          </h2>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-[#9448ff] to-[#c861ff] opacity-20" />

            <div className="relative space-y-16">
              <div className="timeline-item opacity-0 flex justify-start w-full">
                <div className="w-[600px] pr-16 relative">
                  <div className="absolute right-0 top-1/2 transform translate-x-4 -translate-y-1/2 w-16 h-1 bg-gradient-to-r from-[#9448ff] to-[#c861ff]" />
                  <div
                    className={`${
                      darkMode ? 'bg-gray-800' : 'bg-white'
                    } p-7 rounded-xl shadow-lg hover:shadow-xl transition-shadow`}
                  >
                    <div className="text-gray-400 text-base font-medium mb-2">
                      JULY — AUG 2024
                    </div>
                    <h3 className="flex items-center whitespace-nowrap text-2xl font-bold mb-4">
                      <div className="flex items-center gap-2">
                        <span
                          className={darkMode ? 'text-white' : 'text-gray-900'}
                        >
                          Software Engineer Intern @
                        </span>
                        <a
                          href="https://www.joinprequel.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="gradient-text hover:opacity-80 transition-opacity inline-flex items-center gap-1"
                        >
                          Prequel
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </h3>
                    <ul className="space-y-4 mb-6">
                      <li
                        className={`flex gap-3 ${
                          darkMode ? 'text-gray-300' : 'text-gray-400'
                        } text-base font-medium`}
                      >
                        <span className="text-[#9448ff] text-[17px] mt-1">▹</span>
                        At Prequel, I worked closely with their Software Engineers
                        to further develop their AI model, Poppy, as well as to
                        create new features for their website. I learned some
                        pretty cool things, ranging from web design to product
                        analytics.
                      </li>
                      <li
                        className={`flex gap-3 ${
                          darkMode ? 'text-gray-300' : 'text-gray-400'
                        } text-base font-medium`}
                      >
                        <span className="text-[#9448ff] text-[17px] mt-1">▹</span>
                        During my time, I developed a genetic algorithm that
                        streamlined team assignments, saving up to 10 hours for
                        student coordinators. I also trained their model by vector
                        indexing over 30 hours of start-up meeting data,
                        significantly improving its accuracy, and wrote a report
                        analyzing the model's performance under various conditions.
                      </li>
                      <li
                        className={`flex gap-3 ${
                          darkMode ? 'text-gray-300' : 'text-gray-400'
                        } text-base font-medium`}
                      >
                        <span className="text-[#9448ff] text-[17px] mt-1">▹</span>
                        Overall, this internship taught me a great deal about the
                        market research aspect of software development, as we
                        continuously implemented improvements based on consumer
                        feedback.
                      </li>
                    </ul>
                    <div className="flex flex-wrap gap-2">
                      {['React', 'Typescript', 'PostgresSQL', 'Python', 'Git', 'UI/UX'].map((skill) => (
                        <span
                          key={skill}
                          className={`px-3 py-1 text-base font-medium rounded-full ${
                            darkMode
                              ? 'bg-purple-500/10 text-purple-300'
                              : 'bg-purple-500/5 text-purple-600'
                          }`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="timeline-item opacity-0 flex justify-end w-full">
                <div className="w-[600px] pl-16 relative">
                  <div className="absolute left-0 top-1/2 transform -translate-x-4 -translate-y-1/2 w-16 h-1 bg-gradient-to-l from-[#9448ff] to-[#c861ff]" />
                  <div
                    className={`${
                      darkMode ? 'bg-gray-800' : 'bg-white'
                    } p-7 rounded-xl shadow-lg hover:shadow-xl transition-shadow`}
                  >
                    <div className="text-gray-400 text-base font-medium mb-2">
                      SEPT 2023 — FEB 2024
                    </div>
                    <h3 className="flex items-center whitespace-nowrap text-2xl font-bold mb-4">
                      <div className="flex items-center gap-2">
                        <span
                          className={darkMode ? 'text-white' : 'text-gray-900'}
                        >
                          Software Engineer Intern @
                        </span>
                        <a
                          href="https://virtuallabs.network/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="gradient-text hover:opacity-80 transition-opacity inline-flex items-center gap-1"
                        >
                          Virtual Labs
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </h3>
                    <ul className="space-y-4 mb-6">
                      <li
                        className={`flex gap-3 ${
                          darkMode ? 'text-gray-300' : 'text-gray-400'
                        } text-base font-medium`}
                      >
                        <span className="text-[#9448ff] text-[17px] mt-1">▹</span>
                        Virtual Labs was my first internship, where I got to learn
                        about blockchain, smart contracts and how it connects with
                        game development. Working with José Betancourt, former Yale
                        student, and his team of Harvard-educated software
                        engineers was an eye-opening experience.
                      </li>
                      <li
                        className={`flex gap-3 ${
                          darkMode ? 'text-gray-300' : 'text-gray-400'
                        } text-base font-medium`}
                      >
                        <span className="text-[#9448ff] text-[17px] mt-1">▹</span>
                        During my time there, I worked on integrating their Unity
                        SDK by creating my own 3D First-Person Shooter in Unity. I
                        identified and reported any bugs or issues I encountered to
                        the team before their Unity Software Development Kit was
                        released to the market.
                      </li>
                    </ul>
                    <div className="flex flex-wrap gap-2">
                      {['Unity', 'C#', 'Solidity', 'Git'].map((skill) => (
                        <span
                          key={skill}
                          className={`px-3 py-1 text-base font-medium rounded-full ${
                            darkMode
                              ? 'bg-purple-500/10 text-purple-300'
                              : 'bg-purple-500/5 text-purple-600'
                          }`}
                        >
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

        <section id="projects" className="min-h-screen py-24 max-w-6xl mx-auto px-6">
          <h2
            className={`text-6xl font-extrabold mb-16 relative ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            <span className="text-purple-500 font-urbanist">03.</span>
            <span className="ml-4">Some Things I've Built</span>
            <div className="absolute -bottom-4 left-0 w-full h-[1px] bg-gradient-to-r from-purple-500/40 to-transparent"></div>
          </h2>

          <div className="space-y-32">
            <div className="relative grid md:grid-cols-12 gap-4 items-center">
              <div className="md:col-span-7 relative group">
                <div className="relative rounded-lg overflow-hidden">
                  <div className="absolute inset-0 bg-purple-500/10 group-hover:bg-transparent transition-all duration-300"></div>
                  <img
                    src="/api/placeholder/800/600"
                    alt="Project Preview"
                    className="rounded-lg w-full transition-all duration-300 group-hover:scale-105"
                  />
                </div>
              </div>

              <div className="md:col-span-5 md:px-6">
                <p className="font-urbanist text-purple-500 text-base font-medium mb-2">
                  Featured Project
                </p>
                <h3
                  className={`text-2xl font-bold mb-4 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  Halcyon Theme
                </h3>
                <div
                  className={`p-6 rounded-lg ${
                    darkMode ? 'bg-gray-800/50' : 'bg-white'
                  } shadow-xl backdrop-blur-sm`}
                >
                  <p
                    className={`text-base font-medium leading-relaxed ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    A minimal, dark blue theme for VS Code, Sublime Text, Atom,
                    iTerm, and more. Available on Visual Studio Marketplace,
                    Package Control, Atom Package Manager, and npm.
                    </p>
                </div>
                <div className="flex flex-wrap gap-2 mt-6 mb-8">
                  {['VS Code', 'Sublime Text', 'Atom', 'iTerm2', 'Hyper'].map((tech) => (
                    <span
                      key={tech}
                      className={`text-base font-medium ${
                        darkMode ? 'text-gray-300' : 'text-gray-600'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a
                    href="https://github.com/yourusername/halcyon-theme"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`hover:text-purple-500 transition-colors ${
                      darkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href="https://halcyon-theme.site"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`hover:text-purple-500 transition-colors ${
                      darkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="min-h-screen py-24 max-w-6xl mx-auto">
          <h2
            className={`text-6xl font-extrabold mb-16 relative ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            <span className="text-purple-500 font-urbanist">05.</span>
            <span className="ml-4">Get In Touch</span>
            <div className="absolute -bottom-4 left-0 w-full h-[1px] bg-gradient-to-r from-purple-500/40 to-transparent"></div>
          </h2>
          <div className="max-w-3xl mx-auto text-center px-6">
            <p
              className={`text-lg font-medium ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}
            >
              Your contact information here...
            </p>
          </div>
        </section>

        <footer className="py-12 text-center">
  <div className="flex justify-center space-x-8">
    <a
      href="https://github.com/yourusername"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:opacity-80 transition-opacity"
    >
      <img
        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
        alt="GitHub"
        className="w-12 h-12"
      />
    </a>
    <a
      href="https://www.linkedin.com/in/yourprofile"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:opacity-80 transition-opacity"
    >
      <img
        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg"
        alt="LinkedIn"
        className="w-12 h-12"
      />
    </a>
    <a
      href="mailto:your.email@example.com"
      className="hover:opacity-80 transition-opacity"
    >
      <img
        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
        alt="Email"
        className="w-12 h-12"
      />
    </a>
    <a
      href="https://devpost.com/yourusername"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:opacity-80 transition-opacity"
    >
      <img
        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/devpost/devpost-original.svg"
        alt="Devpost"
        className="w-12 h-12"
      />
    </a>
  </div>
</footer>


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
          filter: drop-shadow(0 0 8px rgba(148, 72, 255, 0.3));
        }

        .nav-link {
          font-weight: 500;
          font-size: 18px;
          color: ${darkMode ? 'rgb(209, 213, 219)' : '#4b5563'};
          transition: transform 0.2s, color 0.2s ease-in-out;
          cursor: pointer;
        }

        .nav-link:hover {
          transform: scale(1.02);
          color: #9448ff;
        }

        .wave {
          display: inline-block;
          animation: wave 2.5s infinite;
          transform-origin: 70% 70%;
        }

        @keyframes wave {
          0% {
            transform: rotate(0deg);
          }
          10% {
            transform: rotate(14deg);
          }
          20% {
            transform: rotate(-8deg);
          }
          30% {
            transform: rotate(14deg);
          }
          40% {
            transform: rotate(-4deg);
          }
          50% {
            transform: rotate(10deg);
          }
          60% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(0deg);
          }
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
