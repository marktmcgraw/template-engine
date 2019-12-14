const Employee = require("./employee");

class Intern extends Employee {
  constructor(name, id, email, school) {
    super(name, id, email);
    this.school = school;
  }
  // *School Method
  getSchool() {
    return this.school;
  }
  // *Role Method
  getRole() {
    return "Intern";
  }
}

// export to other classes for extends
module.exports = Intern;
