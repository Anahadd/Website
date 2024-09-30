import React, { useEffect, useState } from 'react';
import './App.css';
import { FaGithub, FaLinkedin, FaEnvelope, FaFilePdf } from 'react-icons/fa';

function App() {
  const [text, setText] = useState('');
  const fullText = "Anahad Dhaliwal";

  useEffect(() => {
    let index = 0;
    setText('');

    const typeText = () => {
      if (index < fullText.length) {
        setText(fullText.slice(0, index + 1));
        index++;
      }
    };

    const timer = setInterval(typeText, 150);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="container">
      <nav className="navMenu">
        <a href="#home">Home</a>
        <a href="#about">About Me</a>
        <a href="#work">Work Experience</a>
        <a href="#projects">Project Experience</a>
      </nav>
      
      <section id="home" className="hero">
        <div className="hero-content">
          <p className="greeting">Hey There <span role="img" aria-label="wave">👋</span></p>
          <div className="name-container">
            <span className="normal-text">I'm </span>
            <h1 className="name-gradient">{text}</h1>
          </div>
          {/* New subtitle for student information */}
          <p className="student-info">Computer Engineering Student at the University of Waterloo</p>
        </div>
        <div className="social-icons">
          <a href="https://github.com/Anahad06" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
          <a href="https://linkedin.com/in/anahad" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
          <a href="mailto:addhaliw@waterloo.ca" target="_blank" rel="noopener noreferrer"><FaEnvelope /></a>
          <a href="/anahad-3.pdf" download="anahad-3.pdf" target="_blank" rel="noopener noreferrer">
            <FaFilePdf />
          </a>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="section-layout">
        <div className="section-header">
          <h2 className="about-gradient">ABOUT ME</h2>
        </div>
        <div className="section-content">
          <div className="section-left">
            <p>Computer Engineering Student at the University of Waterloo</p>
          </div>
          <div className="section-right">
            <img src="/path-to-your-image.jpg" alt="Your portrait" />
          </div>
        </div>
      </section>

      {/* Work Experience Section */}
      <section id="work" className="section-layout">
        <div className="section-header">
          <h2 className="work-gradient">WORK EXPERIENCE</h2>
        </div>
        <div className="section-content">
          <div className="section-left">
            <p>Details about your work experience.</p>
          </div>
          <div className="section-right">
            {/* Links, videos, or other content */}
          </div>
        </div>
      </section>

      {/* Project Experience Section */}
      <section id="projects" className="section-layout">
        <div className="section-header">
          <h2 className="project-gradient">PROJECT EXPERIENCE</h2>
        </div>
        <div className="section-content">
          <div className="section-left">
            <p>Details about your project experience.</p>
          </div>
          <div className="section-right">
            {/* Links, videos, or other content */}
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
