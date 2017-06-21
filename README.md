# urlparamify

> Parse all kinds of urls, simple or otherwise. Returns a modifiable JSON object that can be converted to a string.

[![NPM](https://nodei.co/npm/urlparamify.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/urlparamify/)

[![Build Status](https://travis-ci.org/kaustubhhiware/urlparamify.svg?branch=master)](https://travis-ci.org/kaustubhhiware/urlparamify) [![Coverage Status](https://coveralls.io/repos/github/kaustubhhiware/urlparamify/badge.svg?branch=master)](https://coveralls.io/github/kaustubhhiware/urlparamify?branch=master)

## The why

Primary goal: Keep urls modifiable, without worrying about anything else.
Allow for modifying urls, and generating a neat url with accomodated changes.

Often you might be parsing urls, modifying some parameter using strings,
and the whole system looks messy. [`urlparamify`](https://www.npmjs.com/package/urlparamify)
seeks to solve that problem. Just give it a string, which is converted
into JSON modifiable form. Mess up any way you want to with the parameters,
playing around with the params, and just call a `Url.toString()` to get your modified url.

Now you don't need to worry about `google.com`, `http://google.com`, `/path?search=data`, 
`urlparamify` has got you covered.

One of the legit feedbacks I received on [reddit](https://www.reddit.com/r/node/comments/6e2bga/urlparamify_parse_all_kinds_of_url_simple_and/) 
was how is this module any different from the core url module ?

Unlike the core `url`, `urlparamify` accepts any kind of url like mentioned 
above, whereas `url` works only when a url of the format `http://google.com` is 
provided. I started off working on a task with `url` itself, but the multiple 
fallacies in url (url.parse('http://google.com') for instance, along with 
multiple urls mentioned in this test suite) and other interactions suggested me 
to make a url suited to these requirements. An instance of this module's sturdiness 
can be seen in Usage and examples below.

Find a url that breaks this module ? Let me know.


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

## Usage and examples
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

// let's put a smile on that face
> h.queryParams.d = 'happy';
> h.toString();
'http://google.com/path1?q=data&d=happy#hash'

// let's try adding new query parameters
> h.queryParams.new = 'wow';
> h.toString();
'http://google.com/path1?q=data&d=happy&new=wow#hash'

// I don't like hashtags. Get rid of it
> h.hash = "";
> h.toString();
'http://google.com/path1?q=data&d=sad&new=wow'

// But what if I want to add things that were never there to begin with ?
// With urlparamify, you can not only modify, but also add new parameters with ease
> var g = Url('google.com')
> g.toString()
'google.com'
> g.path = 'somepath'
> g.toString()
'google.com/somepath'
> g.queryParams.search = 'data'
> g.toString()
'google.com/somepath?search=data'

```

## Tests

    npm test
    npm run cover
    istanbul cover test/test.js // The results are stored in coverage/


The source files are in [`src`](src/), and the distribution files are in [`dist`](dist/). Transpiled the code for ease.

A little reminder for myself: When ready to deploy, at a clean git history,

    npm version patch -m "Version %s - add sweet badges"
    major.minor.patch : 1.1.0

If you want to publish your own module, [this article on Medium](https://medium.com/@jdaudier/how-to-create-and-publish-your-first-node-js-module-444e7585b738) is a great place to start.


## License

MIT © [Kaustubh Hiware](https://kaustubhhiware.github.io)
