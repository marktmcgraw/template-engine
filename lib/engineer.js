const Employee = require("./employee");

class Engineer extends Employee {
  constructor(name, id, email, github) {
    super(name, id, email);
    this.github = github;
  }

  // * Github method
  getGithub() {
    return this.github;
  }
  // * Role method
  getRole() {
    return "Engineer";
  }
}

// export to other classes for extends
module.exports = Engineer;
