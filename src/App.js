import React, { useState, useEffect, useRef } from 'react';
import { Map } from 'immutable';
import { Player } from './components/Player';
import { Block } from './components/Block';
import { levelGrid, levelWidth, levelHeight } from './components/level';

const gameWidth = levelWidth;
const gameHeight = levelHeight;

function App() {
  const [gameState, setgameState] = useState(() =>
    Map({
      cameraX: 0,
      cameraY: 0,
      cameraWidth: 200,
      cameraHeight: 200,
      playerDirection: 1,
      playerX: 2,
      playerY: 192,
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
  // const update = useRef();

  useEffect(() => {
    //загружаем уровень
    // levelGrid.map();
    // Слушаем и записываем нажатые клавиши
    let buttons = new Set();
    window.addEventListener('keydown', e => buttons.add(e.keyCode));
    window.addEventListener('keyup', e => buttons.delete(e.keyCode));

    let update = time => {
      if (previousTimeRef.current !== undefined) {
        const deltaTime = time - previousTimeRef.current;
        let move = 0;
        let top = 4;
        let tick = 1;
        let message = '';

        if (buttons.has(37)) {
          move = -1;
        } else if (buttons.has(39)) {
          move = 1;
        } else if (buttons.has(32)) {
        }

        setgameState(pgameState =>
          pgameState
            // .update('playerX', value =>
            //   move ? value + deltaTime * 0.15 * move : value
            // )
            .update('playerX', value => {
              if (pgameState.get('playerX') < gameWidth / 2) {
                if (move) {
                  return value + deltaTime * 0.15 * move;
                } else return value;
              } else return value;
            })
            .update('cameraX', value => {
              if (
                pgameState.get('cameraX') <= 0 &&
                pgameState.get('playerX') <= 0
              ) {
                return value;
              }
              if (pgameState.get('cameraX')) {
              }
              console.log();

              return value;
            })
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

    requestRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  const renderLevel = levelGrid.map((block, index) => (
    <Block
      key={index}
      blockX={block.x}
      blockY={block.y}
      blockType={block.type}
    />
  ));
  return (
    <div
      style={{
        width: gameWidth + 'px',
        height: gameHeight + 'px',
        backgroundColor: '#00bcd4',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {Math.round(gameState.get('playerFrameRect'))}

      <Block blockX={200} blockY={40} blockType={1} />
      <div
        id="camera"
        style={{
          position: 'absolute',
          top: gameState.get('cameraY'),
          left: gameState.get('cameraX'),
          border: '1px solid red',
          width: gameState.get('cameraWidth'),
          height: gameState.get('cameraHeight')
        }}
      >
        {renderLevel}
      </div>
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
