export function createBidInfo(bids) {
  const highestBid = bids.length ? Math.max(...bids.map((b) => b.amount)) : 0;

  const bidInfo = document.createElement("div");
  bidInfo.innerHTML = `
    <p class="text-gray-800 font-medium">Total Bids: ${bids.length}</p>
    <p class="text-gray-800 font-medium">Highest Bid: ${highestBid} credits</p>
`;

  return bidInfo;
}
