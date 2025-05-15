/**
 * Returns a debounced version of the given function.
 *
 * The debounced function will only be called once in the given time window
 * (default: 400ms). Any calls to the function within that time window will
 * reset the timeout.
 *
 * @param {function} func The function to debounce
 * @param {number} [delay=400] The time window in milliseconds
 * @return {function} The debounced function
 */
export function debounce(func, delay = 400) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}
