module.exports = {
  cutline : function (content, lines) {
    var arr = content.split('\n');
    if(arr.length <= lines){
      return content;
    }
    return content.split('\n').slice(0,lines).join('\n');
  }
};
