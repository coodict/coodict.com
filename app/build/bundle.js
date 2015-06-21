webpackJsonp([1],{0:function(e,t,n){"use strict";var r=n(1),i=n(22),o=i.Route,s=i.Link,a=n(17),l=n(10),c=i.RouteHandler,u=i.DefaultRoute,d=i.NotFoundRoute,p=n(169),h=n(167),f=n(164),m=n(165),g=n(101),v=n(101),b=n(168),y=n(166),E=n(155),_=n(34),C=n(11),w=a.Nav,A=a.NavItem,S=a.Navbar,x=a.Grid,D=a.Row,T=a.Col;n(171);var N=r.createClass({displayName:"CobbleApp",mixins:[i.Navigation,l.listenTo(_,"updateUser")],getInitialState:function(){return{user:_.getUser()}},updateUser:function(e){this.setState({user:e})},render:function(){var e,t="https://github.com/login/oauth/authorize?scope=user:email&client_id=a965d4ca2cd64c6d0859";e=this.state.user.isLogedin?r.createElement(w,{right:!0,eventKey:0}," ",r.createElement(A,{eventKey:1,className:"navitem",href:"#/create"},r.createElement("i",{className:"fa fa-plus-circle"})),r.createElement(A,{eventKey:1,className:"navitem",href:"#/profile"},this.state.user.info.name),r.createElement(A,{eventKey:1,className:"navitem",onClick:C.logout},r.createElement("i",{className:"fa fa-sign-out"}))):r.createElement(w,{right:!0,eventKey:0}," ",r.createElement(A,{eventKey:1,className:"navitem",href:t},r.createElement("i",{className:"fa fa-github-square"})," 登陆"));var n=r.createElement(S,{brand:r.createElement(s,{to:"home"},"Coodict"),toggleNavKey:0},e);return r.createElement("div",{className:"App"},n,r.createElement(x,{className:"Continaer"},r.createElement(D,null,r.createElement(T,{md:12,xs:12},r.createElement(c,null))),r.createElement(D,null,r.createElement(T,{md:12},r.createElement(E,null)))))}}),M=r.createElement(o,{handler:N,name:"CobbleApp",path:"/"},r.createElement(u,{name:"home",handler:p}),r.createElement(o,{name:"login",path:"login",handler:m}),r.createElement("route",{name:"callback",path:"callback/:jwt",handler:f}),r.createElement(o,{name:"profile",path:"profile",handler:h}),r.createElement(o,{name:"create",path:"create",handler:g}),r.createElement(o,{name:"spell",path:"spell/:id",handler:b}),r.createElement(o,{name:"edit",path:"edit/:id",handler:v}),r.createElement(d,{name:"p404",handler:y}));i.run(M,function(e){r.render(r.createElement(e,null),document.getElementById("Coodict"))})},11:function(e,t,n){"use strict";var r=n(10),i=n(157),o=r.createActions({login:{},loginError:{},updateUser:{},logout:{},register:{},changeMode:{},createSpell:{children:["success","failed"]},updateSpell:{children:["success","failed"]},fetchSpell:{children:["success","failed"]},clearLocalSpell:{},delSpell:{children:["success","failed"]},mySpells:{children:["success","failed"]},loginSetLMT:{},updateLMT:{},loadSquare:{children:["success"]}});o.loadSquare.listen(function(){var e=this;i({url:"/square",success:function(t){e.success(t.hots,t.news)}})}),o.login.listen(function(e){i({url:"/user/signin",data:e,success:function(e){200==e.code?(o.updateUser(e.jwt),o.loginSetLMT(e.jwt)):o.loginError(e.msg)}})}),o.register.listen(function(e){return e.name.length<3?void o.loginError("用户名太短：>= 3"):void i({url:"/user/signup",data:e,success:function(e){200==e.code?(o.updateUser(e.jwt),o.loginSetLMT([],[])):o.loginError(e.msg)}})}),o.createSpell.listen(function(e){var t=this;i({url:"/spell/create",data:e,headers:{Authorization:"Bearer "+localStorage.getItem("jwt")},success:function(n){200==n.code?(o.updateLMT(e.tags,e.lang),t.success(n.spell)):t.failed(n.msg)}})}),o.fetchSpell.listen(function(e){var t=this,n=localStorage.getItem("spl");n?t.success(JSON.parse(n)):i({url:"/fetchSpell",data:{id:e},headers:{Authorization:"Bearer "+localStorage.getItem("jwt")},success:function(e){200==e.code?t.success(e.spell):t.failed(e.msg)}})}),o.delSpell.listen(function(e){var t=this;i({url:"/spell/delete",data:{id:e},headers:{Authorization:"Bearer "+localStorage.getItem("jwt")},success:function(e){200==e.code?t.success():t.failed(e.msg)}})}),o.mySpells.listen(function(e){var t=this;i({url:"/profile/spells",data:e,headers:{Authorization:"Bearer "+localStorage.getItem("jwt")},success:function(e){200==e.code?t.success(e.spells):403==e.code?o.logout():t.failed(e.msg)}})}),e.exports=o},33:function(e,t,n){"use strict";var r=n(1),i=r.createClass({displayName:"Spinner",render:function(){return r.createElement("div",{className:"spinner"},r.createElement("div",{className:"double-bounce1"}),r.createElement("div",{className:"double-bounce2"}))}});e.exports=i},34:function(e,t,n){"use strict";var r=n(10),i=n(11),o=n(64),s=function(){return{isLogedin:!1,info:{name:""}}},a=r.createStore({listenables:i,init:function(){this.user=s();var e=localStorage.getItem("jwt");e&&(this.user.info=o(e),this.user.isLogedin=!0)},getUser:function(){return this.user},updateUser:function(e){localStorage.setItem("jwt",e),this.user.info=o(e),this.user.isLogedin=!0,this.trigger(this.user)},logout:function(){localStorage.clear(),this.user=s(),this.trigger(this.user)}});e.exports=a},48:function(e,t,n){"use strict";var r=n(10),i=n(11),o=function(){return{_id:"",name:"",content:"",tags:[],lang:{mode:"js",label:"JavaScript"},status:0,timestamp:Date.now(),votes:0,shares:0,views:0}},s=r.createStore({listenables:i,init:function(){this.spell=o()},getDefaultSpell:function(e){return this.spell._id=e,this.spell},editSpell:function(e){this.trigger(e)},onCreateSpellSuccess:function(e){this.trigger("success",e)},onCreateSpellFailed:function(e){this.trigger("failed",e)},onDelSpellSuccess:function(){this.trigger("success","DELETED")},onDelSpellFailed:function(e){}});e.exports=s},98:function(e,t,n){"use strict";var r=n(1),i=n(17),o=(n(11),n(22)),s=(n(10),n(48),n(102)),a=(i.Row,i.Col,r.createClass({displayName:"Frag",mixins:[o.Navigation,n(156)],goToSpell:function(){this.transitionTo("spell",{id:this.props.spell._id})},render:function(){var e=this.props.spell,t=e.lang.mode,n=this.cutline(e.content,10),i=""==this.props.spell.name?":)":this.props.spell.name;return i+=" "+new Date(1e3*this.props.spell.timestamp).toLocaleDateString(),r.createElement("div",{className:"spellWrapper",onClick:this.goToSpell},r.createElement(s,{className:t},n))}}));e.exports=a},99:function(e,t){"use strict";e.exports={KEYS:function(e){var t="";for(var n in e)t+=n;return""==t?void 0:t},MODULE_HOST:"",MODULE_PATH:{},MODE_LABEL_MAP:{actionscript:"ActionScript",ada:"Ada",apache_conf:"ApacheConf",applescript:"AppleScript",text:"Visual Basic",assembly_x86:"Assembly",batchfile:"Batchfile",c_cpp:"OpenCL",csharp:"C#",clojure:"Clojure",coffee:"CoffeeScript",lisp:"Racket",css:"CSS",d:"D",dart:"Dart",elixir:"Elixir",erlang:"Erlang",golang:"Go",php:"PHP",haml:"Haml",haskell:"Haskell",html:"Kit",ini:"INI",io:"Io",jade:"Jade",java:"Java",javascript:"JSON5",json:"JSON",smarty:"Smarty",less:"Less",liquid:"Liquid",livescript:"LiveScript",lua:"Lua",makefile:"Makefile",markdown:"RMarkdown",matlab:"Matlab",objectivec:"Objective-C++",ocaml:"OCaml",pascal:"Pascal",perl:"Perl6",powershell:"PowerShell",prolog:"Prolog",python:"Sage",r:"R",rdoc:"RDoc",rhtml:"RHTML",ruby:"Ruby",rust:"Rust",sass:"Sass",scala:"Scala",scheme:"Scheme",sh:"Shell",sql:"SQL",tcl:"Tcl",tex:"TeX",typescript:"TypeScript",xquery:"XQuery",yaml:"YAML"},LABEL_MODE_MAP:{ActionScript:"actionscript",Ada:"ada",ApacheConf:"apache_conf",AppleScript:"applescript",ASP:"text",Assembly:"assembly_x86",Awk:"text",Batchfile:"batchfile",C:"c_cpp","C#":"csharp","C++":"c_cpp",CLIPS:"text",Clojure:"clojure",CMake:"text",CoffeeScript:"coffee","Common Lisp":"lisp",CSS:"css",Cython:"text",D:"d",Dart:"dart",E:"text",Elixir:"elixir","Emacs Lisp":"lisp",Erlang:"erlang","F#":"text",FORTRAN:"text",Go:"golang",Gradle:"text",Hack:"php",Haml:"haml",Haskell:"haskell",HTML:"html","HTML+PHP":"php",HTTP:"text","Inform 7":"text",INI:"ini",Io:"io",Jade:"jade",Java:"java",JavaScript:"javascript",JSON:"json",JSON5:"javascript",Kit:"html",Latte:"smarty",Less:"less",Liquid:"liquid",LiveScript:"livescript",Lua:"lua",M:"lisp",Makefile:"makefile",Markdown:"markdown",Matlab:"matlab",Nginx:"text",NumPy:"text","Objective-C":"objectivec","Objective-C++":"objectivec",OCaml:"ocaml",OpenCL:"c_cpp",Pascal:"pascal",Perl:"perl",Perl6:"perl",PHP:"php",PowerShell:"powershell",Processing:"text",Prolog:"prolog",Python:"python","Python traceback":"text",R:"r",Racket:"lisp",RDoc:"rdoc",RHTML:"rhtml",RMarkdown:"markdown",Ruby:"ruby",Rust:"rust",Sage:"python",SAS:"text",Sass:"sass",Scala:"scala",Scaml:"text",Scheme:"scheme",Self:"text",Shell:"sh",Smalltalk:"text",Smarty:"smarty",SQL:"sql","Standard ML":"text",Swift:"text",Tcl:"tcl",TeX:"tex",Text:"text",Turing:"text",TypeScript:"typescript",VimL:"text","Visual Basic":"text",XQuery:"xquery",YAML:"yaml"},LANG_OPTIONS:[{value:"ActionScript",label:"ActionScript"},{value:"Ada",label:"Ada"},{value:"ApacheConf",label:"ApacheConf"},{value:"AppleScript",label:"AppleScript"},{value:"ASP",label:"ASP"},{value:"Assembly",label:"Assembly"},{value:"Awk",label:"Awk"},{value:"Batchfile",label:"Batchfile"},{value:"C",label:"C"},{value:"C#",label:"C#"},{value:"C++",label:"C++"},{value:"CLIPS",label:"CLIPS"},{value:"Clojure",label:"Clojure"},{value:"CMake",label:"CMake"},{value:"CoffeeScript",label:"CoffeeScript"},{value:"Common Lisp",label:"Common Lisp"},{value:"CSS",label:"CSS"},{value:"Cython",label:"Cython"},{value:"D",label:"D"},{value:"Dart",label:"Dart"},{value:"E",label:"E"},{value:"Elixir",label:"Elixir"},{value:"Emacs Lisp",label:"Emacs Lisp"},{value:"Erlang",label:"Erlang"},{value:"F#",label:"F#"},{value:"FORTRAN",label:"FORTRAN"},{value:"Go",label:"Go"},{value:"Gradle",label:"Gradle"},{value:"Hack",label:"Hack"},{value:"Haml",label:"Haml"},{value:"Haskell",label:"Haskell"},{value:"HTML",label:"HTML"},{value:"HTML+PHP",label:"HTML+PHP"},{value:"HTTP",label:"HTTP"},{value:"Inform 7",label:"Inform 7"},{value:"INI",label:"INI"},{value:"Io",label:"Io"},{value:"Jade",label:"Jade"},{value:"Java",label:"Java"},{value:"JavaScript",label:"JavaScript"},{value:"JSON",label:"JSON"},{value:"JSON5",label:"JSON5"},{value:"Kit",label:"Kit"},{value:"Latte",label:"Latte"},{value:"Less",label:"Less"},{value:"Liquid",label:"Liquid"},{value:"LiveScript",label:"LiveScript"},{value:"Lua",label:"Lua"},{value:"M",label:"M"},{value:"Makefile",label:"Makefile"},{value:"Markdown",label:"Markdown"},{value:"Matlab",label:"Matlab"},{value:"Nginx",label:"Nginx"},{value:"NumPy",label:"NumPy"},{value:"Objective-C",label:"Objective-C"},{value:"Objective-C++",label:"Objective-C++"},{value:"OCaml",label:"OCaml"},{value:"OpenCL",label:"OpenCL"},{value:"Pascal",label:"Pascal"},{value:"Perl",label:"Perl"},{value:"Perl6",label:"Perl6"},{value:"PHP",label:"PHP"},{value:"PowerShell",label:"PowerShell"},{value:"Processing",label:"Processing"},{value:"Prolog",label:"Prolog"},{value:"Python",label:"Python"},{value:"Python traceback",label:"Python traceback"},{value:"R",label:"R"},{value:"Racket",label:"Racket"},{value:"RDoc",label:"RDoc"},{value:"RHTML",label:"RHTML"},{value:"RMarkdown",label:"RMarkdown"},{value:"Ruby",label:"Ruby"},{value:"Rust",label:"Rust"},{value:"Sage",label:"Sage"},{value:"SAS",label:"SAS"},{value:"Sass",label:"Sass"},{value:"Scala",label:"Scala"},{value:"Scaml",label:"Scaml"},{value:"Scheme",label:"Scheme"},{value:"Self",label:"Self"},{value:"Shell",label:"Shell"},{value:"Smalltalk",label:"Smalltalk"},{value:"Smarty",label:"Smarty"},{value:"SQL",label:"SQL"},{value:"Standard ML",label:"Standard ML"},{value:"Swift",label:"Swift"},{value:"Tcl",label:"Tcl"},{value:"TeX",label:"TeX"},{value:"Text",label:"Text"},{value:"Turing",label:"Turing"},{value:"TypeScript",label:"TypeScript"},{value:"VimL",label:"VimL"},{value:"Visual Basic",label:"Visual Basic"},{value:"XQuery",label:"XQuery"},{value:"YAML",label:"YAML"}]}},100:function(e,t,n){"use strict";var r=n(10),i=n(11),o=function(){return{_id:"",name:"",content:"",tags:[],lang:{mode:"javascript",label:"JavaScript"},status:0,timestamp:Date.now(),votes:0,shares:0,views:0}},s=r.createStore({listenables:i,init:function(){this.spell=o()},getDefaultSpell:function(){return this.spell},getLocalSpell:function(){var e=localStorage.getItem("spl");return e?this.spell=JSON.parse(e):this.spell=o(),this.spell},clearLocalSpell:function(){this.spell=o(),localStorage.removeItem("spl"),localStorage.removeItem("tgs"),localStorage.removeItem("desc")},onFetchSpellSuccess:function(e){this.spell=e,this.trigger("success",this.spell)},onFetchSpellFailed:function(e){this.trigger("failed",e)}});e.exports=s},101:function(e,t,n){"use strict";var r=n(10),i=n(1),o=n(22),s=n(11),a=n(34),l=n(158),c=n(100),u=n(154),d=n(33),p=n(75),h=n(17),f=h.Row,m=h.Col,g=h.Button,v=(h.Jumbotron,h.Panel),b=h.Alert,y=h.Input,E=i.createClass({displayName:"Create",mixins:[o.Navigation,o.State,r.listenTo(l,"onCreateSpell"),r.listenTo(c,"onFetchSpell"),n(99)],getInitialState:function(){return{user:a.getUser(),spell:l.getDefaultSpell(),loading:!1,errMsg:"",actions:"create"}},statics:{willTransitionTo:function(e,t){t.id&&s.fetchSpell(t.id)},willTransitionFrom:function(e,t){s.clearLocalSpell()}},componentWillMount:function(){this.state.user.isLogedin||this.transitionTo("login")},onFetchSpell:function(e,t){"success"==e&&(this.setState({loading:!1,spell:t}),console.log(t))},onCreateSpell:function(e,t){"success"==e?this.transitionTo("spell",{id:t}):"failed"==e&&this.setState({loading:!1,errMsg:t})},createSpell:function(e){var t=this.refs.editor.getValue();0==t.length?alert("内容不能为空"):t.length>20480?alert("长度暂时不能超过20480"):(this.setState({loading:!0}),this.state.spell.name=this.refs.desc.getValue().trim(),this.state.spell.status="private"==e?2:1,this.state.spell.content=t,s.createSpell(this.state.spell))},onChangeMode:function(e){var t={label:e,mode:this.LABEL_MODE_MAP[e]};this.state.spell.lang=t,s.changeMode(t)},onAddTag:function(e,t){console.log(t),t.length<=5&&(this.state.spell.tags=t)},handleAlertDismiss:function(){this.setState({errMsg:""})},render:function(){var e=localStorage.getItem("tgs");e=e?e:"";var t=i.createElement(f,null,i.createElement(m,{md:6},i.createElement(p,{multi:!0,ignoreCase:!1,placeholder:"添加标签",onChange:this.onAddTag,value:e.length>0?e:null,allowCreate:!0,ref:"tags"})),i.createElement(m,{md:3,xs:6},i.createElement(g,{ref:"priBtn",block:!0,onClick:this.createSpell.bind(this,"private"),bsStyle:"primary"},"私有")),i.createElement(m,{md:3,xs:6},i.createElement(g,{ref:"pubBtn",block:!0,onClick:this.createSpell.bind(this,"public"),bsStyle:"success"},"公开")));return""!=this.state.errMsg&&(t=i.createElement(b,{bsStyle:"danger",block:!0,onDismiss:this.handleAlertDismiss},this.state.errMsg)),i.createElement(v,{md:12},i.createElement(f,null,i.createElement(m,{md:9,xs:8},i.createElement(y,{className:"defaulted",type:"text",ref:"desc",defaultValue:localStorage.getItem("desc"),placeholder:"描述"})),i.createElement(m,{md:3,xs:4},i.createElement(p,{name:"Text",value:this.state.spell.lang.label,options:this.LANG_OPTIONS,onChange:this.onChangeMode}))),i.createElement(u,{ref:"editor",name:"CobEditor",mode:this.state.spell.lang.mode,value:this.state.spell.content,theme:"github",height:"400px"}),this.state.loading?i.createElement(d,null):t)}});e.exports=E},102:function(e,t,n){"use strict";var r=n(104),i=n(1),o=i.createClass({displayName:"Highlight",getDefaultProps:function(){return{innerHTML:!1,className:""}},componentDidMount:function(){this.highlightCode()},componentDidUpdate:function(){this.highlightCode()},highlightCode:function(){var e=this.getDOMNode(),t=e.querySelectorAll("pre code");if(t.length>0)for(var n=0;n<t.length;n+=1)r.highlightBlock(t[n])},render:function(){return this.props.innerHTML?i.createElement("div",{dangerouslySetInnerHTML:{__html:this.props.children},className:this.props.className||null}):i.createElement("pre",null,i.createElement("code",{className:this.props.className},this.props.children))}});e.exports=o},154:function(e,t,n){"use strict";var r=n(103),i=n(1),o=n(10),s=n(159),a=(n(48),"http://127.0.0.1:3000/brace/mode/");for(var l in n(99).MODE_LABEL_MAP)r.config.setModuleUrl("ace/mode/"+l,a+l+".js");var c=i.createClass({displayName:"AceEditor",mixins:[o.listenTo(s,"changeMode")],getValue:function(){return this.editor.getValue()},changeMode:function(e){this.setState({mode:e.mode}),this.editor.getSession().setMode({path:"ace/mode/"+e.mode,v:Date.now()})},propTypes:{name:i.PropTypes.string,mode:i.PropTypes.string,theme:i.PropTypes.string,width:i.PropTypes.string,height:i.PropTypes.string,readOnly:i.PropTypes.bool,value:i.PropTypes.string,maxLines:i.PropTypes.number},getDefaultProps:function(){return{name:"AceEditor",mode:"python",theme:"github",readOnly:!1,value:"",maxLines:null,height:"500px",width:"100%"}},getInitialState:function(){return{mode:this.props.mode}},componentDidMount:function(){this.editor=r.edit(this.props.name),this.editor.setTheme("ace/theme/"+this.props.theme),this.editor.getSession().setUseWorker(!1),this.editor.getSession().setMode({path:"ace/mode/"+this.state.mode,v:Date.now()}),this.editor.setShowPrintMargin(!1),this.editor.setOptions({maxLines:this.props.maxLines,readOnly:this.props.readOnly}),this.editor.setFontSize(14),this.editor.setValue(this.props.value,1)},componentWillReceiveProps:function(e){this.editor.setValue(e.value,1)},render:function(){var e={width:this.props.width,height:this.props.height,border:"1px solid #4582ec",margin:"6px auto",borderRadius:"4px"};return i.createElement("div",{className:"AceEditor",id:this.props.name,style:e})}});e.exports=c},155:function(e,t,n){"use strict";var r=n(1),i=n(17),o=i.Col,s=r.createClass({displayName:"Footer",render:function(){return r.createElement("footer",null,r.createElement("div",{className:"footerContainer"},r.createElement(o,{md:4}),r.createElement(o,{md:4},r.createElement("ul",{className:"footerUl"},r.createElement("li",null,"© 2015 Coodict.com"),r.createElement("li",null,r.createElement("a",{href:"#"},"About")),r.createElement("li",null,r.createElement("a",{href:"#"},"Donation")),r.createElement("li",null,r.createElement("a",{href:"#"},"Github")))),r.createElement(o,{md:4})))}});e.exports=s},156:function(e,t){"use strict";e.exports={cutline:function(e,t){var n=e.split("\n");return n.length<=t?e:e.split("\n").slice(0,t).join("\n")}}},157:function(e,t,n){"use strict";var r=n(153),i="http://127.0.0.1:3000",o=function(e){var t={url:i+"/user/signin",method:"post",data:JSON.stringify(void 0),type:"json",contentType:"application/json",headers:{"X-Requested-With":"XMLHttpRequest"},success:function(e){console.log(e)}};t.url=i+e.url,t.data=JSON.stringify(e.data);for(var n in e.headers)t.headers[n]=e.headers[n];t.success=e.success,r(t)};e.exports=o},158:function(e,t,n){"use strict";var r=n(10),i=n(11),o=function(){return{_id:"",name:"",content:"",tags:[],lang:{mode:"javascript",label:"JavaScript"},status:0,timestamp:Date.now(),votes:0,shares:0,views:0}},s=r.createStore({listenables:i,init:function(){this.spell=o()},getDefaultSpell:function(){return this.spell},clearLocalSpell:function(){this.spell=o()},editSpell:function(e){this.trigger(e)},onCreateSpellSuccess:function(e){this.trigger("success",e)},onCreateSpellFailed:function(e){this.trigger("failed",e)}});e.exports=s},159:function(e,t,n){"use strict";var r=n(10),i=n(11),o=r.createStore({listenables:i,changeMode:function(e){this.trigger(e)}});e.exports=o},160:function(e,t,n){"use strict";var r=n(10),i=n(11),o=n(64),s=function(){return{tags:[],langs:[]}},a=r.createStore({listenables:i,init:function(){this.LMT=s();var e=JSON.parse(localStorage.getItem("LMT-tgs"));e&&(this.LMT.tags=e);var t=JSON.parse(localStorage.getItem("LMT-lgs"));t&&(this.LMT.langs=t)},getLMT:function(){return this.LMT},updateUser:function(e){var t=o("jwt"),n=t.tags,r=t.langs;localStorage.setItem("LMT-tgs",n),localStorage.setItem("LMT-lgs",r),this.LMT.tags=n?n:[],this.LMT.langs=r?r:[],this.trigger(this.LMT)},updateLMT:function(e,t){for(var n=this,r=!1,i=0;i<this.LMT.langs.length;i++)if(this.LMT.langs[i].mode==t.mode){r=!0;break}r||this.LMT.langs.push(t),e.map(function(e){-1==JSON.stringify(n.LMT.tags).indexOf(JSON.stringify(e))&&(n.LMT.tags=n.LMT.tags.concat(e))}),localStorage.setItem("LMT-tgs",JSON.stringify(this.LMT.tags)),localStorage.setItem("LMT-lgs",JSON.stringify(this.LMT.langs)),this.trigger(this.LMT)}});e.exports=a},161:function(e,t,n){"use strict";var r=n(10),i=n(11),o=r.createStore({listenables:i,loginError:function(e){this.trigger(e)}});e.exports=o},162:function(e,t,n){"use strict";var r=n(10),i=n(11),o=r.createStore({listenables:i,init:function(){this.spells=[]},getSpells:function(){return this.spells},onMySpellsSuccess:function(e){this.spells=e,this.trigger("success",e)},onMySpellsFailed:function(e){this.trigger("failed",e)}});e.exports=o},163:function(e,t,n){"use strict";var r=n(10),i=n(11),o=r.createStore({listenables:i,onLoadSquareSuccess:function(e,t){console.log(e),this.trigger(e,t)}});e.exports=o},164:function(e,t,n){"use strict";var r=n(1),i=n(11),o=n(33),s=n(34),a=n(22),l=n(10),c=r.createClass({displayName:"Callback",mixins:[a.Navigation,a.State,l.listenTo(s,"updateUser")],statics:{willTransitionTo:function(e,t){i.updateUser(t.jwt)}},updateUser:function(e){e.isLogedin&&this.transitionTo("profile")},render:function(){return r.createElement(o,null)}});e.exports=c},165:function(e,t,n){"use strict";var r=n(1),i=n(17),o=n(11),s=n(22),a=n(10),l=n(34),c=n(161),u=i.Input,d=i.Button,p=(i.Grid,i.Row),h=i.Col,f=i.Panel,m=i.Alert,g=n(33),v=r.createClass({displayName:"Login",mixins:[s.Navigation,a.listenTo(c,"loginErr")],loginErr:function(e){this.setState({loading:!1,err:!0,msg:e})},login:function(e){e.preventDefault(),this.setState({loading:!0,err:!1}),o.login({name:this.refs.name.getValue().trim(),pass:this.refs.pass.getValue().trim()})},getInitialState:function(){return{user:l.getUser(),loading:!1,err:!1}},componentWillMount:function(){console.log(this.state.user),this.state.user.isLogedin&&this.transitionTo("home")},render:function(){var e=r.createElement(m,{bsStyle:"danger"},this.state.msg),t=r.createElement("form",{onSubmit:this.login},r.createElement(u,{type:"text",ref:"name",required:!0,placeholder:"邮箱/ID"}),r.createElement(u,{type:"password",ref:"pass",required:!0,placeholder:"密码"}),this.state.err?e:"",r.createElement(d,{type:"submit",bsStyle:"primary",block:!0,ref:"submit"},"登录"));return t=r.createElement("a",{href:"https://github.com/login/oauth/authorize?scope=user:email&client_id=a965d4ca2cd64c6d0859"},"Login with Github"),r.createElement(p,{className:"LoginContainer"},r.createElement(h,{md:4}),r.createElement(h,{md:4,xs:12},r.createElement(f,{header:"登录",bsStyle:"primary",className:"Login"},this.state.loading?r.createElement(g,null):t)),r.createElement(h,{md:4}))}});e.exports=v},166:function(e,t,n){"use strict";var r=n(1),i=n(17),o=i.Jumbotron,s=i.Button,a=r.createClass({displayName:"Notfound",render:function(){return r.createElement(o,{md:6,xs:12},r.createElement("h1",null,"Oops!"),r.createElement("p",null,"Where am I ?..."),r.createElement(s,{bsStyle:"primary",href:"#/profile"},"Back Home"))}});e.exports=a},167:function(e,t,n){"use strict";var r=n(1),i=n(17),o=n(11),s=n(22),a=n(10),l=(i.Jumbotron,i.Button),c=(i.Accordion,i.Grid,i.Row),u=i.Col,d=(i.Panel,i.DropdownButton,i.MenuItem,n(75)),p=n(33),h=n(98),f=n(34),m=n(162),g=(n(48),n(160)),v=function(){return{tag:"",lang:"",sorts:"late",page:1,pgsz:10}},b=r.createClass({displayName:"Profile",mixins:[s.Navigation,a.listenTo(f,"logout"),a.listenTo(m,"getSpells"),a.listenTo(g,"updateLMT")],getSpells:function(e,t){console.log(t),"success"==e?this.setState({loadMoreLoading:!1,loading:!1,spells:this.state.spells.concat(t),allLoaded:0==t.length?!0:!1}):"failed"==e&&this.setState({errMsg:t})},getInitialState:function(){return{loadMoreLoading:!1,allLoaded:!1,loading:!0,user:f.getUser(),spells:m.getSpells(),query:v(),LMT:g.getLMT()}},statics:{willTransitionTo:function(e,t){o.mySpells(v())}},logout:function(){this.transitionTo("home")},componentDidMount:function(){this.state.user.isLogedin||this.transitionTo("login")},loadMore:function(){this.setState({loadMoreLoading:!0}),this.state.query.page+=1,o.mySpells(this.state.query)},sortBy:function(e){console.log(e),this.state.query.sorts=e,this.state.query.page=1,this.setState({loading:!0,spells:[]}),o.mySpells(this.state.query)},filterTag:function(e){this.state.query.tag=e,this.state.query.page=1,this.setState({loading:!0,spells:[]}),o.mySpells(this.state.query)},filterLang:function(e){this.state.query.lang=e,this.state.query.page=1,this.setState({loading:!0,spells:[]}),o.mySpells(this.state.query)},reset:function(){this.state.query=v(),this.setState({loading:!0,spells:[]}),o.mySpells(this.state.query)},render:function(){var e=this.state.spells.map(function(e,t){return r.createElement(h,{spell:e,key:e._id,index:t})}),t=r.createElement("div",{className:"spellList"},e),n=[{label:"最近",value:"late"},{label:"最早",value:"earl"},{label:"最多浏览",value:"view"}],i=this.state.LMT.langs.map(function(e){return{label:e.label,value:e.mode}}),o=r.createElement(l,{ref:"loadMore",bsStyle:"success",block:!0,onClick:this.loadMore,disabled:this.state.allLoaded?!0:!1},this.state.allLoaded?"全部加载完成":"加载更多...");return r.createElement(c,null,r.createElement(u,{md:2}),r.createElement(u,{md:8,xs:12},r.createElement("div",{className:"sortnav"},r.createElement(c,null,r.createElement(u,{md:4},r.createElement(d,{className:"sortBy",clearable:!1,searchable:!1,value:this.state.query.sorts,options:n,onChange:this.sortBy})),r.createElement(u,{md:3},r.createElement(d,{className:"filterLang",clearable:!1,placeholder:"语言",value:""==this.state.query.lang?"语言":this.state.query.lang,disabled:this.state.LMT.langs.length?!1:!0,options:i,onChange:this.filterLang})),r.createElement(u,{md:3},r.createElement(d,{className:"filterTag",clearable:!1,placeholder:"标签",value:""==this.state.query.tag?"标签":this.state.query.tag,disabled:this.state.LMT.tags.length?!1:!0,options:this.state.LMT.tags,onChange:this.filterTag})),r.createElement(u,{md:2},r.createElement(l,{bsStyle:"primary",onClick:this.reset},"重置")))),this.state.loading?r.createElement(p,null):t,this.state.loadMoreLoading?r.createElement(p,null):o),r.createElement(u,{md:2}))}});e.exports=b},168:function(e,t,n){"use strict";var r=n(1),i=n(17),o=n(11),s=n(22),a=n(10),l=n(100),c=n(48),u=n(34),d=n(102),p=i.Grid,h=i.Row,f=i.Col,m=i.Button,g=i.ButtonGroup,v=i.Label,b=i.Panel,y=n(33),E=i.Modal,_=i.ModalTrigger,C=i.Input,w=r.createClass({displayName:"Spell",mixins:[s.Navigation,s.State,a.listenTo(l,"updateSpell"),a.listenTo(c,"deleteSpell")],deleteSpell:function(e,t){"success"==e&&this.transitionTo("profile")},updateSpell:function(e,t){"success"==e?this.setState({loading:!1,spell:t}):"failed"==e&&this.transitionTo("/404")},getInitialState:function(){return{user:u.getUser(),spell:l.getDefaultSpell(),loading:!0,errMsg:""}},statics:{willTransitionTo:function(e,t){o.fetchSpell(t.id)}},editSpell:function(){localStorage.setItem("spl",JSON.stringify(this.state.spell)),localStorage.setItem("desc",this.state.spell.name),localStorage.setItem("tgs",this.state.spell.tags.map(function(e){return e.label}).join(",")),this.transitionTo("edit",{id:this.state.spell._id})},delSpell:function(){var e=confirm("确认删除？");e&&o.delSpell(this.state.spell._id)},render:function(){var e=new Date(1e3*this.state.spell.timestamp),t=r.createElement(E,{enforceFocus:!0},r.createElement("div",{className:"modal-body"},r.createElement(C,{ref:"copyarea",type:"textarea",className:"copyarea",value:this.state.spell.content}))),n=r.createElement(g,{bsSize:"small",className:"editBtnGrp"},r.createElement(m,{bsStyle:"info",onClick:this.editSpell},r.createElement("i",{className:"fa fa-edit"})),r.createElement(_,{modal:t},r.createElement(m,{bsStyle:"primary"},r.createElement("i",{className:"fa fa-copy"}))),r.createElement(m,{disabled:!0,bsStyle:"success"},r.createElement("i",{className:"fa fa-share-alt"})),r.createElement(m,{bsStyle:"danger",onClick:this.delSpell},r.createElement("i",{className:"fa fa-remove"}))),i=r.createElement(p,{className:"Spell"},r.createElement(h,null,r.createElement(f,{md:2}),r.createElement(f,{md:8,xs:12},r.createElement(b,null,r.createElement("h5",null,""==this.state.spell.name?"无题."+this.state.spell.lang.label:this.state.spell.name),r.createElement("div",{className:"spellMeta"},r.createElement(v,{bsStyle:"info"},r.createElement("i",{className:"fa fa-birthday-cake"})," ",e.toLocaleDateString())," ",r.createElement(v,{bsStyle:2==this.state.spell.status?"danger":"success"},r.createElement("i",{className:"fa fa-copyright"})," ",2==this.state.spell.status?"私人":"公开")," ",r.createElement(v,{bsStyle:"primary"},r.createElement("i",{className:"fa fa-code"})," ",this.state.spell.lang.label)," ",r.createElement(v,{bsStyle:"default"},r.createElement("i",{className:"fa fa-eye"})," ",this.state.spell.views)," ",r.createElement(v,{bsStyle:"default"},r.createElement("i",{className:"fa fa-thumbs-o-up"})," ",this.state.spell.votes)," ",r.createElement(v,{bsStyle:"default"},r.createElement("i",{className:"fa fa-share-alt"})," ",this.state.spell.shares)," "),this.state.spell.owner==this.state.user.info.name?n:"")),r.createElement(f,{md:2})),r.createElement(h,null,r.createElement(f,{md:2}),r.createElement(f,{md:8},r.createElement("div",{className:"pre-container"},r.createElement(d,{className:this.state.spell.lang.mode,ref:"fragment"},this.state.spell.content))),r.createElement(f,{md:2})));return r.createElement("div",null,this.state.loading?r.createElement(y,null):i)}});e.exports=w},169:function(e,t,n){"use strict";var r=n(10),i=n(1),o=(n(22),n(17)),s=o.Row,a=o.Col,l=n(11),c=n(163),u=n(33),d=n(98),p=o.Panel,h=i.createClass({displayName:"Square",mixins:[r.listenTo(c,"update")],update:function(e,t){this.setState({loading:!1,hots:e,news:t})},getInitialState:function(){return{hots:[],news:[],loading:!0}},componentDidMount:function(){l.loadSquare()},render:function(){var e,t=this.state.hots.map(function(e,t){return i.createElement(d,{spell:e,key:e._id,index:t})}),n=this.state.news.map(function(e,t){return i.createElement(d,{spell:e,key:e._id,index:t})});return e=this.state.loading?i.createElement(u,null):i.createElement(s,null,i.createElement(a,{className:"topHot",md:6,xs:12},t),i.createElement(a,{className:"newest",md:6,xs:12},n)),i.createElement("div",{className:"square"},i.createElement(s,null,i.createElement(a,{md:6,xs:12},i.createElement(p,null,"热门")),i.createElement(a,{md:6,xs:12},i.createElement(p,null,"最新"))),e)}});e.exports=h},171:function(e,t){ace.define("ace/theme/github",["require","exports","module","ace/lib/dom"],function(e,t,n){t.isDark=!1,t.cssClass="ace-github",t.cssText='	.ace-github .ace_gutter {	background: #e8e8e8;	color: #AAA;	}	.ace-github  {	background: #fff;	color: #000;	}	.ace-github .ace_keyword {	font-weight: bold;	}	.ace-github .ace_string {	color: #D14;	}	.ace-github .ace_variable.ace_class {	color: teal;	}	.ace-github .ace_constant.ace_numeric {	color: #099;	}	.ace-github .ace_constant.ace_buildin {	color: #0086B3;	}	.ace-github .ace_support.ace_function {	color: #0086B3;	}	.ace-github .ace_comment {	color: #998;	font-style: italic;	}	.ace-github .ace_variable.ace_language  {	color: #0086B3;	}	.ace-github .ace_paren {	font-weight: bold;	}	.ace-github .ace_boolean {	font-weight: bold;	}	.ace-github .ace_string.ace_regexp {	color: #009926;	font-weight: normal;	}	.ace-github .ace_variable.ace_instance {	color: teal;	}	.ace-github .ace_constant.ace_language {	font-weight: bold;	}	.ace-github .ace_cursor {	color: black;	}	.ace-github.ace_focus .ace_marker-layer .ace_active-line {	background: rgb(255, 255, 204);	}	.ace-github .ace_marker-layer .ace_active-line {	background: rgb(245, 245, 245);	}	.ace-github .ace_marker-layer .ace_selection {	background: rgb(181, 213, 255);	}	.ace-github.ace_multiselect .ace_selection.ace_start {	box-shadow: 0 0 3px 0px white;	border-radius: 2px;	}	.ace-github.ace_nobold .ace_line > span {	font-weight: normal !important;	}	.ace-github .ace_marker-layer .ace_step {	background: rgb(252, 255, 0);	}	.ace-github .ace_marker-layer .ace_stack {	background: rgb(164, 229, 101);	}	.ace-github .ace_marker-layer .ace_bracket {	margin: -1px 0 0 -1px;	border: 1px solid rgb(192, 192, 192);	}	.ace-github .ace_gutter-active-line {	background-color : rgba(0, 0, 0, 0.07);	}	.ace-github .ace_marker-layer .ace_selected-word {	background: rgb(250, 250, 255);	border: 1px solid rgb(200, 200, 250);	}	.ace-github .ace_invisible {	color: #BFBFBF	}	.ace-github .ace_print-margin {	width: 1px;	background: #e8e8e8;	}	.ace-github .ace_indent-guide {	background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAE0lEQVQImWP4////f4bLly//BwAmVgd1/w11/gAAAABJRU5ErkJggg==") right repeat-y;	}';
var r=e("../lib/dom");r.importCssString(t.cssText,t.cssClass)})}});