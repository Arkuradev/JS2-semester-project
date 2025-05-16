import { apiFetch } from "./apiFetch.mjs";
import { createListingHeader } from "../components/listingHeader.mjs";
import { createBidForm } from "../components/bidForm.mjs";
import { createBidHistory } from "../components/bidHistory.mjs";

const container = document.querySelector("#listingContainer");

function showError(message) {
  const error = document.createElement("p");
  error.textContent = message;
  error.className = "text-red-600";
  container.appendChild(error);
}

export async function renderListingDetails() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const response = await apiFetch(
    `/auction/listings/${id}?_bids=true&_seller=true`,
    "GET",
    null,
    false,
    container
  );
  const listing = response?.data;

  container.innerHTML = "";

  if (!listing) return showError("Listing not found.");

  const layoutWrapper = document.createElement("div");
  layoutWrapper.className = "w-full flex justify-center px-4 mt-16";

  // Create a container inside the wrapper to stack the button and card
  const innerWrapper = document.createElement("div");
  innerWrapper.className = "w-full max-w-3xl";

  // Create back button
  const backButton = document.createElement("a");
  backButton.href = "/index.html";
  backButton.className =
    "inline-block mb-6 text-text hover:underline font-semibold hover:text-hover hover:scale-105 transition-transform text-sm font-medium";
  backButton.textContent = "← Back to Listings";

  const card = document.createElement("article");
  card.className =
    "w-full max-w-3xl bg-nav mt-4 shadow-lg overflow-hidden rounded";

  // Main image
  const image = document.createElement("img");
  image.src = listing.media?.[0]?.url || "../images/placeholder.jpg";
  image.alt = listing.media?.[0]?.alt || "Listing image";
  image.className = "w-full h-80 object-cover";

  // Seller info
  const sellerInfo = document.createElement("a");
  sellerInfo.className = "text-text text-sm mb-4 font-medium";
  sellerInfo.innerHTML = `<p class="text-text text-sm">Listed by: 
  <a href="/profile/user.html?name=${listing.seller.name}" class="text-text hover:text-hover hover:underline font-semibold">
    ${listing.seller.name}
  </a></p>`;

  // Content section
  const content = document.createElement("div");
  content.className = "text-text p-6 space-y-4";

  const header = createListingHeader(listing);
  const sellerName = listing?.seller?.name || "";
  const bidForm = createBidForm(listing.id, sellerName);
  const bidHistorySection = createBidHistory(listing.bids || []);

  content.appendChild(header);
  content.appendChild(bidForm);
  if (bidHistorySection) content.appendChild(bidHistorySection);

  card.appendChild(image);
  card.appendChild(sellerInfo);
  card.appendChild(content);

  innerWrapper.appendChild(backButton);
  innerWrapper.appendChild(card);

  layoutWrapper.appendChild(innerWrapper);
  container.appendChild(layoutWrapper);
}
