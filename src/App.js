import React, { useState } from 'react';
import { Map } from 'immutable';
import './App.css';
import { Player } from './components/Player';
import { Block } from './components/Block';

const level = [
  [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ],
  [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ],
  [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ],
  [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ],
  [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ],
  [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ],
  [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ],
  [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ],
  [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ],
  [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ],
  [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ],
  [
    0,
    0,
    0,
    0,
    2,
    3,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ],
  [
    0,
    0,
    0,
    0,
    4,
    5,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0
  ],
  [
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1
  ],
  [
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1
  ]
];

// Генератор уровней
let grid = [];
let id = 0;
let type;

level.forEach((row, i) => {
  row.forEach((cell, j) => {
    type = cell;
    grid[id++] = { width: 16, height: 16, x: j * 16, y: i * 16, type };
  });
});

function App() {
  const [gameState, setGameState] = useState(() =>
    Map({
      playerDirection: 1,
      playerX: 2,
      playerY: 1,
      playerWidth: 16,
      playerHeight: 16,
      lastUpdate: Date.now(),
      messgae: '',
      level: grid
    })
  );

  // Слушаем и записываем нажатые клавиши
  let buttons = new Set();
  window.addEventListener('keydown', e => buttons.add(e.keyCode));
  window.addEventListener('keyup', e => buttons.delete(e.keyCode));

  // Обновляем данные игры каждый тик
  function tick() {
    let dateNow = Date.now();
    let deltaTime = dateNow - gameState.get('lastUpdate');
    let move = 0;
    let top = 4;
    let tick = 1;
    let message = '';

    if (buttons.has(37)) {
      move = -4;
      console.log('лево');
    } else if (buttons.has(39)) {
      move = 4;
    } else if (buttons.has(32)) {
      console.log('прыжок');
    }
    console.log(deltaTime);

    let playerX = gameState.get('playerX');
    let playerY = gameState.get('playerY');
    let playerWidth = gameState.get('playerWidth');
    let playerHeight = gameState.get('playerHeight');

    gameState.get('level').map(block => {
      if (
        playerX < block.x + block.width &&
        playerX + playerWidth > block.x &&
        playerY < block.y + block.height &&
        playerY + playerHeight > block.y &&
        block.type === 1
      ) {
        message = 'detected';
        top = 0;
      }
    });

    let newGameState = gameState
      .update('playerX', value => value + move)
      .update('playerY', value => value + top)
      .update('message', value => message)
      .update('lastUpdate', value => dateNow);

    setGameState(newGameState);
  }

  requestAnimationFrame(tick, 0);

  const renderLevel = gameState
    .get('level')
    .map((block, index) => (
      <Block
        key={index}
        blockX={block.x}
        blockY={block.y}
        blockType={block.type}
      />
    ));

  return gameState ? (
    <div
      className="App"
      style={{
        width: 500 + 'px',
        height: 300 + 'px',
        backgroundColor: '#00bcd4',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Player
        playerX={gameState.get('playerX')}
        playerY={gameState.get('playerY')}
      />
      <Block blockX={20} blockY={10} />
      {renderLevel}
      {gameState.get('message')}
    </div>
  ) : null;
}

export default App;
