# Simple Prompt
> Simple commandline prompt for Node.js

[![Build Status](https://travis-ci.org/qawemlilo/prompt.png)](https://travis-ci.org/qawemlilo/prompt)

While working on a Node.js automation tool I needed to generate some files and code after gathering a few details from the user. Most of the modules that I found were a bit of an over-kill, all I wanted was a good old prompt (like the browser type) so I wrote this module. 

### v0.2.0 API Changes
Version 0.2.0 breaks the 0.1.x API. If you want to use the old API please install v0.1.6.
The new version  allows you create multiple `simple-prompt` instances run independently.

### Installation

````
npm install simple-prompt 
````

### How to use

Simple prompt accepts an array of `question objects`

```javascript
var Prompt = require('simple-prompt');

var questions = [
    {
        question: 'Name',
        
        required: true, // required
        
        default: 'John' // default value
    },
    {
        question: 'Last Name' //optional
    },
    {
        question: 'Age',
        
        required: true, // required
        
        validate: function (answer) {
            return parseInt(answer, 10) >= 18; // only 18 or higher
        },
        
        filter: function (answer) {
            return parseInt(answer, 10); // bring back my answer as a number
        },
        
        default: 18 // default value
    }
];


var profile = new Prompt(questions);

profile.create().then(function (error, answers) {
  if (error) {
   return;
  }

  var name = answers.Name;
  var lastName = answers.LastName;
  var age = answers.Age;

  // Do something with values
});


var moreQuestions = [
    {
        question: 'Favourite Text Editor',
    },
    {
        question: 'Favourite OS',
    },
    {
        question: 'Favourite Beverage',
    }
];

var favourites = new Prompt(moreQuestions);

favourites.create().then(function (error, answers) {
  if (error) {
   return;
  }

  var editor = answers.FavouriteTextEditor;
  var os = answers.FavouriteOS;
  var beverage = answers.FavouriteBeverage;

  // Do something with values
});

````

### Question object
The `question object` has 4 properties that you can specify:

 - question (String)- label for your question and key for your answer.
 - default (String)- default value if answer is not given.
 - required (Boolean) - flag to indicated if input is required.
 - validate (Function) - a function that accepts a string and returns a boolean value after testing it.
 - filter (Function) - a function that accepts a string and returns it after doing operations on it.


### Methods
Simple-prompt only has 2 methods:

 - .create {Function} - Initializes the prompt and returns the main object
 - .then {Function}(callback {Function}) - Mimicks a promise callback method that accepts a function which takes 2 arguments, error and a return value, respectively.
 
### Testing
```
npm test
```



## License

(MIT License)

Copyright (c) 2013 Qawelesizwe Mlilo <qawemlilo@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
