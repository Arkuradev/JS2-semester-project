import { loadNav } from "./components/loadNav.mjs";
import { setupNavbar } from "./listeners/setupNav.mjs";
import { themeToggle } from "./components/themeToggle.mjs";
import { renderCreateListingModal } from "./components/createListing.mjs";
import { getFullUserProfile } from "./api/getFullUserProfile.mjs";
import { updateProfileAvatar } from "./components/updateProfileAvatar.mjs";
import { displayMessage } from "./utils/displayMessage.mjs";

loadNav().then(async () => {
  setupNavbar();

  const user = await getFullUserProfile();

  if (user) {
    updateProfileAvatar(user);
  }
});

function route() {
  const path = window.location.pathname;

  switch (true) {
    case path.includes("dashboard"):
      import("./api/userListings.mjs").then((mod) => mod.renderUserListings());

      break;

    case path.includes("manage"):
      import("../js/api/fetchProfile.mjs").then((mod) => mod.fetchProfile());
      import("../js/user/editProfile.mjs").then((mod) => mod.editProfile());
      break;

    case path.includes("login"):
      import("./user/login.mjs").then((mod) => mod.loginUser());
      break;

    case path.includes("register"):
      // Create the page.
      break;

    case path === "/" || path.includes("index.html"):
      try {
        import("../js/api/renderListings.mjs").then((mod) =>
          mod.renderListings()
        );
      } catch (error) {
        displayMessage("#message", "error", "Failed to load listings.");
        console.log("Failed to load renderListings:", error);
      }
      break;

    case path.includes("alllistings"):
      import("./components/allListings.mjs").then((mod) =>
        mod.setupAllListingsTabs()
      );
      break;

    case path.includes("new"):
      import("./auctions/newListing.mjs").then((mod) => mod.newListing()); //newListing();
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
