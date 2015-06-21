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

var fetchSpellStore = Reflux.createStore({
  listenables: actions,
  init: function () {
    this.spell = defaultSpell();
  },
  getDefaultSpell: function () {
    return this.spell;
  },
  getLocalSpell: function (){
    var spellStr = localStorage.getItem("spl");
    if (spellStr ) {
      this.spell = JSON.parse(spellStr);
    } else {
      this.spell = defaultSpell();
    };
    return this.spell;
  },
  clearLocalSpell: function () {
    this.spell = defaultSpell();
    localStorage.removeItem("spl");
    localStorage.removeItem("tgs");
    localStorage.removeItem("desc");
  },
  onFetchSpellSuccess: function (spell) {
    this.spell = spell;
    this.trigger("success", this.spell);
  },
  onFetchSpellFailed: function (msg) {
    this.trigger("failed", msg);
  },
});

module.exports = fetchSpellStore;
