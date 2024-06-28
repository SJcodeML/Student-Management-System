#! /usr/bin/env node
import inquirer from "inquirer";
class Student {
    static counter = 10000; // Initialize the static counter correctly
    id;
    name;
    courses;
    balance;
    constructor(name) {
        this.id = Student.counter++;
        this.name = name;
        this.courses = []; // Initialize an empty array for courses.
        this.balance = 100;
    }
    // Method to enroll a student in a course
    enroll_course(course) {
        this.courses.push(course);
    }
    // Method to see a balance
    view_balance() {
        console.log(`Balance: ${this.name} has $${this.balance} balance`);
    }
    // Method to pay the fees
    pay_fees(amount) {
        this.balance -= amount;
        console.log(`$${amount}: ${this.name} has successfully paid the fee`);
    }
    // Method to show student's status
    stu_status() {
        console.log(`Student ID: ${this.id}`);
        console.log(`Student Name: ${this.name}`);
        console.log(`Student Courses: ${this.courses.join(", ")}`);
        console.log(`Student Balance: ${this.balance}`);
    }
}
// Defining a class that will manage students
class Student_manager {
    students;
    constructor() {
        this.students = [];
    }
    // Method to add a new student
    add_student(name) {
        let student = new Student(name);
        this.students.push(student);
        console.log(`Student: ${name} added successfully, Student ID: ${student.id}`);
    }
    // Method to find a student
    find_student(student_id) {
        return this.students.find(std => std.id === student_id);
    }
    // Method to enroll a student in a course
    enroll_student(student_id, course) {
        let student = this.find_student(student_id);
        if (student) {
            student.enroll_course(course);
            console.log(`${student.name} enrolled in ${course} successfully`);
        }
    }
    // Method to view a student balance
    view_student(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.view_balance();
        }
        else {
            console.log("Student not found, Please enter a correct ID");
        }
    }
    // Method to pay fee
    pay_student_fee(student_id, amount) {
        let student = this.find_student(student_id);
        if (student) {
            student.pay_fees(amount);
        }
        else {
            console.log("Student not found, Please enter a correct ID");
        }
    }
    // Method to show the student status
    show_student_status(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.stu_status();
        }
    }
}
// Main function to run the program
async function main() {
    console.log("Welcome to 'AI Resolution' Student Management System ");
    console.log("-".repeat(50));
    let student_manager = new Student_manager();
    // while loop to keep program running
    while (true) {
        let choice = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: "Select an option.",
                choices: [
                    "Add Student",
                    "Enroll Student",
                    "View Student Balance",
                    "Pay Fee",
                    "Show Student Status",
                    "Exit"
                ]
            }
        ]);
        // using switch case to handle user choice
        switch (choice.choice) {
            case "Add Student":
                let name_input = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: "Enter a Student Name",
                    }
                ]);
                student_manager.add_student(name_input.name);
                break;
            case "Enroll Student":
                let course_input = await inquirer.prompt([
                    {
                        name: "Student_ID",
                        type: "input",
                        message: "Enter student ID",
                    },
                    {
                        name: "course",
                        type: "input",
                        message: "Enter a course Name",
                    }
                ]);
                student_manager.enroll_student(Number(course_input.Student_ID), course_input.course);
                break;
            case "View Student Balance":
                let balance_input = await inquirer.prompt([
                    {
                        name: "view_balance",
                        type: "input",
                        message: "Enter student ID",
                    }
                ]);
                student_manager.view_student(Number(balance_input.view_balance));
                break;
            case "Pay Fee":
                let input_fee = await inquirer.prompt([
                    {
                        name: "Student_ID",
                        type: "input",
                        message: "Enter Student ID Please",
                    },
                    {
                        name: "amount",
                        type: "input",
                        message: "Enter amount please"
                    }
                ]);
                student_manager.pay_student_fee(Number(input_fee.Student_ID), Number(input_fee.amount));
                break;
                student_manager.pay_student_fee(Number(input_fee.Student_ID), Number(input_fee.amount));
            case "Show Student Status":
                let status_input = await inquirer.prompt([
                    {
                        name: "student_ID",
                        type: "input",
                        message: "Enter Student ID Please",
                    }
                ]);
                student_manager.show_student_status(Number(status_input.student_ID));
                break;
            case "Exit":
                console.log("Exiting Process....");
                process.exit();
        }
    }
}
// calling function :
main();
