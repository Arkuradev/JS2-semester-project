import { apiFetch } from "./apiFetch.mjs";

import { deleteListing } from "../user/deleteListing.mjs";
const container = document.querySelector("#dashboardListings");
const token = localStorage.getItem("token");

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
      "#dashboardListings"
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
      const card = document.createElement("div");
      card.className =
        "flex flex-col bg-white rounded-lg border shadow p-2 max-w-[180px]";

      const image = document.createElement("img");
      image.src = listing.media?.[0]?.url || "#";
      image.alt = listing.media?.[0]?.alt || "No image available.";
      image.className = "block w-full h-20 object-cover rounded mb-2";

      const title = document.createElement("p");
      title.className = "text-sm font-semibold text-gray-800 mb-1";
      title.textContent = listing.title;

      const endsAt = document.createElement("p");
      endsAt.className = "text-xs text-gray-500 mb-2";
      endsAt.textContent = `Ends: ${new Date(listing.endsAt).toLocaleString()}`;

      const actions = document.createElement("div");
      actions.className = "flex gap-1 justify-between mt-auto";

      const editBtn = document.createElement("button");
      editBtn.className =
        "mt-4 mb-4 px-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300";
      editBtn.textContent = "Edit";
      // editBtn.addEventListener("click", () => {
      // Display the edit form. So we are gonna add the edit form to the dashboard page and keep it hidden until we click the edit button.
      //});

      const deleteBtn = document.createElement("button");
      deleteBtn.className =
        "mt-4 mb-4 px-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300";

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
