const Employee = require("./employee");

class Engineer extends Employee {
  constructor(name, id, email, gitHub) {
    super(name, id, email);
    this.gitHub = gitHub;
  }
  // *GitHub method
  getGithub() {
    return this.gitHub;
  }
  // *Role method
  getRole() {
    return "Engineer";
  }
}

// export to other classes for extends
module.exports = Engineer;
