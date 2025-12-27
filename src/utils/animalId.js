const adjectives = [
  "sleepy",
  "curious",
  "brave",
  "silent",
  "happy",
  "lonely",
  "gentle",
  "chaotic",
  "dreamy",
  "wise",
];

const animals = [
  "panda",
  "fox",
  "owl",
  "tiger",
  "cat",
  "wolf",
  "koala",
  "otter",
  "deer",
  "penguin",
];

export function generateAnimalId() {
  const adjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const animal =
    animals[Math.floor(Math.random() * animals.length)];
  const number = Math.floor(10 + Math.random() * 90);

  return `${adjective}_${animal}_${number}`;
}
