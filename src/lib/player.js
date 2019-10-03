function playerMove(
  playerX,
  playerWidth,
  cameraX,
  cameraWidth,
  levelWidth,
  value,
  deltaTime,
  move
) {
  let left = true;
  let right = true;
  if (playerX <= cameraX && cameraX === 0) {
    left = false;
  }
  if (
    playerX >= cameraX + cameraWidth - playerWidth &&
    cameraX + cameraWidth >= levelWidth
  ) {
    right = false;
  }

  if (move) {
    if (!left && move === -1) {
      return value;
    }
    if (!right && move === 1) {
      return value;
    }
    return value + deltaTime * 0.15 * move;
  } else {
    return value;
  }
}

function playerJump() {
  return 4 * 50 * Math.sin((Math.PI * 1) / 50);
}

export { playerMove, playerJump };
