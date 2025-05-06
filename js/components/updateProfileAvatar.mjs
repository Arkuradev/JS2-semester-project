export function updateProfileAvatar(user) {
  const avatarImg = document.querySelector("#profileAvatar");

  if (!avatarImg) return;

  const avatarUrl = user.avatar?.url?.trim();

  if (avatarUrl) {
    avatarImg.src = avatarUrl;
    avatarImg.alt = `${user.name}'s avatar`;
  } else {
    // fallback if no avatar is set
    avatarImg.src = "/assets/img/default-avatar.png";
    avatarImg.alt = "Default avatar";
  }
}
