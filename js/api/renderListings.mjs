import { apiFetch } from "./apiFetch.mjs";
import { getCountDownText } from "../components/bidCountdown.mjs";

export async function renderListings() {
  const container = document.querySelector("#listingContainer");
  if (!container)
    return console.warn(
      "No container for listingContainer found. Please add one."
    );
  container.innerHTML = `<p class="text-center text-text">Loading listings...</p>`;

  const response = await apiFetch(
    "/auction/listings?limit=15&sort=created&sortOrder=desc&_seller=true",
    "GET",
    null,
    false,
    container,
    4
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
    container.innerHTML = `<p class="text-center text-text">No active listings found.</p>`;
    return;
  }

  container.textContent = "";

  activeListings.forEach((listing) => {
    const card = document.createElement("a");
    card.className =
      "bg-background border border-hover shadow-xl overflow-hidden transition-all duration-300 transform hover:shadow-xl w-full hover:border-hover hover:-translate-y-1 flex flex-col h-full";
    card.href = `listing/viewlisting.html?id=${listing.id}`;
    // Fix this error in console from this: image.src = listing.media?.[0]?.url;
    const image = document.createElement("img");
    image.src = listing.media?.[0]?.url || "/images/placeholder.jpg";
    image.alt = listing.media?.[0]?.alt || "Placeholder image";
    image.className = "w-full h-48 object-cover  ";

    image.onerror = () => {
      if (!image.dataset.fallback) {
        image.dataset.fallback = "true";
        image.src = "/images/placeholder.jpg";
        console.warn(
          "Image failed to load:",
          listing.media?.[0]?.url + ". Using fallback."
        );
      }
    };

    const content = document.createElement("div");
    content.className =
      "font-sm p-4 bg-nav text-text flex flex-col justify-between flex-grow";

    const createdBy = document.createElement("p");
    createdBy.className = "text-sm text-text mt-2 flex items-center gap-2 mb-2";
    createdBy.innerHTML = `Listed by: <a class="text-text hover:text-hover font-semibold" href="/profile/user.html?name=${listing.seller.name}">${listing.seller.name}</a>`;

    const title = document.createElement("h3");
    title.className = "text-lg font-semibold text-text";
    title.textContent = listing.title;

    const endsAtText = document.createElement("p");
    endsAtText.className = "text-text text-xs mt-2";
    card.appendChild(endsAtText);

    function updateCountdown() {
      endsAtText.textContent = getCountDownText(listing.endsAt);
    }

    updateCountdown();
    const countdownInterval = setInterval(() => {
      updateCountdown();

      if (new Date(listing.endsAt) <= new Date()) {
        clearInterval(countdownInterval);
      }
    }, 1000);

    let description = listing.description?.trim() || "No description provided.";
    if (description.length > 50) {
      description = description.substring(0, 50) + "...";
    }

    const descriptionEl = document.createElement("p");
    descriptionEl.className = "text-text";
    descriptionEl.textContent = description;

    content.appendChild(title);
    content.appendChild(descriptionEl);
    content.appendChild(endsAtText);
    content.appendChild(createdBy);

    if (Array.isArray(listing.tags) && listing.tags.length > 0) {
      const tagsContainer = document.createElement("div");
      tagsContainer.className = "flex flex-wrap gap-1";

      listing.tags.forEach((tag) => {
        const tagEl = document.createElement("span");
        tagEl.className = "bg-hover text-text text-xs px-2 py-0.5 rounded-full";
        tagEl.textContent = `${tag}`;

        tagsContainer.appendChild(tagEl);
      });

      content.appendChild(tagsContainer);
    }

    const viewLink = document.createElement("a");
    viewLink.href = `listing/viewlisting.html?id=${listing.id}`;
    viewLink.className =
      "mt-2 px-4 py-2 bg-btn-primary text-text text-sm font-medium rounded-lg hover:bg-hover transition text-center";
    viewLink.textContent = "View Listing";
    content.appendChild(viewLink);

    card.appendChild(image);
    card.appendChild(content);
    container.appendChild(card);
  });
}
