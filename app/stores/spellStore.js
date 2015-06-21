var Reflux        = require('reflux');
var actions       = require('../actions/actions');

var defaultSpell = function(){
  return {
    _id: "",
    name: "",
    content: "",
    tags: [],
    lang: {mode: "js", label: "JavaScript"},
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
  getDefaultSpell: function (spellID) {
    this.spell._id = spellID;
    return this.spell;
  },
  editSpell: function (spellState) {
    this.trigger(spellState);
  },

  onCreateSpellSuccess: function(spellID){
    this.trigger("success", spellID);
  },
  onCreateSpellFailed: function(data){
    this.trigger("failed", data);
  },

  onDelSpellSuccess: function(){
    this.trigger("success", "DELETED");
  },
  onDelSpellFailed: function(msg){

  },

});

module.exports = spellStore;
