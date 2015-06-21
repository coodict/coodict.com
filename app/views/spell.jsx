var React           = require('react');
var BS              = require('react-bootstrap');
var actions         = require('../actions/actions');
var Router          = require('react-router');
var Reflux          = require('reflux');
var fetchSpellStore = require('../stores/fetchSpellStore');
var spellStore      = require('../stores/spellStore');
var userStore       = require('../stores/userStore');
var Highlight       = require('react-highlight');

var Grid         = BS.Grid;
var Row          = BS.Row;
var Col          = BS.Col;
var Button       = BS.Button;
var ButtonGroup  = BS.ButtonGroup;
var Label        = BS.Label;
var Panel        = BS.Panel;
var Spinner      = require('../components/spinner.jsx');
var Modal        = BS.Modal;
var ModalTrigger = BS.ModalTrigger;
var Input        = BS.Input;


var Spell = React.createClass({
  mixins:[
    Router.Navigation,
    Router.State,
    Reflux.listenTo(fetchSpellStore, 'updateSpell'),
    Reflux.listenTo(spellStore, 'deleteSpell'),
  ],
  deleteSpell: function (event, msg) {
    if (event == 'success') {
      this.transitionTo("profile");
    }
  },
  updateSpell: function(event, spell){
    if(event == 'success'){
      this.setState({
        loading: false,
        spell: spell,
      });
    }else if(event == 'failed'){
      this.transitionTo("/404");
    };
  },
  getInitialState: function() {
    return {
      user: userStore.getUser(),
      spell: fetchSpellStore.getDefaultSpell(),
      loading: true,
      errMsg: "",
    };
  },
  statics:{
    willTransitionTo: function (transition, params) {
      actions.fetchSpell(params.id);
    },
  },
  editSpell: function(){
    localStorage.setItem('spl', JSON.stringify(this.state.spell));
    localStorage.setItem('desc', this.state.spell.name);
    localStorage.setItem('tgs', this.state.spell.tags.map(function (item) {
      return item.label;
    }).join(","));
    this.transitionTo("edit", {id: this.state.spell._id});
  },
  delSpell: function(){
    var c = confirm("确认删除？")
    if (c) {
      actions.delSpell(this.state.spell._id);
    };
  },
  render: function() {
    var dt = new Date(this.state.spell.timestamp*1000);
    var copyBoard = (
      <Modal
        enforceFocus={true}>
        <div className='modal-body'>
          <Input ref='copyarea' type='textarea' className='copyarea' value={this.state.spell.content}/>
        </div>
      </Modal>
    );
    var editBtnGroup = (
      <ButtonGroup bsSize='small' className='editBtnGrp'>
        <Button bsStyle='info' onClick={this.editSpell}><i className='fa fa-edit'></i></Button>
        <ModalTrigger modal={ copyBoard }>
        <Button bsStyle='primary'><i className='fa fa-copy'></i></Button>
        </ModalTrigger>
        <Button disabled bsStyle='success'><i className='fa fa-share-alt'></i></Button>
        <Button bsStyle='danger' onClick={this.delSpell}><i className='fa fa-remove'></i></Button>
      </ButtonGroup>
    );
    var body = (
      <Grid className="Spell">
      <Row>
        <Col md={2}></Col>
        <Col md={8} xs={12}>
          <Panel>
            <h5>{this.state.spell.name == "" ? '无题.'+this.state.spell.lang.label : this.state.spell.name}</h5>
              <div className='spellMeta'>
                <Label bsStyle='info'>
                  <i className='fa fa-birthday-cake'></i>&nbsp;{ dt.toLocaleDateString() }
                </Label>&nbsp;
                <Label bsStyle={this.state.spell.status == 2 ? 'danger' : 'success'}>
                  <i className='fa fa-copyright'></i>&nbsp;{this.state.spell.status == 2 ? '私人' : '公开'}
                </Label>&nbsp;
                <Label bsStyle='primary'>
                  <i className='fa fa-code'></i>&nbsp;{this.state.spell.lang.label}
                </Label>&nbsp;
                <Label bsStyle='default'>
                  <i className='fa fa-eye'></i>&nbsp;{this.state.spell.views}
                </Label>&nbsp;
                <Label bsStyle='default'>
                  <i className='fa fa-thumbs-o-up'></i>&nbsp;{this.state.spell.votes}
                </Label>&nbsp;
                <Label bsStyle='default'>
                  <i className='fa fa-share-alt'></i>&nbsp;{this.state.spell.shares}
                </Label>&nbsp;
              </div>
              {this.state.spell.owner == this.state.user.info.name ? editBtnGroup : ""}
          </Panel>
        </Col>
        <Col md={2}></Col>
      </Row>
      <Row>
        <Col md={2}></Col>
        <Col md={8}>
          <div className="pre-container">
            <Highlight className={this.state.spell.lang.mode} ref="fragment">
              {this.state.spell.content}
            </Highlight>
          </div>
        </Col>
        <Col md={2}></Col>
      </Row>

    </Grid>
    );
    return (
      <div>
        { this.state.loading ? <Spinner /> : body }
      </div>
    );
  }
});

module.exports = Spell;
