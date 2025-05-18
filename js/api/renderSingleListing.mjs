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

  const innerWrapper = document.createElement("div");
  innerWrapper.className = "w-full max-w-3xl";

  const backButton = document.createElement("a");
  backButton.href = "/index.html";
  backButton.className =
    "inline-block mb-6 text-text hover:underline font-semibold hover:text-hover hover:scale-105 transition-transform text-sm font-medium";
  backButton.textContent = "← Back to Listings";

  const card = document.createElement("article");
  card.className =
    "w-full max-w-3xl bg-nav mt-4 shadow-lg overflow-hidden rounded";

  const galleryWrapper = document.createElement("div");
  galleryWrapper.className = "w-full  mb-4";

  const mainImage = document.createElement("img");
  mainImage.src = listing.media?.[0]?.url || "../images/placeholder.jpg";
  mainImage.alt = listing.media?.[0]?.alt || "Listing image";
  mainImage.className = "w-full h-80 object-cover rounded mb-4";
  galleryWrapper.appendChild(mainImage);

  if (Array.isArray(listing.media) && listing.media.length > 1) {
    const thumbnails = document.createElement("div");
    thumbnails.className = "flex gap-2 overflow-x-auto";

    listing.media.forEach((media, index) => {
      const thumb = document.createElement("img");
      thumb.src = media.url;
      thumb.alt = media.alt || `Image ${index + 1}`;
      thumb.className =
        "flex gap-2 overflow-y-auto max-w-full ml-2 h-20 w-20 object-cover border border-hover rounded cursor-pointer transition";

      thumb.addEventListener("click", () => {
        mainImage.src = media.url;
        mainImage.alt = media.alt;
      });

      thumbnails.appendChild(thumb);
    });

    galleryWrapper.appendChild(thumbnails);
  }

  const sellerInfo = document.createElement("a");
  sellerInfo.className = "text-text text-sm mb-4 font-medium";
  sellerInfo.innerHTML = `<p class="text-text text-sm ml-2">Listed by: 
  <a href="/profile/user.html?name=${listing.seller.name}" class="text-text hover:text-hover hover:underline font-semibold">
    ${listing.seller.name}
  </a></p>`;

  const content = document.createElement("div");
  content.className = "text-text p-6 space-y-4";

  const header = createListingHeader(listing);
  const sellerName = listing?.seller?.name || "";
  const bidForm = createBidForm(listing.id, sellerName);
  const bidHistorySection = createBidHistory(listing.bids || []);

  content.appendChild(header);
  content.appendChild(bidForm);
  if (bidHistorySection) content.appendChild(bidHistorySection);

  card.appendChild(galleryWrapper);
  card.appendChild(sellerInfo);
  card.appendChild(content);

  innerWrapper.appendChild(backButton);
  innerWrapper.appendChild(card);

  layoutWrapper.appendChild(innerWrapper);
  container.appendChild(layoutWrapper);
}
