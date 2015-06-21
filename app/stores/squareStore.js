var Reflux        = require('reflux');
var actions       = require('../actions/actions');

var squareStore = Reflux.createStore({
  listenables: actions,

  onLoadSquareSuccess: function (hots, news) {
    console.log(hots);
    this.trigger(hots, news);
  },
});

module.exports = squareStore;
