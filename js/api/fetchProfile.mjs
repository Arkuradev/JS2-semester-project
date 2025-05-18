import { apiFetch } from "./apiFetch.mjs";
import { updateProfile } from "../user/updateProfile.mjs";
import { updateProfileAvatar } from "../components/updateProfileAvatar.mjs";

function renderProfile(data) {
  const profileContainer = document.getElementById("profileContainer");
  profileContainer.className =
    "w-full max-w-2xl mx-auto border-hover border rounded-lg p-6 shadow-md relative";

  profileContainer.innerHTML = "";

  const profileBanner = document.createElement("img");
  profileBanner.id = "profileBanner";
  profileBanner.className =
    "w-full h-48 object-cover border border-hover rounded-t-md";
  profileBanner.src = data.banner?.url;
  profileBanner.alt = "Profile banner";

  const profileAvatar = document.createElement("img");
  profileAvatar.id = "profileAvatar";
  profileAvatar.className =
    "w-32 h-32 object-cover rounded-full border-4 border-hover shadow-md absolute left-1/2 -translate-x-1/2 -bottom-16";
  profileAvatar.src = data.avatar?.url;
  profileAvatar.alt = "Profile avatar";

  const detailsContainer = document.createElement("div");
  detailsContainer.className = "pt-20 text-center space-y-2";

  const profileName = document.createElement("h2");
  profileName.className = "text-2xl font-bold text-text";
  profileName.id = "profileName";
  profileName.textContent = data.name;

  const funds = document.createElement("p");
  funds.className = "text-text text-lg";
  funds.id = "funds";
  funds.textContent = `Funds: ${data.credits}`;

  const profileEmail = document.createElement("p");
  profileEmail.className = "text-text text-sm";
  profileEmail.id = "profileEmail";
  profileEmail.textContent = `Email: ${data.email}`;

  const profileBio = document.createElement("p");
  profileBio.className = "text-base text-text mt-4";
  profileBio.id = "profileBio";
  profileBio.textContent = data.bio || "No bio set yet";

  const totalWins = document.createElement("h3");
  totalWins.className = "text-xl font-semibold text-text mt-12";
  totalWins.textContent = `🏆 Total Wins: ${data._count?.wins || 0}`;

  // Won auctions list
  const winsContainer = document.createElement("div");
  winsContainer.className = "grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4";

  if (Array.isArray(data.wins) && data.wins.length > 0) {
    data.wins.forEach((win) => {
      const winCard = document.createElement("a");
      winCard.href = `/listing/viewlisting.html?id=${win.id}`;
      winCard.className =
        "block bg-nav border border-hover rounded-lg overflow-hidden shadow-md hover:shadow-lg transition transform hover:scale-105";

      const img = document.createElement("img");
      img.src = win.media?.[0]?.url || "/images/placeholder.jpg";
      img.alt = win.media?.[0]?.alt || "Won listing image";
      img.className = "w-full h-32 object-cover";

      const title = document.createElement("h4");
      title.textContent = win.title;
      title.className = "p-2 text-text font-semibold";

      winCard.append(img, title);
      winsContainer.appendChild(winCard);
    });
  } else {
    const noWins = document.createElement("p");
    noWins.className = "text-text text-sm mt-2";
    noWins.textContent = "You haven’t won any auctions yet.";
    winsContainer.appendChild(noWins);
  }

  detailsContainer.appendChild(totalWins);
  detailsContainer.appendChild(winsContainer);
  console.log(data?.wins);

  const editProfileButton = document.createElement("button");
  editProfileButton.id = "editProfileButton";
  editProfileButton.textContent = "Edit Profile";
  editProfileButton.className =
    "mt-6 mb-6 px-5 py-2 bg-btn-primary hover:bg-hover text-text font-semibold rounded transition duration-300";

  document.getElementById("profileContainer").appendChild(editProfileButton);

  const editProfileForm = document.getElementById("editProfileForm");
  editProfileButton.addEventListener("click", () => {
    document.getElementById("editBanner").value = data.banner?.url;
    document.getElementById("editAvatar").value = data.avatar?.url;
    document.getElementById("editBio").value = data.bio || "";
    editProfileForm.classList.remove("hidden");
  });

  const cancelProfileButton = document.getElementById("cancelEditButton");
  cancelProfileButton.addEventListener("click", () => {
    editProfileForm.classList.add("hidden");
  });

  const saveProfileButton = document.getElementById("saveProfileButton");
  saveProfileButton.addEventListener("click", () => {
    updateProfile();
    editProfileForm.classList.add("hidden");
  });

  detailsContainer.append(
    profileName,
    funds,
    profileEmail,
    profileBio,
    editProfileButton
  );
  detailsContainer.appendChild(totalWins);
  detailsContainer.appendChild(winsContainer);

  const bannerWrapper = document.createElement("div");
  bannerWrapper.className = "relative";

  bannerWrapper.append(profileBanner, profileAvatar);

  profileContainer.append(bannerWrapper, detailsContainer);
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

  const container = document.querySelector("#profileContainer");

  const { data } = await apiFetch(
    `/auction/profiles/${username}?_wins=true`,
    "GET",
    null,
    true,
    container
  );

  updateProfileAvatar(data);
  renderProfile(data);
}

function main() {
  fetchProfile();
}
main();
