
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
    },
    {
        question: 'Gender',
        
        default: 'Male'
    }        
];



exports['parse a question object'] = function (test) {
    "use strict";
    
    var cleanQuestion = prompt.parseQuestion(questions[2]);
    
    test.equal(cleanQuestion.question, 'Age');
    test.equal(cleanQuestion.required, true);
    test.equal(cleanQuestion.filter.call(undefined, '12'), 12);
    test.equal(cleanQuestion.validate.call(undefined, '12'), false);
    
    test.done();
};


exports['read user input'] = function (test) {
    "use strict";

    prompt(questions, function (answers) {
        test.equal(answers.Name, 'John');
        test.equal(answers.Surname, 'Doe');
        test.equal(answers.Age, 27);
        test.equal(answers.Gender, 'Male');
        
        console.log('\n' + answers.Name + ' ' + answers.Surname + ' ' + answers.Age + '\n');
        
        test.done();
    });
    
    console.log('');
    process.stdin.emit('data', 'John');
    
    console.log('');
    process.stdin.emit('data', 'Doe');
    
    console.log('');
    process.stdin.emit('data', '27');
    
    console.log('');
    process.stdin.emit('data', false);
};
