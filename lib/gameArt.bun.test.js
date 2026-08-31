import { expect, it, describe } from "bun:test";
import { GAME_ART, CROSSOVER_ART, HOMEPAGE_HERO_ART, getGameArt, interleaveArt } from "./gameArt";

describe("gameArt", () => {
  it("has a non-empty curated set for each of the three games", () => {
    expect(GAME_ART.cs2.length).toBeGreaterThan(0);
    expect(GAME_ART.valorant.length).toBeGreaterThan(0);
    expect(GAME_ART["gta-v"].length).toBeGreaterThan(0);
  });

  it("every image has a src, non-empty alt text, and an accent color", () => {
    for (const slug of Object.keys(GAME_ART)) {
      for (const image of GAME_ART[slug]) {
        expect(image.src).toMatch(/^\/images\//);
        expect(image.alt.length).toBeGreaterThan(0);
        expect(image.accent).toMatch(/^#/);
      }
    }
  });

  it("has no duplicate image src across the whole collection", () => {
    const allSrcs = [
      ...Object.values(GAME_ART).flatMap((images) => images.map((i) => i.src)),
      CROSSOVER_ART.src,
    ];
    expect(new Set(allSrcs).size).toBe(allSrcs.length);
  });

  it("getGameArt looks up by slug and falls back to an empty array", () => {
    expect(getGameArt("cs2")).toBe(GAME_ART.cs2);
    expect(getGameArt("not-a-game")).toEqual([]);
  });

  it("interleaveArt keeps every item exactly once and avoids adjacent repeats from the same group", () => {
    const groups = [["a1", "a2"], ["b1"], ["c1", "c2", "c3"]];
    const result = interleaveArt(...groups);

    expect(result.slice().sort()).toEqual(groups.flat().sort());

    const groupOf = (item) => groups.findIndex((g) => g.includes(item));
    for (let i = 1; i < result.length; i += 1) {
      expect(groupOf(result[i])).not.toBe(groupOf(result[i - 1]));
    }
  });

  it("HOMEPAGE_HERO_ART includes every curated image plus the crossover, with no two adjacent slides from the same game", () => {
    const totalCurated = GAME_ART.cs2.length + GAME_ART.valorant.length + GAME_ART["gta-v"].length;
    expect(HOMEPAGE_HERO_ART.length).toBe(totalCurated + 1);
    expect(HOMEPAGE_HERO_ART[HOMEPAGE_HERO_ART.length - 1]).toBe(CROSSOVER_ART);

    for (let i = 1; i < HOMEPAGE_HERO_ART.length; i += 1) {
      expect(HOMEPAGE_HERO_ART[i].accent).not.toBe(HOMEPAGE_HERO_ART[i - 1].accent);
    }
  });
});
