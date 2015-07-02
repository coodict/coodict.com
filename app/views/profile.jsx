var React   = require('react');
var BS      = require('react-bootstrap');
var actions = require('../actions/actions');
var Router  = require('react-router');
var Reflux  = require('reflux');


var Jumbotron      = BS.Jumbotron;
var Button         = BS.Button;
var Accordion      = BS.Accordion;
var Grid           = BS.Grid;
var Row            = BS.Row;
var Col            = BS.Col;
var Panel          = BS.Panel;
var DropdownButton = BS.DropdownButton;
var MenuItem       = BS.MenuItem;
var Select         = require('react-select');

var Spinner        = require('../components/spinner.jsx');
var Frag           = require('../components/spellFrag.jsx');
var userStore      = require('../stores/userStore');
var profileStore   = require('../stores/profileStore');
var spellStore     = require('../stores/spellStore');
var localMetaStore = require('../stores/localMetaStore');

var defaultQuery = function () {
  return {
    tag  : '',
    lang : '',
    sorts: 'late',//late, earl, long, view
    page : 1,
    pgsz : 10
  };
}
var Profile = React.createClass({
  mixins:[
    Router.Navigation,
    Reflux.listenTo(userStore, 'logout'),
    Reflux.listenTo(profileStore, 'getSpells'),
    Reflux.listenTo(localMetaStore, 'updateLMT'),
  ],
  getSpells: function (event, data) {
    console.log(data);
    if (event == 'success') {
      this.setState({
        loadMoreLoading: false,
        loading: false,
        spells: this.state.spells.concat(data),
        allLoaded: data.length == 0 ? true : false,
      });
    }else if (event == 'failed') {
      this.setState({
        errMsg: data
      });
    };
  },
  getInitialState: function() {
    return {
      loadMoreLoading: false,
      allLoaded: false,

      loading: true,
      user: userStore.getUser(),
      spells: profileStore.getSpells(),
      query: defaultQuery(),

      LMT: localMetaStore.getLMT(),
    };
  },
  statics:{
    willTransitionTo: function (transition, params) {
      actions.mySpells(defaultQuery());
    },
  },
  logout: function () {
    this.transitionTo("home");
  },
  componentDidMount: function() {
    if (!this.state.user.isLogedin) {
      this.transitionTo("login");
    }
  },
  loadMore: function(){
    this.setState({
      loadMoreLoading: true,
    });
    this.state.query.page += 1;
    actions.mySpells(this.state.query);
  },
  sortBy: function (key) {
    console.log(key);
    this.state.query.sorts = key;
    this.state.query.page = 1;
    this.setState({
      loading: true,
      spells:[],
    });
    actions.mySpells(this.state.query);
  },
  filterTag: function (tag) {
    this.state.query.tag = tag;
    this.state.query.page = 1;
    this.setState({
      loading: true,
      spells: [],
    });
    actions.mySpells(this.state.query);
  },
  filterLang: function (lang) {
    this.state.query.lang = lang;
    this.state.query.page = 1;
    this.setState({
      loading: true,
      spells: [],
    });
    actions.mySpells(this.state.query);
  },
  reset: function () {
    this.state.query = defaultQuery();
    this.setState({
      loading: true,
      spells: [],
    });
    actions.mySpells(this.state.query);
  },
  render: function() {
    var spells = this.state.spells.map(function(spell, index){
      return <Frag spell={spell} key={spell._id} index={index}/>;
    });
    var spellList = (
      <div className='spellList'>
        {spells}
      </div>
    );
    var sorts = [{label: "Latest", value: "late"},
        {label: "Earliest", value: "earl"},
        {label: "Most viewed", value: "view"},
        ];
    var langs = this.state.LMT.langs.map(function (lang) {
      return {label: lang.label, value: lang.mode};
    });
    var loadMoreBtn = (
      <Button ref='loadMore'
        bsStyle='success'
        block
        onClick={this.loadMore}
        disabled={this.state.allLoaded ? true : false}>{this.state.allLoaded ? "Loading complete" : "Load more..."}</Button>
    );
    return (
      <Row>
        <Col md={2}></Col>
        <Col md={8} xs={12}>
          <div className="sortnav">
            <Row>
              <Col md={4}>
                <Select className='sortBy'
                  clearable={false}
                  searchable={false}
                  value={this.state.query.sorts}
                  options={sorts}
                  onChange={this.sortBy}
                  />
              </Col>
              <Col md={3}>
                <Select className='filterLang'
                  clearable={false}
                  placeholder='Language'
                  value={this.state.query.lang == '' ? 'Language' : this.state.query.lang}
                  disabled={this.state.LMT.langs.length ? false : true}
                  options={langs}
                  onChange={this.filterLang}
                  />
              </Col>
              <Col md={3}>
                <Select className='filterTag'
                  clearable={false}
                  placeholder='Label'
                  value={this.state.query.tag == '' ? 'Label' : this.state.query.tag}
                  disabled={this.state.LMT.tags.length ? false : true}
                  options={this.state.LMT.tags}
                  onChange={this.filterTag}
                  />
              </Col>
              <Col md={2}>
                <Button bsStyle='primary' onClick={this.reset}>"Reset filter"</Button>
              </Col>
            </Row>
          </div>
          { this.state.loading ? <Spinner /> : spellList }
          { this.state.loadMoreLoading ? <Spinner /> : loadMoreBtn}
        </Col>
        <Col md={2}></Col>
      </Row>
    );
  }
});
module.exports = Profile;
