import React, { useState, useEffect, useRef } from 'react';

const TetrisGame = ({ onGameOver, containerSize = { width: 600, height: 800 } }) => {
  const canvasRef = useRef(null);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [lines, setLines] = useState(0);
  const requestRef = useRef(null);
  const tetrominoSequence = useRef([]);
  const tetromino = useRef(null);
  const count = useRef(0);
  const playfield = useRef([]);

  const GRID = 32;
  const COLS = 10;
  const ROWS = 20;
  const POINTS = {
    SINGLE: 100,
    DOUBLE: 300,
    TRIPLE: 500,
    TETRIS: 800,
    SOFT_DROP: 1,
    HARD_DROP: 2,
  };

  const gameWidth = GRID * COLS;
  const gameHeight = GRID * ROWS;

  const tetrominos = {
    'I': [[0,0,0,0], [1,1,1,1], [0,0,0,0], [0,0,0,0]],
    'J': [[1,0,0], [1,1,1], [0,0,0]],
    'L': [[0,0,1], [1,1,1], [0,0,0]],
    'O': [[1,1], [1,1]],
    'S': [[0,1,1], [1,1,0], [0,0,0]],
    'Z': [[1,1,0], [0,1,1], [0,0,0]],
    'T': [[0,1,0], [1,1,1], [0,0,0]]
  };

  const colors = {
    'I': '#00f0f0',
    'O': '#f0f000',
    'T': '#a000f0',
    'S': '#00f000',
    'Z': '#f00000',
    'J': '#0000f0',
    'L': '#f0a000'
  };

  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const generateSequence = () => {
    const sequence = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];
    while (sequence.length) {
      const rand = getRandomInt(0, sequence.length - 1);
      const name = sequence.splice(rand, 1)[0];
      tetrominoSequence.current.push(name);
    }
  };

  const getNextTetromino = () => {
    if (tetrominoSequence.current.length === 0) {
      generateSequence();
    }
    const name = tetrominoSequence.current.pop();
    const matrix = tetrominos[name];
    const col = Math.floor(COLS / 2) - Math.ceil(matrix[0].length / 2);
    const row = name === 'I' ? -1 : -2;

    return { name, matrix, row, col };
  };

  // Initialize playfield
  useEffect(() => {
    for (let row = -2; row < ROWS; row++) {
      playfield.current[row] = [];
      for (let col = 0; col < COLS; col++) {
        playfield.current[row][col] = 0;
      }
    }
    tetromino.current = getNextTetromino();
  }, []);

  const rotate = (matrix) => {
    const N = matrix.length - 1;
    return matrix.map((row, i) => row.map((val, j) => matrix[N - j][i]));
  };

  const isValidMove = (matrix, cellRow, cellCol) => {
    for (let row = 0; row < matrix.length; row++) {
      for (let col = 0; col < matrix[row].length; col++) {
        if (matrix[row][col] && (
          cellCol + col < 0 ||
          cellCol + col >= COLS ||
          cellRow + row >= ROWS ||
          playfield.current[cellRow + row]?.[cellCol + col]
        )) {
          return false;
        }
      }
    }
    return true;
  };

  const updateScore = (linesCleared) => {
    if (linesCleared > 0) {
      const pointsScored = 
        linesCleared === 1 ? POINTS.SINGLE :
        linesCleared === 2 ? POINTS.DOUBLE :
        linesCleared === 3 ? POINTS.TRIPLE :
        linesCleared === 4 ? POINTS.TETRIS : 0;
      
      setScore(prev => prev + (pointsScored * level));
      setLines(prev => prev + linesCleared);
      
      const newTotalLines = lines + linesCleared;
      const newLevel = Math.floor(newTotalLines / 10) + 1;
      if (newLevel !== level) {
        setLevel(newLevel);
      }
    }
  };
  const placeTetromino = () => {
    for (let row = 0; row < tetromino.current.matrix.length; row++) {
      for (let col = 0; col < tetromino.current.matrix[row].length; col++) {
        if (tetromino.current.matrix[row][col]) {
          if (tetromino.current.row + row < 0) {
            handleGameOver();
            return;
          }
          playfield.current[tetromino.current.row + row][tetromino.current.col + col] = tetromino.current.name;
        }
      }
    }

    let linesCleared = 0;
    for (let row = playfield.current.length - 1; row >= 0; ) {
      if (playfield.current[row].every(cell => !!cell)) {
        linesCleared++;
        for (let r = row; r >= 0; r--) {
          for (let c = 0; c < playfield.current[r].length; c++) {
            playfield.current[r][c] = playfield.current[r-1]?.[c] || 0;
          }
        }
      } else {
        row--;
      }
    }

    updateScore(linesCleared);
    tetromino.current = getNextTetromino();
  };

  const handleGameOver = () => {
    setGameOver(true);
    const finalScore = score;
    setTimeout(() => {
      onGameOver(finalScore);
    }, 1000);
  };

  useEffect(() => {
    if (!canvasRef.current || gameOver) return;

    const context = canvasRef.current.getContext('2d');
    tetromino.current = tetromino.current || getNextTetromino();

    const gameLoop = () => {
      context.clearRect(0, 0, gameWidth, gameHeight);
      context.fillStyle = '#000';
      context.fillRect(0, 0, gameWidth, gameHeight);

      // Draw grid
      context.strokeStyle = '#1a1a1a';
      for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
          context.strokeRect(col * GRID, row * GRID, GRID, GRID);
        }
      }

      // Draw playfield
      for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
          if (playfield.current[row][col]) {
            const name = playfield.current[row][col];
            context.fillStyle = colors[name];
            context.fillRect(col * GRID, row * GRID, GRID - 1, GRID - 1);
          }
        }
      }

      // Draw active tetromino
      if (tetromino.current) {
        const dropSpeed = Math.max(35 - (level * 2), 5);
        if (++count.current > dropSpeed) {
          tetromino.current.row++;
          count.current = 0;

          if (!isValidMove(tetromino.current.matrix, tetromino.current.row, tetromino.current.col)) {
            tetromino.current.row--;
            placeTetromino();
          }
        }

        context.fillStyle = colors[tetromino.current.name];
        for (let row = 0; row < tetromino.current.matrix.length; row++) {
          for (let col = 0; col < tetromino.current.matrix[row].length; col++) {
            if (tetromino.current.matrix[row][col]) {
              context.fillRect(
                (tetromino.current.col + col) * GRID,
                (tetromino.current.row + row) * GRID,
                GRID - 1,
                GRID - 1
              );
            }
          }
        }
      }

      // Draw stats
      context.fillStyle = '#00ff00';
      context.font = '20px VT323, monospace';
      context.textAlign = 'left';
      context.fillText(`Score: ${score}`, 10, 25);
      context.fillText(`Level: ${level}`, 10, 50);
      context.fillText(`Lines: ${lines}`, 10, 75);

      requestRef.current = requestAnimationFrame(gameLoop);
    };

    requestRef.current = requestAnimationFrame(gameLoop);

    return () => {
      cancelAnimationFrame(requestRef.current);
    };
  }, [gameOver, score, level, lines]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameOver) return;

      // Left and right
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'a' || e.key === 'd') {
        const col = (e.key === 'ArrowLeft' || e.key === 'a')
          ? tetromino.current.col - 1
          : tetromino.current.col + 1;

        if (isValidMove(tetromino.current.matrix, tetromino.current.row, col)) {
          tetromino.current.col = col;
        }
      }

      // Rotate
      if (e.key === 'ArrowUp' || e.key === 'w') {
        const matrix = rotate(tetromino.current.matrix);
        if (isValidMove(matrix, tetromino.current.row, tetromino.current.col)) {
          tetromino.current.matrix = matrix;
        }
      }

      // Soft drop
      if (e.key === 'ArrowDown' || e.key === 's') {
        const row = tetromino.current.row + 1;
        if (!isValidMove(tetromino.current.matrix, row, tetromino.current.col)) {
          tetromino.current.row = row - 1;
          placeTetromino();
          return;
        }
        tetromino.current.row = row;
        setScore(prev => prev + POINTS.SOFT_DROP);
      }

      // Hard drop
      if (e.key === ' ') {
        let dropDistance = 0;
        while (isValidMove(tetromino.current.matrix, tetromino.current.row + dropDistance + 1, tetromino.current.col)) {
          dropDistance++;
        }
        tetromino.current.row += dropDistance;
        setScore(prev => prev + (POINTS.HARD_DROP * dropDistance));
        placeTetromino();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [gameOver]);

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
        width={gameWidth}
        height={gameHeight}
        style={{
          border: '2px solid #00ff00',
          boxShadow: '0 0 10px #00ff00',
          maxWidth: '100%',
          maxHeight: '100%',
          objectFit: 'contain',
        }}
      />
      {gameOver && (
        <div style={{
          position: 'absolute',
          color: '#00ff00',
          fontFamily: 'VT323, monospace',
          fontSize: '36px',
          textShadow: '0 0 10px #00ff00',
          textAlign: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          padding: '20px',
          borderRadius: '10px',
        }}>
          GAME OVER!<br />
          Final Score: {score}<br />
          Level: {level}<br />
          Lines Cleared: {lines}
        </div>
      )}
    </div>
  );
};

export default TetrisGame;