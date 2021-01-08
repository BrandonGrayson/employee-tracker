const mysql = require("mysql");
const inquirer = require("inquirer");
const Employee = require('./lib/employee')

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Prolific1",
  database: "employee_DB"
});

connection.connect(function(err) {
    if (err) throw err;
    runSearch()
    console.log('connection made')
});

function runSearch() {
    inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        'Add An Employee',
        'Add a role',
        'Add a Department',
        'View departments',
        'View roles',
        'View employees',
        'Update employee roles'
      ]
    })
    .then(function(answer) {
        switch (answer.action) {
        case "Add An Employee":
          addEmployee();
          break;
  
        // case "Add a role":
        //   multiSearch();
        //   break;
  
        // case "Add a Department":
        //   rangeSearch();
        //   break;
  
        // case "View departments":
        //   songSearch();
        //   break;
  
        // case "View roles":
        //   connection.end();
        //   break;

        //   case "View employees":
        //     multiSearch();
        //     break;
    
        //   case "Update employee roles":
        //     rangeSearch();
        //     break;
        }
      });
}


// generate an array of questions