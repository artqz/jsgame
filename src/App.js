import React, { useState, useEffect, useRef } from 'react';
import { Map } from 'immutable';

function App() {
  const [count, setCount] = useState(() =>
    Map({
      playerX: 20,
      playerY: 10
    })
  );
  const requestRef = React.useRef();
  const previousTimeRef = React.useRef();

  const update = time => {
    if (previousTimeRef.current != undefined) {
      const deltaTime = time - previousTimeRef.current;

      // Pass on a function to the setter of the state
      // to make sure we always have the latest state
      setCount(pCount =>
        pCount
          .update('playerX', value => value + deltaTime * 0.15)
          .update('playerY', value => value + deltaTime * 0.04)
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
