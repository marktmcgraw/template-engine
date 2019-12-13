class Employee {
    constructor(name, id, email, role='Employee'){
        this.name = name;
        this.id = id;
        this.email = email;
        this.role = role;
}

// * Name method
    getName(){
    return this.name;
    }

// * ID method
    getId(){
        return this.id;
    }

// * email method
    getEmail(){
        return this.email;
    }

// * role method --> return 'Employee'

    getRole(){
    return this.role;
    }


}

//export to other classes for extends
module.exports =  Employee;