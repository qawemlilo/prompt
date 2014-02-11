# Simple Prompt
> Simple commandline prompt for Node.js

While working on a Node.js automation tool I needed to generate some files and code after asking the user a few questions. Most of the modules that I found were a bit of an over-kill, all I wanted was a good old prompt (the browser type :)) so I decided to write this module. 

### Installation

````
npm install simple-prompt 
````

### How to use

Simple prompt accepts an array of `question objects`

````
var prompt = require('simple-prompt');

var questions = [
    {
        question: 'Name',
        
        required: true // required
        
        default: 'John' // default value
    },
    {
        question: 'Surname' //optional
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

prompt(questions, function (answers) {
    console.log(answers);
});
````

### Questin object
The `question object` has 4 properties that you can specify:

 - question (String)- label for your question and key for your answer.
 - default (String)- default value if answer is not given.
 - required (Boolean) - flag to indicated if input is required.
 - validate (Function) - a function that accepts a string and returns a boolean value after testing it.
 - filter (Function) - a function that accepts a string and returns it after doing operations on it.
 
 
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
