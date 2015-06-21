var Reflux      = require('reflux');
var React       = require('react');
var Router      = require('react-router');
var BS          = require('react-bootstrap');
var Row         = BS.Row;
var Col         = BS.Col;
var actions     = require('../actions/actions');
var squareStore = require('../stores/squareStore');
var Spinner     = require('../components/spinner.jsx');
var Frag        = require('../components/spellFrag.jsx');
var Panel       = BS.Panel;


var Square = React.createClass({
  mixins:[
    Reflux.listenTo(squareStore, 'update'),
  ],
  update: function (hots, news) {
    this.setState({
      loading: false,
      hots: hots,
      news: news
    })
  },
  getInitialState: function() {
    return {
      hots: [],
      news: [],
      loading: true,
    };
  },
  componentDidMount: function() {
    actions.loadSquare();
  },
  render: function() {
    var hotSpells = this.state.hots.map(function(spell, index){
      return <Frag spell={spell} key={spell._id} index={index}/>;
    });
    var newSpells = this.state.news.map(function(spell, index){
      return <Frag spell={spell} key={spell._id} index={index}/>;
    });
    var content;
    if (this.state.loading) {
      content = <Spinner />;
    }else{
      content = (
      <Row>
        <Col className='topHot' md={6} xs={12}>
          {hotSpells}
        </Col>
        <Col className='newest' md={6} xs={12}>
          {newSpells}
        </Col>
      </Row>
      );
    }
    return (
      <div className='square'>
        <Row>
          <Col md={6} xs={12}>
            <Panel>热门</Panel>
          </Col>
          <Col md={6} xs={12}>
            <Panel>最新</Panel>
          </Col>
        </Row>
        { content }
      </div>
    );
  }
});

module.exports = Square;
