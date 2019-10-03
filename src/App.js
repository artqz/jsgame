import React, { useState, useEffect, useRef } from 'react';
import { Map } from 'immutable';
import { Player } from './components/Player';
import { Block } from './components/Block';
import { levelGrid, levelWidth, levelHeight } from './components/level';
import { cameraCoordinator } from './lib/camera';
import { playerMove, playerJump } from './lib/player';

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
      playerRotate: 0,
      playerWidth: 16,
      playerHeight: 16,
      PlayerFrameType: 'idle',
      PlayerFrameRect: 0,
      playerIsAir: false,
      messgae: ''
    })
  );
  const requestRef = useRef();
  const previousTimeRef = useRef();

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
        let jump = 0;
        let tick = 1;
        let message = '';

        if (buttons.has(37)) {
          move = -1;
        } else if (buttons.has(39)) {
          move = 1;
        } else if (buttons.has(32)) {
          jump = 1;
        }

        setgameState(newGameState =>
          newGameState
            .update('playerX', value => {
              return playerMove(
                newGameState.get('playerX'),
                newGameState.get('playerWidth'),
                newGameState.get('cameraX'),
                newGameState.get('cameraWidth'),
                levelWidth,
                value,
                deltaTime,
                move
              );
            })
            .update('playerY', value => {
              if (jump && !newGameState.get('playerIsAir')) {
                console.log(deltaTime);

                return value - deltaTime * 0.07;
              }
              if (newGameState.get('playerY') <= 192) {
                return value + deltaTime * 0.1;
              }
              return value;
            })
            .update('playerIsAir', value => {
              if (jump) {
                return true;
              }

              return false;
            })
            .update('cameraY', () => {
              return cameraCoordinator(
                newGameState.get('cameraY'),
                newGameState.get('cameraHeight'),
                newGameState.get('playerY'),
                newGameState.get('playerHeight'),
                levelHeight
              );
            })
            .update('cameraX', () => {
              return cameraCoordinator(
                newGameState.get('cameraX'),
                newGameState.get('cameraWidth'),
                newGameState.get('playerX'),
                newGameState.get('playerWidth'),
                levelWidth
              );
            })
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
      {gameState.get('playerIsAir') ? 'letim' : 'na zemle'}

      <Block blockX={200} blockY={40} blockType={1} />

      {/* {renderLevel} */}
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
      ></div>
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
