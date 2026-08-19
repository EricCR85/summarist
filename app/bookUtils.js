export function getDeterministicRating(id) {
  if (!id) return "4.5";
  const code = String(id)
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const rating = 4.0 + (code % 11) / 10;
  return rating.toFixed(1);
}

export function getDeterministicDuration(id) {
  if (!id) return "5:00";
  const code = String(id)
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const totalSeconds = 180 + (code % 720);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
