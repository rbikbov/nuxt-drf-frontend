'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var _require = require('path');
var resolve = _require.resolve;

var index = (function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(moduleOptions) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // const options = Object.assign({}, this.options.auth, moduleOptions)

            // Plugin
            this.addPlugin({ src: resolve(__dirname, '../templates/auth.plugin.js'), fileName: 'auth.plugin.js' });

            // Middleware
            this.addTemplate({ src: resolve(__dirname, '../templates/auth.middleware.js'), fileName: 'auth.middleware.js' });

            // Store
            this.addTemplate({ src: resolve(__dirname, '../templates/auth.store.js'), fileName: 'auth.store.js' });

          case 3:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  function module(_x) {
    return _ref.apply(this, arguments);
  }

  return module;
})();

module.exports = index;
