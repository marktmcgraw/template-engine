// Constructors List
const Employee = require("./lib/employee");
const Manager = require("./lib/manager");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");

// Required NPMs
const axios = require("axios");
const Inquirer = require("inquirer");
const Jest = require("jest");
const path = require("path");
const fs = require("fs");

const startQuestion = [
  {
    type: "list",
    message: "Select an option to begin.",
    name: "startQuestion",
    choices: [
      "Add an employee to the team",
      "Create the team HTML page (Add 1 team member first)"
    ]
  }
];

const adminQuestions = [
  {
    type: "input",
    message: "What is your name?",
    name: "name"
  },
  {
    type: "input",
    message: "What is your employee id number?",
    name: "id"
  },
  {
    type: "input",
    message: "What is your email?",
    name: "email"
  },

  {
    type: "confirm",
    message: "Are you a manager?",
    name: "position",
    choices: ["Yes", "No"]
  }
];

const questions = [
  {
    type: "input",
    message: "What is the employee's name?",
    name: "name"
  },
  {
    type: "input",
    message: "What is the employee's ID number?",
    name: "id"
  },
  {
    type: "input",
    message: "What is the employee's email address?",
    name: "email"
  },
  {
    type: "list",
    message: "What is the employee's title?",
    name: "title",
    choices: ["engineer", "intern"]
  }
];

const managerQuestion = [
  {
    type: "input",
    message: "What is your office number?",
    name: "officeNumber"
  }
];

const engineerQuestion = [
  {
    type: "input",
    message: "What is the engineer's GitHUb username?",
    name: "gitname"
  }
];

const internQuestion = [
  {
    type: "input",
    message: "What school does your intern attend?",
    name: "school"
  }
];

let managerArr = [];
let engineerArr = [];
let internArr = [];
let employeeInfo = [];

let start = async function adminStart() {
  await Inquirer.prompt(startQuestion);
  await Inquirer.prompt(adminQuestions)
  .then(async function(userData) {
    let managerInfo = {
      name: userData.name,
      id: JSON.parse(userData.id),
      email: userData.email,
      role: "employee", 
      title: "manager",
      officeNumber: "",
      gitname: "",
      github: "",
      school: ""
    };

    if ((position = true)) {
      employeeInfo.push(managerInfo);
      newemp();
    }
  });
};

let input = async function init() {
  await Inquirer.prompt(questions)
  .then(async function(userData) {
    let userInfo = {
      name: userData.name,
      id: JSON.parse(userData.id),
      email: userData.email,
      role: "employee",
      title: userData.title,
      officeNumber: "",
      gitname: "",
      github: "",
      school: ""
    };
    employeeInfo.push(userInfo);
    newemp();
  });
};

let next = async function adminNext() {
  await Inquirer.prompt(startQuestion).then(async function(answers) {
    if (answers.startQuestion === "Add an employee to the team") {
      employeeInfo.length = 0;
      input();
    }
    if (
      answers.startQuestion ===
      "Create the team HTML page (Add 1 team member first)"
    ) {
      createteam();
    }
  });
};

let newemp = async function employeeprofile() {
  const name = employeeInfo[0].name;
  const id = employeeInfo[0].id;
  const email = employeeInfo[0].email;
  const role = employeeInfo[0].role;

  const employee = new Employee(name, id, email, role);
  classdir();
};

let classdir = async function bytitle() {
  if (employeeInfo[0].title === "manager") {
    buildManager();
  }
  if (employeeInfo[0].title === "engineer") {
    buildEngineer();
  }
  if (employeeInfo[0].title === "intern") {
    buildIntern();
  }
};

async function buildManager() {
  await Inquirer.prompt(managerQuestion)
  .then(async function(userData) {
    let managerAns = {
      officeNumber: JSON.parse(userData.officeNumber)
    };
    employeeInfo[0].officeNumber = managerAns.officeNumber;

    const name = employeeInfo[0].name;
    const id = employeeInfo[0].id;
    const email = employeeInfo[0].email;
    const role = employeeInfo[0].role;
    const officeNumber = employeeInfo[0].officeNumber;

    const manager = new Manager(name, id, email, officeNumber);
    managerArr.push(manager);
  });
  
  next();
}

