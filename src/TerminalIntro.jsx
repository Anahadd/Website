import React, { useState, useEffect } from 'react';
import { Home, Sun, Moon, Github, ExternalLink, Linkedin, Mail, Award } from 'lucide-react';
import hosaImage from './models/hosa_healthcare.png'
import p2 from './models/uniflow.png'
import p3 from './models/chess.png'
import prequellogo from './models/prequel_logo.png';
import virtuallabs from './models/virtual_labs_logo.png';
import keyturndigital from './models/virtual_labs_logo.png';

const Header = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [showMore, setShowMore] = useState(false);

  // Main Projects
  const mainProjects = [
    {
      title: "EasyCura - AI Healthcare App",
      description:
        "EasyCura is an AI-powered healthcare application built with the MERN stack (MongoDB, Express, React, Node.js). It integrates with external APIs to aggregate comprehensive hospital and healthcare provider data, enabling users to find nearby hospitals tailored to their specific needs. By leveraging AI, EasyCura reduces wait times, connects patients with the right specialists, and streamlines the healthcare experience for both patients and providers.",
      image: hosaImage,
      award: {
        icon: "🏆",
        text: "Top 10",
        subtext: "in HOSA Medical Innovation",
      },
      technologies: [
        "MongoDB",
        "Express.js",
        "React",
        "Node.js",
        "OpenAI API",
        "Google Cloud Platform",
      ],
      githubLink: "https://github.com/yourusername/halcyon-theme",
      externalLink:
        "https://drive.google.com/file/d/1FpdQ81B61yNbiCV0ve0V_cmMlgUMntKR/view?usp=sharing",
    },
    {
      title: "CryptoChess - Blockchain App",
      description:
        "CryptoChess is a decentralized platform that enables users to create and manage smart contracts based on the outcomes of chess games. Leveraging blockchain technology for secure and transparent transactions, the platform integrates with popular online chess platform, Lichess, to automatically verify game results. Users can engage in betting, organize tournaments, and participate in community governance through a DAO, ensuring a fair and innovative chess ecosystem.",
      image: p3,
      award: {
        text: "♟️ Featured Blockchain Project",
      },
      technologies: [
        "Solidity",
        "Ethereum",
        "React.js",
        "Node.js",
        "Web3.js",
      ],
      githubLink: "https://github.com/Anahadd/CryptoChess",
    },

    {
      title: "UniFlow - AI Coaching App",
      description:
        "UniFlow is an AI-powered university application platform built with Flask and React. It employs Beautiful Soup for web scraping to aggregate comprehensive university and scholarship data, stored securely in MongoDB on AWS. The platform features an AI-driven mock interview system using OpenAI's API for personalized interview practice and essay feedback, alongside an automated scholarship matching system. Secured with Google Sign-In, UniFlow provides a seamless and efficient tool for students managing their university applications.",
      image: p2,
      award: {
        text: "👨‍💻 Ignition Hacks Project",
      },
      technologies: [
        "React",
        "Flask",
        "Tailwind CSS",
        "Node.js",
        "Express.js",
        "MongoDB",
        "AWS",
      ],
      githubLink: "https://github.com/Anahadd/UniFlow",
    },
  ];

  // Additional Projects
  const additionalProjects = [
    {
      type: "🏆 1st Place - BearHacks",
      title: "Arduino-based Thermochromic Printer",
      description:
        "Developed an Arduino-powered printer that uses heat to erase text from thermochromic ink, enabling reusable printing sheets and reducing paper waste.",
      technologies: ["Arduino", "C/C++", "Hardware Design"],
      githubLink: "https://github.com/Anahadd/ThermochromicPrinter",
    },
    {
      type: "NewHacks 2023 Project",
      title: "CrisisCompass - Web App",
      description:
        "Created a web application for first responders that aggregates real-time emergency data from social media and news sources, displayed on a React dashboard using Flask and Axios.",
      technologies: ["Python", "Flask", "JavaScript", "React", "MongoDB"],
      githubLink: "https://github.com/shivam-2507/Crisis-Compass",
      externalLink: "https://devpost.com/software/crisis-compass-ita7oj",
    },
    {
      type: "2D Java Game",
      title: "The HolyGrail",
      description:
        "Built a top-down 2D adventure game in Java featuring dynamic enemy spawning, object-oriented design, and interactive gameplay mechanics.",
      technologies: ["Java", "Java Swing", "Game Development"],
      githubLink: "https://github.com/Anahadd/2DGame_TheHolyGrail",
    },
    {
      type: "Project Studio Course - ECE 198",
      title: "SecureEdu",
      description:
        "Developed an encrypted educational platform using STM32 microcontrollers and AES encryption to securely distribute educational content (ie. textbooks) with user access via a keypad, reducing piracy and generating real-time data for professors.",
      technologies: ["C/C++", "STM32", "Hardware Design"],
      githubLink: "https://github.com/ECE198ProjectTracker/SecureEdu",
    },
  ];

  // Lifecycle Hooks
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

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-reveal");
          }
        });
      },
      { threshold: 0.1 }
    );

    const timelineItems = document.querySelectorAll(".timeline-item");
    timelineItems.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  // Toggle Dark/Light Mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  /**
   * If index=0 => no GitHub link
   * If index=1 => no external link
   */
  const renderProjectLinks = (project, index) => {
    const showGithub = index !== 0;
    const showExternal = index !== 1;

    return (
      <div className="flex gap-6 mt-8">
        {showGithub && (
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`hover:text-purple-500 transition-colors ${darkMode ? "text-gray-300" : "text-gray-600"
              }`}
          >
            <Github className="w-8 h-8" />
          </a>
        )}

        {showExternal && (
          <a
            href={project.externalLink}
            target="_blank"
            rel="noopener noreferrer"
            className={`hover:text-purple-500 transition-colors ${darkMode ? "text-gray-300" : "text-gray-600"
              }`}
          >
            <ExternalLink className="w-8 h-8" />
          </a>
        )}
      </div>
    );
  };

  /**
   * Flip layout on odd indices (1,3,5,...)
   */
  const renderMainProject = (project, index) => {
    const reverseLayout = index % 2 === 1;

    return (
      <div key={index} className="relative grid md:grid-cols-12 gap-8 items-start">
        {/* Column A: Image + Title + Links */}
        <div
          className={`md:col-span-6 relative group ${reverseLayout ? "order-2 md:order-1" : ""
            }`}
        >
          <h3
            className={`text-4xl font-extrabold mb-6 ${darkMode ? "text-white" : "text-purple-500"
              }`}
          >
            {project.title}
          </h3>
          <div className="relative rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-purple-500/10 group-hover:bg-transparent transition-all duration-300"></div>
            <img
              src={project.image}
              alt={project.title}
              className="rounded-lg w-full transition-all duration-300 group-hover:scale-105"
            />
          </div>
          {renderProjectLinks(project, index)}
        </div>

        {/* Column B: Award + Description + Tech */}
        <div
          className={`md:col-span-6 md:px-6 ${reverseLayout ? "order-1 md:order-2" : ""
            }`}
        >
          {project.award && (
            <div className="flex items-center space-x-2 font-bold mb-4">
              {project.award.icon && (
                <span className="text-white text-xl">{project.award.icon}</span>
              )}
              {project.award.text && (
                <span className="text-purple-500 text-2xl inline-flex items-center">
                  {project.award.text}
                </span>
              )}
              {project.award.subtext && (
                <span
                  className={`text-xl ${darkMode ? "text-white" : "text-gray-900"
                    }`}
                >
                  {project.award.subtext}
                </span>
              )}
            </div>
          )}

          <p
            className={`mb-8 ${darkMode ? "text-gray-300" : "text-gray-600"
              } text-xl font-medium leading-relaxed`}
          >
            {project.description}
          </p>

          <div className="flex flex-wrap gap-3 mb-8">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className={`px-4 py-2 text-lg font-semibold rounded-full ${darkMode
                  ? "bg-purple-500/20 text-purple-200"
                  : "bg-purple-500/10 text-purple-800"
                  }`}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  };

  /**
   * Renders each "additional" project
   */
  const renderAdditionalProject = (project, index) => {
    return (
      <div
        key={index}
        className={`p-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] ${darkMode ? "bg-gray-800/50" : "bg-white"
          } shadow-lg hover:shadow-xl`}
      >
        <div className="flex items-center justify-between mb-4">
          <span className="text-purple-500 text-xl font-bold">
            {project.type}
          </span>
          <div className="flex space-x-4">
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`hover:text-purple-500 transition-colors ${darkMode ? "text-gray-300" : "text-gray-600"
                }`}
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href={project.externalLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`hover:text-purple-500 transition-colors ${darkMode ? "text-gray-300" : "text-gray-600"
                }`}
            >
              <ExternalLink className="w-6 h-6" />
            </a>
          </div>
        </div>

        <h3
          className={`text-2xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"
            }`}
        >
          {project.title}
        </h3>

        <p
          className={`mb-6 ${darkMode ? "text-gray-300" : "text-gray-600"
            } text-lg`}
        >
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech, i) => (
            <span
              key={i}
              className={`px-3 py-1 text-sm font-medium rounded-full ${darkMode
                ? "bg-purple-500/10 text-purple-300"
                : "bg-purple-500/5 text-purple-600"
                }`}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      {/* NAVBAR */}
      <nav className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-10 flex items-center transition-all duration-300 w-[95%] sm:w-auto ${visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}>
        <div className={`logo-3d absolute hidden sm:block ${hasAnimated ? "animation-done" : ""}`}
          style={{ left: "-280px" }}
        ></div>
        <div className={`${darkMode ? "bg-gray-800/90" : "bg-white"} rounded-full shadow-md px-4 sm:px-8 py-3 sm:py-4 flex items-center w-full sm:w-auto`}>
          <div className="flex items-center justify-between w-full sm:justify-start sm:space-x-4">
            <div className="flex items-center space-x-2">
              <button
                className="nav-link flex items-center"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                <Home className="w-5 h-5" />
              </button>
              <span className="text-gray-300 inline">/</span>
              <button
                className="nav-link text-sm sm:text-base"
                onClick={() => document.getElementById("about").scrollIntoView({ behavior: "smooth" })}
              >
                About
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-gray-300 inline">/</span>
              <button
                className="nav-link text-sm sm:text-base whitespace-nowrap"
                onClick={() => document.getElementById("experience").scrollIntoView({ behavior: "smooth" })}
              >
                Work
              </button>
              <span className="text-gray-300 inline">/</span>
              <button
                className="nav-link text-sm sm:text-base"
                onClick={() => document.getElementById("projects").scrollIntoView({ behavior: "smooth" })}
              >
                Projects
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-gray-300 inline">/</span>
              <button
                className="nav-link text-sm sm:text-base"
                onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" })}
              >
                Contact
              </button>
              <span className="text-gray-300 inline">/</span>
              <button onClick={toggleDarkMode} className="nav-link">
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT WRAPPER */}
      <div
        className={`${darkMode ? "bg-[#1a1a2e]" : "bg-gray-50"
          } font-urbanist transition-colors duration-300`}
      >
        {/* HERO SECTION */}
        <section className="min-h-screen flex flex-col justify-center max-w-7xl mx-auto px-6 sm:pl-50 py-20 sm:py-40">
          <div className="w-full sm:w-2/3">
            <h1 className={`text-4xl sm:text-7xl font-extrabold mb-6 ${darkMode ? "text-white" : "text-gray-900"
              }`}>
              Hello, <span className="gradient-text">I&apos;m Anahad</span>{" "}
              <span className="wave">👋</span>
            </h1>
            <p className={`text-xl sm:text-2xl ${darkMode ? "text-gray-300" : "text-gray-600"
              }`}>
              Computer Engineering Student @ University of Waterloo
            </p>
          </div>
        </section>
        {/* ABOUT SECTION */}
        <section
          id="about"
          className="min-h-screen flex flex-col justify-center px-6 max-w-7xl mx-auto py-20 sm:py-40"
        >
          <h2
            className={`text-4xl sm:text-6xl font-extrabold mb-8 sm:mb-16 relative ${darkMode ? 'text-white' : 'text-gray-900'
              }`}
          >
            <span className="text-purple-500 font-urbanist text-3xl sm:text-[50px]">
              01.
            </span>
            <span className="ml-2 text-3xl sm:text-[50px]">About Me</span>
            <div className="absolute -bottom-4 left-0 w-full h-px bg-gradient-to-r from-purple-500/40 to-transparent"></div>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* Text Content */}
            <div className="text-left">
              <p
                className={`text-lg sm:text-2xl font-medium leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}
              >
                Hi! I'm an 18-year-old student at UWaterloo. I grew up in Brampton and recently moved to Caledon. My love for programming started with creating 2D games in Java and evolved into building 3D games in Unity.
                <br />
                <br />
                When I'm not coding, I enjoy gaming, binge-watching shows, and following Formula 1 (let's go McLaren!). I love playing games like Fortnite and Rocket League. I also love participating in hackathons, since it lets me collaborate with others, tackle challenges, and build cool projects.
                <br />
                <br />
                I'm always looking to connect with people who share my passion. If you're interested in collaborating on a project or just want to chat, feel free to reach out! Also, check out {' '}
                <a
                  href="https://your-blog-url-here"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-500 hover:text-purple-400 transition-colors underline"
                  aria-label="Visit my blog where I share more about my interests and experiences beyond coding"
                >
                  my blog
                </a>{' '}
                where I share more about my interests and experiences beyond coding.
              </p>
            </div>

            {/* Image Content */}
            <div className="relative group mt-8 sm:mt-0">
              <div className="relative rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-purple-500/10 group-hover:bg-transparent transition-all duration-300"></div>
                <img
                  src="/api/placeholder/500/600"
                  alt="Anahad Dhaliwal"
                  className="w-full rounded-lg object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </div>
          </div>

        </section>


        {/* EXPERIENCE SECTION */}
        <section
          id="experience"
          className="min-h-screen py-20 sm:py-40 max-w-6xl mx-auto px-6"
        >
          <h2
            className={`text-4xl sm:text-6xl font-extrabold mb-8 sm:mb-16 relative ${darkMode ? "text-white" : "text-gray-900"
              }`}
          >
            <span className="text-purple-500 font-urbanist text-3xl sm:text-[50px]">
              02.
            </span>
            <span className="ml-2 text-3xl sm:text-[50px]">Work Experience</span>
            <div className="absolute -bottom-4 left-0 w-full h-[1px] bg-gradient-to-r from-purple-500/40 to-transparent"></div>
          </h2>

          <div className="relative">
            {/* Vertical Line (hidden on mobile) */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-[#9448ff] to-[#c861ff] opacity-20"></div>
            <div className="relative space-y-12 sm:space-y-24">
              {/* Timeline Item 1 - Prequel */}
              <div className="timeline-item flex flex-col md:flex-row md:justify-start w-full">
                <div className="w-full md:w-[700px] md:pr-16 relative">
                  <div className="hidden md:flex absolute right-0 top-1/2 transform translate-x-4 -translate-y-1/2 items-center">
                    <div className="w-6 h-1 bg-gradient-to-r from-[#9448ff] to-[#c861ff]" />
                    <img
                      src={prequellogo}
                      alt="Prequel Logo"
                      className={`w-12 h-12 object-contain ml-4 transition-opacity ${darkMode ? 'opacity-90' : 'opacity-100'
                        }`}
                    />
                  </div>
                  <div
                    className={`${darkMode ? "bg-gray-800" : "bg-white"
                      } p-5 sm:p-7 rounded-xl shadow-lg hover:shadow-xl transition-shadow`}
                  >
                    <div className="text-gray-400 text-sm sm:text-base font-medium mb-2">
                      JULY — AUG 2024
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="flex items-center flex-wrap text-xl sm:text-2xl font-bold">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={darkMode ? "text-white" : "text-gray-900"}>
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
                    </div>
                    <ul className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                      <li
                        className={`flex gap-3 ${darkMode ? "text-gray-300" : "text-gray-400"
                          } text-base sm:text-lg font-medium`}
                      >
                        <span className="text-[#9448ff] text-[16px] sm:text-[18px] mt-1 flex-shrink-0">
                          ▹
                        </span>
                        At Prequel, I worked closely with their Software Engineers to further develop their AI model, Poppy, as well as to create new features for their website. I learned some pretty cool things, ranging from web design to product analytics.
                      </li>
                      <li
                        className={`flex gap-3 ${darkMode ? "text-gray-300" : "text-gray-400"
                          } text-base sm:text-lg font-medium`}
                      >
                        <span className="text-[#9448ff] text-[16px] sm:text-[18px] mt-1 flex-shrink-0">
                          ▹
                        </span>
                        During my time, I developed a genetic algorithm that streamlined team assignments, saving up to 10 hours for student coordinators. I also trained their model by vector indexing over 30 hours of start-up meeting data, significantly improving its accuracy, and wrote a report analyzing the model's performance under various conditions.
                      </li>
                      <li
                        className={`flex gap-3 ${darkMode ? "text-gray-300" : "text-gray-400"
                          } text-base sm:text-lg font-medium`}
                      >
                        <span className="text-[#9448ff] text-[16px] sm:text-[18px] mt-1 flex-shrink-0">
                          ▹
                        </span>
                        Overall, this internship taught me a great deal about the market research aspect of software development, as we continuously implemented improvements based on consumer feedback.
                      </li>
                    </ul>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "React",
                        "Typescript",
                        "PostgresSQL",
                        "Python",
                        "Git",
                        "UI/UX",
                      ].map((skill) => (
                        <span
                          key={skill}
                          className={`px-2 sm:px-3 py-1 text-sm sm:text-base font-medium rounded-full ${darkMode
                            ? "bg-purple-500/10 text-purple-300"
                            : "bg-purple-500/5 text-purple-600"
                            }`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline Item 2 - Virtual Labs */}
              <div className="timeline-item flex flex-col md:flex-row md:justify-end w-full">
                <div className="w-full md:w-[700px] md:pl-16 relative md:mr-[10%]">

                  <div className="hidden md:flex absolute left-0 top-1/2 transform -translate-x-4 -translate-y-1/2 items-center">
                    <img
                      src={virtuallabs}
                      alt="Virtual Labs Logo"
                      className="w-8 h-8 object-contain mr-2"
                    />
                    <div className="w-6 h-1 bg-gradient-to-l from-[#9448ff] to-[#c861ff]" />
                  </div>

                  <div
                    className={`${darkMode ? "bg-gray-800" : "bg-white"
                      } p-5 sm:p-7 rounded-xl shadow-lg hover:shadow-xl transition-shadow`}
                  >
                    <div className="text-gray-400 text-sm sm:text-base font-medium mb-2">
                      SEPT 2023 — FEB 2024
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="flex items-center flex-wrap text-xl sm:text-2xl font-bold">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={darkMode ? "text-white" : "text-gray-900"}>
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
                    </div>
                    <ul className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                      <li
                        className={`flex gap-3 ${darkMode ? "text-gray-300" : "text-gray-400"
                          } text-base sm:text-lg font-medium`}
                      >
                        <span className="text-[#9448ff] text-[16px] sm:text-[18px] mt-1 flex-shrink-0">
                          ▹
                        </span>
                        Virtual Labs (previously known as Ontropy) was my first internship, where I got to learn about blockchain, smart contracts, and how it connects with game development. Working with José Betancourt, former Yale student, and his team of Harvard-educated software engineers was an eye-opening experience.
                      </li>
                      <li
                        className={`flex gap-3 ${darkMode ? "text-gray-300" : "text-gray-400"
                          } text-base sm:text-lg font-medium`}
                      >
                        <span className="text-[#9448ff] text-[16px] sm:text-[18px] mt-1 flex-shrink-0">
                          ▹
                        </span>
                        During my time there, I integrated their Unity Software Development Kit by developing a 3D First-Person Shooter in Unity, incorporating an in-game currency powered by smart contracts and blockchain technology. I identified and reported bugs or issues to the team prior to the Unity SDK's market release.
                      </li>
                      <li
                        className={`flex gap-3 ${darkMode ? "text-gray-300" : "text-gray-400"
                          } text-base sm:text-lg font-medium`}
                      >
                        <span className="text-[#9448ff] text-[16px] sm:text-[18px] mt-1 flex-shrink-0">
                          ▹
                        </span>
                        In the end, I learned a lot about cryptography, blockchain, and game development, and I got a better understanding of how cryptocurrency works. I also had the chance to meet a team of cryptography experts with PhDs, and talking to them was really inspiring.
                      </li>
                    </ul>
                    <div className="flex flex-wrap gap-2">
                      {["Unity", "C#", "Solidity", "Blockchain"].map((skill) => (
                        <span
                          key={skill}
                          className={`px-2 sm:px-3 py-1 text-sm sm:text-base font-medium rounded-full ${darkMode
                            ? "bg-purple-500/10 text-purple-300"
                            : "bg-purple-500/5 text-purple-600"
                            }`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline Item 3 - KeyTurn Digital */}
              <div className="timeline-item flex flex-col md:flex-row md:justify-start w-full">
                <div className="w-full md:w-[700px] md:pr-16 relative">
                  <div className="hidden md:flex absolute right-0 top-1/2 transform translate-x-4 -translate-y-1/2 items-center">
                    <div className="w-6 h-1 bg-gradient-to-r from-[#9448ff] to-[#c861ff]" />
                    <img
                      src={keyturndigital}
                      alt="KeyTurn Digital Logo"
                      className="w-8 h-8 object-contain ml-2"
                    />
                  </div>
                  <div
                    className={`${darkMode ? "bg-gray-800" : "bg-white"
                      } p-5 sm:p-7 rounded-xl shadow-lg hover:shadow-xl transition-shadow`}
                  >
                    <div className="text-gray-400 text-sm sm:text-base font-medium mb-2">
                      DEC 2022 — APR 2023
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="flex items-center flex-wrap text-xl sm:text-2xl font-bold">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={darkMode ? "text-white" : "text-gray-900"}>
                            Web Developer @
                          </span>
                          <span className="gradient-text">KeyTurn Digital</span>
                        </div>
                      </h3>
                    </div>
                    <ul className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                      <li
                        className={`flex gap-3 ${darkMode ? "text-gray-300" : "text-gray-400"
                          } text-base sm:text-lg font-medium`}
                      >
                        <span className="text-[#9448ff] text-[16px] sm:text-[18px] mt-1 flex-shrink-0">
                          ▹
                        </span>
                        Co-founded a web development startup through BETA Camp's entrepreneurship program, focusing on creating customized website solutions for young entrepreneurs. Led client communications and managed the full project lifecycle from requirements gathering to deployment.
                      </li>
                      <li
                        className={`flex gap-3 ${darkMode ? "text-gray-300" : "text-gray-400"
                          } text-base sm:text-lg font-medium`}
                      >
                        <span className="text-[#9448ff] text-[16px] sm:text-[18px] mt-1 flex-shrink-0">
                          ▹
                        </span>
                        Developed responsive and modern websites using React, Next.js, and Tailwind CSS, implementing custom features and integrations based on client requirements. Maintained consistent communication with clients to ensure satisfaction and timely delivery of projects.
                      </li>
                      <li
                        className={`flex gap-3 ${darkMode ? "text-gray-300" : "text-gray-400"
                          } text-base sm:text-lg font-medium`}
                      >
                        <span className="text-[#9448ff] text-[16px] sm:text-[18px] mt-1 flex-shrink-0">
                          ▹
                        </span>
                        Generated over $500 in revenue within 10 weeks and pitched to investors for $10K funding opportunity. Participated in exclusive mentorship sessions with industry leaders, including the CEO of Databricks and experienced software engineers from top tech companies.
                      </li>
                    </ul>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "React",
                        "Next.js",
                        "Tailwind CSS",
                        "Entrepreneurship",
                        "Client Relations",
                      ].map((skill) => (
                        <span
                          key={skill}
                          className={`px-2 sm:px-3 py-1 text-sm sm:text-base font-medium rounded-full ${darkMode
                            ? "bg-purple-500/10 text-purple-300"
                            : "bg-purple-500/5 text-purple-600"
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
        {/* PROJECTS SECTION */}
        <section
          id="projects"
          className="min-h-screen py-20 sm:py-40 max-w-7xl mx-auto px-6 sm:px-12"
        >
          <h2
            className={`text-4xl sm:text-7xl font-extrabold mb-8 sm:mb-16 relative ${darkMode ? "text-white" : "text-gray-900"
              }`}
          >
            <span className="text-purple-500 font-urbanist text-3xl sm:text-[50px]">
              03.
            </span>
            <span className="ml-2 text-3xl sm:text-[50px]">Stuff I&apos;ve built</span>
            <div className="absolute -bottom-4 left-0 w-full h-[1px] bg-gradient-to-r from-purple-500/40 to-transparent"></div>
          </h2>

          {/* Main Projects */}
          <div className="space-y-20 sm:space-y-40">
            {mainProjects.map((project, index) => (
              <div
                key={index}
                className="relative grid md:grid-cols-12 gap-4 sm:gap-8 items-start"
              >
                {/* Column A: Image + Title + Links */}
                <div
                  className={`md:col-span-6 relative group ${index % 2 === 1 ? "order-2 md:order-1" : ""
                    }`}
                >
                  <h3
                    className={`text-2xl sm:text-4xl font-extrabold mb-4 sm:mb-6 ${darkMode ? "text-white" : "text-purple-500"
                      }`}
                  >
                    {project.title}
                  </h3>
                  <div className="relative rounded-lg overflow-hidden">
                    <div className="absolute inset-0 bg-purple-500/10 group-hover:bg-transparent transition-all duration-300"></div>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="rounded-lg w-full transition-all duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex gap-4 sm:gap-6 mt-6 sm:mt-8">
                    {index !== 0 && project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`hover:text-purple-500 transition-colors ${darkMode ? "text-gray-300" : "text-gray-600"
                          }`}
                        aria-label="View GitHub Repository"
                      >
                        <Github className="w-6 sm:w-8 h-6 sm:h-8 flex-shrink-0" />
                      </a>
                    )}
                    {index !== 1 && index !== 2 && project.externalLink && (
                      <a
                        href={project.externalLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`hover:text-purple-500 transition-colors flex items-center gap-2 ${darkMode ? "text-gray-300" : "text-gray-600"
                          }`}
                        aria-label="View Certificate"
                      >
                        <ExternalLink className="w-6 sm:w-8 h-6 sm:h-8 flex-shrink-0" />
                        <span className="text-base sm:text-lg font-semibold">
                          View Certificate
                        </span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Column B: Award + Description + Tech */}
                <div
                  className={`md:col-span-6 md:px-6 mt-6 md:mt-0 ${index % 2 === 1 ? "order-1 md:order-2" : ""
                    }`}
                >
                  {project.award && (
                    <div className="flex items-center space-x-2 font-bold mb-4">
                      {project.award.icon && (
                        <span className="text-white text-lg sm:text-xl">
                          {project.award.icon}
                        </span>
                      )}
                      {project.award.text && (
                        <span className="text-purple-500 text-xl sm:text-2xl inline-flex items-center">
                          {project.award.text}
                        </span>
                      )}
                      {project.award.subtext && (
                        <span
                          className={`text-lg sm:text-xl ${darkMode ? "text-white" : "text-gray-900"
                            }`}
                        >
                          {project.award.subtext}
                        </span>
                      )}
                    </div>
                  )}

                  <p
                    className={`mb-6 sm:mb-8 ${darkMode ? "text-gray-300" : "text-gray-600"
                      } text-base sm:text-xl font-medium leading-relaxed`}
                  >
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className={`px-3 py-1 text-sm sm:text-lg font-semibold rounded-full ${darkMode
                          ? "bg-purple-500/20 text-purple-200"
                          : "bg-purple-500/10 text-purple-800"
                          }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Projects */}
          <div className="mt-20 sm:mt-32">
            {showMore && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16 animate-reveal">
                {additionalProjects.map((project, index) => (
                  <div
                    key={index}
                    className={`p-6 sm:p-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] ${darkMode ? "bg-gray-800/50" : "bg-white"
                      } shadow-lg hover:shadow-xl`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-purple-500 text-lg sm:text-xl font-bold">
                        {project.type}
                      </span>
                      <div className="flex space-x-4">
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`hover:text-purple-500 transition-colors ${darkMode ? "text-gray-300" : "text-gray-600"
                            }`}
                        >
                          <Github className="w-5 sm:w-6 h-5 sm:h-6" />
                        </a>
                        {project.externalLink && (
                          <a
                            href={project.externalLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`hover:text-purple-500 transition-colors ${darkMode ? "text-gray-300" : "text-gray-600"
                              }`}
                          >
                            <ExternalLink className="w-5 sm:w-6 h-5 sm:h-6" />
                          </a>
                        )}
                      </div>
                    </div>

                    <h3
                      className={`text-xl sm:text-2xl font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"
                        }`}
                    >
                      {project.title}
                    </h3>

                    <p
                      className={`mb-6 ${darkMode ? "text-gray-300" : "text-gray-600"
                        } text-base sm:text-lg`}
                    >
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className={`px-3 py-1 text-sm font-medium rounded-full ${darkMode
                            ? "bg-purple-500/10 text-purple-300"
                            : "bg-purple-500/5 text-purple-600"
                            }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex justify-center mt-12 sm:mt-16">
              <button
                onClick={() => setShowMore(!showMore)}
                className={`group relative px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 ${darkMode
                  ? "bg-purple-500/20 text-purple-300 hover:bg-purple-500/30"
                  : "bg-purple-100 text-purple-700 hover:bg-purple-200"
                  } transform hover:scale-105 hover:shadow-lg`}
              >
                <span className="relative z-10">
                  {showMore ? "Show Less" : "View More"}
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section
          id="contact"
          className="min-h-screen flex flex-col justify-center py-16 sm:py-20 max-w-6xl mx-auto px-4 sm:px-6"
        >
          <h2
            className={`text-4xl sm:text-6xl font-extrabold mb-8 sm:mb-16 relative ${darkMode ? "text-white" : "text-gray-900"
              }`}
          >
            <span className="text-purple-500 font-urbanist text-3xl sm:text-[50px]">
              04.
            </span>
            <span className="ml-2 text-3xl sm:text-[50px]">Get in Touch</span>
            <div className="absolute -bottom-4 left-0 w-full h-[1px] bg-gradient-to-r from-purple-500/40 to-transparent"></div>
          </h2>

          <div>
            <p
              className={`mb-8 sm:mb-12 ${darkMode ? "text-gray-300" : "text-gray-700"
                } font-medium leading-snug text-2xl sm:text-[36px] text-left max-w-full sm:max-w-[90%]`}
            >
              I&apos;m currently{" "}
              <span className="gradient-text">open to new opportunities</span>, so feel
              free to reach out! Whether you have a question, a potential role, or just
              want to connect, I&apos;ll do my best to get back to you.
            </p>

            {/* Social Links */}
            <div className="flex justify-center items-center space-x-6 sm:space-x-12 max-w-3xl mx-auto">
              {/* GitHub */}
              <a
                href="https://github.com/Anahadd"
                target="_blank"
                rel="noopener noreferrer"
                className={`hover:text-purple-500 transition-colors group ${darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
              >
                <Github className="w-8 h-8 sm:w-12 sm:h-12 group-hover:scale-110 transition-transform" />
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/anahad/"
                target="_blank"
                rel="noopener noreferrer"
                className={`hover:text-purple-500 transition-colors group ${darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
              >
                <Linkedin className="w-8 h-8 sm:w-12 sm:h-12 group-hover:scale-110 transition-transform" />
              </a>

              {/* Email */}
              <a
                href="mailto:addhaliw@uwaterloo.ca"
                className={`hover:text-purple-500 transition-colors group ${darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
              >
                <Mail className="w-8 h-8 sm:w-12 sm:h-12 group-hover:scale-110 transition-transform" />
              </a>

              {/* Devpost */}
              <a
                href="https://devpost.com/Anahad06"
                target="_blank"
                rel="noopener noreferrer"
                className={`hover:text-purple-500 transition-colors group ${darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
              >
                <Award className="w-8 h-8 sm:w-12 sm:h-12 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-auto pt-8 sm:pt-10 pb-4 text-center">
            <p
              className={`text-xs sm:text-sm font-medium ${darkMode ? "text-gray-400" : "text-gray-500"
                }`}
            >
              Built &amp; Designed by Anahad Dhaliwal © {new Date().getFullYear()}
            </p>
          </footer>
        </section>



      </div>

      {/* GLOBAL STYLES */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Urbanist:wght@400;500;700;800&display=swap");

        html {
          scroll-behavior: smooth;
          overflow-x: hidden;
          height: 100%;
        }

        body {
          margin: 0;
          padding: 0;
          font-family: "Urbanist", sans-serif;
          min-height: 100%;
          overflow-x: hidden;
        }

        /* Prevent scrolling past the last section */
        #contact {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          padding-bottom: 0;
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
          color: ${darkMode ? "rgb(209, 213, 219)" : "#4b5563"};
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

        .no-scrollbar {
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
        }
        
        .no-scrollbar::-webkit-scrollbar {
        display: none;  /* Chrome, Safari and Opera */
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

