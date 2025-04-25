export function createBidHistory(bids) {
  if (!bids.length) return null;

  const wrapper = document.createElement("div");
  wrapper.className = "mt-6";

  const toggleButton = document.createElement("button");
  toggleButton.textContent = "Show Bid History";
  toggleButton.className =
    "text-blue-600 underline hover:no-underline font-semibold mb-2";
  toggleButton.setAttribute("aria-expanded", "false");

  const bidList = document.createElement("ul");
  bidList.className = "space-y-2 hidden";

  bids
    .sort((a, b) => new Date(b.created) - new Date(a.created))
    .forEach((bid) => {
      const item = document.createElement("li");
      item.className = "p-3 bg-gray-100 rounded-md shadow-sm";

      const formattedDate = new Date(bid.created).toLocaleString();
      const bidderName = bid.bidder?.name || "Anonymous";

      item.innerHTML = `
        <p><strong>User:</strong> ${bidderName}</p>
        <p><strong>Amount:</strong> ${bid.amount} credits</p>
        <p><strong>Bid:</strong> ${formattedDate}</p>
        `;

      bidList.appendChild(item);
    });

  toggleButton.addEventListener("click", () => {
    bidList.classList.toggle("hidden");
    const expanded = toggleButton.getAttribute("aria-expanded") === "true";
    toggleButton.setAttribute("aria-expanded", String(!expanded));
  });

  wrapper.appendChild(toggleButton);
  wrapper.appendChild(bidList);
  return wrapper;
}
