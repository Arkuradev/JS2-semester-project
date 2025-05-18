export function getCountDownText(endsAt) {
  const now = new Date();
  const endTime = new Date(endsAt);
  const diff = endTime - now;

  const span = document.createElement("span");

  if (diff < 0) {
    span.textContent = "❌ Listing closed.";
    span.className = "text-red-400 font-semibold";
    return span;
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const parts = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (seconds > 0) parts.push(`${seconds}s`);

  span.textContent = `⏱ Ends in: ${parts.join(" ")}`;
  return span;
}
