function cameraCoordinator(
  cameraPos,
  cameraSize,
  playerPos,
  playerSize,
  levelSize
) {
  if (cameraPos + cameraSize >= levelSize) {
    return Math.min(
      levelSize - cameraSize,
      playerPos - (cameraSize - playerSize) / 2
    );
  } else {
    return Math.max(0, playerPos - (cameraSize - playerSize) / 2);
  }
}
export { cameraCoordinator };
