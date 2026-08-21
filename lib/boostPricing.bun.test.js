import { expect, it, describe } from "bun:test";
import { computeBoostEstimate } from "./boostPricing";

const noOptions = { offline: false, soloQueue: false, no5Stack: false, stream: false, specificAgents: false };
const valorant = { boostPricePerStep: 3 };
const cs2 = { boostPricePerStep: 2.5 };

describe("computeBoostEstimate", () => {
  it("returns null when the desired rank is not above the current rank", () => {
    expect(computeBoostEstimate({
      theme: valorant, currentRankIndex: 5, desiredRankIndex: 5, currentRR: 0, mode: "solo", options: noOptions,
    })).toBeNull();

    expect(computeBoostEstimate({
      theme: valorant, currentRankIndex: 5, desiredRankIndex: 2, currentRR: 0, mode: "solo", options: noOptions,
    })).toBeNull();
  });

  it("prices a plain solo boost as steps * price-per-step, no multiplier", () => {
    const result = computeBoostEstimate({
      theme: valorant, currentRankIndex: 0, desiredRankIndex: 10, currentRR: 0, mode: "solo", options: noOptions,
    });
    expect(result).toEqual({ price: 30, steps: 10 });
  });

  it("lets progress within the current rank (RR) shave a fraction off the steps", () => {
    const result = computeBoostEstimate({
      theme: cs2, currentRankIndex: 0, desiredRankIndex: 5, currentRR: 50, mode: "solo", options: noOptions,
    });
    // 5 - 0 - 0.5 = 4.5 steps * 2.5/step = 11.25, rounded to nearest 0.5
    expect(result).toEqual({ price: 11.5, steps: 5 });
  });

  it("stacks every option multiplier on top of the base price", () => {
    const result = computeBoostEstimate({
      theme: valorant,
      currentRankIndex: 0,
      desiredRankIndex: 1,
      currentRR: 0,
      mode: "duo",
      options: { offline: true, soloQueue: true, no5Stack: true, stream: true, specificAgents: true },
    });
    // 1 step * 3/step * (1 + .25 + .15 + .1 + .1 + .1 + .15) = 1 * 3 * 1.85 = 5.55, rounded to nearest 0.5
    expect(result).toEqual({ price: 5.5, steps: 1 });
  });

  it("never quotes below the $5 minimum, even for a single cheap step", () => {
    const result = computeBoostEstimate({
      theme: { boostPricePerStep: 0.1 },
      currentRankIndex: 0,
      desiredRankIndex: 1,
      currentRR: 0,
      mode: "solo",
      options: noOptions,
    });
    expect(result.price).toBe(5);
  });

  it("rounds the quoted price to the nearest half-dollar", () => {
    const result = computeBoostEstimate({
      theme: { boostPricePerStep: 1.05 },
      currentRankIndex: 0,
      desiredRankIndex: 6,
      currentRR: 0,
      mode: "solo",
      options: noOptions,
    });
    // 6 steps * 1.05/step = 6.3 -> nearest 0.5 is 6.5
    expect(result.price).toBe(6.5);
  });
});
