import { apiFetch } from "../api/apiFetch.mjs";
import { getCountDownText } from "../components/bidCountdown.mjs";

export async function loadUserBids() {
  const username = localStorage.getItem("name");
  const container = document.querySelector("#dashboardBids");

  if (!username || !container) return;

  try {
    // Step 1: Get only your own bids
    const bidResponse = await apiFetch(
      `/auction/profiles/${username}/bids?_listings=true`
    );
    const userBids = bidResponse?.data || [];

    if (userBids.length === 0) {
      container.innerHTML = `<p class="text-center text-text">You haven't placed any bids yet.</p>`;
      return;
    }

    const now = new Date();

    for (const bid of userBids) {
      const listingId = bid?.listing?.id;

      if (!listingId) {
        console.warn("⚠️ Missing listing ID in bid:", bid);
        continue;
      }

      try {
        const listingResponse = await apiFetch(
          `/auction/listings/${listingId}`
        );
        const listing = listingResponse?.data;

        const endsAt = new Date(listing.endsAt);
        if (endsAt <= now) continue; // Skip expired listings

        // Render card
        const card = document.createElement("a");
        card.href = `/listing/viewlisting.html?id=${listing.id}`;
        card.className =
          "flex flex-col mx-auto bg-secondary border shadow p-2 max-w-[180px] transition-all duration-300 transform hover:shadow-xl hover:border-hover hover:scale-105";

        const imageUrl = listing.media?.[0]?.url || "../images/placeholder.jpg";
        const image = document.createElement("img");
        image.src = imageUrl;
        image.alt = listing.media?.[0]?.alt || "Listing image";
        image.className = "w-full h-24 object-cover mb-2";

        const title = document.createElement("h2");
        title.textContent = listing.title;
        title.className = "text-text text-sm font-semibold mb-1";

        const amount = document.createElement("p");
        amount.textContent = `Your bid: ${bid.amount} credits`;
        amount.className = "text-text text-xs";

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

        card.appendChild(image);
        card.appendChild(title);
        card.appendChild(amount);
        card.appendChild(endsAtText);
        container.appendChild(card);
      } catch (listingError) {
        console.warn("❌ Failed to fetch listing for bid:", bid, listingError);
      }
    }
  } catch (error) {
    console.error("❌ Error loading your bids:", error);
    container.innerHTML = `<p class="text-center text-text">Error loading bids.</p>`;
  }
}
