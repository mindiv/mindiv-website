export function shuffleArray<T>(array: T[]): T[] {
  // Create a mutable copy of the input array
  const mutableArray = [...array];
  // Loop through the array from the end to the beginning
  for (let i = mutableArray.length - 1; i > 0; i--) {
    // Generate a random index from 0 to i
    const j = Math.floor(Math.random() * (i + 1));
    // Swap the current element with the randomly selected element
    [mutableArray[i], mutableArray[j]] = [mutableArray[j], mutableArray[i]];
  }
  return mutableArray;
}
