import { apiFetch } from "../api/apiFetch.mjs";
import { displayMessage } from "../utils/displayMessage.mjs";
export async function register(name, email, password) {
  try {
    const data = await apiFetch(
      `/auth/register`,
      "POST",
      { name, email, password },
      false
    );

    if (data) {
      displayMessage("success", "Registration successful! You can now log in.");
      setTimeout(() => {
        window.location.href = "/../auth/login.html";
      }, 1500);
    } else {
      displayMessage("error", "Registration failed! Please try again.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
document
  .getElementById("registerForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (password.length < 8) {
      displayMessage("error", "Password must be at least 8 characters long!");
      return;
    } else if (!email.endsWith("@stud.noroff.no")) {
      displayMessage("error", "Please use a valid @stud.noroff.no email!");
      return;
    } else {
      await register(name, email, password);
    }
  });
