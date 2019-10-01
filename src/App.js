import React, { useState, useEffect, useRef } from 'react';
import { Map } from 'immutable';

function App() {
  const [count, setCount] = useState(() =>
    Map({
      playerDirection: 1,
      playerX: 2,
      playerY: 40,
      playerWidth: 16,
      playerHeight: 16,
      messgae: ''
    })
  );
  const requestRef = React.useRef();
  const previousTimeRef = React.useRef();

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

      setCount(pCount =>
        pCount.update('playerX', value =>
          move ? value + deltaTime * 0.15 * move : value
        )
      );
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(update);
  };

  React.useEffect(() => {
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
      {count.get('playerX')}
      <div
        style={{
          position: 'absolute',
          width: 16 + 'px',
          height: 16 + 'px',
          backgroundColor: 'red',
          top: count.get('playerY'),
          left: count.get('playerX')
        }}
      ></div>
    </div>
  );
}

export default App;
