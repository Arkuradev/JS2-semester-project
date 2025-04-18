import { apiFetch } from "./apiFetch.mjs";

export async function renderListings(containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  container.innerHTML = `<p>Loading listings...</p>`;

  const response = await apiFetch(
    "/auction/listings?sort=created&sortOrder=desc&_limit=25"
  );

  const data = response?.data;

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
      "bg-white rounded-2xl border border-gray-200 shadow-md overflow-hidden transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl hover:border-blue-300 w-full sm:w-72";

    // Fix this error in console from this: image.src = listing.media?.[0]?.url;
    const image = document.createElement("img");
    image.src = listing.media?.[0]?.url;
    image.alt = listing.media?.[0]?.alt || "Listing image";
    image.className = "w-full h-40 object-cover";

    const content = document.createElement("div");
    content.className = "p-4 flex flex-col gap-2";

    const title = document.createElement("h3");
    title.className = "text-lg font-semibold text-gray-900";
    title.textContent = listing.title;

    const endsAt = document.createElement("p");
    endsAt.className = "text-sm text-gray-600";
    endsAt.textContent = `Ends at: ${new Date(
      listing.endsAt
    ).toLocaleString()}`;

    content.appendChild(title);
    content.appendChild(endsAt);

    if (Array.isArray(listing.tags) && listing.tags.length > 0) {
      const tagsContainer = document.createElement("div");
      tagsContainer.className = "flex flex-wrap gap-1";

      listing.tags.forEach((tag) => {
        const tagEl = document.createElement("span");
        tagEl.className =
          "bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full";
        tagEl.textContent = tag;
        tagsContainer.appendChild(tagEl);
      });

      content.appendChild(tagsContainer);
    }

    const viewLink = document.createElement("a");
    viewLink.href = `/listing/viewlisting.html?id=${listing.id}`;
    viewLink.className =
      "mt-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition text-center";
    viewLink.textContent = "View Listing";
    content.appendChild(viewLink);

    card.appendChild(image);
    card.appendChild(content);
    container.appendChild(card);
  });
}

renderListings("#listingContainer");
