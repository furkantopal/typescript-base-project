export const calc = (input: number[]) => {
  const a = Number.NEGATIVE_INFINITY;
  let currentSum;
  for (let i = 0; i < input.length; i++) {
    currentSum = input[i];

    for (let j = 1; j < input.length; j++) {
      if (input[j] > a) {
        currentSum += input[j];
      }
    }
  }
  return currentSum;
};
