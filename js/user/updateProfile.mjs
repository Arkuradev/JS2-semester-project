import { apiFetch } from "../api/apiFetch.mjs";
import { displayMessage } from "../utils/displayMessage.mjs";

const username = localStorage.getItem("name");

export async function updateProfile() {
  const bannerUrl = document.getElementById("editBanner").value;
  const avatarUrl = document.getElementById("editAvatar").value;
  const bio = document.getElementById("editBio").value;

  const payload = {
    banner: bannerUrl,
    avatar: avatarUrl,
    bio,
  };

  try {
    const response = await apiFetch(
      `/auction/profiles/${username}`,
      "PUT",
      payload
    );

    if (response) {
      displayMessage("#message", "success", "Profile updated successfully!");
      document.getElementById("editProfileForm").classList.add("hidden");
      document.getElementById("userProfile").classList.remove("hidden");
    } else {
      displayMessage("#message", "error", "Failed to update profile.");
    }
  } catch (error) {
    console.error("Error updating profile:", error);
    displayMessage("#message", "error", "An unexpected error occurred.");
  }
}
