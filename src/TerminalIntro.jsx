import React, { useState, useEffect, useRef } from 'react';
import { useTypewriter, Cursor } from 'react-simple-typewriter';
import { useNavigate } from 'react-router-dom';
import SnakeGame from './SnakeGame';
import DinoGame from './DinoGame';
import Donut from './Donut';
import TetrisGame from './TetrisGame';  

// Define container sizes for different games/animations
const containerSizes = {
  default: {
    width: Math.min(600, window.innerWidth - 40),
    height: Math.min(400, window.innerHeight * 0.7),
    maxWidth: '600px',
    maxHeight: '70vh',
  },
  snake: {
    width: Math.min(600, window.innerWidth - 40),
    height: Math.min(400, window.innerHeight * 0.7),
    maxWidth: '600px',
    maxHeight: '70vh',
  },
  dino: {
    width: Math.min(800, window.innerWidth - 40),
    height: Math.min(400, window.innerHeight * 0.7),
    maxWidth: '800px',
    maxHeight: '70vh',
  },
  donut: {
    width: Math.min(600, window.innerWidth - 40),
    height: Math.min(500, window.innerHeight * 0.9),
    maxWidth: '400px',
    maxHeight: '50vh',
  },
  matrix: {
    width: Math.min(600, window.innerWidth - 40),
    height: Math.min(400, window.innerHeight * 0.7),
    maxWidth: '600px',
    maxHeight: '70vh',
  },
  tetris: {
    width: Math.min(400, window.innerWidth - 40),
    height: Math.min(800, window.innerHeight * 0.9),
    maxWidth: '400px',
    maxHeight: '90vh',
  }
};

