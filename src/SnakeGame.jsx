import React, { useState, useEffect, useRef, useCallback } from 'react';

const SnakeGame = ({ onGameOver, containerSize = { width: 600, height: 400 } }) => {
  // Make the game adapt to container size while maintaining playability
  const GAME_SIZE = {
    width: containerSize.width,
    height: containerSize.height
  };
  const BOX_SIZE = Math.floor(Math.min(GAME_SIZE.width, GAME_SIZE.height) / 20); // 20x20 grid
  const GRID_SIZE = {
    width: Math.floor(GAME_SIZE.width / BOX_SIZE),
    height: Math.floor(GAME_SIZE.height / BOX_SIZE)
  };

  const [snake, setSnake] = useState([]);
  const [food, setFood] = useState(null);
  const [direction, setDirection] = useState('RIGHT');
  const [score, setScore] = useState(0);
  const [countdown, setCountdown] = useState(3);
  const [gameStarted, setGameStarted] = useState(false);
  
  const canvasRef = useRef(null);
  const gameLoopRef = useRef(null);
  const lastUpdateRef = useRef(0);
  const GAME_SPEED = 150; // Milliseconds between moves (higher = slower)

  // Initialize game with proper scaling
  useEffect(() => {
    if (countdown === 0 && !gameStarted) {
      const initialX = Math.floor(GRID_SIZE.width / 4) * BOX_SIZE;
      const initialY = Math.floor(GRID_SIZE.height / 4) * BOX_SIZE;
      setSnake([
        { x: initialX, y: initialY },
        { x: initialX - BOX_SIZE, y: initialY }
      ]);
      generateFood();
      setGameStarted(true);
    }
  }, [countdown, gameStarted, GRID_SIZE.width, GRID_SIZE.height, BOX_SIZE]);

  const generateFood = useCallback(() => {
    const newFood = {
      x: Math.floor(Math.random() * (GRID_SIZE.width - 2)) * BOX_SIZE,
      y: Math.floor(Math.random() * (GRID_SIZE.height - 2)) * BOX_SIZE
    };
    setFood(newFood);
  }, [GRID_SIZE.width, GRID_SIZE.height, BOX_SIZE]);

  // Handle input with boundary awareness
  const handleKeyDown = useCallback((e) => {
    if (!gameStarted) return;
    
    const key = e.key.toLowerCase();
    const directionMap = {
      arrowleft: 'LEFT',
      arrowright: 'RIGHT',
      arrowup: 'UP',
      arrowdown: 'DOWN',
      a: 'LEFT',
      d: 'RIGHT',
      w: 'UP',
      s: 'DOWN'
    };

    if (directionMap[key]) {
      e.preventDefault();
      setDirection(prev => {
        const newDir = directionMap[key];
        const opposites = {
          LEFT: 'RIGHT',
          RIGHT: 'LEFT',
          UP: 'DOWN',
          DOWN: 'UP'
        };
        return opposites[newDir] === prev ? prev : newDir;
      });
    }
  }, [gameStarted]);

  // Game loop with speed control and proper boundary checking
  const updateGame = useCallback(() => {
    const now = performance.now();
    if (now - lastUpdateRef.current < GAME_SPEED) return;
    lastUpdateRef.current = now;

    setSnake(prevSnake => {
      if (!prevSnake.length) return prevSnake;

      const head = { ...prevSnake[0] };
      const moves = {
        LEFT: { x: -BOX_SIZE, y: 0 },
        RIGHT: { x: BOX_SIZE, y: 0 },
        UP: { x: 0, y: -BOX_SIZE },
        DOWN: { x: 0, y: BOX_SIZE }
      };

      head.x += moves[direction].x;
      head.y += moves[direction].y;

      // Boundary collision
      if (
        head.x < 0 || 
        head.x >= GAME_SIZE.width || 
        head.y < 0 || 
        head.y >= GAME_SIZE.height ||
        prevSnake.some(segment => segment.x === head.x && segment.y === head.y)
      ) {
        setGameStarted(false);  // Stop the game
        setTimeout(() => {
          onGameOver(score);  // Call onGameOver after a brief delay
        }, 100);
        return prevSnake;
      }

      const newSnake = [head];

      // Food collision
      if (food && head.x === food.x && head.y === food.y) {
        setScore(s => s + 1);
        generateFood();
        newSnake.push(...prevSnake);
      } else {
        newSnake.push(...prevSnake.slice(0, -1));
      }

      return newSnake;
    });
  }, [direction, food, generateFood, onGameOver, score, GAME_SIZE.width, GAME_SIZE.height, BOX_SIZE]);

  // Render game
  const renderGame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    
    // Clear and set background
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, GAME_SIZE.width, GAME_SIZE.height);

    // Draw grid (optional - remove if you want better performance)
    ctx.strokeStyle = '#111';
    for (let x = 0; x < GRID_SIZE.width; x++) {
      for (let y = 0; y < GRID_SIZE.height; y++) {
        ctx.strokeRect(x * BOX_SIZE, y * BOX_SIZE, BOX_SIZE, BOX_SIZE);
      }
    }

    // Draw snake
    snake.forEach((segment, index) => {
      ctx.fillStyle = index === 0 ? '#50fa7b' : '#00b894';
      ctx.fillRect(segment.x, segment.y, BOX_SIZE - 1, BOX_SIZE - 1);
    });

    // Draw food
    if (food) {
      ctx.fillStyle = '#ff5555';
      ctx.fillRect(food.x, food.y, BOX_SIZE - 1, BOX_SIZE - 1);
    }
  }, [snake, food, GAME_SIZE.width, GAME_SIZE.height, GRID_SIZE.width, GRID_SIZE.height, BOX_SIZE]);

  // Game loop setup
  useEffect(() => {
    if (!gameStarted) return;

    const gameLoop = () => {
      updateGame();
      renderGame();
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoopRef.current = requestAnimationFrame(gameLoop);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      cancelAnimationFrame(gameLoopRef.current);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [gameStarted, updateGame, renderGame, handleKeyDown]);

  // Countdown effect
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
      backgroundColor: '#000',
      position: 'relative',
    }}>
      <canvas 
        ref={canvasRef}
        width={GAME_SIZE.width}
        height={GAME_SIZE.height}
        style={{
          border: '2px solid #00ff00',
          width: '100%',
          height: '100%',
          objectFit: 'contain'
        }}
      />
      {countdown > 0 && (
        <div style={{
          position: 'absolute',
          color: '#00ff00',
          fontFamily: 'VT323, monospace',
          fontSize: '64px',
          textShadow: '0 0 10px #00ff00',
        }}>
          {countdown}
        </div>
      )}
    </div>
  );
};

export default SnakeGame;