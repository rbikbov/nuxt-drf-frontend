module.exports = function(to, from, savedPosition) {
  // setTimeout(() => {
  let position = {};
  if (savedPosition) {
    position = savedPosition;
  } else if (to.hash) {
    position = { selector: to.hash };
    // setTimeout(() => {
    //   document
    //     .getElementById(to.hash.replace('#', ''))
    //     .scrollIntoView({ behavior: 'smooth' });
    // }, 700);
  } else if (to.matched.length < 2) {
    // scroll to the top of the page
    position = { x: 0, y: 0 };
  } else if (to.matched.some(r => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 };
  }
  // global.console.log(position);
  return position;
  // }, 1000);
};
