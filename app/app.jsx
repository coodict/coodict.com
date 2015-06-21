var React         = require('react');
var Router        = require('react-router');
var Route         = Router.Route;
var Link          = Router.Link;
var BS            = require('react-bootstrap');
var Reflux        = require('reflux');

var RouteHandler  = Router.RouteHandler;
var DefaultRoute  = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

var Square        = require('./views/square.jsx');
var Profile       = require('./views/profile.jsx');

var Callback      = require('./views/callback.jsx');
var Login         = require('./views/login.jsx');

var Create        = require('./views/createSpell.jsx');
var Edit          = require('./views/createSpell.jsx');
var Spell         = require('./views/spell.jsx');
var Notfound      = require('./views/p404.jsx');
var Footer        = require('./components/footer.jsx');

var userStore     = require('./stores/userStore');
var actions       = require('./actions/actions');

var Nav           = BS.Nav;
var NavItem       = BS.NavItem;
var Navbar        = BS.Navbar;
var Grid          = BS.Grid;
var Row           = BS.Row;
var Col           = BS.Col;

require('brace/theme/github');

var CobbleApp = React.createClass({
  mixins: [
    Router.Navigation,
    Reflux.listenTo(userStore, 'updateUser')
  ],
  getInitialState: function() {
    return {
      user: userStore.getUser(),
    };
  },
  updateUser: function (user) {
    this.setState({
      user: user,
    });
  },
  render: function () {
    var githubClientUrl = 'https://github.com/login/oauth/authorize?scope=user:email&client_id=a965d4ca2cd64c6d0859';
    var userArea;
    if (this.state.user.isLogedin) {
      userArea = (
        <Nav right eventKey={0} > {/* This is the eventKey referenced */}
          <NavItem eventKey={1} className="navitem" href='#/create'><i className="fa fa-plus-circle"></i></NavItem>
          <NavItem eventKey={1} className="navitem" href='#/profile'>{this.state.user.info.name}</NavItem>
          <NavItem eventKey={1} className="navitem" onClick={actions.logout}><i className="fa fa-sign-out"></i></NavItem>
        </Nav>
      );
    }else{
      userArea = (
        <Nav right eventKey={0}> {/* This is the eventKey referenced */}
          <NavItem eventKey={1} className="navitem" href={githubClientUrl}><i className='fa fa-github-square'></i> 登陆</NavItem>
        </Nav>
      );
    }
    var topBar = (
      <Navbar brand={<Link to="home">Coodict</Link>} toggleNavKey={0}>
        { userArea }
      </Navbar>
    );
    return (
      <div className="App">
        { topBar }
        <Grid className="Continaer">
          <Row>
            <Col md={12} xs={12}>
              <RouteHandler />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Footer />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
});

var routes = (
  <Route handler={ CobbleApp } name="CobbleApp" path="/">
    <DefaultRoute name="home" handler={ Square } />
    <Route name="login" path="login" handler={ Login } />
    <route name="callback" path="callback/:jwt" handler={ Callback } />
    <Route name="profile" path="profile" handler={ Profile } />

    <Route name="create" path="create" handler={ Create } />
    <Route name="spell" path="spell/:id" handler={ Spell } />
    <Route name="edit" path="edit/:id" handler={ Edit } />

    <NotFoundRoute name="p404" handler={ Notfound } />
  </Route>
);
Router.run(routes, function(Handler) {
  React.render(<Handler />,
  document.getElementById('Coodict'));
});
