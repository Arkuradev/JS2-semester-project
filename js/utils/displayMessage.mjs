export function displayMessage(type = "info", message = "Something happened.") {
  // Remove any existing messages
  const oldMessage = document.querySelector("#global-message");
  if (oldMessage) oldMessage.remove();

  // Create the wrapper
  const wrapper = document.createElement("div");
  wrapper.id = "global-message";
  wrapper.className = `
     fixed top-16 left-1/2 transform -translate-x-1/2 z-150
  max-w-sm w-full px-4 py-3 rounded-lg shadow-lg
  flex items-start justify-between gap-2 text-sm animate-fade-in
  ${
    type === "success"
      ? "bg-green-100 border border-green-400 text-green-800"
      : type === "error"
      ? "bg-red-100 border border-red-400 text-red-800"
      : "bg-blue-100 border border-blue-400 text-blue-800"
  }
`;

  // Add icon and text
  const icon = document.createElement("span");
  icon.innerHTML = type === "success" ? "✅" : type === "error" ? "❌" : "ℹ️";

  const text = document.createElement("p");
  text.textContent = message;
  text.className = "flex-1";

  // Dismiss button
  const dismissBtn = document.createElement("button");
  dismissBtn.innerHTML = "&times;";
  dismissBtn.className = "ml-2 text-lg font-bold leading-none hover:opacity-75";
  dismissBtn.onclick = () => wrapper.remove();

  // Append children
  wrapper.appendChild(icon);
  wrapper.appendChild(text);
  wrapper.appendChild(dismissBtn);

  // Add to body
  document.body.appendChild(wrapper);

  // Auto-dismiss after 5 seconds
  setTimeout(() => {
    wrapper.remove();
  }, 2000);
}
