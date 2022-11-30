let datType = document.querySelector('#textType')
// datType.innerHTML = {{typeD}}

var request = new XMLHttpRequest()
request.open('POST', '/catalog.html')
request.onload = function(){
    datType.textContent = request.response['type1']
};

request.send()