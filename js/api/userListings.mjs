import { apiFetch } from "./apiFetch.mjs";
import { deleteListing } from "../user/deleteListing.mjs";
import { displayMessage } from "../utils/displayMessage.mjs";
import { getCountDownText } from "../components/bidCountdown.mjs";
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
      container.className = "text-center text-text mt-5";
      return;
    }

    container.innerHTML = "";

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
      endsAt.className = "text-text text-sm mt-2";
      card.appendChild(endsAt);

      function updateCountdown() {
        // Clear the previous content
        endsAt.textContent = "";

        // Append the updated span
        const countdownElement = getCountDownText(listing.endsAt);
        endsAt.appendChild(countdownElement);
      }

      updateCountdown();

      const countdownInterval = setInterval(() => {
        updateCountdown();

        if (new Date(listing.endsAt) <= new Date()) {
          clearInterval(countdownInterval);
        }
      }, 1000);

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
        endsAtInput.value = listing.endsAt.slice(0, 16);
        form.dataset.id = listing.id;
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
        "mt-4 mb-4 px-4 bg-red-500 hover:bg-btn-primary text-black hover:text-white font-semibold py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300";

      deleteBtn.textContent = "Delete";

      deleteBtn.addEventListener("click", async (event) => {
        event.preventDefault();
        try {
          await deleteListing(listing.id, token);
          displayMessage("success", "Successfully deleted listing.");
          renderUserListings();
        } catch (error) {
          displayMessage("error", "Failed to delete listing.");
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
    displayMessage("error", "Failed to fetch listings.");
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
    displayMessage("success", "Changes saved.");
    renderUserListings();
  } catch (error) {
    displayMessage("error", "Failed to update listing.");
    console.error("Failed to update listing:", error);
  }
});
