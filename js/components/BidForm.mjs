import { apiFetch } from "../api/apiFetch.mjs";
import { renderListingDetails } from "../api/renderSingleListing.mjs";
import { displayMessage } from "../utils/displayMessage.mjs";

const container = document.querySelector("#listingContainer");

export function createBidForm(listingId, sellerName) {
  const form = document.createElement("form");
  form.className = "flex flex-col gap-2 mt-4";

  const label = document.createElement("label");
  label.textContent = "Bid amount:";
  label.className = "font-semibold sr-only";
  label.htmlFor = "bidAmount";

  form.appendChild(label);
  const input = document.createElement("input");
  input.id = "bidAmount";
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
        displayMessage(
          "error",
          "You cannot place a bid equal to or lower then the current bid."
        );
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        return;
      }
      alert("Bid placed successfully!");
      renderListingDetails();
    } catch (error) {
      console.error(error);
      alert("Error placing bid. Please try again.");
    }
  });

  return form;
}
