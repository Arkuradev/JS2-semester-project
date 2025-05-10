export function initUI() {
  const createListingBtn = document.getElementById("createListingBtn");
  const createListingBtnMobile = document.getElementById(
    "createListingBtnMobile"
  );

  const token = localStorage.getItem("token");

  if (!token) {
    if (createListingBtn) createListingBtn.style.display = "none";
    if (createListingBtnMobile) createListingBtnMobile.style.display = "none";
  }
}
