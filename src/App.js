import React, { useState, useEffect, useRef } from 'react';
import { Map } from 'immutable';
import { Player } from './components/Player';
import { Block } from './components/Block';

const screenWidth = 500;
const screenHeight = 300;

function App() {
  const [gameState, setgameState] = useState(() =>
    Map({
      playerDirection: 1,
      playerX: 2,
      playerY: 40,
      dx: 0,
      dy: 0,
      playerRotate: 0,
      playerWidth: 16,
      playerHeight: 16,
      PlayerFrameType: 'idle',
      PlayerFrameRect: 0,
      messgae: ''
    })
  );
  const requestRef = useRef();
  const previousTimeRef = useRef();

  // Слушаем и записываем нажатые клавиши
  let buttons = new Set();
  window.addEventListener('keydown', e => buttons.add(e.keyCode));
  window.addEventListener('keyup', e => buttons.delete(e.keyCode));

  const update = time => {
    if (previousTimeRef.current != undefined) {
      const deltaTime = time - previousTimeRef.current;
      let move = 0;
      let top = 4;
      let tick = 1;
      let message = '';

      if (buttons.has(37)) {
        move = -1;
        console.log('лево');
      } else if (buttons.has(39)) {
        move = 1;
      } else if (buttons.has(32)) {
        console.log('прыжок');
      }

      setgameState(pgameState =>
        pgameState
          .update('playerX', value =>
            move ? value + deltaTime * 0.15 * move : value
          )
          .update('playerRotate', value =>
            move ? (value + deltaTime * 0.4 * move) % 360 : value
          )
          .update('playerFrameType', () => (move ? 'walk' : 'idle'))
          .update('playerFrameRect', value =>
            move ? (value + deltaTime * 0.006) % 2 : 0
          )
          .update('playerDirection', value => (move ? move : value))
      );
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(update);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);
  return (
    <div
      style={{
        width: 500 + 'px',
        height: 300 + 'px',
        backgroundColor: '#00bcd4',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {Math.round(gameState.get('playerFrameRect'))}

      <Block blockX={200} blockY={40} blockType={1} />
      <Player
        playerX={gameState.get('playerX')}
        playerY={gameState.get('playerY')}
        playerFrameType={gameState.get('playerFrameType')}
        playerFrameRect={Math.round(gameState.get('playerFrameRect'))}
        playerDirection={gameState.get('playerDirection')}
      />
    </div>
  );
}

export default App;
