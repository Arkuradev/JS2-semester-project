function setupNavbar() {
  // Element references
  const loginButton = document.getElementById("loginButton");
  const profileButton = document.getElementById("profileButton");
  const profileNavContainer = document.getElementById("profileNavContainer");
  const profileMenu = document.getElementById("profileMenu");
  const logoutButton = document.getElementById("logoutButton");
  const creditsContainer = document.getElementById("creditsContainer");
  // const userCredits = document.getElementById("user-credits");
  const mobileMenuButton = document.getElementById("mobileMenuButton");
  const mobileMenu = document.getElementById("mobileMenu");

  const isLoggedIn = localStorage.getItem("token");
  // const userFunds = localStorage.getItem("credits");

  if (loginButton) {
    loginButton.addEventListener("click", () => {
      window.location.href = "../auth/login.html";
    });

    // Update navbar based on login status
    if (isLoggedIn) {
      loginButton.classList.add("hidden");
      profileButton.classList.remove("hidden");
      creditsContainer.classList.remove("hidden");
      profileNavContainer.classList.remove("hidden");
      // userCredits.textContent = userFunds;
    } else {
      loginButton.classList.remove("hidden");
      profileButton.classList.add("hidden");
      creditsContainer.classList.add("hidden");
      profileNavContainer.classList.add("hidden");
    }

    // Toggle profile dropdown
    if (profileButton && profileMenu) {
      profileButton.addEventListener("click", () => {
        profileMenu.classList.toggle("hidden");
      });
    }

    // Handle logout
    if (logoutButton) {
      logoutButton.addEventListener("click", () => {
        localStorage.removeItem("token");
        localStorage.removeItem("name");
        localStorage.removeItem("credits");
        window.location.href = "/index.html";
      });
    }

    // Toggle mobile menu
    if (mobileMenuButton && mobileMenu) {
      mobileMenuButton.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
      });
    }
  }
}

// ✅ CALL the function after it's defined
setupNavbar();

/*
const authButton = document.getElementById("loginNavButton");
const creditsDisplay = document.getElementById("creditsDisplay");
const userCredits = document.getElementById("userCredits");
const mobileMenuButton = document.getElementById("mobileMenuButton");
const mobileMenu = document.getElementById("mobileMenu");

// Fake login state check (replace this with your real authentication check)
const isLoggedIn = Boolean(localStorage.getItem("token"));
const userFunds = localStorage.getItem("credits") || 0;

// Show correct UI based on login
if (isLoggedIn) {
  authButton.textContent = "Logout";
  creditsDisplay.classList.remove("hidden");
  userCredits.textContent = userFunds;
} else {
  authButton.textContent = "Login";
  creditsDisplay.classList.add("hidden");
}

// Handle login/logout click
authButton.addEventListener("click", () => {
  if (isLoggedIn) {
    // Logout
    localStorage.removeItem("token");
    localStorage.removeItem("credits");
    window.location.href = "/login.html"; // Redirect to login
  } else {
    window.location.href = "/login.html"; // Go to login page
  }
});

// Toggle mobile menu
mobileMenuButton.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});
*/

/*

const loginNavButton = document.getElementById("loginNavButton");
const token = localStorage.getItem("token");

if (!token) {
  loginNavButton.textContent = `Login`;
  loginNavButton.href = "../auth/login.html";
} else {
  loginNavButton.textContent = `Logout`;
}

// Come back here and fix this. Issue: Logout message doesnt show.

loginNavButton.addEventListener("click", () => {
  if (token) {
    displayMessage("#message", "success", "You have been logged out...");

    setTimeout(() => {
      localStorage.clear();
      window.location.href = "../auth/login.html";
    }, 2000);
  }
}); 
*/
