import { apiFetch } from "../api/apiFetch.mjs";

export function renderCreateListingModal() {
  const modalHtml = `
    <div
      id="createListingModal"
      class="fixed inset-0 bg-nav bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 hidden"
    >
      <div class="bg-background p-6 rounded shadow-xl max-w-md w-full relative">
        <button
          id="closeCreateListingModal"
          class="absolute top-2 right-2 text-text hover:text-hover text-2xl"
        >
          &times;
        </button>
        <h2 class="text-xl text-text font-semibold mb-4">Create Listing</h2>
        <form id="createListingForm" class="space-y-4">
          <input type="text" name="title" placeholder="Title" class="w-full border p-2 rounded" required />
          <input type="url" name="media" placeholder="Image URL" class="w-full border p-2 rounded" />
          <textarea name="description" placeholder="Description" class="w-full border p-2 rounded"></textarea>
          <input type="datetime-local" name="endsAt" required class="w-full border p-2 rounded" />
          <button
            type="submit"
            class="w-full bg-btn-primary text-text py-2 px-4 rounded hover:bg-hover"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", modalHtml);

  // Modal functionality
  const modal = document.getElementById("createListingModal");
  const closeBtn = document.getElementById("closeCreateListingModal");
  const form = document.getElementById("createListingForm");
  const message = document.getElementById("createListingMessage");

  // Open modal when button is clicked
  document.addEventListener("click", (e) => {
    if (e.target.id === "openCreateListingBtn") {
      modal.classList.remove("hidden");
      message.textContent = "";
    }
  });

  // Close modal
  closeBtn.addEventListener("click", () => modal.classList.add("hidden"));
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.add("hidden");
  });

  // Submit form
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const title = form.title.value.trim();
    const media = form.media.value.trim();
    const description = form.description.value.trim();
    const endsAt = new Date(form.endsAt.value).toISOString();

    if (!token) {
      message.textContent = "You must be logged in to create a listing.";
      message.className = "text-red-600";
      return;
    }

    const listingData = {
      title,
      description,
      endsAt,
      ...(media ? { media: [media] } : {}),
    };

    try {
      const response = await apiFetch("/auction/listings", {
        method: "POST",
        body: JSON.stringify(listingData),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        message.textContent = "Listing created successfully!";
        message.className = "text-green-600";
        form.reset();

        setTimeout(() => {
          modal.classList.add("hidden");
          window.location.href = "/dashboard.html"; // Or reload listings
        }, 1500);
      } else {
        throw new Error(response.message || "Failed to create listing");
      }
    } catch (err) {
      console.error(err);
      message.textContent = "Error: " + err.message;
      message.className = "text-red-600";
    }
  });
}
