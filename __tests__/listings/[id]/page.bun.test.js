import { expect, it, describe, mock } from "bun:test";

// Mock react/jsx-dev-runtime to avoid ERR_MODULE_NOT_FOUND when importing the page
mock.module("react/jsx-dev-runtime", () => ({
  jsx: () => null,
  jsxs: () => null,
  jsxDEV: () => null,
}));

// Mock next/navigation
mock.module("next/navigation", () => ({
  notFound: mock(),
  useRouter: mock(),
}));

// Mock next/link
mock.module("next/link", () => ({
  default: () => null,
}));

// Mock react cache before importing the page
mock.module("react", () => ({
  cache: (fn) => fn,
}));

// Mock prisma before importing the page
const mockFindUnique = mock();
mock.module("../../../lib/prisma", () => ({
  prisma: {
    listing: {
      findUnique: mockFindUnique,
    },
  },
}));

// Now import the code to test
const { generateMetadata } = await import("../../../app/listings/[id]/page");

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
    mockFindUnique.mockResolvedValueOnce(mockListing);

    const params = Promise.resolve({ id: "123" });
    const metadata = await generateMetadata({ params });

    expect(metadata).toEqual({
      title: "Pro Valorant Account | Buy Valorant Accounts",
      description: "Securely buy this Valorant account. Rank: Radiant, Region: NA. Instant delivery and escrow protection guaranteed.",
    });
    expect(mockFindUnique).toHaveBeenCalledWith({
      where: { id: "123" },
    });
  });

  it("returns 'Listing Not Found' when listing does not exist", async () => {
    mockFindUnique.mockResolvedValueOnce(null);

    const params = Promise.resolve({ id: "nonexistent" });
    const metadata = await generateMetadata({ params });

    expect(metadata).toEqual({ title: "Listing Not Found" });
  });
});
