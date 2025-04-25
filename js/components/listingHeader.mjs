export function createListingHeader(listing) {
  const fragment = document.createDocumentFragment();

  const title = document.createElement("h1");
  title.className = "text-2xl font-bold";
  title.textContent = listing.title;

  const endsAt = document.createElement("p");
  endsAt.className = "text-gray-600";
  endsAt.textContent = `Ends at: ${new Date(listing.endsAt).toLocaleString()}`;

  const description = document.createElement("p");
  description.className = "text-gray-700";
  description.textContent = listing.description || "No description provided.";

  fragment.appendChild(title);
  fragment.appendChild(endsAt);
  fragment.appendChild(description);

  return fragment;
}
