import { apiFetch } from "../api/apiFetch.mjs";
import { renderListingDetails } from "../api/renderSingleListing.mjs";

const container = document.querySelector("#listingContainer");

export function createBidForm(listingId, sellerName) {
  const form = document.createElement("form");
  form.className = "flex flex-col gap-2 mt-4";

  const input = document.createElement("input");
  input.type = "number";
  input.min = 1;
  input.placeholder = "Bid amount";
  input.required = true;
  input.className = "text-black w-full p-2 border rounded";

  const button = document.createElement("button");
  button.type = "submit";
  button.textContent = "Bid";
  button.className =
    "bg-btn-primary text-text px-4 py-2 rounded hover:bg-hover";

  form.appendChild(input);
  form.appendChild(button);

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const currentUser = localStorage.getItem("name");
    const amount = parseInt(input.value);

    if (currentUser === sellerName) {
      alert("You cannot bid on your own listing.");
      return;
    }

    if (isNaN(amount) || amount < 1)
      return alert("Bid amount must be at least 1 credits.");

    try {
      const bidResponse = await apiFetch(
        `/auction/listings/${listingId}/bids`,
        "POST",
        { amount },
        true,
        container,
        1
      );
      if (!bidResponse) {
        return alert("Failed to place bid. Please try again later.");
      }
      alert("Bid placed successfully!");
      renderListingDetails(); // reload details (no need to pass ID again if using URL params)
    } catch (error) {
      console.error(error);
      alert("Error placing bid. Please try again.");
    }
  });

  return form;
}

/*
export function createBidForm(listingId) {
  console.log("createBidForm called with:", listingId);

  const form = document.createElement("form");
  form.className = "flex flex-col gap-2 mt-4";

  const input = document.createElement("input");
  input.type = "number";
  input.min = 1;
  input.placeholder = "Bid amount";
  input.required = true;
  input.className = "text-black w-full p-2 border rounded";

  const button = document.createElement("button");
  button.type = "submit";
  button.textContent = "Bid";
  button.className =
    "bg-btn-primary text-text px-4 py-2 rounded hover:bg-hover";

  form.appendChild(input);
  form.appendChild(button);

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const amount = parseInt(input.value);
    if (isNaN(amount) || amount < 1)
      return alert("Bid amount must be at least 1 credits.");

    try {
      const bidResponse = await apiFetch(
        `/auction/listings/${listingId}/bids`,
        "POST",
        { amount },
        true,
        container,
        1
      );
      if (bidResponse) {
        alert("Bid placed successfully!");
        renderListingDetails(listingId);
      }
    } catch (error) {
      console.error(error);
      alert("Error placing bid. Please try again.");
    }
  });

  return form;
}
*/
