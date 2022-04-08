
function Student() {
    return {
        firstName: "",
        lastName: "",
        email: "",
        age: "",
        skills: [],
        addStudent: addStudent,
        addSkill: addSkill,
        modifStudent: modifStudent
    }
}
var addStudent = function (firstName, lastName, email, age) {
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
    this.age = age
}
var addSkill = function (skill) {
    this.skills.push(skill)
}
var modifStudent = function (key, value) {
    this[key] = value
}



$(document).ready(function () {

    if (JSON.parse(localStorage.getItem("currentLOG"))) {
        $("#welcome").show()
        $(".logedin").show()
        $("#messageWelcome").text(`welcome ${JSON.parse(localStorage.getItem("currentLOG")).name}`)
        $("#nav").hide()
    }
    // button add student function
    $("#validateAdd").click(function (e) {
        if (!JSON.parse(localStorage.getItem("students"))) {
            localStorage.setItem("students", JSON.stringify([]))

        }
        var temp = JSON.parse(localStorage.getItem("students"))
        if ($("#firstName").val() !== "" && $("#lastName").val() !== "" && $("#email").val() !== "") {
            var student = Student()
            student.addStudent($("#firstName").val(), $("#lastName").val(), $("#email").val(), $("#age").val())
            temp.push(student)
            localStorage.setItem("students", JSON.stringify(temp))
            location.reload();
        }
        $("#addFormError").show()

    })
    // button login function
    $("#login").click(function (e) {
        var userName = $("#userName").val()
        var pwd = $("#password").val()
        var db = JSON.parse(localStorage.getItem("teachers"))
        for (let i = 0; i < db.length; i++) {
            if (db[i].name === userName) {
                if (db[i].pwd === pwd) {
                    localStorage.setItem("currentLOG", JSON.stringify(db[i]))
                    location.reload();
                }
                else {
                    $("#pwdError").show()
                }
            }
            else {
                $("#nameError").show()
            }
        }
    })
    // button logout function
    $("#logout").click(function (e) {
        localStorage.removeItem("currentLOG")
        location.reload();
    })
    //add student to a table from array of student using each ES6 syntax arrow function
    var students = JSON.parse(localStorage.getItem("students"))   
    students.forEach((element,i) => {
        $("tbody").append(` <tr><th scope="row">${i + 1}</th>
        <td colspan="1">${element.firstName}</td>
        <td colspan="1">${element.lastName}</td>
        <td colspan="1">${element.age}</td>
        <td colspan="1">${element.email}</td>
        <td colspan="2">${element.skills}</td>
        </tr>`)
    });

    $("#searchStudent").click(function (e) {
        var students = JSON.parse(localStorage.getItem("students"))   
        var newTable=""
        filterdArray=students.filter(student => student.lastName.includes($('#search-input').val()) || student.firstName.includes($('#search-input').val()))
        filterdArray.forEach((element,i) => {
            newTable+=(` <tr><th scope="row">${i + 1}</th>
            <td colspan="1">${element.firstName}</td>
            <td colspan="1">${element.lastName}</td>
            <td colspan="1">${element.age}</td>
            <td colspan="1">${element.email}</td>
            <td colspan="2">${element.skills}</td>
            </tr>`)
        });
        $("tbody").replaceWith(newTable)
        
        
    })

    var students = JSON.parse(localStorage.getItem("students"))   
    students.forEach((element,i) => {
        $("#toDelete").append(`<option value="${i}">${element.firstName} ${element.lastName}</option>`)

    });





})