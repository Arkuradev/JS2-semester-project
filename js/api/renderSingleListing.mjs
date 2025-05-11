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

  if (!listing) return showError("Listing not found."); // Double check?? Remove?

  // const bids = listing.bids || [];

  const backButton = document.createElement("a");
  backButton.href = "/index.html";
  backButton.className =
    "inline-block mb-10 text-text hover:underline hover:text-hover hover:scale-105 text-sm mb-4 font-medium";
  backButton.textContent = "← Back to Listings";
  container.appendChild(backButton);

  const card = document.createElement("article");
  card.className = "bg-nav mt-4 shadow-lg overflow-hidden";

  const image = document.createElement("img");
  image.src = listing.media?.[0]?.url || "../images/placeholder.jpg";
  image.alt = listing.media?.[0]?.url;
  image.className = "w-full h-80 object-cover";

  // Come back to fix this to make it look gooood! Because profile information is next on the block!

  const sellerInfo = document.createElement("a");
  sellerInfo.className =
    "text-text hover:underline hover:text-hover hover:scale-105 text-sm mb-4 font-medium";
  sellerInfo.textContent = `${listing.seller.name}`;
  sellerInfo.href = `/profile/user.html?user=${listing.seller.name}`;

  const content = document.createElement("div");
  content.className = "text-text p-6 space-y-4";

  const header = createListingHeader(listing);
  const sellerName = listing?.seller?.name || "";
  const bidForm = createBidForm(listing.id, sellerName);
  // const bidInfo = createBidInfo(listing.bids || []);
  //const bidInfo = createBidInfo(bids, id);
  const bidHistorySection = createBidHistory(listing.bids || []);

  content.appendChild(header);
  content.appendChild(bidForm);

  //content.appendChild(bidInfo);
  if (bidHistorySection) content.appendChild(bidHistorySection);

  card.appendChild(image);
  card.appendChild(sellerInfo);
  card.appendChild(content);

  container.appendChild(card);
}
