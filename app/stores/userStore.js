var Reflux        = require('reflux');
var actions       = require('../actions/actions');
var jwt_decode    = require('jwt-decode');

var defaultUser = (function(){
  return {
    isLogedin: false,
    info: {
      name: '',
    }
  };
});
var userStore = Reflux.createStore({
  listenables: actions,
  init: function () {
    this.user = defaultUser();
    var token = localStorage.getItem('jwt');
    if(token){
      this.user.info = jwt_decode(token);
      this.user.isLogedin = true;
    }
  },
  getUser: function () {
    return this.user;
  },

  // loginSucc, registerSucc -> update user info;
  updateUser: function (jwt) {
    localStorage.setItem('jwt', jwt);
    this.user.info = jwt_decode(jwt);
    this.user.isLogedin = true;
    this.trigger(this.user);
  },
  // destroy user info <- logout
  logout: function () {
    // localStorage.removeItem('jwt');
    localStorage.clear();
    this.user = defaultUser();
    this.trigger(this.user);
  },
});


module.exports = userStore;
