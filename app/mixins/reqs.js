var req = require('reqwest');

var HOST = 'http://127.0.0.1:3000';
var AJAX = function (opt) {

  var options = {
    url: HOST+"/user/signin",
    method: 'post',
    data: JSON.stringify(undefined),
    type: 'json',
    contentType: 'application/json',
    headers: {'X-Requested-With': 'XMLHttpRequest'},
    success: function (resp) {
      console.log(resp)
    }
  };
  options.url = HOST + opt.url ;
  options.data = JSON.stringify(opt.data)
  for (var header in opt.headers) {
    options.headers[header] = opt.headers[header];
  }
  options.success = opt.success;
  req(options);
}

module.exports = AJAX;
