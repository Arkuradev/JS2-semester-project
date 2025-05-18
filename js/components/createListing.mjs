import { apiFetch } from "../api/apiFetch.mjs";
import { displayMessage } from "../utils/displayMessage.mjs";

export function renderCreateListingModal() {
  const modalHtml = `
    <div
      id="createListingModal"
      class="fixed inset-0 bg-nav bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 hidden"
    >
      <div class="bg-secondary p-6 rounded  shadow-2xl max-w-md w-full relative">
        <button
          id="closeCreateListingModal"
          class="absolute top-2 right-2 text-text hover:text-hover text-3xl"
        >
          &times;
        </button>
        <h2 class="text-xl text-text font-semibold mb-4">Create Listing</h2>
        <div id="global-message" class="mb-2 text-center text-sm"></div>
        <form id="createListingForm" class="space-y-4">
        <label for="title" class="sr-only">Title</label>
<input type="text" name="title" id="title" placeholder="Title" class="w-full border p-2 rounded" required />

<label for="media" class="sr-only">Image URLs</label>
<textarea
  name="media"
  id="media"
  placeholder="Full Image URLs (comma separated)"
  class="w-full border p-2 rounded"
></textarea>

<label for="mediaAlt" class="sr-only">Image Alt Text</label>
<input type="text" name="mediaAlt" id="mediaAlt" placeholder="Image Alt Text" class="w-full border p-2 rounded" />

<label for="tags" class="sr-only">Tags</label>
<input type="text" name="tags" id="tags" placeholder="Tags (comma separated)" class="w-full border p-2 rounded" />

<label for="description" class="sr-only">Description</label>
<textarea
  id="description"
  name="description"
  placeholder="Description"
  class="w-full border p-2 rounded"
></textarea>

<label for="endsAt" class="sr-only">Ends At</label>
<input type="datetime-local" name="endsAt" id="endsAt" required class="w-full border p-2 rounded" />
          <button
            type="submit"
            class="w-full bg-btn-primary text-text font-semibold py-2 px-4 rounded hover:bg-hover"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", modalHtml);

  const modal = document.getElementById("createListingModal");
  const closeBtn = document.getElementById("closeCreateListingModal");
  const form = document.getElementById("createListingForm");

  document.addEventListener("click", (e) => {
    if (e.target.id === "openCreateListingBtn") {
      modal.classList.remove("hidden");
    } else if (e.target.id === "openCreateListingBtnMobile") {
      modal.classList.remove("hidden");
    }
  });

  closeBtn.addEventListener("click", () => modal.classList.add("hidden"));
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.add("hidden");
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const title = form.title.value.trim();
    const description = form.description.value.trim();
    const tags = form.tags?.value.trim();
    const endsAt = new Date(form.endsAt.value).toISOString();

    if (!token) {
      displayMessage("error", "You must be logged in to create a listing.");
      return;
    }

    if (new Date(endsAt) <= new Date()) {
      displayMessage("error", "End date must be in the future.");
      return;
    }

    const listingData = {
      title,
      description,
      endsAt: new Date(endsAt).toISOString(),
      "seller.name": localStorage.getItem("name"),
    };

    const mediaRaw = form.media.value.trim();
    const mediaAlt = form.mediaAlt.value.trim() || "Listing image";

    if (mediaRaw) {
      const mediaUrls = mediaRaw
        .split(",")
        .map((url) => url.trim())
        .filter(Boolean);
      listingData.media = mediaUrls.map((url) => ({
        url,
        alt: mediaAlt,
      }));
    }
    if (tags) {
      listingData.tags = tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "");
    }

    try {
      const response = await apiFetch("/auction/listings", "POST", listingData);
      if (response) {
        displayMessage("success", "Listing created.");
        form.reset();

        setTimeout(() => {
          modal.classList.add("hidden");
          window.location.reload();
        }, 1500);
      } else {
        throw new Error("Failed to create listing.");
      }
    } catch (error) {
      console.error("Error creating listing:", error);
      displayMessage("error", "Failed to create listing.");
    }
  });
}
