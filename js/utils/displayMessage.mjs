export function displayMessage(type = "info", message = "Something happened.") {
  const oldMessage = document.querySelector("#global-message");
  if (oldMessage) oldMessage.remove();

  const wrapper = document.createElement("div");
  wrapper.id = "global-message";
  wrapper.className = `
    fixed top-16 inset-x-0 mx-auto z-50
    w-[90%] max-w-xs sm:max-w-sm px-4 py-3 rounded-lg shadow-lg
    flex items-start justify-between gap-2 text-sm animate-fade-in
    ${
      type === "success"
        ? "bg-green-100 border border-green-400 text-green-800"
        : type === "error"
        ? "bg-red-100 border border-red-400 text-red-800"
        : "bg-blue-100 border border-blue-400 text-blue-800"
    }
  `;

  const icon = document.createElement("span");
  icon.innerHTML = type === "success" ? "✅" : type === "error" ? "❌" : "ℹ️";

  const text = document.createElement("p");
  text.textContent = message;
  text.className = "flex-1";

  const dismissBtn = document.createElement("button");
  dismissBtn.innerHTML = "&times;";
  dismissBtn.className = "ml-2 text-lg font-bold leading-none hover:opacity-75";
  dismissBtn.onclick = () => wrapper.remove();

  wrapper.appendChild(icon);
  wrapper.appendChild(text);
  wrapper.appendChild(dismissBtn);

  document.body.appendChild(wrapper);

  setTimeout(() => {
    wrapper.remove();
  }, 2000);
}
