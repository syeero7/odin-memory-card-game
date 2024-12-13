export function getRandomNumbers(maxLimit, maxLength) {
  const numbers = {};
  const randomNumbers = [];

  while (randomNumbers.length !== maxLength) {
    const randomNumber = Math.floor(Math.random() * maxLimit) + 1;

    if (!numbers[randomNumber]) {
      numbers[randomNumber] = 1;
      randomNumbers.push(randomNumber);
    }
  }

  return randomNumbers;
}

export function shuffle(array) {
  const newArray = [...array];

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }

  return newArray;
}
