import { describe, expect, it } from "vitest";
import { journeyCarouselItems } from "./chapters";
import { centeredChapter, INITIAL_PAUSE_MS, loopPosition } from "./motion";

describe("Journey carousel requirements", () => {
  it("begins with Chapter 01 centered", () => {
    expect(centeredChapter(0, 384, 8)).toBe(0);
    expect(journeyCarouselItems[0].chapter).toBe("Chapter 01");
  });
  it("moves through chapters 01 to 08 in order", () => {
    expect(journeyCarouselItems.map((chapter) => chapter.chapter)).toEqual([
      "Chapter 01", "Chapter 02", "Chapter 03", "Chapter 04",
      "Chapter 05", "Chapter 06", "Chapter 07", "Chapter 08",
    ]);
    expect(centeredChapter(7 * 384, 384, 8)).toBe(7);
  });
  it("wraps directly to the identical Chapter 01 position", () => {
    expect(loopPosition(8 * 384, 8 * 384)).toBe(0);
    expect(loopPosition(8 * 384 + 1, 8 * 384)).toBe(1);
    expect(centeredChapter(8 * 384, 384, 8)).toBe(0);
  });
  it("uses one short initial pause", () => {
    expect(INITIAL_PAUSE_MS).toBe(1200);
  });
});