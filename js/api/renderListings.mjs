import { apiFetch } from "./apiFetch.mjs";
import { getCountDownText } from "../components/bidCountdown.mjs";

export async function renderListings() {
  function createStatsStrip() {
    const stats = document.createElement("div");
    stats.className = `
    col-span-full w-full py-20 px-4 mt-14 mb-10
    bg-gradient-to-b from-[rgb(var(--background))] to-[rgb(var(--secondary))] shadow-xl text-main
    flex flex-col items-center justify-center text-center
  `;
    stats.innerHTML = `
    <p class="text-xl sm:text-2xl font-bold mb-6">
      Join the auction. Win the moment.
    </p>
    <div class="max-w-5xl mx-auto flex flex-col sm:flex-row justify-center items-center gap-8 text-xl sm:text-2xl font-semibold">
      <span class="mt-15">📦 1200+ Items</span>
      <span class="mt-15">🧑‍💻 500+ Users</span>
      <span class="mt-15">🏆 97% Win Rate</span>
    </div>
  `;
    return stats;
  }

  const container = document.querySelector("#listingContainer");
  if (!container)
    return console.warn(
      "No container for listingContainer found. Please add one."
    );
  container.innerHTML = "";

  const response = await apiFetch(
    "/auction/listings?limit=100&sort=created&sortOrder=desc&_seller=true",
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

  activeListings.forEach((listing, index) => {
    const card = document.createElement("a");
    card.className =
      "bg-background font-sans border border-hover shadow-xl overflow-hidden transition-all duration-300 transform hover:shadow-xl w-full hover:border-hover hover:-translate-y-1 flex flex-col h-full";
    card.href = `listing/viewlisting.html?id=${listing.id}`;
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
    endsAtText.className = "text-text text-sm mt-2";
    card.appendChild(endsAtText);

    function updateCountdown() {
      // Clear the previous content
      endsAtText.textContent = "";

      // Append the updated span
      const countdownElement = getCountDownText(listing.endsAt);
      endsAtText.appendChild(countdownElement);
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
        tagEl.className =
          "bg-btn-primary text-text text-xs px-2 py-0.5 rounded-full";
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
    if (index === 19) {
      container.appendChild(createStatsStrip());
    }
  });
}
