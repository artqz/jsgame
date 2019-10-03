import React from 'react';
import srites from '../sprites.gif';

export function Player({
  playerX,
  playerY,
  playerFrameType,
  playerFrameRect,
  playerDirection
}) {
  let rect;
  const style = {
    position: 'absolute',
    width: 16 + 'px',
    height: 16 + 'px',
    backgroundImage: 'url(' + srites + ')',
    top: playerY,
    left: playerX
  };
  if (playerFrameType + '_' + playerFrameRect === 'walk_0') {
    rect = {
      backgroundPositionX: -290 + 'px',
      backgroundPositionY: -44 + 'px'
    };
  } else if (playerFrameType + '_' + playerFrameRect === 'walk_1') {
    rect = {
      backgroundPositionX: -304 + 'px',
      backgroundPositionY: -43 + 'px'
    };
  } else if (playerFrameType + '_' + playerFrameRect === 'walk_2') {
    rect = {
      backgroundPositionX: -321 + 'px',
      backgroundPositionY: -44 + 'px'
    };
  } else if (playerFrameType + '_' + playerFrameRect === 'idle_0') {
    rect = {
      backgroundPositionX: -276 + 'px',
      backgroundPositionY: -44 + 'px'
    };
  }

  return (
    <div
      id="player"
      style={{
        ...style,
        ...rect,
        transform: 'scale(' + playerDirection + ', 1)'
      }}
    ></div>
  );
}
