'use strict';
var buildUrl = require('build-url');

function emptySubstrFind(str, from, find) {

  if(!str.slice(from)) {
    return -1;
  }else return str.slice(from).indexOf(find);

}

// module.exports = function({urlString, config}) {
module.exports = function(urlString) {

  if(!urlString) {
    urlString = "";
  } else if (urlString.constructor != String) {
    return urlString;
  }

  let url = {};
  // handle google.com?q=data => google.com/?q=data
  // browser does this by default
  let onlyquestion = emptySubstrFind(urlString, 0, '?');
  if(onlyquestion !== -1) {
    if(onlyquestion !== 0 && urlString[onlyquestion-1] !== '/') {
      urlString = urlString.substr(0, onlyquestion) + '/' + urlString.slice(onlyquestion);
    }
  }
  url.href = urlString;
  let index = 0;

  let proto = emptySubstrFind(urlString, 0, '://');
  if(proto !== -1) {
    url.protocol = urlString.substr(0, proto);
    index = proto + 3;
  } else {
    url.protocol = "";
  }

  let firstcolon = emptySubstrFind(urlString, index, ':');
  let firstdot = emptySubstrFind(urlString, index, '.');
  // need google.com, youtu.be, etc
  // checks for internet address, localhost
  let hostindex = emptySubstrFind(urlString, index, '/');
  // if(hostindex !== -1 && (firstdot !== -1 || firstcolon !== -1)) {
  if(hostindex !== -1) {
    url.host = urlString.substr(index, hostindex);
    index += hostindex + 1;
  } else {
    // till the very end
    if(onlyquestion !== -1) {
      url.host = urlString.substr(0, onlyquestion);
      index = onlyquestion + 1;
    } else {
      url.host = urlString.slice(index);
      index = urlString.length;
    }
  }
  // remove unnecessary trailing /
  url.baseurl = (urlString[index-1] === '/')? urlString.substr(0, index-1): urlString.substr(0, index);

  let question = emptySubstrFind(urlString, index, '?');
  if(question !== -1) {
    url.path = urlString.substr(index, question);
    // remove last /
    // intently written twice
    url.path = (url.path.substr(-1) === '/') ? url.path.slice(0, -1) : url.path;
    url.path = (url.path.substr(-1) === '/') ? url.path.slice(0, -1) : url.path;
    index += question + 1;
  } else {
    url.path = urlString.slice(index);
    index = urlString.length;
  }
  // remove unnecessary trailing /
  url.path = (url.path.substr(-1) === '/')? url.path.slice(0, -1): url.path;

  let hash = urlString.slice(index)? urlString.slice(index).lastIndexOf('#'): -1;
  url.query = (hash === -1) ? urlString.slice(index) : urlString.substr(index, hash);
  let queryBreak = url.query ? url.query.split('&'): [];
  url.queryParams = {};
  queryBreak.forEach(function(attribute) {
    let split = attribute.split('=');
    url.queryParams[split[0]] = split[1];
    try {
      // refered to as q={}
      url.queryParams[split[0]] = JSON.parse(decodeURIComponent(split[1].replace('/','')));
    } catch(e) {
      // pass
      }
  });

  if(hash !== -1) {
    url.hash = urlString.substr(index + hash + 1);
  } else {
    url.hash = null;
  }

  url.getBaseurl = function() {
    this.baseurl = (this.protocol !== '') ? this.protocol + '://' + this.host : this.host;
    return this.baseurl;
  };
  url.toString = function() {
    this.baseurl = this.getBaseurl();
    let params = {};
    // in case some parameter has array, refered as q=[{}]
    for(let key in this.queryParams) {
      let value = this.queryParams[key];
      params[key] = (typeof value !== 'string')? JSON.stringify(value) : value;
    }
    return buildUrl(this.baseurl, {
      path: this.path,
      hash: this.hash,
      queryParams: params
    });
  };
  return url;
};
