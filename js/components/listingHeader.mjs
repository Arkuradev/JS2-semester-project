import { getCountDownText } from "../components/bidCountdown.mjs";

export function createListingHeader(listing) {
  const fragment = document.createDocumentFragment();

  const title = document.createElement("h1");
  title.className = "text-text text-2xl font-bold";
  title.textContent = listing.title;

  const endsAtText = document.createElement("p");
  endsAtText.className = "text-text text-sm mt-2";
  fragment.appendChild(endsAtText);

  function updateCountdown() {
    // Clear the previous content
    endsAtText.textContent = "";

    // Append the updated span
    const countdownElement = getCountDownText(listing.endsAt);
    endsAtText.appendChild(countdownElement);
  }

  updateCountdown();

  const countdownInterval = setInterval(() => {
    updateCountdown();

    if (new Date(listing.endsAt) <= new Date()) {
      clearInterval(countdownInterval);
    }
  }, 1000);

  const description = document.createElement("p");
  description.className = "text-text";
  description.textContent = listing.description || "No description provided.";

  fragment.appendChild(title);
  fragment.appendChild(description);

  return fragment;
}
