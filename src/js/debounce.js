export function debounce(fn, debounceTime) {
  let timeout;
  return function () {
    const fnCall = () => fn.apply(this, arguments);

    clearTimeout(timeout);

    timeout = setTimeout(fnCall, debounceTime);
  };
}
