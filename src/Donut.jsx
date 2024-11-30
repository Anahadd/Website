import React, { useEffect, useRef, useState } from 'react';

const Donut = ({ containerSize = { width: 600, height: 400 } }) => {
  const [asciiArt, setAsciiArt] = useState('');
  const A = useRef(1);
  const B = useRef(1);
  const intervalRef = useRef(null);


  const aspectRatio = containerSize.width / containerSize.height;
  const COLS = Math.floor(aspectRatio > 1 ? 160 : 80); 
  const ROWS = Math.floor(COLS / aspectRatio);
  
  const scale = Math.min(
    containerSize.width / COLS,
    containerSize.height / ROWS
  ) * 0.95; 

  useEffect(() => {
    const renderFrame = () => {
      const b = [];
      const z = [];
      A.current += 0.07;
      B.current += 0.03;
      const cA = Math.cos(A.current),
            sA = Math.sin(A.current),
            cB = Math.cos(B.current),
            sB = Math.sin(B.current);

      const bufferSize = COLS * ROWS;
      for (let k = 0; k < bufferSize; k++) {
        b[k] = k % COLS === COLS - 1 ? "\n" : " ";
        z[k] = 0;
      }

      const xOffset = COLS / 2;
      const yOffset = ROWS / 2;
      const donutScale = Math.min(COLS, ROWS) / 25; 

      for (let j = 0; j < 6.28; j += 0.07) {
        const ct = Math.cos(j), st = Math.sin(j);
        for (let i = 0; i < 6.28; i += 0.02) {
          const sp = Math.sin(i), cp = Math.cos(i);
          const h = ct + 2;
          const D = 1 / (sp * h * sA + st * cA + 5);
          const t = sp * h * cA - st * sA;
          
          const x = 0 | (xOffset + 20 * donutScale * D * (cp * h * cB - t * sB));
          const y = 0 | (yOffset + 10 * donutScale * D * (cp * h * sB + t * cB));
          const o = x + COLS * y;
          const N = 0 | (8 * ((st * sA - sp * ct * cA) * cB - sp * ct * sA - st * cA - cp * ct * sB));
         
          if (y < ROWS && y >= 0 && x >= 0 && x < COLS - 1 && D > z[o]) {
            z[o] = D;
            b[o] = ".,-~:;=!*#$@"[N > 0 ? N : 0];
          }
        }
      }
      setAsciiArt(b.join(''));
    };

    intervalRef.current = setInterval(renderFrame, 50);
    return () => {
      clearInterval(intervalRef.current);
    };
  }, [COLS, ROWS]);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
      backgroundColor: '#000',
      position: 'relative',
      overflow: 'hidden',
      padding: '1rem',
    }}>
      <pre
        style={{
          margin: 0,
          padding: 0,
          fontFamily: 'monospace',
          whiteSpace: 'pre',
          color: '#00ff00',
          lineHeight: '1',
          backgroundColor: '#000',
          fontSize: `${scale}px`,
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        {asciiArt}
      </pre>
    </div>
  );
};  


export default Donut;