import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Activity } from "./activity-utils";

const { queryMock } = vi.hoisted(() => ({
  queryMock: vi.fn(),
}));

vi.mock("@apollo/client", () => ({
  ApolloClient: vi.fn(function ApolloClient() {
    return { query: queryMock };
  }),
  gql: (strings: TemplateStringsArray, ...values: unknown[]) =>
    strings.reduce(
      (result, string, index) => `${result}${string}${values[index] ?? ""}`,
      "",
    ),
  HttpLink: vi.fn(function HttpLink() {}),
  InMemoryCache: vi.fn(function InMemoryCache() {}),
}));

describe("getActivities", () => {
  beforeEach(() => {
    vi.resetModules();
    queryMock.mockReset();
  });

  it("returns activities from GraphQL", async () => {
    const activities: Activity[] = [
      {
        title: "Latest",
        date: "2024-10-29",
        description: "Seen near the reef.",
        post_link: "https://example.com/post",
      },
    ];
    queryMock.mockResolvedValue({ data: { activities } });

    const { getActivities } = await import("./apollo");

    expect(await getActivities()).toEqual(activities);
  });

  it("returns an empty list when GraphQL fails", async () => {
    queryMock.mockRejectedValue(new Error("network unavailable"));

    const { getActivities } = await import("./apollo");

    expect(await getActivities()).toEqual([]);
  });
});
