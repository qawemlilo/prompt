/*
 * Prompt
 * https://github.com/qawemlilo/prompt
 *
 * Copyright (c) 2013 Qawelesizwe
 * Licensed under the MIT license.
 */
 
"use strict";


/*
   Parses a question passed by the module user
   
   @param - question (Object) - a question object with three properties, question, required, and validate
   @returns - Object
*/
function parseQuestion(question) {
    var Q = Object.create({});
    
    if (question.validate) {
        Q.validate = question.validate;
    } else {
        Q.validate = function (answer) {return true;};
    }
    
    if (question.required) {
        Q.required = true;
    } else {
        Q.required = false;
    }
    
    
    if (question.question) {
        Q.question = question.question;
    } else {
        Q.question = 'undefined';
    }
    
    return Q;
}



module.exports = function (ques, done) {
    "use strict";
    
    var questions = ques.slice(),
        stdin = process.stdin,
        stdout = process.stdout,
        answers = Object.create({});
    
    
    /*
       Commandline prompt function
       @param - question (String)
       @param - fn (Function) - callback function that accepts an answer     
    */
    function prompt(question, fn) {
        "use strict";

        stdin.resume();
        stdout.write(question + ": ");

        stdin.once('data', function(answer) {
            fn(answer.toString().trim());
        });
    }
    

    /*
       Recursive function for asking questions. Exits when questions queue is empty
       @param - question (String)
       @param - fn (Function) - callback function that accepts an answer     
    */    
    function ask(repeat) {
        if (!questions.length) {
            stdin.end();
            return done(answers);
        }
        
        var question, next;
        
        if (!repeat) {
            question = questions.shift();
            next = parseQuestion(question);
        }
        else {
            next = repeat;
        }
    
        prompt(next.question, function (answer) {
           
            if (next.required && !answer) {
            
                //clone original question
                var og = JSON.parse(JSON.stringify(next));
                
                next.og = og;
                next.question = next.question += ' (required)';
                
                return ask(next);
            }
            
            else if (!next.validate.call(undefined, answer)) {
            
                //clone original question
                var og = JSON.parse(JSON.stringify(next));
                
                next.og = og;
                next.question = next.question += ' (invalid)';
                
                return ask(next);
            }
            
            else {
                if (repeat) {
                    answers[next.og.question] = answer;
                } 
                else {
                    answers[next.question] = answer;
                }
                
                ask();
            }
        });
    }
    
    ask();
};


