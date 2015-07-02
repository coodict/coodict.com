var Reflux     = require('reflux');
var React      = require('react');
var Router     = require('react-router');

var actions    = require('../actions/actions');

var userStore       = require('../stores/userStore');
var spellStore      = require('../stores/createSpellStore');
var fetchSpellStore = require('../stores/fetchSpellStore');

var Editor     = require('../components/AceEditor.jsx');
var Spinner    = require('../components/spinner.jsx');
var Select     = require('react-select');
var BS         = require('react-bootstrap');

var Row        = BS.Row;
var Col        = BS.Col;
var Button     = BS.Button;
var Jumbotron  = BS.Jumbotron;
var Panel      = BS.Panel;
var Alert      = BS.Alert;
var Input      = BS.Input;

var Create = React.createClass({
  mixins:[
    Router.Navigation,
    Router.State,
    Reflux.listenTo(spellStore, 'onCreateSpell'),
    Reflux.listenTo(fetchSpellStore, 'onFetchSpell'),
    require('../mixins/lang')
  ],
  getInitialState: function() {
    return {
      user   : userStore.getUser(),
      spell  : spellStore.getDefaultSpell(),

      loading: false,
      errMsg : "",
      actions: "create",
    };
  },
  statics: {
    willTransitionTo: function (transition, params) {
      if (params.id) {
        actions.fetchSpell(params.id);
      }
    },
    willTransitionFrom: function (transition, component) {
      actions.clearLocalSpell();
    },
  },
  componentWillMount: function() {
    if (!this.state.user.isLogedin) {
      this.transitionTo("login");
    };
  },
  onFetchSpell: function(event, data){
    if (event == 'success') {
      this.setState({
        loading: false,
        spell: data,
      });
    //TODO boot-strap Input shouldComponentUpdate
    //TODO Ugly hack: use localStorage.getItem('desc')
    console.log(data);
    }else if(event == 'failed'){

    }
  },
  onCreateSpell: function(event, data){
    if (event == 'success') {
      //Handle create spell successed
      this.transitionTo("spell", {id: data});
    }else if (event == 'failed') {
      //Handle create spell failed
      this.setState({
        loading: false,
        errMsg : data
      });
    };
  },
  createSpell: function (flag) {
    var content  = this.refs.editor.getValue();
    if (content.length == 0) {
      alert("The gist cannot be empty");
    }else if (content.length > 20480) {
      alert("The gist is too long");
    }else{
      this.setState({
        loading: true,
      });
      this.state.spell.name = this.refs.desc.getValue().trim();
      this.state.spell.status = flag == 'private' ? 2 : 1;
      this.state.spell.content = content;
      actions.createSpell(this.state.spell);
    };
  },
  onChangeMode: function (val){
    var lang = {label: val, mode: this.LABEL_MODE_MAP[val]}
    this.state.spell.lang = lang;
    actions.changeMode(lang)
  },
  onAddTag: function (val, values) {
    console.log(values);
    if (values.length <= 5) {
      this.state.spell.tags = values;
    };
  },
  handleAlertDismiss: function(){
    this.setState({
      errMsg : "",
    })
  },
  render: function() {
    var tags = localStorage.getItem("tgs");
    tags = tags ? tags : "";
    var submitBtns = (
      <Row>
        <Col md={6}>
          <Select
            multi={true}
            ignoreCase={false}
            placeholder='Add labels'
            onChange={this.onAddTag}
            value={tags.length > 0 ? tags : null}
            allowCreate={true}
            ref='tags'
            />
        </Col>
        <Col md={3} xs={6}>
          <Button ref="priBtn" block
                onClick={this.createSpell.bind(this, 'private')}
                bsStyle="primary">Private</Button>
        </Col>
        <Col md={3} xs={6}>
          <Button ref="pubBtn" block
                onClick={this.createSpell.bind(this, 'public')}
                bsStyle="success">Public</Button>
        </Col>
      </Row>
    );
    if (this.state.errMsg != "") {
      submitBtns = (
        <Alert bsStyle='danger' block onDismiss={this.handleAlertDismiss}>
          {this.state.errMsg}
        </Alert>
      );
    }
    return (
      <Panel md={12}>
        <Row>
          <Col md={9} xs={8}>
            <Input className='defaulted' type="text" ref="desc" defaultValue={localStorage.getItem('desc')} placeholder="描述" />
          </Col>
          <Col md={3} xs={4}>
            <Select
              name="Text"
              value={this.state.spell.lang.label}
              options={this.LANG_OPTIONS}
              onChange={this.onChangeMode}
              />
          </Col>
        </Row>
        <Editor
          ref="editor"
          name="CobEditor"
          mode={this.state.spell.lang.mode}
          value={this.state.spell.content}
          theme="github"
          height="400px"
        />
        {this.state.loading ? <Spinner /> : submitBtns}
      </Panel>
    );
  }
});

module.exports = Create;
