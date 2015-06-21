var Reflux        = require('reflux');
var actions       = require('../actions/actions');

var profileStore = Reflux.createStore({
  listenables: actions,
  init: function () {
    this.spells = [];
  },
  getSpells: function () {
    return this.spells;
  },

  onMySpellsSuccess: function(spells){
    this.spells = spells;
    this.trigger('success', spells);
  },
  onMySpellsFailed: function(msg){
    this.trigger('failed', msg)
  },
});

module.exports = profileStore;
