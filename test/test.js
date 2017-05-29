'use strict';

var assert = require('assert');
var urlparamify = require('../index');

var Expected = {
  'http://google.com' : {
    href: 'http://google.com',
    protocol: 'http',
    host: 'google.com',
    baseurl: 'http://google.com',
    path: '',
    query: '',
    queryParams: {},
    hash: null,
    getBaseurl: 'http://google.com',
    toString: 'http://google.com?'
  },

  'http://google.com/' : { 
    href: 'http://google.com/',
    protocol: 'http',
    host: 'google.com',
    baseurl: 'http://google.com',
    path: '',
    query: '',
    queryParams: {},
    hash: null,
    getBaseurl: 'http://google.com',
    toString: 'http://google.com?'
  },

  'google.com': {
    href: 'google.com',
    protocol: '',
    host: 'google.com',
    baseurl: 'google.com',
    path: '',
    query: '',
    queryParams: {},
    hash: null,
    getBaseurl: 'google.com',
    toString: 'google.com?'
  },

  'http://google.com/path' : {
    href: 'http://google.com/path',
    protocol: 'http',
    host: 'google.com',
    baseurl: 'http://google.com',
    path: 'path',
    query: '',
    queryParams: {},
    hash: null,
    getBaseurl: 'http://google.com',
    toString: 'http://google.com/path?'
  },

  'http://google.com/path/path1?q=data' : {
    href: 'http://google.com/path/path1?q=data',
    protocol: 'http',
    host: 'google.com',
    baseurl: 'http://google.com',
    path: 'path/path1',
    query: 'q=data',
    queryParams: { q: 'data' },
    hash: null,
    getBaseurl: 'http://google.com',
    toString: 'http://google.com/path/path1?q=data'
  },

  'https://localhost:3000' : {
    href: 'https://localhost:3000',
    protocol: 'https',
    host: 'localhost:3000',
    baseurl: 'https://localhost:3000',
    path: '',
    query: '',
    queryParams: {},
    hash: null,
    getBaseurl: 'https://localhost:3000',
    toString: 'https://localhost:3000?'
  },

  'http://127.0.0.1:8080/path?q=entity' : {
   href: 'http://127.0.0.1:8080/path?q=entity',
    protocol: 'http',
    host: '127.0.0.1:8080',
    baseurl: 'http://127.0.0.1:8080',
    path: 'path',
    query: 'q=entity',
    queryParams: { q: 'entity' },
    hash: null,
    getBaseurl: 'http://127.0.0.1:8080',
    toString: 'http://127.0.0.1:8080/path?q=entity'
  },

  'http://google.com/path?q=data&h=lang' : {
    href: 'http://google.com/path?q=data&h=lang',
    protocol: 'http',
    host: 'google.com',
    baseurl: 'http://google.com',
    path: 'path',
    query: 'q=data&h=lang',
    queryParams: { q: 'data', h: 'lang' },
    hash: null,
    getBaseurl: 'http://google.com',
    toString: 'http://google.com/path?q=data&h=lang'
  },

  'http://google.com/page?id=["1234","5678"]' : {
    href: 'http://google.com/page?id=["1234","5678"]',
    protocol: 'http',
    host: 'google.com',
    baseurl: 'http://google.com',
    path: 'page',
    query: 'id=["1234","5678"]',
    queryParams: { id: [ '1234', '5678' ] },
    hash: null,
    getBaseurl: 'http://google.com',
    toString: 'http://google.com/page?id=["1234","5678"]'
  },

  'http://google.com/path?q=data#top' : {
    href: 'http://google.com/path?q=data#top',
    protocol: 'http',
    host: 'google.com',
    baseurl: 'http://google.com',
    path: 'path',
    query: 'q=data',
    queryParams: { q: 'data' },
    hash: 'top',
    getBaseurl: 'http://google.com',
    toString: 'http://google.com/path?q=data#top'
  },

  'www.something.net/?q=data' : {
    href: 'www.something.net/?q=data',
    protocol: '',
    host: 'www.something.net',
    baseurl: 'www.something.net',
    path: '',
    query: 'q=data',
    queryParams: { q: 'data' },
    hash: null,
    getBaseurl: 'www.something.net',
    toString: 'www.something.net?q=data'
  },

  'google.com/path/?q=[1,2]': {
    href: 'google.com/path/?q=[1,2]',
    protocol: '',
    host: 'google.com',
    baseurl: 'google.com',
    path: 'path',
    query: 'q=[1,2]',
    queryParams: { q: [ 1, 2 ] },
    hash: null,
    getBaseurl: 'google.com',
    toString: 'google.com/path?q=[1,2]' 
  },

  '/path?q=data' : {
    href: '/path/?q=data',
    protocol: '',
    host: '',
    baseurl: '',
    path: 'path',
    query: 'q=data',
    queryParams: { q: 'data' },
    hash: null,
    getBaseurl: '',
    toString: '/path?q=data'

  },

  // reference to q={}
  'google.com/path?q={"c":1}' : {
    href: 'google.com/path/?q={"c":1}',
    protocol: '',
    host: 'google.com',
    baseurl: 'google.com',
    path: 'path',
    query: 'q={"c":1}',
    queryParams: { q: { c: 1 } },
    hash: null,
    getBaseurl: 'google.com',
    toString: 'google.com/path?q={"c":1}'
  },

  // reference to q=[{}]
  '/path?sort=[{"top":"desc"}]&limit=50&debug=true': {
    href: '/path/?sort=[{"top":"desc"}]&limit=50&debug=true',
    protocol: '',
    host: '',
    baseurl: '',
    path: 'path',
    query: 'sort=[{"top":"desc"}]&limit=50&debug=true',
    queryParams: { sort: [ [Object] ], limit: 50, debug: true },
    hash: null,
    getBaseurl: '',
    toString: '/path?sort=[{"top":"desc"}]&limit=50&debug=true'
  },

};

Object.keys(Expected).forEach(function(u) {
  var result = urlparamify(u);
  var expected = Expected[u];

  Object.keys(result).forEach(function (i) {
    if (expected[i] === undefined && result[i] === null) {
      expected[i] = null;
    }
  });

  for(var i = 0; i < 8; i++) {
    assert.equal(result[0], expected[0]);
  }
  assert.equal(result.getBaseurl(), expected.getBaseurl);
  assert.equal(result.toString(), expected.toString);

});
