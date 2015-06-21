var React      = require('react');
var BS         = require('react-bootstrap');
var actions    = require('../actions/actions');
var Router     = require('react-router');
var Reflux     = require('reflux');
var spellStore = require('../stores/spellStore');
var Highlight  = require('react-highlight');
var Row        = BS.Row;
var Col        = BS.Col;

var Frag = React.createClass({
  mixins:[
    Router.Navigation,
    require('../mixins/cutlines'),
  ],
  goToSpell: function () {
    this.transitionTo("spell", {id: this.props.spell._id});
  },
  render: function() {

    var colors = ['primary', 'success', 'info', 'warning', 'danger'];
    var spell = this.props.spell;
    var mode = spell.lang.mode;
    var content = this.cutline(spell.content, 10);

    var header = this.props.spell.name == "" ? ":)" : this.props.spell.name;
    header += " " + new Date(this.props.spell.timestamp*1000).toLocaleDateString();
    // <Panel
    //     bsStyle='primary'
    //     className='spellFrag'
    //     onClick={this.goToSpell}
    //     header={ header }>
    return (
      <div className='spellWrapper' onClick={this.goToSpell}>
        <Highlight className={mode} >
          {content}
        </Highlight>
      </div>
    );
  }
});

module.exports = Frag;
