import { loadNav } from "./components/loadNav.mjs";
import { setupNavbar } from "./listeners/setupNav.mjs";

loadNav().then(() => {
  setupNavbar();
});

function route() {
  const path = window.location.pathname;

  switch (true) {
    case path.includes("dashboard"):
      import("./api/userListings.mjs").then((mod) => mod.renderUserListings());
      import("../js/api/fetchProfile.mjs").then((mod) => mod.fetchProfile());
      import("../js/user/editProfile.mjs").then((mod) => mod.editProfile());
      // import("../js/user/updateProfile.mjs").then((mod) => mod.updateProfile());
      break;

    case path.includes("login"):
      import("./user/login.mjs").then((mod) => mod.loginUser());
      break;

    case path.includes("register"):
      // Create the page.
      break;

    case path.includes("allListings"):
      // Create the page.
      break;

    case path.includes("new"):
      import("./auctions/newListing.mjs").then((mod) => mod.newListing()); //newListing();
      break;
  }
}

route();
