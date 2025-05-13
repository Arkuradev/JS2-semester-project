import { apiFetch } from "../api/apiFetch.mjs";
// import { getUserFromStorage } from "./getUser.mjs";

export async function loadUserBids() {
  const username = localStorage.getItem("name");
  const container = document.querySelector("#dashboardBids");

  if (!username || !container) return;

  try {
    const response = await apiFetch("/auction/listings?_bids=true");
    const allListings = response?.data || [];

    console.log("All listings:", allListings);
    console.log("Username:", username);

    // Filter listings where current user has any bids

    const listingsWithUserBids = allListings.filter((listing) => {
      if (!Array.isArray(listing.bids)) return false;

      const matched = listing.bids.some((bid) => {
        console.log("🔍 Bidder name:", bid.bidder?.name);
        return (
          bid.bidder?.name?.toLowerCase().trim() ===
          username.toLowerCase().trim()
        );
      });

      if (matched) {
        console.log("✅ Matched listing:", listing.title);
      }

      return matched;
    });

    console.log("Found listings user has bid on:", listingsWithUserBids);

    if (listingsWithUserBids.length === 0) {
      container.innerHTML = `<p class="text-center text-text">No bids found.</p>`;
      return;
    }

    listingsWithUserBids.forEach((listing) => {
      console.log("Listing title:", listing.title);
      listing.bids.forEach((bid) => {
        console.log("✅ User's bid:", bid.amount, "on listing:", listing.title);
      });
      const card = document.createElement("a");
      card.href = `/listing/viewlisting.html?id=${listing.id}`;
      card.className =
        "flex flex-col mx-auto bg-nav border shadow p-2 max-w-[180px] transition-all duration-300 transform hover:shadow-xl hover:border-hover hover:scale-105";

      const imageUrl = listing.media?.[0]?.url || "../images/placeholder.jpg";
      const image = document.createElement("img");
      image.src = imageUrl;
      image.alt = listing.media?.[0]?.alt || "Listing image";
      image.className = "w-full h-24 object-cover mb-2";

      const title = document.createElement("h2");
      title.textContent = listing.title;
      title.className = "text-text text-sm font-semibold mb-1";

      const endsAt = document.createElement("p");
      endsAt.textContent = `Ends at: ${new Date(
        listing.endsAt
      ).toLocaleString()}`;
      endsAt.className = "text-text text-xs";

      card.appendChild(image);
      card.appendChild(title);
      card.appendChild(endsAt);
      container.appendChild(card);
    });
  } catch (error) {
    console.error("Error loading user bids:", error);
    container.innerHTML = `<p class="text-center text-text">Error loading bids.</p>`;
  }
}
