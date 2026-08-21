import { expect, it, describe, mock } from "bun:test";
import * as ReactActual from "react";
import * as NavigationActual from "next/navigation";

// Mock react/jsx-dev-runtime to avoid ERR_MODULE_NOT_FOUND when importing the page
mock.module("react/jsx-dev-runtime", () => ({
  jsx: () => null,
  jsxs: () => null,
  jsxDEV: () => null,
}));

// Only override notFound — spreading the real module keeps other exports
// (useRouter, etc.) intact for anything pulled in transitively (BuyButton).
mock.module("next/navigation", () => ({
  ...NavigationActual,
  notFound: mock(),
}));

// Mock next/link
mock.module("next/link", () => ({
  default: () => null,
}));

// Only override react's `cache` — spreading the real module keeps every
// other export (createContext, etc.) intact for anything pulled in
// transitively while importing the page.
mock.module("react", () => ({
  ...ReactActual,
  cache: (fn) => fn,
}));

// Mock prisma before importing the page. The page filters out inactive/
// pending listings via findFirst({ where: { id, active: true } }).
const mockFindFirst = mock();
mock.module("../../../lib/prisma", () => ({
  prisma: {
    listing: {
      findFirst: mockFindFirst,
    },
  },
}));

// Now import the code to test
const { generateMetadata } = await import("../../../app/(site)/listings/[id]/page");

describe("Listing Detail generateMetadata", () => {

  it("returns metadata for a valid listing", async () => {
    const mockListing = {
      id: "123",
      title: "Pro Valorant Account",
      game: "Valorant",
      rank: "Radiant",
      region: "NA",
      price: 500,
    };
    mockFindFirst.mockResolvedValueOnce(mockListing);

    const params = Promise.resolve({ id: "123" });
    const metadata = await generateMetadata({ params });

    expect(metadata).toEqual({
      title: "Pro Valorant Account | Buy Valorant Accounts",
      description: "Securely buy this Valorant account. Rank: Radiant, Region: NA. Instant delivery and escrow protection guaranteed.",
    });
    expect(mockFindFirst).toHaveBeenCalledWith({
      where: { id: "123", active: true },
    });
  });

  it("returns 'Listing Not Found' when listing does not exist", async () => {
    mockFindFirst.mockResolvedValueOnce(null);

    const params = Promise.resolve({ id: "nonexistent" });
    const metadata = await generateMetadata({ params });

    expect(metadata).toEqual({ title: "Listing Not Found" });
  });
});
