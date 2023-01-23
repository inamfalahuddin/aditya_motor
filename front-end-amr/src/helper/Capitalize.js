export function capitalize(word) {
  return word
    .toLowerCase()
    .replace(/\w/, (firstLetter) => firstLetter.toUpperCase());
}
