
"use strict";

var questions = [];
var answers = Object.create({});
var stdin = process.stdin; 
var stdout = process.stdout;

function prompt(question, fn) {
    "use strict";

    stdin.resume();
    stdout.write(question + ": ");

    stdin.once('data', function(answer) {
        answer = answer.toString().trim();
        fn(answer);
    });
}


function ask(question, fn) {
    
    var question = questions.shift();
    
    prompt(question.question, handleAnswer);
}


function handleAnswer(question, answer) {
    if (!question.validate.call(undefined, answer)) {
        prompt(question.question, handleAnswer);          
    }  
};



module.exports = function (args) {
    "use strict";
    
    questions = args;

    if (!questions.length) {
        stdin.end();
        return;
    }

    stdin.resume();
    stdout.write(question + ": ");

    stdin.once('data', function(data) {
        data = data.toString().trim();
        answers[question] = data;
        prompt();
    });
};


