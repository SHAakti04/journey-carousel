export const INITIAL_PAUSE_MS = 1200;
export const PIXELS_PER_SECOND = 42;

export function loopPosition(distance: number, cycleDistance: number) {
  if (cycleDistance <= 0) return 0;
  return ((distance % cycleDistance) + cycleDistance) % cycleDistance;
}

export function centeredChapter(position: number, step: number, count: number) {
  if (step <= 0 || count <= 0) return 0;
  return Math.round(position / step) % count;
}