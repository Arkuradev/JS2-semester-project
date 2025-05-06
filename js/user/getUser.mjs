export function getUserFromStorage() {
  return JSON.parse(localStorage.getItem("user")) || null;
}

export function saveUserToStorage(user) {
  localStorage.setItem("user", JSON.stringify(user));
}
