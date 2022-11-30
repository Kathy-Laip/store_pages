let datType = document.querySelector('#textType')

var request = new XMLHttpRequest()
request.open('POST', '/catalog.html')
request.onload = function(){
    datType.textContent = request.response
};

request.send()