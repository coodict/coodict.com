var Reflux        = require('reflux');
var actions       = require('../actions/actions');

var loginStore = Reflux.createStore({
  listenables: actions,

  // loginError, registerError -> show login error message;
  loginError: function (errMsg) {
    this.trigger(errMsg);
  },
});

module.exports = loginStore;
