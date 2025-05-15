import { apiFetch } from "../api/apiFetch.mjs";

export async function setupNavbar() {
  const loginButton = document.getElementById("loginButton");
  const profileButton = document.getElementById("profileButton");
  const profileNavContainer = document.getElementById("profileNavContainer");
  const profileMenu = document.getElementById("profileMenu");
  const logoutButton = document.getElementById("logoutButton");
  const creditsContainer = document.getElementById("creditsContainer");
  const registerButton = document.getElementById("registerButton");
  const mobileMenuButton = document.getElementById("mobileMenuButton");
  const mobileMenu = document.getElementById("mobileMenu");
  const newListingButton = document.getElementById("openCreateListingBtn");

  const isLoggedIn = localStorage.getItem("token");

  if (loginButton) {
    loginButton.addEventListener("click", () => {
      window.location.href = "../auth/login.html";
    });

    if (isLoggedIn) {
      loginButton.classList.add("hidden");
      profileButton.classList.remove("hidden");
      creditsContainer.classList.remove("hidden");
      profileNavContainer.classList.remove("hidden");
      registerButton.classList.add("hidden");
      newListingButton.classList.remove("hidden");
    } else {
      loginButton.classList.remove("hidden");
      profileButton.classList.add("hidden");
      creditsContainer.classList.add("hidden");
      profileNavContainer.classList.add("hidden");
      registerButton.classList.remove("hidden");
      newListingButton.classList.add("hidden");
    }

    if (profileButton && profileMenu) {
      profileButton.addEventListener("click", () => {
        profileMenu.classList.toggle("hidden");
      });
    }

    if (logoutButton) {
      logoutButton.addEventListener("click", () => {
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        localStorage.removeItem("credits");
        window.location.href = "/index.html";
      });
    }

    if (mobileMenuButton && mobileMenu) {
      mobileMenuButton.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
      });
    }
  }

  const userCreditsEl = document.getElementById("userCredits");
  const username = localStorage.getItem("name");

  if (userCreditsEl && username) {
    try {
      const { data } = await apiFetch(`/auction/profiles/${username}`, "GET");
      userCreditsEl.textContent = data.credits.toString();
    } catch (error) {
      console.error("Error fetching credits:", error);
    }
  }
}
