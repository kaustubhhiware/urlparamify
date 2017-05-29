# urlparamify

> Simply parameterise urls, no matter how stupid they look.

[![Build Status](https://travis-ci.org/kaustubhhiware/urlparamify.svg?branch=master)](https://travis-ci.org/kaustubhhiware/urlparamify) [![Coverage Status](https://coveralls.io/repos/github/kaustubhhiware/urlparamify/badge.svg?branch=master)](https://coveralls.io/github/kaustubhhiware/urlparamify?branch=master)

## The why

Primary goal: Keep urls modifiable, without worrying about anything else.
Allow for modifying urls, and generating a neat url with accomodated changes.

Often you might be parsing urls, modifying some parameter using strings,
and the whole system looks messy. [`urlparamify`](https://www.npmjs.com/package/urlparamify)
seeks to solve that problem. Just give it a original string, which is converted
into JSON modifiable form. Mess up any way you want to with the parameters,
playing around with the params, and just call a `Url.toString()` to get your modified url.

## Installation

    $ npm install urlparamify

## Structure

Each url is broken down into the following components:

* `href` : The original input string
* `protocol` : http / https request protocol
* `host` : what website / localhost ip,port combination
* `baseurl` : The base url of the url to be queried.
* `path` : Path section of the URL
* `query` : The query part of the url, unaltered
* `queryParams` : A json object to modify/add to your query

Apart from this, each url object has the following functions:

* `getBaseurl()`: Get the latest baseurl parameter
* `toString()` : Convert our url object into a neatly formatted string.

Refer to [Usage](#usage) for an example.

## Usage
```js
> var Url = require('urlparamify');
> var h = Url('http://google.com/path1?q=data&d=sad#hash');

> h
{ href: 'http://google.com/path1/?q=data&d=sad#hash',
protocol: 'http',
host: 'google.com',
baseurl: 'http://google.com',
path: 'path1',
query: 'q=data&d=sad',
queryParams: { q: 'data', d: 'sad' },
hash: 'hash',
getBaseurl: [Function],
toString: [Function] }

> h.toString();
'http://google.com/path1?q=data&d=sad#hash'

// now let's play around a bit
> h.queryParams.q = 'diary';
> h.toString();
'http://google.com/path1?q=diary&d=sad#hash'

// let's try adding new query parameters
> h.queryParams.new = 'wow';
> h.toString();
'http://google.com/path1?q=data&d=sad&new=wow#hash'

// I don't like hashtags. Get rid of it
> h.hash = "";
> h.toString();
'http://google.com/path1?q=data&d=sad&new=wow'
```

## Tests

    npm test
    npm run cover


 A little reminder for myself: When ready to deploy, at a clean git history,

    npm version patch -m "Version %s - add sweet badges"
    major.minor.patch : 1.1.0

If you want to publish your own module, [this article on Medium](https://medium.com/@jdaudier/how-to-create-and-publish-your-first-node-js-module-444e7585b738) is a great place to start.


## License

MIT © [Kaustubh Hiware](https://kaustubhhiware.github.io)
