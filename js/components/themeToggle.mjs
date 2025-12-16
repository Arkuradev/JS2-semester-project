export function themeToggle() {
  const btn = document.querySelector("#themeToggleBtn");
  const btnMobile = document.querySelector("#themeToggleBtnMobile");

  const desktopIcon = btn?.querySelector("span");
  const mobileIcon = document.querySelector("#themeIconMobile");

  const savedTheme = localStorage.getItem("theme");
  const isDark = savedTheme === "dark";

  function applyTheme(dark) {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");

    const icon = dark ? "🌙" : "🌞";

    if (desktopIcon) desktopIcon.textContent = icon;
    if (mobileIcon) mobileIcon.textContent = icon;

    if (btn) btn.setAttribute("aria-pressed", dark.toString());
  }

  applyTheme(isDark);

  function toggleTheme() {
    const currentlyDark = document.documentElement.classList.contains("dark");
    applyTheme(!currentlyDark);
  }

  if (btn) btn.addEventListener("click", toggleTheme);
  if (btnMobile) btnMobile.addEventListener("click", toggleTheme);
}