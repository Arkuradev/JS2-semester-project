import { loadNav } from "./components/loadNav.mjs";
import { setupNavbar } from "./listeners/setupNav.mjs";
import { themeToggle } from "./components/themeToggle.mjs";
import { renderCreateListingModal } from "./components/createListing.mjs";
import { getFullUserProfile } from "./api/getFullUserProfile.mjs";
import { updateProfileAvatar } from "./components/updateProfileAvatar.mjs";
import { displayMessage } from "./utils/displayMessage.mjs";
import { initUI } from "./utils/initUI.mjs";
import { loadFooter } from "./components/loadFooter.mjs";

loadNav().then(async () => {
  setupNavbar();
  loadFooter();

  const user = await getFullUserProfile();

  if (user) {
    updateProfileAvatar(user);
  }
  initUI();
});

function route() {
  const path = window.location.pathname;
  switch (true) {
    case path.includes("dashboard"):
      import("./api/userListings.mjs").then((mod) => mod.renderUserListings());
      import("../js/user/getUserBids.mjs").then((mod) => mod.loadUserBids());
      break;

    case path.includes("manage"):
      import("../js/api/fetchProfile.mjs").then((mod) => mod.fetchProfile());
      import("../js/user/editProfile.mjs").then((mod) => mod.editProfile());

      break;

    case path.includes("login"):
      import("./user/login.mjs").then((mod) => mod.loginUser());
      break;

    case path.includes("register"):
      import("./user/register.mjs");
      break;

    case path === "/" || path.includes("index.html"):
      try {
        import("../js/api/renderListings.mjs").then((mod) =>
          mod.renderListings()
        );
      } catch (error) {
        console.error("Failed to load listings:", error);
        displayMessage("#message", "error", "Failed to load listings.");
      }
      break;

    case path.includes("alllistings"):
      import("./components/allListings.mjs").then((mod) =>
        mod.setupAllListingsTabs()
      );
      break;

    case path.endsWith("/user.html"):
      import("./user/userProfile.mjs").then((mod) => mod.fetchProfile());
      break;

    case path.includes("new"):
      import("./auctions/newListing.mjs").then((mod) => mod.newListing());
      break;

    case path.includes("viewlisting"):
      import("./api/renderSingleListing.mjs").then((mod) =>
        mod.renderListingDetails()
      );
      break;
  }
}
route();
themeToggle();
renderCreateListingModal();
window.displayMessage = displayMessage;
