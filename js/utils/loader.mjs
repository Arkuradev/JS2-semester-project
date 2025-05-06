export function showSkeletonLoader(container, count = 1) {
  const template = document.getElementById("skeleton-loader");
  if (!template || !container) return;

  container.innerHTML = "";

  for (let i = 0; i < count; i++) {
    const skeleton = template.content.cloneNode(true);
    container.appendChild(skeleton);
  }
}

export function hideSkeletonLoader(container) {
  if (container) container.innerHTML = "";
}
