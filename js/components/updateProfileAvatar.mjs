export function updateProfileAvatar(user) {
  const avatarImg = document.querySelector("#profileAvatar");

  if (!avatarImg) return;

  const avatarUrl = user.avatar?.url?.trim();

  if (avatarUrl) {
    avatarImg.src = avatarUrl;
    avatarImg.alt = `${user.name}'s avatar`;
  } else {
    avatarImg.src = "/images/placeholder.jpg";
    avatarImg.alt = "Default avatar";
  }
}
