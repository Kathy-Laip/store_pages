// let datType = document.querySelector('#textType')
// let ColorDisc = document.querySelector('#ColorDiscription')

var request = new XMLHttpRequest()
equest.open('POST', '/catalog.html', true)
request.onload = function(){
    let dataFromDB = request.response
};
console.log(dataFromDB)
request.send()


