
function Student() {
    return {
        firstName: "",
        lastName: "",
        email: "",
        age: "",
        skills: { html: false, css: false, js: false, jquery: false },
        addStudent: addStudent,
        addSkill: addSkill,
        modifStudent: modifStudent,
    }
}
var addStudent = function (firstName, lastName, email, age) {
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
    this.age = age
}
var addSkill = function (key, value) {
    this.skills[key] = value
}
var modifStudent = function (key, value) {

    [key] = value
}
function printskills(object, i) {
    var result = ''
    for (var key in object) {
        var check = ''
        if (object[key]) {
            check = "checked"
        }
        result += `<div class="form-check form-check-inline">
            <input ${check} style="margin-left:10px" class="form-check-input" type="checkbox" value="${key}" id="${key}${i}"><label class="form-check-label" for="${key}">${key.toUpperCase()}</label>
        </div>`
    }
    return result
}
function skilladd(n) {
    var temp = JSON.parse(localStorage.getItem("students"))
    for (var key in temp[n].skills) {
        console.log($(`#${key}${n}`).is(':checked'));

        if ($(`#${key}${n}`).is(':checked')) {
            console.log("hello");
            temp[n].skills[key] = true
        }
        else {

            temp[n].skills[key] = false
        }
    }
    localStorage.setItem("students", JSON.stringify(temp))
}
function test(student,cond1,cond2,cond3,cond4){
    var result=true
    if(cond1){
        result=result&&student.html
    }
    if(cond2){
        result=result&&student.css
    }
    if(cond3){
        result=result&&student.js
    }
    if(cond4){
        result=result&&student.jquery
    }
    return result
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
    students.forEach((element, i) => {
        $("tbody").append(` <tr><th scope="row">${i + 1}</th>
        <td colspan="1">${element.firstName}</td>
        <td colspan="1">${element.lastName}</td>
        <td colspan="1">${element.age}</td>
        <td colspan="1">${element.email}</td>
        <td colspan="1"><button onclick="skilladd(${i})" id="skill${i}" type="button" class="btn btn-primary">Add Skill</button>
        
        ${printskills(element.skills, i)}
        
        </td>
        </tr>`)
    });
    // search button
    $("#searchStudent").click(function (e) {
        var students = JSON.parse(localStorage.getItem("students"))
        var newTable = ""
        filterdArray = students.filter(student => 
            ( student.lastName.includes($('#search-input').val())
            || student.firstName.includes($('#search-input').val()))
             && ((student.skills.html === $("#searchHtml").is(':checked'))
             || (student.skills.css === $("#searchCss").is(':checked'))
             || (student.skills.js === $("#searchJs").is(':checked'))
             || (student.skills.jquery === $("#searchJquery").is(':checked')))
            )
            
        filterdArray.forEach((element, i) => {
            newTable += (` <tr><th scope="row">${i + 1}</th>
            <td colspan="1">${element.firstName}</td>
            <td colspan="1">${element.lastName}</td>
            <td colspan="1">${element.age}</td>
            <td colspan="1">${element.email}</td>
            <td colspan="1"><button onclick="skilladd(${i})" id="skill${i}" type="button" class="btn btn-primary">Add Skill</button>
            
            ${printskills(element.skills, i)}

            </td>
            </tr>`)
        });
        $("tbody").replaceWith(newTable)


    })
    // display students stored in the delet select
    var students = JSON.parse(localStorage.getItem("students"))
    students.forEach((element, i) => {
        $("#toDelete").append(`<option value="${i}">${element.firstName} ${element.lastName}</option>`)

    });
    // delete button
    $("#deleteValidation").click(function (e) {
        if (!JSON.parse(localStorage.getItem("students"))) {
            $("#toDelete").replaceWith("<p class='error'>no student to delete</p>")
        }
        else
            var temp = JSON.parse(localStorage.getItem("students"))
        temp.splice($("#toDelete").val(), 1)
        localStorage.setItem("students", JSON.stringify(temp))
        location.reload();
    })





})