import { apiFetch } from "../api/apiFetch.mjs";
import { renderListingDetails } from "../api/renderSingleListing.mjs";

const token = localStorage.getItem("token");

export function createBidInfo(bids, listingId) {
  const highestBid = bids.length ? Math.max(...bids.map((b) => b.amount)) : 0;
  const minimumQuickBid = highestBid + 5;

  const bidInfo = document.createElement("div");
  bidInfo.className = "flex flex-col gap-2 mt-4";

  const totalBids = document.createElement("p");
  totalBids.textContent = `Total Bids: ${bids.length}`;
  totalBids.className = "text-gray-800 font-medium";

  const highestBidText = document.createElement("p");
  highestBidText.textContent = `Highest Bid: ${highestBid} credits`;
  highestBidText.className = "text-gray-800 font-medium";

  const quickBidButton = document.createElement("button");
  quickBidButton.type = "button";
  quickBidButton.textContent = `Quick Bid: ${minimumQuickBid} credits`;
  quickBidButton.className =
    "bg-green-500 text-white px-4 py-2 rounded hover:bg-blue-700 w-fit";

  quickBidButton.addEventListener("click", async () => {
    try {
      const bidResponse = await apiFetch(
        `/auction/listings/${listingId}/bids`,
        "POST",
        { amount: minimumQuickBid },
        token
      );
      if (bidResponse) {
        alert("Quick bid placed successfully!");
        renderListingDetails(listingId);
      }
    } catch (error) {
      console.error("Error placing quick bid:", error);
    }
  });
  bidInfo.appendChild(quickBidButton);
  bidInfo.appendChild(totalBids);
  bidInfo.appendChild(highestBidText);

  return bidInfo;
}