const TerminalIntro = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [showPrompt, setShowPrompt] = useState(false);
  const [terminalLines, setTerminalLines] = useState([]);
  const [isPlayingSnake, setIsPlayingSnake] = useState(false);
  const [isPlayingDino, setIsPlayingDino] = useState(false);
  const [isMatrixActive, setIsMatrixActive] = useState(false);
  const [isShowingDonut, setIsShowingDonut] = useState(false);
  const [skipIntro, setSkipIntro] = useState(false);
  const [matrixChars, setMatrixChars] = useState([]);
  const [isPlayingTetris, setIsPlayingTetris] = useState(false);

  const terminalRef = useRef(null);
  const inputRef = useRef(null);

  const getCurrentGame = () => {
    if (isPlayingSnake) return 'snake';
    if (isPlayingDino) return 'dino';
    if (isShowingDonut) return 'donut';
    if (isMatrixActive) return 'matrix';
    if (isPlayingTetris) return 'tetris';
    return 'default';
  };

  const getGameContainerStyle = (activeGame) => ({
    position: 'relative',
    border: '1px solid #00ff00',
    marginTop: '0.7rem',
    marginBottom: '0.7rem',
    overflow: 'hidden',
    width: '100%',
    height: activeGame === 'donut' ? '800px' : '500px',
    maxWidth: containerSizes[activeGame]?.maxWidth || containerSizes.default.maxWidth,
    maxHeight: containerSizes[activeGame]?.maxHeight || containerSizes.default.maxHeight,
    backgroundColor: '#000',
    alignSelf: 'center',
    boxShadow: '0 0 10px #00ff00',
  });

  const asciiArt = [
    "   /$$$$$$  /$$   /$$  /$$$$$$  /$$   /$$  /$$$$$$  /$$$$$$$",
    "  /$$__  $$| $$$ | $$ /$$__  $$| $$  | $$ /$$__  $$| $$__  $$",
    " | $$  \\ $$| $$$$| $$| $$  \\ $$| $$  | $$| $$  \\ $$| $$  \\ $$",
    " | $$$$$$$$| $$ $$ $$| $$$$$$$$| $$$$$$$$| $$$$$$$$| $$  | $$",
    " | $$__  $$| $$  $$$$| $$__  $$| $$__  $$| $$__  $$| $$  | $$",
    " | $$  | $$| $$\\  $$$| $$  | $$| $$  | $$| $$  | $$| $$  | $$",
    " | $$  | $$| $$ \\  $$| $$  | $$| $$  | $$| $$  | $$| $$$$$$$/",
    " |__/  |__/|__/  \\__/|__/  |__/|__/  |__/|__/  |__/|_______/"
  ];

  const [glitchIndex, setGlitchIndex] = useState(-1);
  const [glitchOffset, setGlitchOffset] = useState(0);

  const [introText, introTextComplete] = useTypewriter({
    words: [
      "Hi, my name is Anahad Dhaliwal\nI'm a first-year computer engineering student at the University of Waterloo\nand this is the boot-up to my website\n...\nHere are the available commands and mini games\ntype 'help' to view all options or simply press ENTER to launch website"
    ],
    loop: 1,
    typeSpeed: skipIntro ? 0 : 50,
    deleteSpeed: skipIntro ? 0 : 50,
    onLoopDone: () => setShowPrompt(true)
  });

  // Glitch effect
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.95) {
        setGlitchIndex(Math.floor(Math.random() * asciiArt.length));
        setGlitchOffset(Math.random() * 10 - 5);
        setTimeout(() => {
          setGlitchIndex(-1);
          setGlitchOffset(0);
        }, 100);
      }
    }, 50);

    return () => clearInterval(glitchInterval);
  }, [asciiArt.length]);

  // Skip intro effect
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key.toLowerCase() === 's' && !showPrompt) {
        setSkipIntro(true);
        setShowPrompt(true);
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [showPrompt]);

  // Matrix effect
  useEffect(() => {
    if (isMatrixActive) {
      const chars = "ｦｱｳｴｵカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤヤユヨラリルレロワヲンヴヵヶ";
      const columns = Math.floor(containerSizes.matrix.width / 20);
      const drops = new Array(columns).fill(0);
      
      const interval = setInterval(() => {
        setMatrixChars(prev => {
          const newChars = [];
          drops.forEach((y, i) => {
            const char = chars[Math.floor(Math.random() * chars.length)];
            const x = i * 20;
            newChars.push({ x, y, char });
            drops[i] = y > 100 + Math.random() * 1000 ? 0 : y + 20;
          });
          return newChars;
        });
      }, 50);

      return () => clearInterval(interval);
    }
  }, [isMatrixActive]);

  const handleCommand = (e) => {
    if (isPlayingSnake || isPlayingDino || isShowingDonut) return;

    if (e.key === 'Enter') {
      const cmd = input.toLowerCase().trim();
      
      setTerminalLines(prev => [
        ...prev,
        { type: 'input', content: `\nclient@anahad.io ~$ ${input}\n` }
      ]);

      switch(cmd) {
        case 'snake':
          setIsPlayingSnake(true);
          setTerminalLines(prev => [
            ...prev,
            { type: 'output', content: 'Launching Snake Game... Use W,A,S,D or Arrow Keys to move... Press ESC to exit' }
          ]);
          break;

          case 'tetris':
            setIsPlayingTetris(true);
            setTerminalLines(prev => [
              ...prev,
              { type: 'output', content: 'Launching Tetris... Use Arrow Keys or WASD to move and rotate... Press ESC to exit' }
            ]);
            break;

        case 'npm run dev':
        case '':
          setTerminalLines(prev => [
            ...prev,
            { type: 'output', content: 'Launching website...' }
          ]);
          setTimeout(() => {
            navigate('/main'); 
          }, 500);
          break;

        case 'dino':
          setIsPlayingDino(true);
          setTerminalLines(prev => [
            ...prev,
            { type: 'output', content: 'Launching Dino Game... Press SPACE or W to jump... Press ESC to exit' }
          ]);
          break;

        case 'donut':
          setIsShowingDonut(true);
          setTerminalLines(prev => [
            ...prev,
            { type: 'output', content: 'Launching rotating donut ASCII art... Press ESC to exit' }
          ]);
          break;

          case 'help':
            setTerminalLines(prev => [
              ...prev,
              {
                type: 'output',
                content: `\nAvailable commands:\n
          help:                where you are right now
          npm run dev:         launch Anahad's website
          clear:               clear the terminal
          snake:               start snake game
          dino:                start dinosaur game
          tetris:              start tetris game
          donut:               display rotating donut ASCII art
          matrix:              matrix rain effect
          
          Or simply press ENTER to launch the website directly\n`
              }
            ]);
            break;

        case 'clear':
          setTerminalLines([]);
          break;

        case 'matrix':
          setIsMatrixActive(true);
          setTerminalLines(prev => [
            ...prev,
            { type: 'output', content: `Wake up, Neo...\nPress ESC to exit` }
          ]);
          break;

        default:
          if (!cmd) break;
          setTerminalLines(prev => [
            ...prev,
            { type: 'output', content: `command not found: ${cmd}\nto see available commands, use 'help', or press ENTER to launch website` }
          ]);
      }
      setInput('');
    }
  };

  // ESC key handler
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setIsPlayingSnake(false);
        setIsPlayingDino(false);
        setIsMatrixActive(false);
        setIsShowingDonut(false);
        setIsPlayingTetris(false);
      }
    };
  
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const styles = {
    container: {
      minHeight: '100vh',
      width: '100vw',
      margin: 0,
      padding: '1rem',
      backgroundColor: '#000',
      fontFamily: 'VT323, monospace',
      color: '#00ff00',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      position: 'fixed',
      top: 0,
      left: 0,
    },
    asciiArt: {
      whiteSpace: 'pre',
      fontFamily: 'VT323, monospace',
      fontSize: 'clamp(0.4rem, 1.2vw, 0.9rem)',
      color: '#00ff00',
      marginBottom: '1rem',
      lineHeight: '1.2',
    },
    glitchLine: {
      transform: `translateX(${glitchOffset}px)`,
      textShadow: '2px 2px #ff0000, -2px -2px #0000ff',
      transition: 'transform 0.1s ease-in-out',
    },
    gameContainer: getGameContainerStyle(getCurrentGame()),
    terminalContent: {
      whiteSpace: 'pre-line',
      lineHeight: '1.2',
      overflowY: 'auto',
      maxHeight: 'calc(100vh - 200px)',
      fontFamily: 'VT323, monospace',
      fontSize: '1.2rem',
      padding: '0.5rem',
    },
    promptContainer: {
      display: 'flex',
      alignItems: 'center',
      marginTop: '0.5rem',
      fontSize: '1.2rem',
      whiteSpace: 'nowrap',
      width: '100%',
    },
    input: {
      backgroundColor: 'transparent',
      border: 'none',
      outline: 'none',
      color: '#00ff00',
      fontFamily: 'VT323, monospace',
      fontSize: '1.2rem',
      marginLeft: '8px',
      width: '100%',
      caretColor: '#00ff00',
    },
    matrixChar: {
      position: 'absolute',
      color: '#00ff00',
      textShadow: '0 0 5px #00ff00',
      fontFamily: 'VT323, monospace',
      userSelect: 'none',
      fontSize: '1.2rem',
    }
  };

  
  return (
    <div style={styles.container}>
      <div style={styles.asciiArt}>
        {asciiArt.map((line, i) => (
          <div key={i} style={i === glitchIndex ? styles.glitchLine : {}}>
            {line}
          </div>
        ))}
      </div>
  
      <div ref={terminalRef} style={styles.terminalContent}>
        {(!showPrompt && !introTextComplete) && 
          <div style={{ marginBottom: '2rem' }}>Press 'S' to skip</div>
        }      
        <div>
          {introText}
          {!introTextComplete && <Cursor cursorColor="#00ff00" />}
        </div>
  
        {terminalLines.map((line, index) => (
          <div key={index}>{line.content}</div>
        ))}
  
        {isMatrixActive && (
          <div style={styles.gameContainer}>
            {matrixChars.map((char, i) => (
              <span
                key={i}
                style={{
                  ...styles.matrixChar,
                  left: `${char.x}px`,
                  top: `${char.y}px`,
                }}
              >
                {char.char}
              </span>
            ))}
          </div>
        )}
  
        {isPlayingSnake ? (
          <div style={styles.gameContainer}>
            <SnakeGame 
              onGameOver={(score) => {
                setIsPlayingSnake(false);
                setTerminalLines((prev) => [
                  ...prev,
                  { type: 'output', content: `\nGame Over! Your score: ${score}` }
                ]);
              }}
              containerSize={containerSizes.snake}
            />
          </div>
        ) : isPlayingDino ? (
          <div style={styles.gameContainer}>
            <DinoGame 
              onGameOver={(score) => {
                setIsPlayingDino(false);
                setTerminalLines((prev) => [
                  ...prev,
                  { type: 'output', content: `\nGame Over! Your score: ${score}` }
                ]);
              }}
              containerSize={containerSizes.dino}
            />
          </div>
        ) : isShowingDonut ? (
          <div style={styles.gameContainer}>
            <Donut containerSize={containerSizes.donut} />
          </div>
        ) : isPlayingTetris ? (
          <div style={styles.gameContainer}>
            <TetrisGame 
              onGameOver={(score) => {
                setIsPlayingTetris(false);
                setTerminalLines((prev) => [
                  ...prev,
                  { type: 'output', content: `\nGame Over! Your score: ${score}` }
                ]);
              }}
              containerSize={containerSizes.tetris}
            />
          </div>
        ) : (
          showPrompt && (
            <div style={styles.promptContainer}>
              <span>client@anahad.io ~$</span>
              <input 
                ref={inputRef}
                type="text"
                style={styles.input}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleCommand}
                onBlur={() => inputRef.current?.focus()}
                spellCheck="false"
                autoFocus
                autoComplete="off"
              />
            </div>
          )
        )}
      </div>
    </div>
  )
};
  
  export default TerminalIntro;