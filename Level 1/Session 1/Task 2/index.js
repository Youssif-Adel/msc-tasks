const cardContainer = document.getElementById("card-container");
const filtersContainer = document.getElementById("filters-container");
const strongestHero = document.getElementById("strongest-hero");
const sortCheckbox = document.getElementById("sort-checkbox");

let currentFilter = "";

const superheroes = [
  {
    name: "Superman",
    powers: ["Flying", "Super Strength", "Heat Vision"],
    powerLevel: 95,
  },
  {
    name: "Batman",
    powers: ["Genius", "Martial Arts", "Stealth"],
    powerLevel: 85,
  },
  {
    name: "Wonder Woman",
    powers: ["Super Strength", "Combat Skills", "Lasso of Truth"],
    powerLevel: 90,
  },
  { name: "Flash", powers: ["Super Speed", "Time Travel"], powerLevel: 88 },
  {
    name: "Aquaman",
    powers: ["Swimming", "Super Strength", "Talking to Marine Life"],
    powerLevel: 80,
  },
  {
    name: "Iron Man",
    powers: ["Genius", "Advanced Armor", "Flight"],
    powerLevel: 87,
  },
  {
    name: "Spider-Man",
    powers: ["Wall Crawling", "Spider Sense", "Super Agility"],
    powerLevel: 86,
  },
  {
    name: "Thor",
    powers: ["Godlike Strength", "Lightning Control", "Immortality"],
    powerLevel: 95,
  },
  { name: "Hulk", powers: ["Super Strength", "Regeneration"], powerLevel: 96 },
  {
    name: "Doctor Strange",
    powers: ["Magic", "Time Manipulation", "Teleportation"],
    powerLevel: 92,
  },
  {
    name: "Black Panther",
    powers: ["Enhanced Reflexes", "Combat Skills", "Vibranium Suit"],
    powerLevel: 89,
  },
  {
    name: "Captain Marvel",
    powers: ["Super Strength", "Flight", "Energy Blasts"],
    powerLevel: 94,
  },
];

const superPowers = new Set();

function getSuperPowers() {
  for (let hero of superheroes) {
    const powers = hero.powers;

    for (let power of powers) {
      superPowers.add(power);
    }
  }
}

getSuperPowers();

function makeCard(name, powers, powerLevel) {
  const newCard = document.createElement("div");
  newCard.classList.add("card");

  const cardName = document.createElement("h2");
  cardName.textContent = name;
  newCard.appendChild(cardName);

  const cardPowers = document.createElement("p");
  cardPowers.textContent = `${powers.join(", ")}`;
  newCard.appendChild(cardPowers);

  const cardPowerLevel = document.createElement("p");
  cardPowerLevel.textContent = `Power Level: ${powerLevel}`;
  newCard.appendChild(cardPowerLevel);

  return newCard;
}

function renderHeroes() {
  cardContainer.innerHTML = "";
  getSortedHeroes()
    .filter((hero) => !currentFilter || hero.powers.includes(currentFilter))
    .map((hero) => makeCard(hero.name, hero.powers, hero.powerLevel))
    .forEach((card) => cardContainer.appendChild(card));
}
renderHeroes();

function makeFilterCard(name) {
  const newCard = document.createElement("div");
  newCard.classList.add("filter-card");

  const cardName = document.createElement("p");
  cardName.classList.add("filter-name");
  cardName.textContent = name;
  newCard.appendChild(cardName);

  newCard.addEventListener("click", () => {
    if (currentFilter === name) currentFilter = "";
    else currentFilter = name;
    renderFilters();
  });

  if (currentFilter === name) {
    newCard.classList.add("active");
  } else {
    newCard.classList.remove("active");
  }

  return newCard;
}

function renderFilters() {
  filtersContainer.innerHTML = "";
  for (let power of superPowers) {
    const filterCard = makeFilterCard(power);
    filtersContainer.appendChild(filterCard);
  }
  renderHeroes();
}
renderFilters();

function getStrongestHero() {
  const strongest = superheroes.reduce(
    (max, hero) => (hero.powerLevel > max.powerLevel ? hero : max),
    superheroes[0],
  );

  strongestHero.innerHTML = `<h1>Strongest hero: ${strongest.name}</h1>`;
}

getStrongestHero();

sortCheckbox.addEventListener("change", () => {
  renderHeroes();
});

function getSortedHeroes() {
  if (sortCheckbox.checked)
    return superheroes.toSorted((a, b) => b.powerLevel - a.powerLevel);
  return superheroes;
}
