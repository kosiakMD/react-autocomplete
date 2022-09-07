export const debounce = (func, delay) => {
  let timeId;

  return (...args) => {
    if (timeId) {
      clearTimeout(timeId)
    }
    timeId = setTimeout(() => {
      func(...args)
    }, delay, ...args);
  }
};
