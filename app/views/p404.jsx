var React = require('react');
var BS    = require('react-bootstrap');

var Jumbotron = BS.Jumbotron;
var Button    = BS.Button;

var Notfound = React.createClass({
  render: function() {
    return (
      <Jumbotron md={6} xs={12}>
      <h1>Oops!</h1>
      <p>
        Where am I ?...
      </p>
      <Button bsStyle='primary' href="#/profile">Back Home</Button>
      </Jumbotron>
    );
  }
});

module.exports = Notfound;
