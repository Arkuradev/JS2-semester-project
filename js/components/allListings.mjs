import { apiFetch } from "../api/apiFetch.mjs";
import { debounce } from "../utils/debounce.mjs";
import { getCountDownText } from "./bidCountdown.mjs";

export function setupAllListingsTabs() {
  const tabs = document.querySelectorAll(".tab-btn");
  const container = document.querySelector("#allListingsContainer");
  const searchInput = document.querySelector("#listingSearch");
  let currentFilter = "all";
  let allFetchedListings = [];

  if (!tabs || !container || !searchInput) return;

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelector(".tab-btn.active").classList.remove("active");
      tab.classList.add("active");
      currentFilter = tab.dataset.filter;
      fetchAndRenderListings(currentFilter);
    });
  });

  const debouncedSearch = debounce((query) => {
    const filtered = allFetchedListings.filter((l) =>
      l.title.toLowerCase().includes(query.toLowerCase())
    );
    renderListings(filtered);
  });

  searchInput.addEventListener("input", (e) => {
    debouncedSearch(e.target.value.trim());
  });

  async function fetchAndRenderListings(filter) {
    container.innerHTML = `<div class="col-span-full text-center text-text">Loading...</div>`;

    let url = `/auction/listings?sort=created&_order=desc`;
    let limit = 25;

    switch (filter) {
      case "popular":
        url += "&_bids=true";
        limit = 30;
        break;
      case "new":
        url += "&_new=true";
        limit = 25;
        break;
      case "ending":
        url = `/auction/listings?sort=endsAt&sortOrder=asc&_active=true&_limit=20`;
        limit = 20;
        break;
      case "week":
        url += "&_week=true";
        limit = 30;
        break;
      case "nobids":
        url += "&_bids=false";
        limit = 25;
        break;
      default:
        break;
    }

    url += `&limit=${limit}`;

    try {
      const response = await apiFetch(url, "GET", null, false, container, 8);
      let listings = response?.data || [];

      const now = new Date();

      if (filter === "week") {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        listings = listings.filter((l) => new Date(l.created) >= oneWeekAgo);
      }

      if (filter === "nobids") {
        listings = listings.filter((l) => !l._count?.bids);
      }

      if (filter === "ending") {
        const twoDaysFromNow = new Date();
        twoDaysFromNow.setDate(now.getDate() + 2);

        listings = listings
          .filter((l) => {
            const endsAt = new Date(l.endsAt);
            return endsAt >= now && endsAt <= twoDaysFromNow;
          })
          .sort((a, b) => new Date(a.endsAt) - new Date(b.endsAt));

        if (listings.length === 0) {
          container.innerHTML = `<p class="col-span-full text-center text-text">No listings ending soon (next 2 days).</p>`;
          return;
        }
      }

      if (filter === "popular") {
        listings = listings.sort(
          (a, b) => (b._count?.bids || 0) - (a._count?.bids || 0)
        );
      }

      listings = listings.filter((l) => new Date(l.endsAt) > now);

      allFetchedListings = listings;
      renderListings(listings);
    } catch (error) {
      container.innerHTML = `<p class="col-span-full text-red-500 text-center">Error loading listings.</p>`;
      console.error(error);
    }
  }

  function renderListings(listings) {
    container.innerHTML = "";

    if (listings.length === 0) {
      container.innerHTML = `<p class="col-span-full text-center text-text">No listings found.</p>`;
      return;
    }

    listings.forEach((listing) => {
      const imageUrl = listing.media?.[0]?.url || "../images/placeholder.jpg";
      const image = new Image();
      image.src = imageUrl;
      image.alt = listing.media?.[0]?.alt || "Placeholder image";
      image.className = "w-full h-24 object-cover mb-2";

      image.onload = () => {
        const card = document.createElement("a");
        card.href = `/listing/viewlisting.html?id=${listing.id}`;
        card.className =
          "bg-background font-sans border border-hover shadow-xl overflow-hidden transition-all duration-300 transform hover:shadow-xl w-full hover:border-hover hover:-translate-y-1 flex flex-col h-full";

        const title = document.createElement("h2");
        title.className = "text-text text-sm font-semibold mb-1";
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

        const bidCount = document.createElement("p");
        const count = listing._count?.bids || 0;
        bidCount.textContent = `${count} ${count === 1 ? "bid" : "bids"}`;
        bidCount.className =
          "bg-btn-primary text-sm text-center text-text px-2 py-0.5 rounded w-full mt-2 mb-2";

        const tagsContainer = document.createElement("div");
        tagsContainer.className = "flex flex-wrap gap-1 mt-2 ml-2 mb-2git add";

        if (Array.isArray(listing.tags)) {
          listing.tags.forEach((tag) => {
            const tagBadge = document.createElement("span");
            tagBadge.className =
              "bg-btn-primary text-xs text-text px-2 py-0.5 rounded-full";
            tagBadge.textContent = `${tag}`;
            tagsContainer.appendChild(tagBadge);
          });
        }

        card.appendChild(image);
        card.appendChild(title);
        card.appendChild(endsAtText);
        card.appendChild(bidCount);
        card.appendChild(tagsContainer);

        container.appendChild(card);
      };

      image.onerror = () => {
        image.src = "../images/placeholder.jpg";
        console.warn("Image failed to load:", imageUrl);
      };
    });
  }

  fetchAndRenderListings(currentFilter);
}
