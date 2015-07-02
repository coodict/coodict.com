var Reflux      = require('reflux');
var req         = require('../mixins/reqs.js');

var actions = Reflux.createActions({
  //account
  'login': {},
  'loginError': {},
  'updateUser': {},
  'logout': {},
  'register': {},

  //editor
  'changeMode': {},

  //create-spell
  'createSpell': {children: ['success', 'failed']},

  //edit-spell
  'updateSpell': {children: ['success', 'failed']},

  //#/spell/:id
  'fetchSpell': {children: ['success', 'failed']},
  'clearLocalSpell': {},

  'delSpell': {children: ['success', 'failed']},

  //profile
  'mySpells': {children: ['success', 'failed']},

  //LMT
  'loginSetLMT': {},
  'updateLMT': {},

  //Square
  'loadSquare': {children: ['success']},
});

actions.loadSquare.listen(function () {
  var self = this;
  req({
    url: "/square",
    success: function (resp) {
      self.success(resp.hots, resp.news);
    }
  })
});
actions.login.listen(function (data) {
  req({
    url: "/user/signin",
    data: data,
    success: function (resp) {
      if (resp.code == 200) {
        actions.updateUser(resp.jwt);
        actions.loginSetLMT(resp.jwt);
      } else {
        actions.loginError(resp.msg);
      }
    }
  });
});
actions.register.listen(function (data) {
  if (data.name.length < 3) {
    actions.loginError("The username is too short");
    return;
  }
  req({
    url: "/user/signup",
    data: data,
    success: function (resp) {
      if (resp.code == 200) {
        actions.updateUser(resp.jwt);
        actions.loginSetLMT([], []);
      }else{
        actions.loginError(resp.msg);
      }
    },
  })
});
actions.createSpell.listen(function(data){
  var self = this;
  req({
    url: '/spell/create',
    data: data,
    headers: {
      'Authorization': 'Bearer '+localStorage.getItem('jwt')
    },
    success: function (resp) {
      if(resp.code == 200){
        actions.updateLMT(data.tags, data.lang);
        self.success(resp.spell);
      }else{
        self.failed(resp.msg);
      }
    }
  });
});
actions.fetchSpell.listen(function(data){
  var self = this;
  var spellStr = localStorage.getItem("spl");
  if (spellStr) {
    //TODO wacky bug: lang:{Label: "", Mode: ""}传递失败
    // self.success('local');
    self.success(JSON.parse(spellStr));
  }else{
    req({
      url: '/fetchSpell',
      data: {id: data},
      headers: {
        'Authorization': 'Bearer '+localStorage.getItem('jwt')
      },
      success: function (resp) {
        if (resp.code == 200) {
          self.success(resp.spell);
        }else{
          self.failed(resp.msg);
        }
      },
    });
  };
});
actions.delSpell.listen(function (data) {
  var self = this;
  req({
    url: '/spell/delete',
    data: {id: data},
    headers: {
      'Authorization': 'Bearer '+localStorage.getItem('jwt')
    },
    success: function (resp) {
      if (resp.code == 200) {
        self.success();
      }else {
        self.failed(resp.msg);
      }
    },
  })
});
actions.mySpells.listen(function(data){
  var self = this;
  req({
    url: '/profile/spells',
    data: data,
    headers: {
      'Authorization': 'Bearer '+localStorage.getItem('jwt')
    },
    success: function(resp){
      if (resp.code == 200) {
        self.success(resp.spells);
      }else if (resp.code == 403) {
        actions.logout();
      }else{
        self.failed(resp.msg);
      }
    }
  })
})
module.exports = actions;
