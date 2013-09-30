
"use strict";

function prompt(question, callback) {
    "use strict";
    
    var stdin = process.stdin, stdout = process.stdout;

    stdin.resume();
    stdout.write(question + ": ");

    stdin.once('data', function(data) {
        data = data.toString().trim();
        callback(stdin, data);
    });
}


module.exports = function (questions) {
    var prompts = Object.create({});
    
    questions.forEach(function (question) {
        var validate = question.va    
    });
};