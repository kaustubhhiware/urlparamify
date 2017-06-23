module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * build-url - A small library that builds a URL given it's components
 * @version v1.0.9
 * @link https://github.com/steverydz/build-url#readme
 * @license MIT
 */
;(function () {
  'use strict';

  var root = this;
  var previousBuildUrl = root.buildUrl;

  var buildUrl = function (url, options) {
    var queryString = [];
    var key;
    var builtUrl;

    if (url === null) {
      builtUrl = '';
    } else if (typeof(url) === 'object') {
      builtUrl = '';
      options = url;
    } else {
      builtUrl = url;
    }

    if (options) {
      if (options.path) {
        builtUrl += '/' + options.path;
      }

      if (options.queryParams) {
        for (key in options.queryParams) {
          if (options.queryParams.hasOwnProperty(key)) {
            queryString.push(key + '=' + options.queryParams[key]);
          }
        }
        builtUrl += '?' + queryString.join('&');
      }

      if (options.hash) {
        builtUrl += '#' + options.hash;
      }
    }

    return builtUrl;
  };

  buildUrl.noConflict = function () {
    root.buildUrl = previousBuildUrl;
    return buildUrl;
  };

  if (true) {
    if (typeof(module) !== 'undefined' && module.exports) {
      exports = module.exports = buildUrl;
    }
    exports.buildUrl = buildUrl;
  } else {
    root.buildUrl = buildUrl;
  }
}).call(this);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var buildUrl = __webpack_require__(0);

function emptySubstrFind(str, from, find) {

  if (!str.slice(from)) {
    return -1;
  } else return str.slice(from).indexOf(find);
}

// module.exports = function({urlString, config}) {
module.exports = function (urlString) {

  if (!urlString) {
    urlString = "";
  } else if (urlString.constructor != String) {
    // cannot write test for this case, help appreciated
    return urlString;
  }

  var url = {};
  // handle google.com?q=data => google.com/?q=data
  // browser does this by default
  var onlyquestion = emptySubstrFind(urlString, 0, '?');
  if (onlyquestion !== -1) {
    if (onlyquestion !== 0 && urlString[onlyquestion - 1] !== '/') {
      urlString = urlString.substr(0, onlyquestion) + '/' + urlString.slice(onlyquestion);
    }
  }
  url.href = urlString;
  var index = 0;

  var proto = emptySubstrFind(urlString, 0, '://');
  if (proto !== -1) {
    url.protocol = urlString.substr(0, proto);
    index = proto + 3;
  } else {
    url.protocol = "";
  }

  var firstcolon = emptySubstrFind(urlString, index, ':');
  var firstdot = emptySubstrFind(urlString, index, '.');
  // need google.com, youtu.be, etc
  // checks for internet address, localhost
  var hostindex = emptySubstrFind(urlString, index, '/');
  // if(hostindex !== -1 && (firstdot !== -1 || firstcolon !== -1)) {
  if (hostindex !== -1) {
    url.host = urlString.substr(index, hostindex);
    index += hostindex + 1;
  } else {
    // till the very end
    url.host = urlString.slice(index);
    index = urlString.length;
  }
  // remove unnecessary trailing /
  url.baseurl = urlString[index - 1] === '/' ? urlString.substr(0, index - 1) : urlString.substr(0, index);

  var question = emptySubstrFind(urlString, index, '?');
  if (question !== -1) {
    url.path = urlString.substr(index, question);
    index += question + 1;
  } else {
    url.path = urlString.slice(index);
    index = urlString.length;
  }
  // remove unnecessary trailing /
  url.path = url.path.substr(-1) === '/' ? url.path.slice(0, -1) : url.path;

  var hash = urlString.slice(index) ? urlString.slice(index).lastIndexOf('#') : -1;
  url.query = hash === -1 ? urlString.slice(index) : urlString.substr(index, hash);
  var queryBreak = url.query ? url.query.split('&') : [];
  url.queryParams = {};
  queryBreak.forEach(function (attribute) {
    var split = attribute.split('=');
    try {
      // refered to as q={}
      url.queryParams[split[0]] = JSON.parse(decodeURIComponent(split[1].replace('/', '')));
    } catch (e) {
      url.queryParams[split[0]] = split[1];
    }
  });

  if (hash !== -1) {
    url.hash = urlString.substr(index + hash + 1);
  } else {
    url.hash = null;
  }

  url.getBaseurl = function () {
    this.baseurl = this.protocol !== '' ? this.protocol + '://' + this.host : this.host;
    return this.baseurl;
  };
  url.toString = function () {
    this.baseurl = this.getBaseurl();
    var params = {};
    // in case some parameter has array, refered as q=[{}]
    for (var key in this.queryParams) {
      var value = this.queryParams[key];
      params[key] = typeof value !== 'string' ? JSON.stringify(value) : value;
    }
    if (JSON.stringify(params) === '{}') {
      params = null;
    }
    return buildUrl(this.baseurl, {
      path: this.path,
      hash: this.hash,
      queryParams: params
    });
  };
  return url;
};

/***/ })
/******/ ]);