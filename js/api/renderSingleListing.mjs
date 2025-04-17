import { apiFetch } from "./apiFetch.mjs";

const params = new URLSearchParams(window.location.search);
const listingId = params.get("id");

const container = document.querySelector("#listingContainer");

if (!listingId) {
  const error = document.createElement("p");
  error.textContent = "No listing ID found.";
  error.className = "text-red-600";
  container.appendChild(error);
} else {
  renderListingDetails(listingId);
}

async function renderListingDetails(id) {
  const response = await apiFetch(`/auction/listings/${id}`);
  const listing = response?.data;

  container.innerHTML = "";

  if (!listing) {
    const error = document.createElement("p");
    error.textContent = "Listing not found.";
    error.className = "text-red-600";
    container.appendChild(error);
    return;
  }

  const card = document.createElement("div");
  card.className = "bg-white rounded-2xl shadow-lg overflow-hidden";

  const image = document.createElement("img");
  image.src = listing.media?.[0]?.url;
  image.alt = listing.media?.[0]?.url;
  image.className = "w-full h-80 object-cover rounded-t-2xl";

  const content = document.createElement("div");
  content.className = "p-6 space-y-4";

  const title = document.createElement("h1");
  title.className = "text-2xl font-bold";
  title.textContent = listing.title;

  const endsAt = document.createElement("p");
  endsAt.className = "text-gray-600";
  endsAt.textContent = `Ends at: ${new Date(listing.endsAt).toLocaleString()}`;

  const description = document.createElement("p");
  description.className = "text-gray-700";
  description.textContent = listing.description || "No description available.";

  content.appendChild(title);
  content.appendChild(endsAt);
  content.appendChild(description);

  if (Array.isArray(listing.tags) && listing.tags.length > 0) {
    const tagContainer = document.createElement("div");
    tagContainer.className = "flex flex-wrap gap-2 mt-4";

    listing.tags.forEach((tag) => {
      const tagEl = document.createElement("span");
      tagEl.textContent = tag;
      tagEl.className =
        "bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full";
      tagContainer.appendChild(tagEl);
    });

    content.appendChild(tagContainer);
  }

  card.appendChild(image);
  card.appendChild(content);
  container.appendChild(card);
}
