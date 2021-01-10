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
    console.log('connected as id ' + connection.threadId);
    runSearch()
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
        'View department',
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
  
        case "Add a role":
          addRole();
          break;
  
        case "Add a Department":
          addDepartment();
          break;
  
        case "View department":
          viewDepartment();
          break;
  
        case "View roles":
          connection.end();
          break;

          case "View employees":
            multiSearch();
            break;
    
          case "Update employee roles":
            rangeSearch();
            break;
        }
      });
}

// addEmployee function
function addEmployee () {
    console.log('they selected to add employee')
    // ask for employee info 
    inquirer.prompt(
        [
            {
                type: 'input',
                name: 'first_name',
                message: 'What is the Employees first name?'
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'What is the Employees last name?'
            },
            {
                type: 'input',
                name: 'role',
                message: 'What is the Employees role_id?',
  
            },
            {
                type: 'input',
                name: 'manager_id',
                message: 'Who is the Employees manager_id?',
            },

        ]
    ).then(answers => {
        let newEmployee = new Employee(answers.first_name, answers.last_name, answers.role, answers.manager_id)
        console.table(newEmployee)
        
        // insert new Employee into mysql
        // 
        var query = connection.query("INSERT INTO employee SET ? ", newEmployee, function (err, res) {
            if (err) throw err;

        })
        console.log('DONE--->')
        runSearch()
    })
    // create a new instance of employee

}

function addRole () {
    console.log('They selected to add a role')
    // find out which role they want to add
    inquirer.prompt([
        {
            type: 'input',
            name: 'employee',
            message: 'What is the new role you want to add?'
        },
    ]).then(answers => {
        console.log(answers)
        // add new role to role table
      
    })
    // find that role in data and update it
    // figure out which employee they want to add a role for
    connection.end()
}