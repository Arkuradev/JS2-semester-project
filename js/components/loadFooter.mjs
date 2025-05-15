export function loadFooter() {
  const footer = document.createElement("footer");
  footer.innerHTML = `
  <footer class="bg-nav text-main border-t border-border py-6 mt-10">
  <div class="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-center sm:text-left">
    <div class="flex gap-4">
      <a href="/index.html" class="hover:text-hover">Home</a>
      <a href="/listings/alllistings.html" class="hover:text-hover">Auctions</a>
      <a href="/profile/dashboard.html" class="hover:text-hover">Dashboard</a>
      <a href="/auth/login.html" class="hover:text-hover">Login</a>
    </div>
    <p>© 2025 CrestAuction. Built by SteinA 🎯</p>
  </div>
</footer>
  
  `;

  document.body.appendChild(footer);
}
