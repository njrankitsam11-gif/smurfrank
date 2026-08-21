// Client-side instant-estimate pricing for the rank booster. Not a real
// third-party-competing marketplace like Eldorado's — we self-fulfill, so
// this is a transparent formula rather than a manual quote queue.
export function computeBoostEstimate({ theme, currentRankIndex, desiredRankIndex, currentRR = 0, mode, options }) {
  const rawSteps = desiredRankIndex - currentRankIndex - currentRR / 100;
  if (rawSteps <= 0) return null;

  const multiplier =
    1 +
    (mode === 'duo' ? 0.25 : 0) +
    (options.offline ? 0.15 : 0) +
    (options.soloQueue ? 0.1 : 0) +
    (options.no5Stack ? 0.1 : 0) +
    (options.stream ? 0.1 : 0) +
    (options.specificAgents ? 0.15 : 0);

  const raw = rawSteps * theme.boostPricePerStep * multiplier;
  const price = Math.max(5, Math.round(raw * 2) / 2);

  return { price, steps: Math.ceil(rawSteps) };
}
