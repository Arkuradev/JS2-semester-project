import { apiFetch } from "./apiFetch.mjs";

export async function renderListings() {
  const container = document.querySelector("#listingContainer");
  if (!container) return;

  container.innerHTML = `<p>Loading listings...</p>`;

  const response = await apiFetch(
    "/auction/listings?limit=15&sort=created&sortOrder=desc",
    "GET",
    null,
    container
  );

  const data = response?.data;

  if (data.length === 0) {
    container.innerHTML = `<p>No listings found.</p>`;
    return;
  }

  const now = new Date();

  const activeListings = data.filter(
    (listing) => new Date(listing.endsAt) > now
  );

  if (activeListings.length === 0) {
    container.innerHTML = `<p>No active listings found.</p>`;
    return;
  }

  container.textContent = "";

  activeListings.forEach((listing) => {
    const card = document.createElement("a");
    card.className =
      "bg-background  shadow-xl overflow-hidden transition-all duration-300 transform  hover:shadow-xl w-full hover:border-hover hover:-translate-y-1";
    card.href = `/listing/viewlisting.html?id=${listing.id}`;
    // Fix this error in console from this: image.src = listing.media?.[0]?.url;
    const image = document.createElement("img");
    image.src = listing.media?.[0]?.url || "#";
    image.alt = listing.media?.[0]?.alt || "No image";
    image.className = "w-full h-48 object-cover  ";

    const content = document.createElement("div");
    content.className =
      "font-sm p-4 bg-nav text-text flex flex-col justify-between flex-grow";

    const title = document.createElement("h3");
    title.className = "text-lg font-semibold text-text";
    title.textContent = listing.title;

    const endsAt = document.createElement("p");
    endsAt.className = "text-sm text-text mt-2 flex items-center gap-2";
    endsAt.textContent = `Ends: ${new Date(listing.endsAt).toLocaleString()}`;

    let description = listing.description?.trim() || "No description provided.";
    if (description.length > 50) {
      description = description.substring(0, 50) + "...";
    }

    const descriptionEl = document.createElement("p");
    descriptionEl.className = "text-text";
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
          "bg-secondary text-text text-xs px-2 py-0.5 rounded-full";
        tagEl.textContent = `${tag}`;

        tagsContainer.appendChild(tagEl);
      });

      content.appendChild(tagsContainer);
    }

    const viewLink = document.createElement("a");
    viewLink.href = `/listing/viewlisting.html?id=${listing.id}`;
    viewLink.className =
      "mt-2 px-4 py-2 bg-btn-primary text-text text-sm font-medium rounded-lg hover:bg-hover transition text-center";
    viewLink.textContent = "View Listing";
    content.appendChild(viewLink);

    card.appendChild(image);
    card.appendChild(content);
    container.appendChild(card);
  });
}
