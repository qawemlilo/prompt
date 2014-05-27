

var Prompt = require('../lib/prompt'); 

var questions = [
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

var moreQuestions = [
    {
        question: 'Favourite Text Editor',
    },
    {
        question: 'Favourite OS',
    },
    {
        question: 'Favourite Beverage',
    }     
];



exports['parse a question object'] = function (test) {
    "use strict";
    
    var cleanQuestion = Prompt.parseQuestion(questions[2]);
    
    test.equal(cleanQuestion.question, 'Age');
    test.equal(cleanQuestion.required, true);
    test.equal(cleanQuestion.filter.call(undefined, '12'), 12);
    test.equal(cleanQuestion.validate.call(undefined, '12'), false);
    
    test.done();
};


exports['read user input'] = function (test) {
    "use strict";

    var profile = new Prompt(questions);

    profile.create().then(function (error, answers) {
        test.equal(error, false);
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



exports['create another instance of Prompt'] = function (test) {
    "use strict";

    var favourites = new Prompt(moreQuestions);

    favourites.create().then(function (error, answers) {
        test.equal(error, false);
        test.equal(answers.FavouriteTextEditor, 'Sublime');
        test.equal(answers.FavouriteOS, 'Ubuntu');
        test.equal(answers.FavouriteBeverage, 'Beer');
                
        test.done();
    });
    
    console.log('');
    process.stdin.emit('data', 'Sublime');
    
    console.log('');
    process.stdin.emit('data', 'Ubuntu');

    console.log('');
    process.stdin.emit('data', 'Beer');
};
