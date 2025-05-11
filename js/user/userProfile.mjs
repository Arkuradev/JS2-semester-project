import { apiFetch } from "../api/apiFetch.mjs";

function renderUserProfile(data) {
  const profileContainer = document.getElementById("profileContainer");
  profileContainer.className =
    "w-full max-w-2xl mx-auto border-border border rounded-lg p-6 shadow-md relative";

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

  detailsContainer.append(profileName, profileEmail, profileBio);

  const bannerWrapper = document.createElement("div");
  bannerWrapper.className = "relative";

  bannerWrapper.append(profileBanner, profileAvatar);

  profileContainer.append(bannerWrapper, detailsContainer);
}

/*
Some notes:

Right now we finally fixed the issue with page not rendering properly. 
I also modified the fetchProfile function by removing the edit section that is in manage.html
Next up now is to modify the fetchProfile function to render the user profile of the user that is clicked on 
to display the users profile. 


IMPORTANT FIX!


*/

export async function fetchProfile() {
  const token = localStorage.getItem("token");
  // const params = new URLSearchParams(window.location.search);
  // const name = params.get("name");
  const username = localStorage.getItem("name");

  if (!token) {
    console.error(
      "Missing token or username in localStorage. Please log in first."
    );
    return (window.location.href = "/auth/login.html");
  }

  const container = document.querySelector("#profileContainer");
  // Fetch data and show skeleton loader in the meantime
  const { data } = await apiFetch(
    `/auction/profiles/${username}`,
    "GET",
    null,
    true,
    container
  );
  // Now render the profile once data is loaded
  renderUserProfile(data);
}

function main() {
  fetchProfile();
}

main();
