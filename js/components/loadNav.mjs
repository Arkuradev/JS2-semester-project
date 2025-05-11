export async function loadNav() {
  const container = document.getElementById("navContainer");

  if (container) {
    try {
      const response = await fetch("../js/components/nav.html");
      const navHtml = await response.text();
      container.innerHTML = navHtml;
    } catch (error) {
      console.error("Failed to load nav:", error);
    }
  }
}
