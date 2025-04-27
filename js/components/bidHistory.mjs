export function createBidHistory(bids = []) {
  const bidListContainer = document.createElement("div");
  bidListContainer.className = "mt-6";

  if (bids.length === 0) {
    const noBidsText = document.createElement("p");
    noBidsText.textContent = "No bids yet.";
    noBidsText.className = "text-gray-600";
    bidListContainer.appendChild(noBidsText);
    return bidListContainer;
  }

  // Find the highest bid
  const highestBid = bids.reduce(
    (max, bid) => (bid.amount > max.amount ? bid : max),
    bids[0]
  );

  const highestBidText = document.createElement("p");
  highestBidText.className = "text-green-600 font-bold mb-4";
  highestBidText.textContent = `Highest Bidder: ${
    highestBid.bidder.name || "Anonymous"
  } with ${highestBid.amount} credits`;

  const toggleButton = document.createElement("button");
  toggleButton.textContent = "Show Bid History";
  toggleButton.className =
    "mb-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded";

  const bidListWrapper = document.createElement("div");
  bidListWrapper.className =
    "transition-all duration-500 ease-in-out overflow-hidden";
  bidListWrapper.style.maxHeight = "0px"; // Start collapsed

  const bidListInner = document.createElement("div");

  const bidListTitle = document.createElement("h2");
  bidListTitle.textContent = "Bid History";
  bidListTitle.className = "text-lg font-semibold text-gray-800 mb-2";

  const bidList = document.createElement("ul");
  bidList.className = "space-y-2";

  // Sort oldest to newest
  bids.sort((a, b) => b.amount - a.amount);
  bids.forEach((bid) => {
    const listItem = document.createElement("li");
    listItem.className = "p-3 bg-gray-200 rounded-md shadow-sm";

    const listItemInner = document.createElement("div");
    listItemInner.className = "flex justify-between items-center text-sm";

    const formattedDate = new Date(bid.created).toLocaleString();
    const bidderName = bid.bidder?.name || "Anonymous";

    listItemInner.innerHTML = `
      <span class="font-medium text-gray-700">${bidderName}</span>
      <span class="font-medium text-gray-700">Amount: ${bid.amount} credits</span>
      <span class="font-medium text-gray-700">${formattedDate}</span>
    `;
    listItem.appendChild(listItemInner);
    bidList.appendChild(listItem);
  });

  bidListInner.appendChild(bidListTitle);
  bidListInner.appendChild(bidList);
  bidListWrapper.appendChild(bidListInner);

  toggleButton.addEventListener("click", () => {
    if (bidListWrapper.style.maxHeight === "0px") {
      bidListWrapper.style.maxHeight = bidListInner.scrollHeight + "px";
      toggleButton.textContent = "Hide Bid History";
    } else {
      bidListWrapper.style.maxHeight = "0px";
      toggleButton.textContent = "Show Bid History";
    }
  });

  bidListContainer.appendChild(highestBidText);
  bidListContainer.appendChild(toggleButton);
  bidListContainer.appendChild(bidListWrapper);

  return bidListContainer;
}
