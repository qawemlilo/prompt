# Prompt

Simple commandline prompt for Node.js

### Installation

````
npm install simple-prompt 
````

### How to use

````
var prompt = require('simple-prompt');

var questions = [
    {
        question: 'Name',
        
        required: true,
        
        validate: function (answer) {
            return answer.length < 10;
        }
    },
    {
        question: 'Surname'
    },
    {
        question: 'Age',
        
        required: true,
        
        validate: function (answer) {
            return parseInt(answer) >= 18;
        }
    }
];

prompt(questions, function (answers){
    console.log(answers);
});
````