import { expect, it, describe } from "bun:test";
import { GAMES, GAME_LIST, getGameTheme, getGameBySlug } from "./gameTheme";

describe("gameTheme", () => {
  it("exposes exactly CS2, Valorant, and GTA V", () => {
    expect(GAME_LIST.map((g) => g.key).sort()).toEqual(["CS2", "GTA V", "Valorant"].sort());
  });

  it("getGameTheme looks up a game by its canonical key", () => {
    expect(getGameTheme("Valorant")).toBe(GAMES.Valorant);
    expect(getGameTheme("GTA V")).toBe(GAMES["GTA V"]);
  });

  it("getGameTheme falls back to CS2 for an unknown key rather than throwing", () => {
    expect(getGameTheme("Fortnite")).toBe(GAMES.CS2);
    expect(getGameTheme(undefined)).toBe(GAMES.CS2);
  });

  it("getGameBySlug resolves each game's URL slug", () => {
    expect(getGameBySlug("cs2")).toBe(GAMES.CS2);
    expect(getGameBySlug("valorant")).toBe(GAMES.Valorant);
    expect(getGameBySlug("gta-v")).toBe(GAMES["GTA V"]);
    expect(getGameBySlug("nope")).toBeUndefined();
  });

  it("only CS2 and Valorant carry a rank ladder (GTA V has no rank-boost concept)", () => {
    expect(GAMES.CS2.rankLadder.length).toBeGreaterThan(0);
    expect(GAMES.Valorant.rankLadder.length).toBeGreaterThan(0);
    expect(GAMES["GTA V"].rankLadder).toBeUndefined();
  });

  it("Valorant's ladder ends on Radiant with three sub-tiers per rank below it", () => {
    const ladder = GAMES.Valorant.rankLadder;
    expect(ladder[ladder.length - 1]).toBe("Radiant");
    expect(ladder.slice(0, 3)).toEqual(["Iron 1", "Iron 2", "Iron 3"]);
  });
});
