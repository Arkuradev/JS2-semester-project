export function showSkeletonLoader(container) {
  const template = document.getElementById("skeleton-loader");
  if (!template || !container) return;

  container.innerHTML = "";
  const skeleton = template.content.cloneNode(true);
  container.appendChild(skeleton);
}

export function hideSkeletonLoader(container) {
  if (container) container.innerHTML = "";
}

/*
export function showSkeletonLoader(containerSelector, count = 4) {
  const container = document.querySelector(containerSelector);

  if (!container) return;

  container.innerHTML = "";
  const template = document.querySelector("#skeleton-loader");
  for (let i = 0; i < count; i++) {
    const skeleton = template.content.cloneNode(true);
    container.appendChild(skeleton);
  }
}
*/
