import { apiFetch } from "../api/apiFetch.mjs";
import { displayMessage } from "../utils/displayMessage.mjs";

export async function deleteListing(listingId) {
  const confirmDelete = confirm(
    "Are you sure you want to delete this listing?"
  );

  if (confirmDelete) {
    await apiFetch(`/auction/listings/${listingId}`, "DELETE");
    displayMessage("success", "Listing deleted successfully.");
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  }
}
