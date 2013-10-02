
"use strict";

var prompt = require('simple-prompt');

var questions = [
    {
        question: 'Name',
        
        required: true // required
    },
    {
        question: 'Surname' //optional
    },
    {
        question: 'Gender',
        
        required: true, // required
        
        validate: function (answer) { // white list
            switch (answer) {
                case 'm':
                case 'M':
                case 'f':
                case 'F':
                case 'male':
                case 'Male':
                case 'female':
                case 'Female':
                    return true;
                break;
                
                default: 
                    return false;
            }
        }
    },
    {
        question: 'Age',
        
        required: true, // required
        
        validate: function (answer) {        
            return parseInt(answer, 10) >= 18; // 18 or higher
        },
        
        filter: function (answer) {
            return parseInt(answer, 10); // bring back my answer as a number
        }
    }
];


prompt(questions, function (answers){
    console.log(answers);
});