async function buildEngineer() {
  await Inquirer.prompt(engineerQuestion)

    .then(async function(userData) {
      let engineerInfo = {
        gitname: userData.gitname
      };
      employeeInfo[0].gitname = engineerInfo.gitname;
    })
    .then(async function() {
      const gitname = employeeInfo[0].gitname;
      let queryURL = "https://api.github.com/users/" + gitname;
      axios.get(queryURL).then(async function(response) {
        const engineerInfo = {
          github: response.data.login
        };

        employeeInfo[0].github = engineerInfo.github;
      });
    });
  setTimeout(function() {
    const name = employeeInfo[0].name;
    const id = employeeInfo[0].id;
    const email = employeeInfo[0].email;
    const role = employeeInfo[0].role;
    const gitname = employeeInfo[0].gitname;
    const github = employeeInfo[0].github;

    const engineer = new Engineer(name, id, email, gitname, github);

    engineerArr.push(engineer);
  }, 2000);

  next();
}

async function buildIntern() {
  await Inquirer.prompt(internQuestion)
  .then(async function(userData) {
    let internInfo = {
      school: userData.school
    };
    employeeInfo[0].school = internInfo.school;
  });
  const name = employeeInfo[0].name;
  const id = employeeInfo[0].id;
  const email = employeeInfo[0].email;
  const role = employeeInfo[0].role;
  const school = employeeInfo[0].school;

  const intern = new Intern(name, id, email, school);
  internArr.push(intern);
  next();
}
createteam = async function teamHTML() {
  fs.writeFileSync(
    "./output/team.html",
    "<DOCTYPE! HTML>" +
      "<html>" +
      "<head>" +
      '<meta charset="UTF-8">' +
      '<link rel = "stylesheet" type= "text/css" href="style.css">' +
      '<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous"/>' +
      '<meta name="viewport" content="width=device-width, initial-scale=1.0"/> ' +
      '<meta http-equiv="X-UA-Compatible" content="ie=edge" />' +
      "</head>" +
      "<body>" +
      "<header>" +
      '<h1 class="teamname"> Employee Team Summary </h1>' +
      "</header>" +
      "<container>" +
      '<div class="row">' +
      '<div class="col">'
  );

  fs.appendFileSync(
    "./output/team.html",
    '<div id="manager">' +
      '<div class="card">' +
      '<div class="card-header managerstyle">' +
      managerArr[0].name +
      "</div>" +
      '<div class="card-body">' +
      "<div class=content>" +
      "<p>" +
      "<span> ID: </span>" +
      managerArr[0].id +
      "</p> <hr>" +
      "<p>" +
      "<span> Email: </span>" +
      managerArr[0].email +
      "</p> <hr>" +
      "<p>" +
      "<span> Office Number: </span>" +
      managerArr[0].officeNumber +
      "</p>" +
      "</div>" +
      "</div>" +
      '<div class="card-footer managerstyle">' +
      "Manager" +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>"
  );

  for (i = 0; i < engineerArr.length; i++) {
    fs.appendFileSync(
      "./output/team.html",
      '<div id="engineer">' +
        '<div class="card">' +
        '<div class="card-header engingeerstyle">' +
        engineerArr[i].name +
        "</div>" +
        '<div class="card-body">' +
        "<div class=content>" +
        "<p>" +
        "<span> ID: </span>" +
        engineerArr[i].id +
        "</p> <hr>" +
        "<p>" +
        "<span> Email: </span>" +
        engineerArr[i].email +
        "</p> <hr>" +
        "<p>" +
        "<span> Office Number: </span>" +
        engineerArr[i].gitname +
        "</p>" +
        "</div>" +
        "</div>" +
        '<div class="card-footer engingeerstyle"> Engineer </div>' +
        "</div>" +
        "</div>" +
        "</div>"
    );
  }

  for (i = 0; i < internArr.length; i++) {
    fs.appendFileSync(
      "./output/team.html",
      '<div id="intern">' +
        '<div class="card">' +
        '<div class="card-header internstyle">' +
        internArr[i].name +
        "</div>" +
        '<div class="card-body">' +
        "<div class=content>" +
        "<p>" +
        "<span> ID: </span>" +
        internArr[i].id +
        "</p><hr>" +
        "<p>" +
        "<span> Email: </span>" +
        internArr[i].email +
        "</p><hr>" +
        "<p>" +
        "<span> Office Number: </span>" +
        internArr[i].school +
        "</p>" +
        "</div>" +
        "</div>" +
        '<div class="card-footer internstyle"> Intern </div>' +
        "</div>" +
        "</div>" +
        "</div>"
    );
  }

  fs.appendFileSync(
    "./output/team.html",
    "</div>" + "</div>" + "</container>" + "</body>" + "</html>"
  );

  console.log("Check output folder for employee team");
};

start();



