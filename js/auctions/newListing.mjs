import { apiFetch } from "../api/apiFetch.mjs";
import { displayMessage } from "../utils/displayMessage.mjs";

export async function newListing() {
  const form = document.getElementById("createListingForm");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const mediaUrl = document.getElementById("mediaUrl").value.trim();
    const mediaAlt = document.getElementById("mediaAlt").value.trim();
    const endsAt = document.getElementById("endsAt").value.trim();

    if (!title || !endsAt) {
      return displayMessage(
        "#message",
        "error",
        "Title and ending date are required."
      );
    }

    const postData = {
      title,
      description,
      endsAt: new Date(endsAt).toISOString(),
    };
    if (mediaUrl) {
      postData.media = [
        {
          url: mediaUrl,
          alt: mediaAlt || "Listing image",
        },
      ];
    }

    const result = await apiFetch("/auction/listings", "POST", postData);

    if (result) {
      displayMessage("#message", "success", "Listing created successfully!");
      console.log(result);
      form.reset();
      /* setTimeout(() => {
      window.location.href = "/listing/new.html"; //Change this link to go directly to the listing that has been made.
    }, 2000); */
    }
  });
}
