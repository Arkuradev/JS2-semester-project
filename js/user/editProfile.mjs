import { updateProfile } from "./updateProfile.mjs";
import { fetchProfile } from "../api/fetchProfile.mjs";

const cancelEditButton = document.getElementById("cancelEditButton");
const editProfileForm = document.getElementById("editProfileForm");
const closeEditProfile = document.getElementById("closeEditProfile");

function onCancelEditButtonClick() {
  editProfileForm.classList.add("hidden");
}

closeEditProfile.addEventListener("click", () => {
  editProfileForm.classList.add("hidden");
});

export function editProfile() {
  fetchProfile();
  updateProfile();
  cancelEditButton.addEventListener("click", onCancelEditButtonClick);
}

editProfile();
