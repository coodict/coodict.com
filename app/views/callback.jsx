var React     = require('react');
var actions   = require('../actions/actions');
var Spinner   = require('../components/spinner.jsx');
var userStore = require('../stores/userStore');
var Router    = require('react-router');
var Reflux    = require('reflux');


var Callback = React.createClass({
  mixins: [
    Router.Navigation,
    Router.State,
    Reflux.listenTo(userStore, 'updateUser'),
  ],
  statics:{
    willTransitionTo: function (transition, params) {
      actions.updateUser(params.jwt);
    },
  },
  updateUser: function (user) {
    if (user.isLogedin) {
      this.transitionTo("profile");
    };
  },
  render: function() {
    return (
      <Spinner />
    );
  }
});

module.exports = Callback;
