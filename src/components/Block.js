import React from 'react';
import tiles from '../tileset.png';

export function Block({ blockX, blockY, blockType }) {
  let bgPosY, bgPosX;
  // sky
  if (blockType === 0) {
  }
  // ground
  else if (blockType === 1) {
    bgPosY = 0;
    bgPosX = 0;
  }
  // tube 1 tl
  else if (blockType === 2) {
    bgPosY = -128;
    bgPosX = 0;
  }
  // tube 1 tr
  else if (blockType === 3) {
    bgPosY = -128;
    bgPosX = -16;
  }
  // tube 1 bl
  else if (blockType === 4) {
    bgPosY = -144;
    bgPosX = 0;
  }
  // tube 1 br
  else if (blockType === 5) {
    bgPosY = -144;
    bgPosX = -16;
  }
  return (
    <div
      id="block"
      style={{
        position: 'absolute',
        width: 16 + 'px',
        height: 16 + 'px',
        backgroundImage: blockType !== 0 ? 'url(' + tiles + ')' : null,
        backgroundPositionX: bgPosX + 'px',
        backgroundPositionY: bgPosY + 'px',
        top: blockY,
        left: blockX
      }}
    ></div>
  );
}
