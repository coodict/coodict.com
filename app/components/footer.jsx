var React   = require('react');
var BS      = require('react-bootstrap');
var Col = BS.Col;

var Footer  = React.createClass({
  render: function() {
    return (
      <footer>
        <div className='footerContainer'>
          <Col md={4}>
          </Col>
          <Col md={4}>
            <ul className='footerUl'>
              <li>© 2015 Coodict.com</li>
              <li><a href="https://github.com/coodict/coodict.com/wiki/About">About</a></li>
              <li><a href="https://github.com/coodict/coodict.com/wiki/Donation">Donation</a></li>
              <li><a href="https://github.com/coodict/coodict.com">Github</a></li>
            </ul>
          </Col>
          <Col md={4}>
          </Col>
        </div>
      </footer>
    );
  }
});

module.exports = Footer;
