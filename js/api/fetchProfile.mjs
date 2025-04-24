import { apiFetch } from "./apiFetch.mjs";
import { updateProfile } from "../user/updateProfile.mjs";

function renderProfile(data) {
  const profileContainer = document.getElementById("profileContainer");

  /*
  // Replace skeleton with real HTML (you can also append here instead of replace)
  profileContainer.innerHTML = `
  <img id="profileBanner" class="h-42 w-75  mb-4" src="${
    data.banner?.url
  }" alt="Profile banner" />
    <img id="profileAvatar" class="h-42 w-72 mx-auto rounded-full mb-4" src="${
      data.avatar?.url
    }" alt="Profile avatar" />
    <div class="mt-14">
    <h2 id="profileName">${data.name}</h2>
    <p id="funds">Funds: ${data.credits}</p>
    <p id="profileEmail">Email: ${data.email}</p>
    <p id="profileBio">${data.bio || "No bio set yet"}</p>
    <button id="editProfileButton" class="mt-4 mb-4 px-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300">Edit Profile</button>
    
    `;
    */

  // Assuming `profileContainer` is already defined
  profileContainer.innerHTML = ""; // Clear any existing content

  // Create the banner image
  const profileBanner = document.createElement("img");
  profileBanner.id = "profileBanner";
  profileBanner.className = "h-42 w-75 mb-4";
  profileBanner.src = data.banner?.url;
  profileBanner.alt = "Profile banner";

  // Create the avatar image
  const profileAvatar = document.createElement("img");
  profileAvatar.id = "profileAvatar";
  profileAvatar.className = "h-42 w-72 mx-auto rounded-full mb-4";
  profileAvatar.src = data.avatar?.url;
  profileAvatar.alt = "Profile avatar";

  // Create the container for profile details
  const detailsContainer = document.createElement("div");
  detailsContainer.className = "mt-14";

  // Create the name heading
  const profileName = document.createElement("h2");
  profileName.id = "profileName";
  profileName.textContent = data.name;

  // Create the funds paragraph
  const funds = document.createElement("p");
  funds.id = "funds";
  funds.textContent = `Funds: ${data.credits}`;

  // Create the email paragraph
  const profileEmail = document.createElement("p");
  profileEmail.id = "profileEmail";
  profileEmail.textContent = `Email: ${data.email}`;

  // Create the bio paragraph
  const profileBio = document.createElement("p");
  profileBio.id = "profileBio";
  profileBio.textContent = data.bio || "No bio set yet";

  // Create the Edit Profile button
  const editProfileButton = document.createElement("button");
  editProfileButton.id = "editProfileButton";
  editProfileButton.className =
    "mt-4 mb-4 px-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300";
  editProfileButton.textContent = "Edit Profile";

  // Append the button after profile data is loaded into the DOM
  document.getElementById("profileContainer").appendChild(editProfileButton);

  // Now add the event listener after the button is rendered
  const editProfileForm = document.getElementById("editProfileForm");
  editProfileButton.addEventListener("click", () => {
    document.getElementById("editBanner").value = data.banner?.url;
    document.getElementById("editAvatar").value = data.avatar?.url;
    document.getElementById("editBio").value = data.bio || "";
    editProfileForm.classList.remove("hidden"); // Show the edit form
  });

  const cancelProfileButton = document.getElementById("cancelEditButton");
  cancelProfileButton.addEventListener("click", () => {
    editProfileForm.classList.add("hidden"); // Hide the edit form
  });

  const saveProfileButton = document.getElementById("saveProfileButton");
  saveProfileButton.addEventListener("click", () => {
    updateProfile();
    editProfileForm.classList.add("hidden"); // Hide the edit form
  });

  // Append everything to profileContainer
  profileContainer.appendChild(profileBanner);
  profileContainer.appendChild(profileAvatar);
  profileContainer.appendChild(detailsContainer);

  // Append the individual profile elements to detailsContainer
  detailsContainer.appendChild(profileName);
  detailsContainer.appendChild(funds);
  detailsContainer.appendChild(profileEmail);
  detailsContainer.appendChild(profileBio);
  detailsContainer.appendChild(editProfileButton);
}

export async function fetchProfile() {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("name");

  if (!token) {
    console.error(
      "Missing token or username in localStorage. Please log in first."
    );
    return (window.location.href = "/account/login.html");
  }

  // Fetch data and show skeleton loader in the meantime
  const { data } = await apiFetch(
    `/auction/profiles/${username}`,
    "GET",
    null,
    "#profileContainer"
  );
  // Now render the profile once data is loaded
  renderProfile(data);
}

function main() {
  fetchProfile();
}

main();

/*






export async function fetchProfile() {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("name");
  if (!token) {
    console.error(
      "Missing token or username in localStorage. Please log in first."
    );
    // displayMessage("#message", "error", "Please log in first.");
    return (window.location.href = "/account/login.html");
  }

  const { data } = await apiFetch(
    `/auction/profiles/${username}`,
    "GET",
    null,
    "#profileContainer"
  );

  document.getElementById("profileBanner").src = data.banner?.url;
  document.getElementById("profileAvatar").src = data.avatar?.url;
  document.getElementById("profileName").textContent = data.name;
  document.getElementById("funds").textContent = `Funds: ${data.credits}`;
  document.getElementById("profileEmail").textContent = `Email: ${data.email}`;
  document.getElementById("profileBio").textContent =
    data.bio || "No bio set yet";

  // Prefill edit form.
  document.getElementById("editAvatar").value = data.avatar?.url;
  document.getElementById("editBio").value = data.bio;
}

function main() {
  fetchProfile();
}

main();
*/
