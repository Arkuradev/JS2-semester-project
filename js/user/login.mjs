import { API_LOGIN } from "../utils/constants.mjs";
import { displayMessage } from "../utils/displayMessage.mjs";

const token = localStorage.getItem("token");
const username = localStorage.getItem("name");

if (token && username) {
  displayMessage("error", "You are already logged in. Redirecting...");

  setTimeout(() => {
    window.location.href = "../index.html";
  }, 1500);

  throw new Error("User already logged in");
}

export async function loginUser() {
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

      displayMessage("success", "Login successful!");
      setTimeout(() => {
        window.location.href = "../index.html";
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  });
}

loginUser();
