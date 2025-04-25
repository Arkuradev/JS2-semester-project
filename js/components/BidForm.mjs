import { apiFetch } from "../api/apiFetch.mjs";
import { renderListingDetails } from "../api/renderSingleListing.mjs";

const token = localStorage.getItem("token");

export function createBidForm(listingId) {
  const form = document.createElement("form");
  form.className = "flex flex-col gap-2 mt-4";

  const input = document.createElement("input");
  input.type = "number";
  input.min = 1;
  input.placeholder = "Bid amount";
  input.required = true;
  input.className = "w-full p-2 border rounded";

  const button = document.createElement("button");
  button.type = "submit";
  button.textContent = "Bid";
  button.className =
    "bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700";

  form.appendChild(input);
  form.appendChild(button);

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const amount = parseInt(input.value);
    if (!amount || amount >= 0)
      return alert("Please enter a valid bid amount.");

    try {
      const bidResponse = await apiFetch(
        `/auction/listings/${listingId}/bids`,
        "POST",
        { amount },
        token
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
