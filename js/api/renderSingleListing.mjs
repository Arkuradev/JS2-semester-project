import { apiFetch } from "./apiFetch.mjs";
import { createListingHeader } from "../components/listingHeader.mjs";
import { createBidForm } from "../components/bidForm.mjs";
import { createBidInfo } from "../components/bidInfo.mjs";
import { createBidHistory } from "../components/bidHistory.mjs";

// const token = localStorage.getItem("token");
const params = new URLSearchParams(window.location.search);
const listingId = params.get("id");
const container = document.querySelector("#listingContainer");

//Replace with error handling later....

if (!listingId) {
  showError("No listing ID found.");
} else {
  renderListingDetails(listingId);
}

function showError(message) {
  const error = document.createElement("p");
  error.textContent = message;
  error.className = "text-red-600";
  container.appendChild(error);
}

export async function renderListingDetails(id) {
  const response = await apiFetch(`/auction/listings/${id}?_bids=true`);
  const listing = response?.data;

  container.innerHTML = "";

  if (!listing) return showError("Listing not found."); // Double check?? Remove?

  const backButton = document.createElement("a");
  backButton.href = "/index.html";
  backButton.className =
    "inline-block mb-10 text-blue-600 hover:underline text-sm";
  backButton.textContent = "← Back to Listings";
  container.appendChild(backButton);

  const card = document.createElement("article");
  card.className = "bg-white mt-4 rounded-2xl shadow-lg overflow-hidden";

  const image = document.createElement("img");
  image.src = listing.media?.[0]?.url;
  image.alt = listing.media?.[0]?.url;
  image.className = "w-full h-80 object-cover rounded-t-2xl"; // COME BACK TO FIX THIS.

  const content = document.createElement("div");
  content.className = "p-6 space-y-4";

  const header = createListingHeader(listing);
  const bidForm = createBidForm(id);
  const bidInfo = createBidInfo(listing.bids || []);
  const bidHistorySection = createBidHistory(listing.bids || []);

  content.appendChild(header);
  content.appendChild(bidForm);
  content.appendChild(bidInfo);
  if (bidHistorySection) content.appendChild(bidHistorySection);

  card.appendChild(image);
  card.appendChild(content);
  container.appendChild(card);
}

/*
  const title = document.createElement("h1");
  title.className = "text-2xl font-bold";
  title.textContent = listing.title;

  const endsAt = document.createElement("p");
  endsAt.className = "text-gray-600";
  endsAt.textContent = `Ends at: ${new Date(listing.endsAt).toLocaleString()}`;

  const description = document.createElement("p");
  description.className = "text-gray-700";
  description.textContent = listing.description || "No description available.";

  const bidForm = document.createElement("form");
  bidForm.className = "mt-4 flex flex-col gap-2";

  const bidInput = document.createElement("input");
  bidInput.type = "number";
  bidInput.min = "1";
  bidInput.placeholder = "Bid amount";
  bidInput.required = true;
  bidInput.className = "border p-2 rounded w-full";

  const bidButton = document.createElement("button");
  bidButton.type = "submit";
  bidButton.textContent = "Bid";
  bidButton.className =
    "bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700";

  bidForm.appendChild(bidInput);
  bidForm.appendChild(bidButton);

  bidForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const amount = parseInt(bidInput.value);
    if (!amount || amount <= 0)
      return alert("Please enter a valid bid amount.");

    try {
      const bidResponse = await apiFetch(
        `/auction/listings/${id}/bids`,
        "POST",
        { amount },
        token
      );
      if (bidResponse) {
        alert("Bid placed successfully!");
        renderListingDetails(id); // Reload the listing
      }
    } catch (error) {
      console.error("Error placing bid:", error);
      alert("An error occurred while placing the bid.");
    }
  });

  const bidInfo = document.createElement("div");
  const bids = listing.bids || [];
  console.log("Raw listing data:", listing);
  console.log("Parsed bids array:", bids);
  console.log("Number of bids:", bids.length);
  const highestBid = bids.length ? Math.max(...bids.map((b) => b.amount)) : 0;

  bidInfo.innerHTML = `
  <p class="text-gray-800 font-medium">Total Bids: ${bids.length}</p>
  <p class="text-gray-800 font-medium">Highest Bid: ${highestBid} credits</p>
  `;

  content.appendChild(title);
  content.appendChild(endsAt);
  content.appendChild(description);
  content.appendChild(bidInfo);
  content.appendChild(bidForm);

  // Only show bid history if there are bids
  if (bids.length > 0) {
    const bidListContainer = document.createElement("div");
    bidListContainer.className = "mt-6";

    const bidListTitle = document.createElement("h2");
    bidListTitle.textContent = "Bid History";
    bidListTitle.className = "text-lg font-semibold text-gray-800 mb-2";
    bidListContainer.appendChild(bidListTitle);

    const bidList = document.createElement("ul");
    bidList.className = "space-y-2";

    bids.sort((a, b) => new Date(b.created) - new Date(a.created));

    bids.reverse().forEach((bid) => {
      const listItem = document.createElement("li");
      listItem.className = "p-3 bg-gray-100 rounded-md shadow-sm";

      const formattedDate = new Date(bid.created).toLocaleString();
      const bidderName = bid.bidder?.name || "Anonymous";

      listItem.innerHTML = `
        <p><span class="font-medium text-gray-700">User:</span> ${bidderName}</p>
        <p><span class="font-medium text-gray-700">Amount:</span> ${bid.amount} credits</p>
        <p><span class="font-medium text-gray-700">Time:</span> ${formattedDate}</p>
      `;

      bidList.appendChild(listItem);
    });

    bidListContainer.appendChild(bidList);
    content.appendChild(bidListContainer);
  }

  card.appendChild(image);
  card.appendChild(content);
  container.appendChild(card);
}

// Fix error handling, on bid. Show error message.
*/
