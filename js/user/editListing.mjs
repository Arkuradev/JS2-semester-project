// THIS IS THE NEXT ON THE LIST!
/*
const modal = document.getElementById("editListingModal");
const form = document.getElementById("editListingForm");

let currentListingId = null;

document.addEventListener("click", async (e) => {
  if (e.target.matches(".btn-edit")) {
    e.preventDefault();
    currentListingId = e.target.dataset.id;

    try {
      const res = await fetch(
        `${API_BASE}/auction/listings/${currentListingId}`,
        { headers }
      );
      const listing = await res.json();

      form["edit-title"].value = listing.title;
      form["edit-description"].value = listing.description || "";
      form["edit-tags"].value = listing.tags.join(", ");
      form["edit-media"].value = listing.media[0] || "";
      form["edit-endsAt"].value = listing.endsAt.slice(0, 16);

      modal.classList.remove("hidden");
    } catch (err) {
      console.error("Error loading listing:", err);
    }
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const updatedData = {
    title: form["edit-title"].value,
    description: form["edit-description"].value,
    tags: form["edit-tags"].value.split(",").map((tag) => tag.trim()),
    media: [form["edit-media"].value],
    endsAt: new Date(form["edit-endsAt"].value).toISOString(),
  };

  try {
    const res = await fetch(
      `${API_BASE}/auction/listings/${currentListingId}`,
      {
        method: "PUT",
        headers: {
          ...headers,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      }
    );

    if (!res.ok) throw new Error("Update failed");

    modal.classList.add("hidden");
    location.reload(); // or re-fetch listings
  } catch (err) {
    console.error("Failed to update:", err);
  }
});

document.getElementById("cancelEditBtn").addEventListener("click", () => {
  modal.classList.add("hidden");
});
*/
