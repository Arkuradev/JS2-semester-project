import { apiFetch } from "./apiFetch.mjs";
import { createListingHeader } from "../components/listingHeader.mjs";
import { createBidForm } from "../components/bidForm.mjs";
import { createBidInfo } from "../components/bidInfo.mjs";
import { createBidHistory } from "../components/bidHistory.mjs";

// const token = localStorage.getItem("token");
const params = new URLSearchParams(window.location.search);
const listingId = params.get("id");
const container = document.querySelector("#listingContainer");

//Replace with error handling later....

if (!listingId) {
  showError("No listing ID found.");
} else {
  renderListingDetails(listingId);
}

function showError(message) {
  const error = document.createElement("p");
  error.textContent = message;
  error.className = "text-red-600";
  container.appendChild(error);
}

export async function renderListingDetails(id) {
  const response = await apiFetch(`/auction/listings/${id}?_bids=true`);
  const listing = response?.data;

  container.innerHTML = "";

  if (!listing) return showError("Listing not found."); // Double check?? Remove?

  const bids = listing.bids || [];

  const backButton = document.createElement("a");
  backButton.href = "/index.html";
  backButton.className =
    "inline-block mb-10 text-blue-600 hover:underline text-sm mb-4 font-medium";
  backButton.textContent = "← Back to Listings";
  container.appendChild(backButton);

  const card = document.createElement("article");
  card.className = "bg-white mt-4 shadow-lg overflow-hidden";

  const image = document.createElement("img");
  image.src = listing.media?.[0]?.url;
  image.alt = listing.media?.[0]?.url;
  image.className = "w-full h-80 object-cover"; // COME BACK TO FIX THIS.

  const content = document.createElement("div");
  content.className = "p-6 space-y-4";

  const header = createListingHeader(listing);
  const bidForm = createBidForm(id);
  // const bidInfo = createBidInfo(listing.bids || []);
  const bidInfo = createBidInfo(bids, listingId);
  const bidHistorySection = createBidHistory(listing.bids || []);

  content.appendChild(header);
  content.appendChild(bidForm);
  content.appendChild(bidInfo);
  if (bidHistorySection) content.appendChild(bidHistorySection);

  card.appendChild(image);
  card.appendChild(content);
  container.appendChild(card);
}
