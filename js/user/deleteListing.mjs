import { apiFetch } from "../api/apiFetch.mjs";

export async function deleteListing(listingId) {
  const confirmDelete = confirm(
    "Are you sure you want to delete this listing?"
  );

  if (confirmDelete) {
    await apiFetch(`/auction/listings/${listingId}`, "DELETE");
    window.location.reload();
  }
  // DISPLAY MESSAGE HERE.
}
