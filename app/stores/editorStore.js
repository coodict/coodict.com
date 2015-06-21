var Reflux        = require('reflux');
var actions       = require('../actions/actions');

var editorStore = Reflux.createStore({
  listenables: actions,

  // change ACEditor mode by user's selection
  changeMode: function (lang) {
    this.trigger(lang);
  },

});

module.exports = editorStore;
