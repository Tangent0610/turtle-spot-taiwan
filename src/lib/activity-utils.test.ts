import { describe, expect, it } from "vitest";
import {
  formatActivityDate,
  sortActivitiesByDateDesc,
  type Activity,
} from "./activity-utils";

describe("activity utilities", () => {
  it("formats activity dates as YYYY/MM/DD", () => {
    expect(formatActivityDate("2024-10-29")).toBe("2024/10/29");
  });

  it("sorts activities from newest to oldest without mutating input", () => {
    const activities: Activity[] = [
      {
        title: "Older",
        date: "2024-04-13",
        description: null,
        post_link: null,
      },
      {
        title: "Newest",
        date: "2024-10-29",
        description: null,
        post_link: null,
      },
      {
        title: "Middle",
        date: "2024-07-29",
        description: null,
        post_link: null,
      },
    ];

    const sorted = sortActivitiesByDateDesc(activities);

    expect(sorted.map((activity) => activity.title)).toEqual([
      "Newest",
      "Middle",
      "Older",
    ]);
    expect(activities.map((activity) => activity.title)).toEqual([
      "Older",
      "Newest",
      "Middle",
    ]);
  });
});
