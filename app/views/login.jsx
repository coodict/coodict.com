var React      = require('react');
var BS         = require('react-bootstrap');
var actions    = require('../actions/actions');
var Router     = require('react-router');
var Reflux     = require('reflux');
var userStore  = require('../stores/userStore');
var loginStore = require('../stores/loginStore');
var Input      = BS.Input;
var Button     = BS.Button;
var Grid       = BS.Grid;
var Row        = BS.Row;
var Col        = BS.Col;
var Panel      = BS.Panel;
var Alert      = BS.Alert;

var Spinner = require('../components/spinner.jsx');

var Login = React.createClass({
  mixins: [
    Router.Navigation,
    // Reflux.listenTo(userStore, 'loginSucc'),
    Reflux.listenTo(loginStore, 'loginErr'),
  ],
  // loginSucc: function(user){
    // this.transitionTo("home");
  // },
  loginErr: function(msg){
    this.setState({
      loading: false,
      err: true,
      msg: msg
    });
  },
  login: function (e) {
    e.preventDefault();
    this.setState({
      loading: true,
      err: false
    });
    actions.login({
      name: this.refs.name.getValue().trim(),
      pass: this.refs.pass.getValue().trim()
    });
  },
  getInitialState: function() {
    return {
      user: userStore.getUser(),
      loading: !1,
      err: false,
    };
  },
  componentWillMount: function() {
    console.log(this.state.user);
    if (this.state.user.isLogedin) {
      this.transitionTo("home")
    }
  },
  render: function() {
    var alert = (
      <Alert bsStyle='danger'>
        {this.state.msg}
      </Alert>
    );
    var form = (
      <form onSubmit={this.login}>
       <Input type='text' ref='name' required placeholder='Username/ID' />
       <Input type='password' ref='pass' required placeholder='Password' />
       {this.state.err ? alert : ""}
       <Button type='submit' bsStyle='primary' block ref='submit'>登录</Button>
     </form>
    );
    form = (
      <a href="https://github.com/login/oauth/authorize?scope=user:email&client_id=1fa79ddefcd10a6ccd5f">Login with Github</a>
    )
    return (
      <Row className="LoginContainer">
        <Col md={4}></Col>
        <Col md={4} xs={12}>
          <Panel header='Login' bsStyle='primary' className="Login" >
            { this.state.loading ? <Spinner /> : form }
          </Panel>
        </Col>
        <Col md={4}></Col>
      </Row>
    );
  }
});

module.exports = Login;
