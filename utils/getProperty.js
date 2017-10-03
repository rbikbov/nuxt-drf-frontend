export default (obj, prop) =>
  prop
    .split('.')
    .reduce((m, i) => (m && typeof m === 'object' ? m[i] : m), obj);
