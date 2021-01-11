const mysql = require("mysql");
const inquirer = require("inquirer");
const Employee = require('./lib/employee');
const addNewRole = require('./lib/add-roles')
const Department = require('./lib/department')

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
          viewRoles();
          break;

          case "View employees":
            viewEmployees();
            break;
    
          case "Update employee roles":
            updateEmployee();
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
            message: 'What is the id for this role?'
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
          message: 'What is the department id?'
        },
    ]).then(answers => {
      // use constructor function to create a new role 
      // convert id and department_id to integers
      answers.id = parseInt(answers.id)
      answers.department_id = parseInt(answers.department_id)

      let newRole = new addNewRole(answers.id, answers.title, answers.salary, answers.department_id)
      connection.query("INSERT INTO roles Set ?", newRole, function (err, res) {
        if (err) throw err
      })
        console.table(newRole)
        console.log('This New Role has been sent for review!')
        // add new role to role table
    })  
    // find that role in data and update it
    // figure out which employee they want to add a role for
    
}

function addDepartment () {
  console.log('They selected to add a Department')
  inquirer.prompt([
    {
        type: 'input',
        name: 'id',
        message: 'What is the id for this department?'
    },
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of this department?'
    },
  ]).then(answers => {
      answers.id = parseInt(answers.id)
      let newDepartment = new Department(answers.id, answers.name)
      connection.query("INSERT INTO department Set ?", newDepartment, function (err, res) {
      if (err) throw err
    })
    console.table(answers)
  })
}

function queryEmployees() {
  return new Promise (resolve => {
    let data = connection.query("SELECT first_name, last_name, role_id, manager_id, title, salary, department_id FROM employee_DB.employee AS E JOIN employee_DB.roles AS R ON E.role_id = R.id;", function (err, res) {
      if (err) throw err
      console.table(res)
      resolve('resolved')
      // return data
    })
  })
}

async function viewEmployees () {
  const result = await queryEmployees()
  console.log(result)
  // JSON.parse(query)
}

function queryDepartments() {
  return new Promise (resolve => {
    let data = connection.query("SELECT department_name, department_id FROM employee_DB.department AS D JOIN employee_DB.roles AS R ON D.id = R.id", function (err, res) {
      if (err) throw err
      console.table(res)
      resolve('resolved')
      // return data
    })
  })
}

async function viewDepartment () {
  const result = await queryDepartments()
  console.log(result)
  // JSON.parse(query)
}

function queryRoles() {
  return new Promise (resolve => {
    let data = connection.query("SELECT title, salary, department_id, department_name FROM employee_DB.roles AS R JOIN employee_DB.department AS D ON R.id = D.id;", function (err, res) {
      if (err) throw err
      console.table(res)
      resolve('resolved')
      // return data
    })
  })
}

async function viewRoles () {
  const result = await queryRoles()
  console.log(result)
  // JSON.parse(query)
}


