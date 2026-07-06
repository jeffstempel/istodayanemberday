import { getEmberDays } from "./embertides.js";

function render() {
  const today = new Date();
  const emberDays = [...getEmberDays(today.getFullYear()), ...getEmberDays(today.getFullYear() + 1)].sort(
    (a, b) => a.date - b.date
  );

  const todaysEmberDay = emberDays.find(
    (emberDay) => emberDay.date.toDateString() === today.toDateString()
  );

  const yesNoElement = document.getElementById("yesno");
  const descriptionElement = document.getElementById("desc");

  if (todaysEmberDay) {
    yesNoElement.textContent = "YES!";
    descriptionElement.textContent = todaysEmberDay.description;
  } else {
    const nextEmberDay = emberDays.find((emberDay) => emberDay.date > today);
    yesNoElement.textContent = "NO!";
    descriptionElement.textContent = nextEmberDay
      ? `The next Ember Day is ${nextEmberDay.date.toDateString()}`
      : "";
  }
}

render();
