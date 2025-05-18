import { apiFetch } from "../api/apiFetch.mjs";
import { displayMessage } from "../utils/displayMessage.mjs";

export function renderUserProfile(data) {
  const profileContainer = document.getElementById("profileContainer");
  profileContainer.className =
    "w-full max-w-2xl mx-auto border-hover border rounded-lg p-6 shadow-md relative";

  profileContainer.innerHTML = "";

  document.title = `${data?.name}'s profile`;

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

  const totalWins = document.createElement("h3");
  totalWins.className = "text-xl font-semibold text-text mt-12";
  totalWins.textContent = `🏆 Total Wins: ${data._count?.wins || 0}`;

  const profileBio = document.createElement("p");
  profileBio.className = "text-base text-text mt-4";
  profileBio.id = "profileBio";
  profileBio.textContent = data.bio || "No bio set yet";

  detailsContainer.append(profileName, profileEmail, totalWins, profileBio);

  const bannerWrapper = document.createElement("div");
  bannerWrapper.className = "relative";

  bannerWrapper.append(profileBanner, profileAvatar);
  profileContainer.append(bannerWrapper, detailsContainer);

  // Listing section:

  const listingsSection = document.createElement("div");
  listingsSection.className = "mt-10 space-y-4";

  const listingsTitle = document.createElement("h3");
  listingsTitle.className = "text-xl font-bold text-text";
  listingsTitle.textContent = "Current Listings";

  const listingsGrid = document.createElement("div");
  listingsGrid.className = "grid gap-4 sm:grid-cols-2";

  if (data.listings?.length > 0) {
    data.listings.forEach((listing) => {
      const card = document.createElement("div");
      card.className = "border border-hover rounded p-4 shadow-lg";

      const image = document.createElement("img");
      image.src = listing.media?.[0]?.url || "/images/placeholder.jpg";
      image.alt = listing.media?.[0]?.alt || "Placeholder image";
      image.className = "w-full h-48 object-cover  ";

      const titleLink = document.createElement("a");
      titleLink.href = `/listing/viewlisting.html?id=${listing.id}`;
      titleLink.className =
        "text-lg font-semibold text-text hover:text-hover hover:scale-105";
      titleLink.textContent = listing.title;

      const endsAt = document.createElement("p");
      endsAt.className = "text-sm text-text";
      endsAt.textContent = `Ends at: ${new Date(
        listing.endsAt
      ).toLocaleString()}`;

      card.append(image, titleLink, endsAt);
      listingsGrid.appendChild(card);
    });
  } else {
    const noListings = document.createElement("p");
    noListings.className = "text-text";
    noListings.textContent = "No listings found.";
    listingsGrid.appendChild(noListings);
  }

  listingsSection.append(listingsTitle, listingsGrid);
  profileContainer.appendChild(listingsSection);
}
export async function fetchProfile() {
  const token = localStorage.getItem("token");
  const params = new URLSearchParams(window.location.search);
  const username = params.get("name");

  if (!token) {
    displayMessage(
      "error",
      "Please log in first to view a user profile. Redirecting..."
    );

    setTimeout(() => {
      window.location.href = "/auth/login.html";
    }, 1500);

    return;
  }

  const container = document.querySelector("#profileContainer");
  const { data } = await apiFetch(
    `/auction/profiles/${username}?_listings=true&?_wins=true`,
    "GET",
    null,
    true,
    container,
    1
  );
  renderUserProfile(data);
}

function main() {
  fetchProfile();
}
main();
