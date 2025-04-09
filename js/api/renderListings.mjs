import { apiFetch } from "./apiFetch.mjs";

export async function renderListings(containerSelector) {
  console.log("Rendering listings...");

  const container = document.querySelector(containerSelector);
  if (!container) return;

  container.textContent = `<p>Loading listings...</p>`;

  const response = await apiFetch(
    "/auction/listings?sort=created&sortOrder=desc&_limit=25"
  );

  const data = response?.data;

  // console.log("Listings:", data);

  if (!data || !Array.isArray(data)) {
    container.innerHTML = `<p>No listings found, missing data.</p>`;
    return;
  }

  if (data.length === 0) {
    container.innerHTML = `<p>No listings found.</p>`;
    return;
  }

  container.textContent = "";

  data.forEach((listing) => {
    const card = document.createElement("div");
    card.className =
      "bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl hover:border-blue-300 w-full sm:w-72";

    const imageUrl =
      listing.media?.[0]?.url || "https://via.placeholder.com/300x200";
    const altText = listing.media?.[0]?.alt || "Listing image";

    card.innerHTML = `
  <img src="${imageUrl}" alt="${altText}" class="w-full h-40 object-cover" />
  <div class="p-4 flex flex-col gap-2">
    <h3 class="text-lg font-semibold text-gray-900">${listing.title}</h3>
    <p class="text-sm text-gray-600">Ends at: ${new Date(
      listing.endsAt
    ).toLocaleString()}</p>
    ${
      listing.tags?.length
        ? `<div class="flex flex-wrap gap-1">
            ${listing.tags
              .map(
                (tag) =>
                  `<span class="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">${tag}</span>`
              )
              .join("")}
          </div>`
        : ""
    }
    <button class="mt-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition">
      View Listing
    </button>
  </div>
`;
    container.appendChild(card);
  });
}

renderListings("#listingContainer");
