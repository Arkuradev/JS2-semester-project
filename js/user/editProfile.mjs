import { updateProfile } from "./updateProfile.mjs";
import { fetchProfile } from "../api/fetchProfile.mjs";

const cancelEditButton = document.getElementById("cancelEditButton");
const editProfileForm = document.getElementById("editProfileForm");

function onCancelEditButtonClick() {
  editProfileForm.classList.add("hidden");
}

export function editProfile() {
  fetchProfile();
  updateProfile();
  cancelEditButton.addEventListener("click", onCancelEditButtonClick);
}

editProfile();
