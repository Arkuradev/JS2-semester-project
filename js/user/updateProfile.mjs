import { apiFetch } from "../api/apiFetch.mjs";
import { displayMessage } from "../utils/displayMessage.mjs";

const username = localStorage.getItem("name");

export function updateProfile() {
  const form = document.getElementById("editProfileForm");

  if (!form) return;

  // Prevents duplicate event listeners
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const bannerUrl = document.getElementById("editBanner").value.trim();
    const avatarUrl = document.getElementById("editAvatar").value.trim();
    const bio = document.getElementById("editBio").value.trim();

    const payload = {
      bio: bio,
      avatar: {
        url: avatarUrl,
        alt: "User avatar",
      },
      banner: {
        url: bannerUrl,
        alt: "User banner",
      },
    };

    try {
      const response = await apiFetch(
        `/auction/profiles/${username}`,
        "PUT",
        payload
      );

      if (response) {
        displayMessage("success", "Profile updated successfully!");
        document.getElementById("editProfileForm").classList.add("hidden");
        document.getElementById("userProfile").classList.remove("hidden");

        // Optional: reload to reflect changes
        setTimeout(() => window.location.reload(), 1000);
      } else {
        displayMessage("error", "Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      displayMessage("error", "An unexpected error occurred.");
    }
  });
}
