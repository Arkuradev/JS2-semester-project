import { API_KEY } from "../utils/constants.mjs";
import { BASE_API_ENDPOINT } from "../utils/constants.mjs";
import { displayMessage } from "../utils/displayMessage.mjs";

export async function apiFetch(endpoint, method = "GET", body = null) {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    "X-Noroff-API-Key": API_KEY,
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const options = {
    method,
    headers,
  };
  if (body) {
    options.body = JSON.stringify(body);
  }
  try {
    const response = await fetch(`${BASE_API_ENDPOINT}${endpoint}`, options);

    let data = null;
    if (response.status !== 204) {
      data = await response.json();
    }
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Unauthorized");
      }
      throw new Error(data?.message || `Failed to fetch ${endpoint}`);
    }
    return data;
  } catch (error) {
    if (error.message === "Unauthorized") {
      displayMessage(
        "#message",
        "error",
        "Session expired. Redirecting to login..."
      );
      setTimeout(() => {
        window.location.href = "../auth/login.html";
      }, 2000);
    } else {
      displayMessage("#message", "error", error.message);
    }
  } finally {
    // stopLoader();
  }
}
