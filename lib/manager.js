const Employee = require("./employee");

class Manager extends Employee {
  constructor(name, id, email, officeNumber) {
    super(name, id, email);
    this.officeNumber = officeNumber;
  }
  // *Office number method
  getOfficeNumber() {
    return this.officeNumber;
  }
  // *Role method
  getRole() {
    return 'Manager';
  }
}

// export to other classes for extends
module.exports = Manager;
