export function displayMessage(selector, type = "info", text) {
  const messageContainer = document.querySelector(selector);
  if (!messageContainer) return;

  messageContainer.textContent = text;

  messageContainer.className = `message ${type}`;

  setTimeout(() => {
    messageContainer.textContent = "";
    messageContainer.className = "";
  }, 2000);
}
