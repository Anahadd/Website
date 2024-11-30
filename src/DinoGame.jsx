import React, { useState, useEffect, useRef } from 'react';

const DinoGame = ({ onGameOver, containerSize = { width: 600, height: 400 } }) => {
  const [dinoPosition, setDinoPosition] = useState(0);
  const [obstacles, setObstacles] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  // Adaptive sizing based on container
  const gameHeight = Math.min(containerSize.height || 400, 400);
  const gameWidth = Math.min(containerSize.width || 600, 800);
  const DINO_WIDTH = 20;
  const DINO_HEIGHT = 30;
  const OBSTACLE_WIDTH = 15;
  const BASE_GAME_SPEED = 5;

  const velocityRef = useRef(0);
  const lastJumpTimeRef = useRef(0);
  const gameLoopRef = useRef(null);

  useEffect(() => {
    if (gameOver) return;

    const gravity = 1.2;
    const jumpForce = 20;
    const jumpCooldown = 300;

    let lastUpdate = performance.now();

    const gameLoop = () => {
      const now = performance.now();
      const deltaTime = now - lastUpdate;
      lastUpdate = now;

      // Update jump physics
      if (velocityRef.current !== 0 || dinoPosition > 0) {
        velocityRef.current -= gravity;
        setDinoPosition(prev => {
          let newPos = prev + velocityRef.current;
          if (newPos <= 0) {
            newPos = 0;
            velocityRef.current = 0;
          }
          return Math.max(0, Math.min(newPos, gameHeight - DINO_HEIGHT));
        });
      }

      setObstacles(prevObstacles => {
        const currentSpeed = (BASE_GAME_SPEED + Math.floor(score / 500)) * (deltaTime / 16);
        const updatedObstacles = prevObstacles
          .map(obs => ({
            ...obs,
            position: obs.position - currentSpeed
          }))
          .filter(obs => obs.position > -OBSTACLE_WIDTH);

        if (updatedObstacles.length === 0 ||
            updatedObstacles[updatedObstacles.length - 1].position < gameWidth - 300) {
          return [...updatedObstacles, {
            position: gameWidth + OBSTACLE_WIDTH,
            height: 25 + Math.random() * 35
          }];
        }

        return updatedObstacles;
      });

      // Update score
      setScore(prev => prev + 1);

      // Collision detection
      const dinoBox = {
        left: 50,
        right: 50 + DINO_WIDTH,
        top: gameHeight - dinoPosition - DINO_HEIGHT,
        bottom: gameHeight - dinoPosition
      };

      const collision = obstacles.some(obs => {
        const obsBox = {
          left: obs.position,
          right: obs.position + OBSTACLE_WIDTH,
          top: gameHeight - obs.height,
          bottom: gameHeight
        };

        return !(dinoBox.right < obsBox.left ||
                dinoBox.left > obsBox.right ||
                dinoBox.bottom < obsBox.top ||
                dinoBox.top > obsBox.bottom);
      });

      if (collision) {
        setGameOver(true);
        onGameOver(score);
        return;
      }

      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };

    const handleJump = (e) => {
      const now = performance.now();
      if ((e.code === 'Space' || e.key.toLowerCase() === 'w') && !e.repeat) {
        if (dinoPosition <= 1 && now - lastJumpTimeRef.current > jumpCooldown) {
          e.preventDefault();
          velocityRef.current = jumpForce;
          lastJumpTimeRef.current = now;
        }
      }
    };

    window.addEventListener('keydown', handleJump);
    gameLoopRef.current = requestAnimationFrame(gameLoop);

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
      window.removeEventListener('keydown', handleJump);
    };
  }, [gameOver, gameHeight, score, obstacles, dinoPosition, onGameOver, gameWidth]);

  // Ground component
  const Ground = () => (
    <>
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '2px',
          backgroundColor: '#00ff00',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '2px',
          left: 0,
          width: '100%',
          height: '10px',
          background: 'linear-gradient(to bottom, rgba(0,255,0,0.1), transparent)',
        }}
      />
    </>
  );

  return (
    <div
      tabIndex={-1}
      style={{
        width: '100%',
        height: '100%',
        maxWidth: `${gameWidth}px`,
        maxHeight: `${gameHeight}px`,
        backgroundColor: '#000',
        overflow: 'hidden',
        outline: 'none',
        position: 'relative',
        margin: '0 auto',
      }}
    >
      {}
      <Ground />

      {}
      <div
        style={{
          position: 'absolute',
          left: '50px',
          bottom: `${dinoPosition}px`,
          width: `${DINO_WIDTH}px`,
          height: `${DINO_HEIGHT}px`,
          backgroundColor: '#00ff00',
          borderRadius: '3px',
        }}
      />

      {}
      {obstacles.map((obs, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            left: `${obs.position}px`,
            bottom: '0',
            width: `${OBSTACLE_WIDTH}px`,
            height: `${obs.height}px`,
            backgroundColor: '#00ff00',
            boxShadow: '0 0 5px #00ff00',
          }}
        />
      ))}

      {}
      <div
        style={{
          position: 'absolute',
          top: '10px',
          right: '20px',
          color: '#00ff00',
          fontFamily: 'VT323, monospace',
          fontSize: '24px',
          textShadow: '0 0 5px #00ff00',
        }}
      >
        Score: {score}
      </div>

      {}
      <div
        style={{
          position: 'absolute',
          top: '10px',
          left: '20px',
          color: '#00ff00',
          fontFamily: 'VT323, monospace',
          fontSize: '16px',
          opacity: 0.7,
        }}
      >
        Press SPACE or W to jump
      </div>
    </div>
  );
};

export default DinoGame;