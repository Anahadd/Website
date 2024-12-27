import React, { useState, useEffect } from 'react';
import {
  Home,
  Sun,
  Moon,
  Github,
  ExternalLink,
  Linkedin,
  Mail,
  Award
} from 'lucide-react';
import hosaImage from './models/hosa_healthcare.png'
import p2 from './models/hosa_healthcare.png'
import p3 from './models/hosa_healthcare.png'
import p4 from './models/hosa_healthcare.png'

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
        "Built with the MERN stack (MongoDB, Express, React, Node.js), this AI-powered tool pulls hospital and healthcare provider data from an external API, then helps users find nearby hospitals suited to their needs. It aims to reduce wait times, connect patients with the right specialists, and offer a more efficient healthcare experience.",
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
      title: "CryptoTrader Pro",
      description:
        "An advanced cryptocurrency trading platform that leverages ML to predict market trends and execute automated trades, integrating with multiple exchanges.",
      image: p3,
      award: {
        icon: "🌟",
        text: "Best Tech Innovation",
        subtext: "ETHGlobal 2023",
      },
      technologies: [
        "Python",
        "TensorFlow",
        "PostgreSQL",
        "FastAPI",
        "React",
        "Web3.js",
        "Docker",
      ],
      githubLink: "https://github.com/yourusername/cryptotrader",
      externalLink: "https://cryptotrader-demo.com",
    },
    {
      title: "UniFlow - AI Coaching App",
      description:
        "UniFlow is an AI-powered platform for managing university applications. It helps students streamline the process with features like personalized scholarship matching, AI-driven mock interviews, and contextual essay writing assistance.",
      image: p2,
      award: {
        text: "Ignition Hacks Project",
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
      externalLink: "https://your-project-demo-link.com",
    },
  ];

  // Additional Projects
  const additionalProjects = [
    {
      type: "🏆 1st Place - BearHacks",
      title: "Arduino-based Thermochromic Printer",
      description:
        "This Arduino-powered thermochromic printer was designed for an eco-friendly hackathon to reduce paper waste. By applying precise heat to thermochromic ink, it erases existing text and reverts used sheets back to a clean state, providing a low-cost, sustainable alternative for everyday printing needs.",
      technologies: ["Arduino", "C/C++", "Hardware Design"],
      githubLink: "https://github.com/yourusername/csv-to-json",
    },
    {
      type: "NewHacks 2023 Project",
      title: "CrisisCompass - Web App",
      description:
        "CrisisCompass is a web app that helps first responders manage emergencies by gathering real-time data from social media, news, and alerts, through web-scraping. It displays this information on a React dashboard with clear labels for urgency and severity, using Flask and Axios to process and update data quickly.",
      technologies: ["Python", "Flask", "JavaScript", "React", "MongoDB"],
      githubLink: "https://github.com/yourusername/image-resizer",
      externalLink: "https://your-image-resizer-demo.com",
    },
    {
      type: "2D Java Game",
      title: "The HolyGrail",
      description:
        "HolyGrail is a top-down 2D adventure game built in Java. Players navigate through a dynamic world, battling enemies, collecting the Holy Grail, and restoring peace. The game features random enemy spawning, a multi-class object-oriented structure for efficient code organization, and timers for gameplay mechanics like enemy movement and attack intervals. The project demonstrates skills in game design, Java programming, and implementing interactive gameplay systems.",
      technologies: ["Java", "Java Swing", "Game Development"],
      githubLink: "https://github.com/yourusername/image-resizer",
    },
    {
      type: "Project Studio Course - ECE 198",
      title: "SecureEdu",
      description:
        "SecureEdu is an encrypted educational platform utilizing STM32 Nucleo microcontrollers and AES-128/256 encryption to securely distribute textbook sections and hints. Features include a 4x4 keypad for access key entry, LCD displays with real-time feedback, and UART-based communication for reliable operations. The platform emphasizes secure content management, real-time interaction, and encryption, enhancing independent learning and minimizing unauthorized sharing.",
      technologies: ["C/C++", "STM32", "Hardware Design"],
      githubLink: "https://github.com/yourusername/image-resizer",
      externalLink: "https://your-image-resizer-demo.com",
    }
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
            className={`hover:text-purple-500 transition-colors ${
              darkMode ? "text-gray-300" : "text-gray-600"
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
            className={`hover:text-purple-500 transition-colors ${
              darkMode ? "text-gray-300" : "text-gray-600"
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
          className={`md:col-span-6 relative group ${
            reverseLayout ? "order-2 md:order-1" : ""
          }`}
        >
          <h3
            className={`text-4xl font-extrabold mb-6 ${
              darkMode ? "text-white" : "text-purple-500"
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
          className={`md:col-span-6 md:px-6 ${
            reverseLayout ? "order-1 md:order-2" : ""
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
                  className={`text-xl ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {project.award.subtext}
                </span>
              )}
            </div>
          )}

          <p
            className={`mb-8 ${
              darkMode ? "text-gray-300" : "text-gray-600"
            } text-xl font-medium leading-relaxed`}
          >
            {project.description}
          </p>

          <div className="flex flex-wrap gap-3 mb-8">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className={`px-4 py-2 text-lg font-semibold rounded-full ${
                  darkMode
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
        className={`p-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] ${
          darkMode ? "bg-gray-800/50" : "bg-white"
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
              className={`hover:text-purple-500 transition-colors ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href={project.externalLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`hover:text-purple-500 transition-colors ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              <ExternalLink className="w-6 h-6" />
            </a>
          </div>
        </div>

        <h3
          className={`text-2xl font-bold mb-4 ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          {project.title}
        </h3>

        <p
          className={`mb-6 ${
            darkMode ? "text-gray-300" : "text-gray-600"
          } text-lg`}
        >
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech, i) => (
            <span
              key={i}
              className={`px-3 py-1 text-sm font-medium rounded-full ${
                darkMode
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
      <nav
        className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-10 flex items-center transition-all duration-300 ${
          visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        <div
          className={`logo-3d absolute ${hasAnimated ? "animation-done" : ""}`}
          style={{ left: "-280px" }}
        ></div>
        <div
          className={`${
            darkMode ? "bg-gray-800/90" : "bg-white"
          } rounded-full shadow-md px-8 py-4 flex items-center`}
        >
          <div className="flex items-center space-x-4">
            <button
              className="nav-link flex items-center"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <Home className="w-5 h-5" />
            </button>
            <span className="text-gray-300">/</span>
            <button
              className="nav-link"
              onClick={() =>
                document.getElementById("about").scrollIntoView({
                  behavior: "smooth"
                })
              }
            >
              About Me
            </button>
            <span className="text-gray-300">/</span>
            <button
              className="nav-link"
              onClick={() =>
                document
                  .getElementById("experience")
                  .scrollIntoView({ behavior: "smooth" })
              }
            >
              Work Experience
            </button>
            <span className="text-gray-300">/</span>
            <button
              className="nav-link"
              onClick={() =>
                document.getElementById("projects").scrollIntoView({
                  behavior: "smooth"
                })
              }
            >
              Projects
            </button>
            <span className="text-gray-300">/</span>
            <button
              className="nav-link"
              onClick={() =>
                document.getElementById("contact").scrollIntoView({
                  behavior: "smooth"
                })
              }
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

      {/* MAIN CONTENT WRAPPER */}
      <div
        className={`${
          darkMode ? "bg-[#1a1a2e]" : "bg-gray-50"
        } font-urbanist transition-colors duration-300`}
      >
        {/* HERO SECTION */}
        <section className="min-h-screen flex flex-col justify-center max-w-7xl mx-auto pl-50 py-40">
          <div className="w-2/3">
            <h1
              className={`text-7xl font-extrabold mb-6 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Hello, <span className="gradient-text">I&apos;m Anahad</span>{" "}
              <span className="wave">👋</span>
            </h1>
            <p
              className={`text-2xl ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Computer Engineering Student @ University of Waterloo
            </p>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section
          id="about"
          className="min-h-screen flex flex-col justify-center px-6 max-w-7xl mx-auto py-40"
        >
          <h2
            className={`text-6xl font-extrabold mb-16 relative ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            <span
              className="text-purple-500 font-urbanist"
              style={{ fontSize: "50px" }}
            >
              01.
            </span>
            <span className="ml-2" style={{ fontSize: "50px" }}>
              About Me
            </span>
            <div className="absolute -bottom-4 left-0 w-full h-[1px] bg-gradient-to-r from-purple-500/40 to-transparent"></div>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <p
                className={`text-2xl font-medium leading-relaxed ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                I am an 18 year old student at UWaterloo. I grew up in Brampton
                but have since moved to Caledon (thankfully). My passion for
                programming began with game development, starting from 2D games
                in Java and progressing to creating 3D games in Unity. While
                continuing to advance my game development skills, I&apos;ve
                learned more about AI and blockchain technologies.
                <br />
                <br />
                Outside of coding, I&apos;m a Formula 1 fan (let&apos;s go
                McLaren!) and enjoy competitive gaming, particularly OG Fortnite
                and Rocket League. I recently started{" "}
                <a
                  href="your-blog-url-here"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-500 hover:text-purple-400 transition-colors underline"
                >
                  a blog
                </a>{" "}
                where I share more about my personal interests and experiences
                beyond my professional work. Be sure to check it out!
              </p>
            </div>

            <div className="relative group">
              <div className="relative rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-purple-500/10 group-hover:bg-transparent transition-all duration-300"></div>
                <img
                  src="/api/placeholder/500/600"
                  alt="Anahad Dhaliwal"
                  className="w-full rounded-lg object-cover transition-all duration-300 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </section>

        {/* EXPERIENCE SECTION */}
        <section
  id="experience"
  className="min-h-screen py-40 max-w-6xl mx-auto"
>
  <h2
    className={`text-6xl font-extrabold mb-16 relative ${
      darkMode ? "text-white" : "text-gray-900"
    }`}
  >
    <span
      className="text-purple-500 font-urbanist"
      style={{ fontSize: "50px" }}
    >
      02.
    </span>
    <span className="ml-2" style={{ fontSize: "50px" }}>
      Work Experience
    </span>
    <div className="absolute -bottom-4 left-0 w-full h-[1px] bg-gradient-to-r from-purple-500/40 to-transparent"></div>
  </h2>

  <div className="relative">
    {/* The vertical line in background */}
    <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-[#9448ff] to-[#c861ff] opacity-20" />
    
    <div className="relative space-y-24">
      {/* Timeline Item 1 - Prequel */}
      <div className="timeline-item opacity-0 flex justify-start w-full">
        <div className="w-[700px] pr-16 relative">
          <div className="absolute right-0 top-1/2 transform translate-x-4 -translate-y-1/2 w-16 h-1 bg-gradient-to-r from-[#9448ff] to-[#c861ff]" />
          <div className={`${darkMode ? "bg-gray-800" : "bg-white"} p-7 rounded-xl shadow-lg hover:shadow-xl transition-shadow`}>
            <div className="text-gray-400 text-base font-medium mb-2">
              JULY — AUG 2024
            </div>
            <h3 className="flex items-center whitespace-nowrap text-2xl font-bold mb-4">
              <div className="flex items-center gap-2">
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

            <ul className="space-y-4 mb-6">
              <li className={`flex gap-3 ${darkMode ? "text-gray-300" : "text-gray-400"} text-lg font-medium`}>
                <span className="text-[#9448ff] text-[18px] mt-1">▹</span>
                At Prequel, I worked closely with their Software Engineers to further develop their AI model, Poppy, as well as to create new features for their website. I learned some pretty cool things, ranging from web design to product analytics.
              </li>
              <li className={`flex gap-3 ${darkMode ? "text-gray-300" : "text-gray-400"} text-lg font-medium`}>
                <span className="text-[#9448ff] text-[18px] mt-1">▹</span>
                During my time, I developed a genetic algorithm that streamlined team assignments, saving up to 10 hours for student coordinators. I also trained their model by vector indexing over 30 hours of start-up meeting data, significantly improving its accuracy, and wrote a report analyzing the model's performance under various conditions.
              </li>
              <li className={`flex gap-3 ${darkMode ? "text-gray-300" : "text-gray-400"} text-lg font-medium`}>
                <span className="text-[#9448ff] text-[18px] mt-1">▹</span>
                Overall, this internship taught me a great deal about the market research aspect of software development, as we continuously implemented improvements based on consumer feedback.
              </li>
            </ul>

            <div className="flex flex-wrap gap-2">
              {["React", "Typescript", "PostgresSQL", "Python", "Git", "UI/UX"].map((skill) => (
                <span
                  key={skill}
                  className={`px-3 py-1 text-base font-medium rounded-full ${
                    darkMode
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
      <div className="timeline-item opacity-0 flex justify-end w-full">
        <div className="w-[700px] pl-16 relative mr-[10%]">
          <div className="absolute left-0 top-1/2 transform -translate-x-4 -translate-y-1/2 w-16 h-1 bg-gradient-to-l from-[#9448ff] to-[#c861ff]" />
          <div className={`${darkMode ? "bg-gray-800" : "bg-white"} p-7 rounded-xl shadow-lg hover:shadow-xl transition-shadow`}>
            <div className="text-gray-400 text-base font-medium mb-2">
              SEPT 2023 — FEB 2024
            </div>
            <h3 className="flex items-center whitespace-nowrap text-2xl font-bold mb-4">
              <div className="flex items-center gap-2">
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

            <ul className="space-y-4 mb-6">
              <li className={`flex gap-3 ${darkMode ? "text-gray-300" : "text-gray-400"} text-lg font-medium`}>
                <span className="text-[#9448ff] text-[18px] mt-1">▹</span>
                Virtual Labs (previously known as Ontropy) was my first internship, where I got to learn about blockchain, smart contracts, and how it connects with game development. Working with José Betancourt, former Yale student, and his team of Harvard-educated software engineers was an eye-opening experience.
              </li>
              <li className={`flex gap-3 ${darkMode ? "text-gray-300" : "text-gray-400"} text-lg font-medium`}>
                <span className="text-[#9448ff] text-[18px] mt-1">▹</span>
                During my time there, I integrated their Unity Software Development Kit by developing a 3D First-Person Shooter in Unity, incorporating an in-game currency powered by smart contracts and blockchain technology. I identified and reported bugs or issues to the team prior to the Unity SDK's market release.
              </li>
              <li className={`flex gap-3 ${darkMode ? "text-gray-300" : "text-gray-400"} text-lg font-medium`}>
                <span className="text-[#9448ff] text-[18px] mt-1">▹</span>
                In the end, I learned a lot about cryptography, blockchain, and game development, and I got a better understanding of how cryptocurrency works. I also had the chance to meet a team of cryptography experts with PhDs, and talking to them was really inspiring.
              </li>
            </ul>

            <div className="flex flex-wrap gap-2">
              {["Unity", "C#", "Solidity", "Git", "Blockchain", "Smart Contracts"].map((skill) => (
                <span
                  key={skill}
                  className={`px-3 py-1 text-base font-medium rounded-full ${
                    darkMode
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

      {/* Timeline Item 3 - Your New Position */}
      <div className="timeline-item opacity-0 flex justify-start w-full">
        <div className="w-[700px] pr-16 relative">
          <div className="absolute right-0 top-1/2 transform translate-x-4 -translate-y-1/2 w-16 h-1 bg-gradient-to-r from-[#9448ff] to-[#c861ff]" />
          <div className={`${darkMode ? "bg-gray-800" : "bg-white"} p-7 rounded-xl shadow-lg hover:shadow-xl transition-shadow`}>
            <div className="text-gray-400 text-base font-medium mb-2">
              DEC 2022 — APR 2023
            </div>
            <h3 className="flex items-center whitespace-nowrap text-2xl font-bold mb-4">
              <div className="flex items-center gap-2">
                <span className={darkMode ? "text-white" : "text-gray-900"}>
                  Web Developer @
                </span>
                <a
                  className="gradient-text hover:opacity-80 transition-opacity inline-flex items-center gap-1"
                >
                  KeyTurn Digital
                </a>
              </div>
            </h3>

            <ul className="space-y-4 mb-6">
              <li className={`flex gap-3 ${darkMode ? "text-gray-300" : "text-gray-400"} text-lg font-medium`}>
                <span className="text-[#9448ff] text-[18px] mt-1">▹</span>
                Co-founded a web development startup through BETA Camp's entrepreneurship program, focusing on creating customized website solutions for young entrepreneurs. Led client communications and managed the full project lifecycle from requirements gathering to deployment.
              </li>
              <li className={`flex gap-3 ${darkMode ? "text-gray-300" : "text-gray-400"} text-lg font-medium`}>
                <span className="text-[#9448ff] text-[18px] mt-1">▹</span>
                Developed responsive and modern websites using React, Next.js, and Tailwind CSS, implementing custom features and integrations based on client requirements. Maintained consistent communication with clients to ensure satisfaction and timely delivery of projects.
              </li>
              <li className={`flex gap-3 ${darkMode ? "text-gray-300" : "text-gray-400"} text-lg font-medium`}>
                <span className="text-[#9448ff] text-[18px] mt-1">▹</span>
                Generated over $500 in revenue within 10 weeks and pitched to investors for $10K funding opportunity. Participated in exclusive mentorship sessions with industry leaders, including the CEO of Databricks and experienced software engineers from top tech companies.
              </li>
            </ul>
            <div className="flex flex-wrap gap-2">
              {["React", "Next.js", "Tailwind CSS", "Client Relations", "Entrepreneurship"].map((skill) => (
                <span
                  key={skill}
                  className={`px-3 py-1 text-base font-medium rounded-full ${
                    darkMode
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
          className="min-h-screen py-40 max-w-7xl mx-auto px-12"
        >
          <h2
            className={`text-7xl font-extrabold mb-16 relative ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            <span
              className="text-purple-500 font-urbanist"
              style={{ fontSize: "50px" }}
            >
              03.
            </span>
            <span className="ml-2" style={{ fontSize: "50px" }}>
              Stuff I&apos;ve built
            </span>
            <div className="absolute -bottom-4 left-0 w-full h-[1px] bg-gradient-to-r from-purple-500/40 to-transparent"></div>
          </h2>

          {/* Main Projects */}
          {/* Reduced spacing from space-y-64 to space-y-40 */}
          <div className="space-y-40">
            {mainProjects.map((project, index) => renderMainProject(project, index))}
          </div>

          {/* Additional Projects */}
          <div className="mt-32">
            {showMore && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16 animate-reveal">
                {additionalProjects.map((project, index) =>
                  renderAdditionalProject(project, index)
                )}
              </div>
            )}

            <div className="flex justify-center mt-16">
              <button
                onClick={() => setShowMore(!showMore)}
                className={`group relative px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300
                  ${
                    darkMode
                      ? "bg-purple-500/20 text-purple-300 hover:bg-purple-500/30"
                      : "bg-purple-100 text-purple-700 hover:bg-purple-200"
                  }
                  transform hover:scale-105 hover:shadow-lg`}
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
          className="min-h-screen flex flex-col justify-center py-20 max-w-6xl mx-auto"
        >
          <h2
            className={`text-6xl font-extrabold mb-16 relative ${
              darkMode ? "text-white" : "text-gray-900"
            }`}
          >
            <span className="text-purple-500 font-urbanist" style={{ fontSize: 50 }}>
              04.
            </span>
            <span className="ml-2" style={{ fontSize: 50 }}>
              Get in Touch
            </span>
            <div className="absolute -bottom-4 left-0 w-full h-[1px] bg-gradient-to-r from-purple-500/40 to-transparent"></div>
          </h2>

          <div className="px-6">
            <p
              className={`mb-12 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              } font-medium leading-snug text-[36px] text-left max-w-[90%]`}
            >
              I&apos;m currently{" "}
              <span className="gradient-text">open to new opportunities</span>,
              so feel free to reach out! Whether you have a question, a potential
              role, or just want to connect, I&apos;ll do my best to get back to
              you.
            </p>

            <div className="flex justify-center items-center space-x-12 max-w-3xl mx-auto">
              <a
                href="https://github.com/Anahadd"
                target="_blank"
                rel="noopener noreferrer"
                className={`hover:text-purple-500 transition-colors group ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                <Github className="w-12 h-12 group-hover:scale-110 transition-transform" />
              </a>

              <a
                href="https://www.linkedin.com/in/anahad/"
                target="_blank"
                rel="noopener noreferrer"
                className={`hover:text-purple-500 transition-colors group ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                <Linkedin className="w-12 h-12 group-hover:scale-110 transition-transform" />
              </a>

              <a
                href="mailto:addhaliw@uwaterloo.ca"
                className={`hover:text-purple-500 transition-colors group ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                <Mail className="w-12 h-12 group-hover:scale-110 transition-transform" />
              </a>

              <a
                href="https://devpost.com/Anahad06"
                target="_blank"
                rel="noopener noreferrer"
                className={`hover:text-purple-500 transition-colors group ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                <Award className="w-12 h-12 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          <footer className="mt-auto pt-10 pb-4 text-center">
            <p
              className={`text-sm font-medium ${
                darkMode ? "text-gray-400" : "text-gray-500"
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
