import { displayMessage } from "../utils/displayMessage.mjs";

const loginNavButton = document.getElementById("loginNavButton");
const token = localStorage.getItem("token");

if (!token) {
  loginNavButton.textContent = `Login`;
  loginNavButton.href = "../auth/login.html";
} else {
  loginNavButton.textContent = `Logout`;
}

// Come back here and fix this. Issue: Logout message doesnt show.

loginNavButton.addEventListener("click", () => {
  if (token) {
    displayMessage("#message", "success", "You have been logged out...");

    setTimeout(() => {
      localStorage.clear();
      window.location.href = "../auth/login.html";
    }, 2000);
  }
});
