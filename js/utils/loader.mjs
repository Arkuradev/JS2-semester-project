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

export function hideSkeletonLoader(containerSelector) {
  const container = document.querySelector(containerSelector);
  if (container) container.innerHTML = "";
}

/*


export function renderLoader(container, count = 6) {
  container.innerHTML = "";

  for (let i = 0; i < count; i++) {
    const skeleton = document.createElement("div");
    skeleton.className =
      "animate-pulse bg-white border border-blue-300 rounded-md p-4 w-full max-w-[180px]";

    skeleton.innerHTML = `
  <div class="mx-auto w-full max-w-sm rounded-md border border-blue-300 p-4">
  <div class="flex animate-pulse space-x-4">
    <div class="size-10 rounded-full bg-gray-400"></div>
    <div class="flex-1 space-y-6 py-1">
      <div class="h-2 rounded bg-gray-400"></div>
      <div class="space-y-3">
        <div class="grid grid-cols-3 gap-4">
          <div class="col-span-2 h-2 rounded bg-gray-400"></div>
          <div class="col-span-1 h-2 rounded bg-gray-400"></div>
        </div>
        <div class="h-2 rounded bg-gray-00"></div>
      </div>
    </div>
  </div>
</div>
  `;
    container.appendChild(skeleton);
  }
}



<div class="flex flex-col space-y-3">
        <div class="h-24 bg-gray-200 rounded w-full"></div>
        <div class="h-3 bg-gray-200 rounded w-3/4"></div>
        <div class="h-3 bg-gray-200 rounded w-1/2"></div>
        <div class="flex space-x-2 mt-auto">
          <div class="h-6 bg-gray-200 rounded w-full"></div>
          <div class="h-6 bg-gray-200 rounded w-full"></div>
        </div>
      </div>

      */
