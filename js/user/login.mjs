import { API_LOGIN } from "../utils/constants.mjs";
import { displayMessage } from "../utils/displayMessage.mjs";

const loginForm = document.querySelector("#loginForm");
const emailInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;

  if (!email || !password) {
    const errorMessage = "Please enter both email and password.";
    displayMessage("#message", "error", errorMessage);
    return;
  }

  try {
    const response = await fetch(API_LOGIN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Login failed!");
    }

    const data = await response.json();
    localStorage.setItem("token", data.data?.accessToken);
    localStorage.setItem("name", data.data?.name);

    // TEMP - EDIT LATER
    displayMessage("#message", "success", "Login successful!");
    /* Set more statuses here if needed after user has logged in */
    setTimeout(() => {
      window.location.href = "../index.html";
    }, 2000);
  } catch (error) {
    console.error(error);
    const messageElement = document.querySelector(".message");
    messageElement.textContent = error.message;
  }
});
