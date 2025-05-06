import { apiFetch } from "./apiFetch.mjs";

export async function getFullUserProfile() {
  const name = localStorage.getItem("name");
  if (!name) return null;

  const { data } = await apiFetch(
    `/auction/profiles/${name}`,
    "GET",
    null,
    true
  );
  return data;
}
