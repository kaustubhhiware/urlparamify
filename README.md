# urlparamify

Simply parse urls, no matter how stupid they look. Primary goal: Keep urls
modifiable, without worrying about anything else. Allow for modifying urls,
and generating a neat url with accomodated changes.

## Installation

    npm install urlparamify

## Usage

    var h = Url('http://google.com/path1?q=data&d=sad#hash')

    h.toString()

## Tests

    npm test
