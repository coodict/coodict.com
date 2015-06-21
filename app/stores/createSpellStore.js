var Reflux        = require('reflux');
var actions       = require('../actions/actions');

var defaultSpell = function(){
  return {
    _id: "",
    name: "",
    content: "",
    tags: [],
    lang: {mode: "javascript", label: "JavaScript"},
    status: 0,//{0: private, 1: public}
    timestamp: Date.now(),
    votes: 0,
    shares: 0,
    views: 0,
  }
};
var spellStore = Reflux.createStore({
  listenables: actions,
  init: function () {
    this.spell = defaultSpell();
  },
  getDefaultSpell: function () {
    return this.spell;
  },
  clearLocalSpell: function () {
    this.spell = defaultSpell();
  },
  editSpell: function (spellState) {
    this.trigger(spellState);
  },
  onCreateSpellSuccess: function(spellID){
    this.trigger("success", spellID);
  },
  onCreateSpellFailed: function(data){
    this.trigger("failed", data);
  }
});

module.exports = spellStore;
