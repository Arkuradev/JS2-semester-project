import { apiFetch } from "./apiFetch.mjs";
import { deleteListing } from "../user/deleteListing.mjs";
const container = document.querySelector("#dashboardListings");
const token = localStorage.getItem("token");

const modal = document.getElementById("editListingModal");
const form = document.getElementById("editListingForm");
const titleInput = document.getElementById("editTitle");
const descInput = document.getElementById("editDescription");
const tagsInput = document.getElementById("editTags");
const mediaInput = document.getElementById("editMedia");
const endsAtInput = document.getElementById("editEndsAt");

export async function renderUserListings() {
  const username = localStorage.getItem("name");
  if (!username) {
    container.textContent = "Error: No user logged in.";
    return;
  }

  try {
    const response = await apiFetch(
      `/auction/profiles/${username}/listings`,
      "GET",
      null,
      true,
      container,
      4
    );
    const userListings = response?.data || [];

    if (!userListings || userListings.length === 0) {
      container.textContent = "You have no listings yet.";
      return;
    }

    container.innerHTML = "";
    // container.className =
    //  "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2";

    userListings.forEach((listing) => {
      const card = document.createElement("a");
      card.className =
        "flex flex-col bg-nav border shadow p-2 max-w-[180px] transition-all duration-300 transform  hover:shadow-xl hover:border-hover hover:scale-105";
      card.href = `../listing/viewlisting.html?id=${listing.id}`;

      const image = document.createElement("img");
      image.src = listing.media?.[0]?.url || "#";
      image.alt = listing.media?.[0]?.alt || "No image available.";
      image.className = "block w-full h-20 object-cover  mb-2";

      const title = document.createElement("p");
      title.className = "text-text text-sm font-semibold text-gray-800 mb-1";
      title.textContent = listing.title;

      const endsAt = document.createElement("p");
      endsAt.className = "text-text text-xs text-gray-500 mb-2";
      endsAt.textContent = `Ends: ${new Date(listing.endsAt).toLocaleString()}`;

      const actions = document.createElement("div");
      actions.className = "flex gap-1 justify-between mt-auto";

      const editBtn = document.createElement("button");
      editBtn.className =
        "mt-4 mb-4 px-4 bg-btn-primary hover:bg-hover text-white font-semibold py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300";
      editBtn.textContent = "Edit";

      editBtn.addEventListener("click", (event) => {
        event.preventDefault();

        titleInput.value = listing.title;
        descInput.value = listing.description || "";
        tagsInput.value = (listing.tags || []).join(", ");
        mediaInput.value = listing.media?.[0]?.url || "";
        endsAtInput.value = listing.endsAt.slice(0, 16); // trims to YYYY-MM-DDTHH:mm

        form.dataset.id = listing.id; // store ID for submission
        modal.classList.remove("hidden");
      });

      document.getElementById("cancelEdit").addEventListener("click", () => {
        modal.classList.add("hidden");
      });

      document
        .getElementById("closeEditListingModal")
        .addEventListener("click", () => {
          modal.classList.add("hidden");
        });

      const deleteBtn = document.createElement("button");
      deleteBtn.className =
        "mt-4 mb-4 px-4 bg-red-500 hover:bg-hover text-white font-semibold py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300";

      // "color-red-500 hover:bg-red-600 text-xs text-black py-1 rounded";
      deleteBtn.textContent = "Delete";

      deleteBtn.addEventListener("click", async (event) => {
        event.preventDefault();
        try {
          await deleteListing(listing.id, token);
          console.log("Successfully deleted post!");
          renderUserListings();
        } catch (error) {
          console.error("Error deleting post:", error);
        }
      });

      actions.appendChild(editBtn);
      actions.appendChild(deleteBtn);

      card.appendChild(image);
      card.appendChild(title);
      card.appendChild(endsAt);
      card.appendChild(actions);

      container.appendChild(card);
    });
  } catch (error) {
    container.innerHTML = "Error loading listings.";
    console.error(error);
  }
}
renderUserListings();

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const listingId = form.dataset.id;
  const payload = {
    title: titleInput.value.trim(),
    description: descInput.value.trim(),
    tags: tagsInput.value
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
    media: [{ url: mediaInput.value.trim() }],
    endsAt: new Date(endsAtInput.value).toISOString(),
  };

  try {
    await apiFetch(`/auction/listings/${listingId}`, "PUT", payload, true);
    modal.classList.add("hidden");
    renderUserListings(); // Refresh listings
  } catch (error) {
    console.error("Failed to update listing:", error);
  }
});
