var Reflux     = require('reflux');
var actions    = require('../actions/actions');
var jwt_decode = require('jwt-decode');

var defaultLMT = function () {
  return {
    tags: [],
    langs: [],
  };
}
var localMetaStore = Reflux.createStore({
  listenables: actions,

  init: function () {
    this.LMT       = defaultLMT();
    var tags = JSON.parse(localStorage.getItem('LMT-tgs'));
    if(tags){
      this.LMT.tags = tags;
    }
    var langs = JSON.parse(localStorage.getItem('LMT-lgs'));
    if(langs){
      this.LMT.langs = langs;
    }
  },
  getLMT: function () {
    return this.LMT;
  },
  // logout: function () {
  //   console.log("LOGOUT");
  //   localStorage.removeItem('LMT-tgs');
  //   localStorage.removeItem('LMT-lgs');
  //
  //   this.LMT = defaultLMT();
  //   this.trigger(this.LMT);
  // },
  updateUser: function (jwt) {
    var u = jwt_decode('jwt');
    var tgs = u.tags;
    var lgs = u.langs;
    // Update LMT after login success
    localStorage.setItem('LMT-tgs', tgs);
    localStorage.setItem('LMT-lgs', lgs)

    this.LMT.tags = tgs ? tgs : [];
    this.LMT.langs = lgs ? lgs : [];
    this.trigger(this.LMT);
  },
  updateLMT: function (tgs, lgs) {
    var self = this;
    var has = false;
    for (var i = 0; i < this.LMT.langs.length; i++) {
      if(this.LMT.langs[i].mode == lgs.mode){
        has = true;
        break;
      }
    }
    if(!has){
      this.LMT.langs.push(lgs)
    }
    tgs.map(function (tag) {
      if (JSON.stringify(self.LMT.tags).indexOf(JSON.stringify(tag)) == -1) {
        self.LMT.tags = self.LMT.tags.concat(tag);
      };
    });
    localStorage.setItem('LMT-tgs', JSON.stringify(this.LMT.tags));
    localStorage.setItem('LMT-lgs', JSON.stringify(this.LMT.langs))

    this.trigger(this.LMT);
  },

});

module.exports = localMetaStore;
