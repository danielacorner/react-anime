export const ALIEN_PADDING = window.innerWidth * 0.02;
export const ALIEN_WIDTH = window.innerWidth * 0.15;
export const ALIEN_MOVE_X = window.innerWidth * 0.06;
export const ALIEN_MOVE_Y = window.innerWidth * 0.06;
export const ALIENS_TICK_SPEED_MS = 1000;

export const FIREWORK_DURATION = 1000;
export const LAUNCHER_WIDTH = 58;
export const LAUNCHER_HEIGHT = 58;
export const FIREWORK_HEIGHT = 20;

// launcher left offset
export const LAUNCHER_OFFSET_LEFT =
  window.innerWidth * 0.05 + LAUNCHER_WIDTH / 2;

// left / right constraints for launcher
export const MIN_LEFT = 0;
export const MAX_LEFT = window.innerWidth * 0.9 - LAUNCHER_WIDTH;
// left / right screen sides
export const SCREEN_X_LEFT = window.innerWidth * 0.05;
export const SCREEN_X_RIGHT = window.innerWidth * 0.95;

export const ALIENS_LEVEL_1 = [
  { type: 'cool', size: 1, zapsPerSec: 0.2, alive: true, order: 1 },
  { type: 'cool', size: 1, zapsPerSec: 0.2, alive: true, order: 2 },
  { type: 'cool', size: 1, zapsPerSec: 0.2, alive: true, order: 3 },
  { type: 'cool', size: 1, zapsPerSec: 0.2, alive: true, order: 4 },
  { type: 'cool', size: 1, zapsPerSec: 0.2, alive: true, order: 5 }
];
