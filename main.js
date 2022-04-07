$(document).ready(function () {

    if (JSON.parse(localStorage.getItem("currentLOG"))) {
        $("#welcome").show()
        $("#messageWelcome").text(`welcome ${JSON.parse(localStorage.getItem("currentLOG")).name}`)
        $("#nav").hide()
    }

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

    $("#logout").click(function (e) {
        localStorage.removeItem("currentLOG")
        location.reload();
    })









})