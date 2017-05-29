# urlparamify

> Simply parse urls, no matter how stupid they look.

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

    href: The original input string
    protocol: http / https
    host: 

## Usage

    > var h = Url('http://google.com/path1?q=data&d=sad#hash')

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

    > h.toString()
    'http://google.com/path1?q=data&d=sad#hash'

## Tests

    npm test
    npm run cover

## License

MIT © [Kaustubh Hiware](https://kaustubhhiware.github.io)
