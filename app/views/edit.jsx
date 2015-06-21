var Reflux         = require('reflux');
var React          = require('react');
var Router         = require('react-router');
var BS             = require('react-bootstrap');
var userStore      = require('../stores/userStore');
var spellStore     = require('../stores/spellStore');
var editorStore    = require('../stores/editorStore');
var editSpellStore = require('../stores/editSpellStore');
var actions        = require('../actions/actions');

var Editor    = require('../components/AceEditor.js');
var Row       = BS.Row;
var Col       = BS.Col;
var Button    = BS.Button;
var Input     = BS.Input;
var Jumbotron = BS.Jumbotron;
var Panel     = BS.Panel;
var Alert     = BS.Alert;
var Select    = require('react-select');

var Spinner = require('../components/spinner');

var CreateCobb = React.createClass({
  mixins: [
    require('../mixins/lang'),
    Router.Navigation,
    Router.State,
    Reflux.listenTo(editorStore, 'changeMode'),
    Reflux.listenTo(spellStore, 'onCreateSucc'),
    Reflux.listenTo(editSpellStore, 'onCreateErr'),
  ],
  onCreateSucc: function (spellID) {
    localStorage.setItem("spell", "");
    localStorage.setItem("spell-mode", "");
    localStorage.setItem("spell-name", "");
    this.transitionTo("spell", {id: spellID});
  },
  onCreateErr: function (msg) {
    this.setState({
      loading: false,
      errMsg: msg,
    })
  },
  getInitialState: function() {
    return {
      user: userStore.getUser(),
      mode: 'golang',//TODO user can set default language.
      label: 'Go',
      tags: [],

      loading: false,
      errMsg: '',

      spellID: '',
      spell: '',
      name: '',
    };
  },
  componentWillMount: function() {
    if (!this.state.user.isLogedin) {
      this.transitionTo("login");
    } else {
      if (this.props.params.id != 'new') {
        var content = localStorage.getItem('spell');
        if (!content) {
          this.transitionTo("edit", {id: 'new'});
        }
        this.setState({
          spellID: this.props.params.id,
          spell: content,
          mode: localStorage.getItem('spell-mode'),
          name: localStorage.getItem('spell-name'),
          tags: localStorage.getItem('spell-tags') == null ? [] : JSON.parse(localStorage.getItem('spell-tags')),
          label: this.MODE_LABEL_MAP[localStorage.getItem('spell-mode')],
        });
      }
    }
  },
  changeMode: function (lang) {
    this.setState({
      mode: lang.mode,
      label: lang.label
    });
  },
  createSpell: function (flag) {
    var spell = this.refs.editor.getValue();
    if(spell.length == 0){
      alert("NO Content!");
    }else{
      React.findDOMNode(this.refs.pubBtn).disabled = true;
      React.findDOMNode(this.refs.priBtn).disabled = true;
      this.setState({
        loading: true,
      })
      actions.createSpell({
        name: this.refs.desc.getValue().trim(),
        mode: this.state.mode,
        label: this.state.label,
        spell: spell,
        status: flag == 'private' ? 0 : 1,
        spellID: this.state.spellID,
        tags: this.state.tags,
      });
    }
  },
  onChangeMode: function (val) {
    var mode = this.LABEL_MODE_MAP[val];
    actions.changeMode({mode: mode, label: val});
  },
  handleAlertDismiss: function () {
    this.setState({
      errMsg: "",
    })
  },
  addTags: function(val, vals){
    this.setState({
      tags: vals
    });
  },
  onAddNewTag: function(val){
  },
  render: function() {
    var alert = (
      <Alert bsStyle='danger' onDismiss={this.handleAlertDismiss}>
        {this.state.errMsg}
      </Alert>
    );
    console.log(this.state.tags);
          // {this.state.errMsg != "" ? alert : ""}
    var submitBtns = (
      <Row>
        <Col md={6}>
          <Select
            multi={true}
            ignoreCase={false}
            options={this.state.user.info.tags}
            placeholder='添加标签'
            onChange={this.addTags}
            allowCreate={true}
            value={this.state.tags}
            ref='tags'
            />
        </Col>
        <Col md={3} xs={6}>
          <Button ref="priBtn" block onClick={this.createSpell.bind(this, 'public')} bsStyle="primary">私有</Button>
        </Col>
        <Col md={3} xs={6}>
          <Button ref="pubBtn" block onClick={this.createSpell.bind(this, 'private')} bsStyle="success">公开</Button>
        </Col>
      </Row>
    );
    return (
      <Panel md={12}>
        <Row>
          <Col md={9} xs={8}>
            <Input type="text" ref="desc" defaultValue={this.state.name} placeholder="描述" />
          </Col>
          <Col md={3} xs={4}>
            <Select
              name="Text"
              value={this.state.label}
              options={this.LANG_OPTIONS}
              onChange={this.onChangeMode}
              />
          </Col>
        </Row>
        <Editor
          ref="editor"
          name="CobEditor"
          mode={this.state.mode}
          theme="github"
          height="400px"
        />
      {this.state.loading ? <Spinner /> : submitBtns}
      </Panel>
    );
  }
});

module.exports = CreateCobb;
