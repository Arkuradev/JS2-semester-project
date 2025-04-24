import { updateProfile } from "./updateProfile.mjs";
import { fetchProfile } from "../api/fetchProfile.mjs";

// const editProfileButton = document.getElementById("editProfileButton");
const editProfileForm = document.getElementById("editProfileForm");
const saveProfileButton = document.getElementById("saveProfileButton");
const cancelEditButton = document.getElementById("cancelEditButton");

/*
function onEditProfileButtonClick() {
  editProfileForm.classList.remove("hidden");
}
  */

function onSaveProfileButtonClick() {
  updateProfile();
  if (updateProfile) {
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }
}

function onCancelEditButtonClick() {
  editProfileForm.classList.add("hidden");
}

function main() {
  fetchProfile();
  // editProfileButton.addEventListener("click", onEditProfileButtonClick);
  saveProfileButton.addEventListener("click", onSaveProfileButtonClick);
  cancelEditButton.addEventListener("click", onCancelEditButtonClick);
}

main();
