
"use strict";

var prompt = require('../lib/prompt'), 
    questions;


questions = [
    {
        question: 'Name',
        
        required: true // required
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
        }
    }
];



exports['parse a question object'] = function (test) {
    var cleanQuestion = prompt.parseQuestion(questions[2]);
    
    test.equal(cleanQuestion.question, 'Age');
    
    test.done();
};


exports['read user input'] = function (test) {

    prompt(questions, function (answers) {
        test.equal(answers.Name, 'John');
        test.equal(answers.Surname, 'Doe');
        test.equal(answers.Age, 27);
        
        console.log('\n' + answers.Name + ' ' + answers.Surname + ' ' + answers.Age + '\n');
        
        test.done();
    });
    
    console.log('');
    process.stdin.emit('data', 'John');
    
    console.log('');
    process.stdin.emit('data', 'Doe');
    
    console.log('');
    process.stdin.emit('data', '27');
};
