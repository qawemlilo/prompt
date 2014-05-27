/*
 * Simple Prompt
 * https://github.com/qawemlilo/prompt
 *
 * Copyright (c) 2013 Qawelesizwe
 * Licensed under the MIT license.
 */


var util = require('util');
var EventEmitter = require('events').EventEmitter;



/*
 * Prompt constructor
 * @param - question {String}
 * @param - fn {Function} - callback function that accepts an answer     
**/
function Prompt(ques) {
    "use strict";

    this.questions = ques.slice();
    this.stdin = process.stdin;
    this.stdout = process.stdout;
    this.answers = {};
 
    this.stdin.setEncoding('utf8');
}


/*
 * Inherit from EventEmitter
**/
util.inherits(Prompt, EventEmitter);




/*
 * Parses a question passed by the user
 * @param: question {Object} - a question object with three properties, question, required, and validate
 * @returns: {Object}
**/
function parseQuestion(question) {
    "use strict";
    
    var Q = {};
    
    if (question.validate) {
        Q.validate = question.validate;
    } else {
        Q.validate = function (answer) {return true;};
    }
    
    if (question.filter) {
        Q.filter = question.filter;
    } else {
        Q.filter = false;
    }
    
    if (question.required) {
        Q.required = true;
    } else {
        Q.required = false;
    }
    
    
    if (question.question) {
        Q.question = question.question;
    } else {
        Q.question = undefined;
    }
    
    if (question.default) {
        Q.default = question.default;
    } else {
        Q.default = false;
    }
    
    return Q;
}



/*
 * Removes spaces from a string
 * @param: aKey {String} 
 * @returns: {String} - returns a string with spaces removed
**/
function parseKey(aKey) {
    if (aKey.split(' ').length > 1) {
        aKey = aKey.split(' ').join('');
    }

    return aKey;
}


/*
 * Mimicks a promise method
**/
Prompt.prototype.then = function (fn) {
  
  this.on('complete', fn);
  this.on('error', fn);

  return this;
};



/*
 * Initializes the prompt
 * @param: ques {Array} - an array of question objects
**/
Prompt.prototype.create = function (ques) {
    "use strict";

    var self = this;

    if (ques && questions.length > 0) {
        self.questions = ques;
    }
    
    /*
     * Commandline prompt function
     * @param: question {String}
     * @param: fn {Function} - callback function that accepts an answer     
    **/
    function prompt(question, fn) {
        self.stdin.resume();
        self.stdout.write(question + ": ");

        self.stdin.once('data', function(answer) {
            if (answer) {
                fn(answer.trim());
            }
            else {
                fn(false);
            }
        });
    }

    
    

    /*
       Recursive function for asking questions. Exits when questions queue is empty
       
       @param - question {String}
       @param - fn {Function} - callback function that accepts an answer     
    */    
    function ask(repeat) {
        if (!self.questions.length && !repeat) {
            self.stdin.end();

            self.emit('complete', false, self.answers);

            return self;
        }
        
        var question, next, Q;
        
        if (!repeat) {
            question = self.questions.shift();
            next = parseQuestion(question);
        } else {
            next = repeat;
        }
        
        if (next.error) {
            Q = next.question + ' (' + next.error + ')';
        } else {
            Q = next.question;
        }
    
        prompt(Q, function (answer) {
            var og;
            
            // accept default values
            if (!answer && next.default) {
                answer = next.default;
            }
            
            if (next.required && !answer) {
            
                //clone original question
                og = JSON.parse(JSON.stringify(next));
                
                next.og = og;
                next.error = 'required';
                
                return ask(next);
            }
            else if (!next.validate.call(undefined, answer)) {

                //clone original question
                og = JSON.parse(JSON.stringify(next));
                
                next.og = og;
                next.error = 'invalid';
                
                return ask(next);
            }
            else {
                var aKey = '';

                if (next.filter) {
                    answer = next.filter.call(undefined, answer);
                }
                
                if (repeat) {
                    aKey = parseKey(next.og.question);

                    self.answers[aKey] = answer;
                } 
                else {
                    aKey = parseKey(next.question);

                    self.answers[aKey] = answer;
                }
                
                ask();
            }
        });
    }

    ask();

    return self;
};


module.exports = Prompt;
module.exports.parseQuestion = parseQuestion;