var lg = document.getElementsByTagName("input")[0];
var pas = document.getElementsByTagName("input")[1];
var surname = document.getElementsByTagName("input")[2];

const data = {
    login: lg.value,
    password: pas.value,
    surname: surname.value
}

console.log(data)
