import { apiFetch } from "./apiFetch.mjs";

export async function renderListings() {
  const container = document.querySelector("#listingContainer");
  if (!container) return;

  container.innerHTML = `<p>Loading listings...</p>`;

  const response = await apiFetch(
    "/auction/listings?limit=20&sort=created&sortOrder=desc",
    "GET",
    null,
    container
  );

  const data = response?.data;

  if (data.length === 0) {
    container.innerHTML = `<p>No listings found.</p>`;
    return;
  }

  container.textContent = "";

  data.forEach((listing) => {
    const card = document.createElement("div");
    card.className =
      "bg-white border border-gray-200 shadow-xl overflow-hidden transition-all duration-300 transform  hover:shadow-xl w-full hover:border-hover hover:scale-105";

    // Fix this error in console from this: image.src = listing.media?.[0]?.url;
    const image = document.createElement("img");
    image.src = listing.media?.[0]?.url || "#";
    image.alt = listing.media?.[0]?.alt || "No image";
    image.className = "w-full h-48 object-cover  ";

    const content = document.createElement("div");
    content.className = "font-sm p-4 flex flex-col justify-between flex-grow";

    const title = document.createElement("h3");
    title.className = "text-lg font-semibold text-gray-900";
    title.textContent = listing.title;

    const endsAt = document.createElement("p");
    endsAt.className = "text-sm text-gray-600 mt-2 flex items-center gap-2";
    endsAt.textContent = `Ends: ${new Date(listing.endsAt).toLocaleString()}`;

    let description = listing.description?.trim() || "No description provided.";
    if (description.length > 50) {
      description = description.substring(0, 50) + "...";
    }

    const descriptionEl = document.createElement("p");
    descriptionEl.className = "text-gray-700";
    descriptionEl.textContent = description;

    content.appendChild(title);
    content.appendChild(descriptionEl);
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

renderListings();
