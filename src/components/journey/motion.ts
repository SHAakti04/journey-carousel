export const PAGE_TURN_MS = 1100;
export const CHAPTER_READ_MS = 8000;

export function nextChapter(current: number, direction: number, count: number) {
  if (count <= 0) return 0;
  return ((current + direction) % count + count) % count;
}