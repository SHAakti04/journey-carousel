import { describe, expect, it } from "vitest";
import { journeyCarouselItems } from "./chapters";
import { nextChapter } from "./motion";

describe("Journey notebook requirements", () => {
  it("opens with Chapter 01", () => {
    expect(journeyCarouselItems[0]?.chapter).toBe("Chapter 01");
  });
  it("moves through chapters 01 to 08 in order", () => {
    expect(journeyCarouselItems.map((chapter) => chapter.chapter)).toEqual([
      "Chapter 01", "Chapter 02", "Chapter 03", "Chapter 04",
      "Chapter 05", "Chapter 06", "Chapter 07", "Chapter 08",
    ]);
    expect(nextChapter(0, 1, 8)).toBe(1);
  });
  it("turns from Chapter 08 back to Chapter 01", () => {
    expect(nextChapter(7, 1, 8)).toBe(0);
  });
  it("turns backwards from Chapter 01 to Chapter 08", () => {
    expect(nextChapter(0, -1, 8)).toBe(7);
  });
});