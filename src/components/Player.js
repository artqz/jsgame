import React from 'react';

export function Player({ playerX, playerY }) {
  return (
    <div
      id="player"
      style={{
        position: 'absolute',
        width: 16 + 'px',
        height: 16 + 'px',
        backgroundColor: 'red',
        top: playerY,
        left: playerX
      }}
    ></div>
  );
}
