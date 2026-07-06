// Computes the date of Easter Sunday for a given Gregorian calendar year
// (Meeus/Jones/Butcher algorithm).
export function getEasterDate(year) {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day);
}

export function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function getSundayOnOrBefore(date) {
  return addDays(date, -date.getDay());
}

function getSundayOnOrAfter(date) {
  return addDays(date, (7 - date.getDay()) % 7);
}

function getEmberDaysAfter(sunday, season) {
  return [
    { date: addDays(sunday, 3), description: `Ember Wednesday of ${season}` },
    { date: addDays(sunday, 5), description: `Ember Friday of ${season}` },
    { date: addDays(sunday, 6), description: `Ember Saturday of ${season}` },
  ];
}

// The four Embertides (Quatuor Tempora) of the traditional Roman calendar.
// Each spans the Wednesday, Friday, and Saturday following a fixed Sunday:
// the Third Sunday of Advent, the First Sunday of Lent, Pentecost, and the
// Third Sunday of September.
export function getEmberDays(year) {
  const easter = getEasterDate(year);

  const fourthSundayOfAdvent = getSundayOnOrBefore(new Date(year, 11, 24));
  const thirdSundayOfAdvent = addDays(fourthSundayOfAdvent, -7);
  const firstSundayOfLent = addDays(easter, -42);
  const pentecost = addDays(easter, 49);
  const thirdSundayOfSeptember = addDays(getSundayOnOrAfter(new Date(year, 8, 1)), 14);

  return [
    ...getEmberDaysAfter(thirdSundayOfAdvent, "Advent"),
    ...getEmberDaysAfter(firstSundayOfLent, "Lent"),
    ...getEmberDaysAfter(pentecost, "Whitsuntide"),
    ...getEmberDaysAfter(thirdSundayOfSeptember, "September"),
  ].sort((a, b) => a.date - b.date);
}
