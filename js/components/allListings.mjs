import { apiFetch } from "../api/apiFetch.mjs";

export function setupAllListingsTabs() {
  const tabs = document.querySelectorAll(".tab-btn");
  const container = document.querySelector("#allListingsContainer");

  if (!tabs || !container) return;

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      document.querySelector(".tab-btn.active").classList.remove("active");
      tab.classList.add("active");

      const filterType = tab.dataset.filter;
      fetchAndRenderListings(filterType, container);
    });
  });

  async function fetchAndRenderListings(filter, container) {
    container.innerHTML = `<div class="col-span-full text-center text-gray-400 animate-pulse">Loading...</div>`;

    let url = "/auction/listings?sort=created&_order=desc";
    let limit = 25;

    switch (filter) {
      case "popular":
        url += "&_bids=true";
        limit = 20;
        break;

      case "new":
        url += "&_new=true";
        limit = 25;
        break;

      case "ending":
        url += "/auction/listings?sort=endsAt&order=asc";
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
      case "all":
      default:
        limit = 25;
        break;
    }

    url += `&limit=${limit}`;

    try {
      const response = await apiFetch(url, "GET", null, false, container, 4);
      let listings = response?.data || [];

      if (filter === "week") {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        listings = listings.filter((l) => new Date(l.created) >= oneWeekAgo);
      }
      if (filter === "nobids") {
        listings = listings.filter((l) => !l._count?.bids);
      }

      const now = new Date();
      listings = listings.filter((l) => new Date(l.endsAt) > now);

      if (filter === "ending") {
        const now = new Date();
        const twoDaysFromNow = new Date();
        twoDaysFromNow.setDate(now.getDate() + 2);

        listings = listings.filter((l) => {
          const endsAt = new Date(l.endsAt);
          return endsAt >= now && endsAt <= twoDaysFromNow;
        });
      }

      container.innerHTML = "";

      if (listings.length === 0) {
        container.innerHTML = `<p class="col-span-full text-center text-gray-500">No listings found.</p>`;
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
            "flex flex-col mx-auto bg-nav border shadow p-2 max-w-[180px] transition-all duration-300 transform hover:shadow-xl hover:border-hover hover:scale-105";

          const title = document.createElement("h2");
          title.className = "text-text text-sm font-semibold mb-1";
          title.textContent = listing.title;

          const endsAt = document.createElement("p");
          endsAt.className = "text-text text-xs";
          endsAt.textContent = `Ends at: ${new Date(
            listing.endsAt
          ).toLocaleString()}`;

          const tagsContainer = document.createElement("div");
          tagsContainer.className = "flex flex-wrap gap-1 mt-2";

          if (Array.isArray(listing.tags)) {
            listing.tags.forEach((tag) => {
              const tagBadge = document.createElement("span");
              tagBadge.className =
                "bg-hover text-xs text-text px-2 py-0.5 rounded-full";
              tagBadge.textContent = `${tag}`;
              tagsContainer.appendChild(tagBadge);
            });
          }

          card.appendChild(image);
          card.appendChild(title);
          card.appendChild(endsAt);
          card.appendChild(tagsContainer);
          container.appendChild(card);
        };

        image.onerror = () => {
          image.src = "../images/placeholder.jpg";
          console.warn("Image failed to load:", imageUrl);
        };
      });
    } catch (error) {
      container.innerHTML = `<p class="col-span-full text-red-500 text-center">Error loading listings.</p>`;
      console.error(error);
    }
  }
  const defaultFilter = "all";
  fetchAndRenderListings(defaultFilter, container);
}
