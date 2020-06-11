const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "myteam.html");

const render = require("./lib/htmlRenderer");

const teamMembers = []

const employeeType = [
  {
    type: "list",
    name: "employeeType",
    message: "What type of employee would you like to add?",
    default: "engineer",
    choices: [
      "engineer",
      "intern",
      "manager"
    ]
  }
]

const engineerPrompts = [
  {
    type: "input",
    name: "name",
    message: "What is the engineer's name?"
  },
  {
    type: "input",
    name: "email",
    message: "What is the engineer's email?"
  },
  {
    type: "number",
    name: "id",
    message: "What is the engineer's ID number?"
  },
  {
    type: "input",
    name: "github",
    message: "What is the engineer's GitHub username?"
  }
]

const internPrompts = [
  {
    type: "input",
    name: "name",
    message: "What is the intern's name?"
  },
  {
    type: "input",
    name: "email",
    message: "What is the intern's email?"
  },
  {
    type: "number",
    name: "id",
    message: "What is the intern's ID number?"
  },
  {
    type: "input",
    name: "school",
    message: "What school does the intern go to?"
  }
]

const managerPrompts = [
  {
    type: "input",
    name: "name",
    message: "Manager name?"
  },
  {
    type: "input",
    name: "email",
    message: "Manager email?"
  },
  {
    type: "number",
    name: "id",
    message: "Manager ID number?"
  },
  {
    type: "number",
    name: 'phone',
    message: "Manager office number?"
  }
]

const addMore = [
  {
    type: "list",
    name: "continue",
    message: "Add another employee?",
    default: "no",
    choices: [
      "yes",
      "no"
    ]
  }
]

const moreMembers = () => {
  inquirer.prompt(addMore).then(function(data){
    if (data.continue === "yes"){
      getEmployeeData()
    } else {
      writeToFile(teamMembers);
    }
  })
}

const engineerQuestions = () => {
  inquirer.prompt(engineerPrompts).then(function(data) {
    let engineer = new Engineer(data.name, data.id, data.email, data.github)
    teamMembers.push(engineer);
    moreMembers();
  })
}

const internQuestions = () => {
  inquirer.prompt(internPrompts).then(function(data) {
    let intern = new Intern(data.name, data.id, data.email, data.school)
    teamMembers.push(intern);
    moreMembers();
  })
}

const managerQuestions = () => {
  inquirer.prompt(managerPrompts).then(function(data) {
    let manager = new Manager(data.name, data.id, data.email, data.phone)
    teamMembers.push(manager);
    moreMembers();
  })
}

const getEmployeeData = () => {
  inquirer.prompt(employeeType).then(function(data) {
    if (data.employeeType === 'engineer'){
      engineerQuestions()
    } else if (data.employeeType === 'intern'){
      internQuestions()
    } else if (data.employeeType === 'manager'){
      managerQuestions();
    }
  })
}

const writeToFile = (data) => {
  fs.writeFile("./output/team.html", render(data), (err) => {
    if (err) {
      return console.log(err);
    }
    console.log("---Team Member Added---")
  })
}

getEmployeeData();
