export default (callback, limit) => {
  let wait = false;
  return () => {
    if (!wait) {
      wait = true;
      setTimeout(() => {
        wait = false;
        callback.call();
      }, limit);
    }
  };
};
