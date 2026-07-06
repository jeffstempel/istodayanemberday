import { test, describe } from "node:test";
import assert from "node:assert/strict";
import { getEasterDate, getEmberDays } from "./embertides.js";

describe("getEasterDate", () => {
  const cases = [
    [2021, "Sun Apr 04 2021"],
    [2024, "Sun Mar 31 2024"],
    [2025, "Sun Apr 20 2025"],
    [2026, "Sun Apr 05 2026"],
  ];

  for (const [year, expected] of cases) {
    test(`Easter ${year}`, () => {
      assert.equal(getEasterDate(year).toDateString(), expected);
    });
  }
});

describe("getEmberDays", () => {
  test("2021 dates match the historical liturgical calendar", () => {
    const dates = getEmberDays(2021).map((emberDay) => emberDay.date.toDateString());

    assert.deepEqual(dates, [
      "Wed Feb 24 2021",
      "Fri Feb 26 2021",
      "Sat Feb 27 2021",
      "Wed May 26 2021",
      "Fri May 28 2021",
      "Sat May 29 2021",
      "Wed Sep 22 2021",
      "Fri Sep 24 2021",
      "Sat Sep 25 2021",
      "Wed Dec 15 2021",
      "Fri Dec 17 2021",
      "Sat Dec 18 2021",
    ]);
  });

  test("returns 12 entries per year with no duplicate descriptions", () => {
    const emberDays = getEmberDays(2024);
    const descriptions = new Set(emberDays.map((emberDay) => emberDay.description));
    assert.equal(emberDays.length, 12);
    assert.equal(descriptions.size, emberDays.length);
  });

  test("every ember day falls on a Wednesday, Friday, or Saturday", () => {
    for (const year of [2021, 2024, 2025, 2026]) {
      for (const { date, description } of getEmberDays(year)) {
        assert.ok([3, 5, 6].includes(date.getDay()), `${description} in ${year}`);
      }
    }
  });

  test("every date falls within the requested year", () => {
    for (const year of [2021, 2024, 2025, 2026]) {
      for (const { date, description } of getEmberDays(year)) {
        assert.equal(date.getFullYear(), year, `${description} in ${year}`);
      }
    }
  });

  test("handles a leap year (2024) without error", () => {
    assert.doesNotThrow(() => getEmberDays(2024));
  });
});
