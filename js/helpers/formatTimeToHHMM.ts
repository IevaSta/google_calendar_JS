export function formatTimeToHHMM(date: Date) {
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}`;
}
