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
                type: 'list',
                name: 'role',
                message: 'What is the Employees role?',
                choices: [
                  'Accountant',
                  'Developer',
                  'Engineer',
                ]
  
            },
            {
                type: 'list',
                name: 'manager',
                message: 'Who is the Employees manager?',
                choices: [
                  'Chris Rock',
                  'Dave Chappelle',
                  'Kevin Hart'
                ]
            },
        ]
    ).then(answers => {
      // console.log(answers)
      switch (answers.role) {
        case "Accountant":
          answers.role = 1
          break;
  
        case "Developer":
          answers.role = 2
          break;
  
        case "Engineer":
          answers.role = 3
          break;
      }

      switch (answers.manager) {
        case "Chris Rock":
          answers.manager = 4
          break;
  
        case "Dave Chappelle":
          answers.manager = 5
          break;
  
        case "Kevin Hart":
          answers.manager = 6
          break; 
      }
        let newEmployee = new Employee(answers.first_name, answers.last_name, answers.role, answers.manager)
        console.table(newEmployee)
        
        // insert new Employee into mysql
        // 
        connection.query("INSERT INTO employee SET ? ", newEmployee, function (err, res) {
            if (err) throw err;

        })
        
        runSearch()
        console.log(answers)
        console.log('DONE--->')
        connection.end()
    })
    // create a new instance of employee

}

function addRole () {
    console.log('They selected to add a role')
    // find out which role they want to add
    inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'What is the id for the new role?'
        },
        {
          type: 'input',
          name: 'title',
          message: 'What is the name of this role?'
        },
        {
          type: 'input',
          name: 'salary',
          message: 'What is the Salary for this role?'
        },
        {
          type: 'input',
          name: 'department_id',
          message: 'What is the name of this role?'
        },
    ]).then(answers => {
        console.log(answers)
        // add new role to role table
      
    })
    // find that role in data and update it
    // figure out which employee they want to add a role for
    connection.end()
}