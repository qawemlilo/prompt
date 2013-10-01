/*
 * Prompt
 * https://github.com/q/duma
 *
 * Copyright (c) 2013 Qawelesizwe
 * Licensed under the MIT license.
 */
 
"use strict";

var prompt = require('./lib/prompt');


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
            return answer.length < 6;
        }
    }
];


prompt(questions, function (answers){
    console.log(answers);
});