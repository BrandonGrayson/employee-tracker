var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Prolific1",
  database: "employee_DB"
});

// generate an array of questions
const questions = [
    {
        type: 'list',
        name: 'options',
        message: 'What would you like to do?',
        choices: [
            'Add An Employee',
            'Add a role',
            'Add a Department',
            'View departments',
            'View roles',
            'View employees',
            'Update employee roles'
        ]
    }
]
inquirer.prompt(questions).then(answers => {
    console.log(answers)
})

connection.connect(function(err) {
    if (err) throw err;
    console.log('connection made')
});