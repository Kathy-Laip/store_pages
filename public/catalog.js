let datType = document.querySelector('#textType')
let ColorDisc = document.querySelector('#ColorDiscription')

var request = new XMLHttpRequest()
request.open('POST', '/catalog.html')
request.onload = function(){
    datType.textContent = request.response
};
request.send()

request.open('POST', '/catalog.html')
request.onload = function(){
    ColorDisc.textContent = request.response
};

request.send()
