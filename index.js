const inquirer = require('inquirer')

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