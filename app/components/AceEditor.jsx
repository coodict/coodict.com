var ace         = require('brace');
var React       = require('react');
var Reflux      = require('reflux');
var editorStore = require('../stores/editorStore');
var spellStore  = require('../stores/spellStore');


// Setup module url
var ACE_HOST = 'http://webapi.coodict.com/brace/mode/';
for (var k in require('../mixins/lang').MODE_LABEL_MAP) {
  ace.config.setModuleUrl('ace/mode/'+k, ACE_HOST+k+'.js');
}

var AceEditor = React.createClass({
  mixins:[
    Reflux.listenTo(editorStore, 'changeMode'),
  ],
  getValue: function(){
    return this.editor.getValue();
  },
  changeMode: function(lang){
    this.setState({
      mode: lang.mode,
    });
    // this.editor.setValue(this.props.value, 1);
    this.editor.getSession().setMode({
      path: 'ace/mode/' + lang.mode,
      v: Date.now()
    })
  },
  propTypes: {
    name:     React.PropTypes.string,
    mode:     React.PropTypes.string,
    theme:    React.PropTypes.string,
    width:    React.PropTypes.string,
    height:   React.PropTypes.string,
    readOnly: React.PropTypes.bool,
    value:    React.PropTypes.string,
    maxLines: React.PropTypes.number,
  },
  getDefaultProps: function() {
    return {
      name: "AceEditor",
      mode: "python",
      theme: "github",

      readOnly: false,
      value: '',
      maxLines: null,

      height: "500px",
      width: "100%"
    };
  },
  getInitialState: function() {
    return {
      mode: this.props.mode,
    };
  },
  componentDidMount: function() {
    var self = this;
    this.editor = ace.edit(this.props.name);

    this.editor.setTheme('ace/theme/'+this.props.theme);
    this.editor.getSession().setUseWorker(!1);
    this.editor.getSession().setMode({
      path: 'ace/mode/' + this.state.mode,
      v: Date.now()
    });
    this.editor.setShowPrintMargin(!1);
    this.editor.setOptions({
      maxLines: this.props.maxLines,
      readOnly: this.props.readOnly
    });
    this.editor.setFontSize(14);
    this.editor.setValue(this.props.value, 1);
  },
  componentWillReceiveProps: function(nextProps) {
    this.editor.setValue(nextProps.value, 1);
  },
  render: function () {
    var editorSty = {
      width: this.props.width,
      height: this.props.height,
      border: "1px solid #4582ec",
      margin: "6px auto",
      borderRadius: '4px'
    }
    return (
      <div className="AceEditor" id={this.props.name} style={editorSty}></div>
    );
  }
})

module.exports = AceEditor;
