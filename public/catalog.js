let productOne = document.querySelector('#textProduct1')

var request = new XMLHttpRequest()
request.open('POST', '/catalog.html', true)
request.onload = function(){
    var dataFromDB = request.responseText
    // productOne.textContent = '' + dataFromDB[0]["type"] + '\n' + 'Цвет: ' + dataFromDB[0]["discription"] + '\n' + 'Тип: ' + dataFromDB[1]["discription"] + '\n' + 'Бренд: ' + dataFromDB[0]["brand"]
    return dataFromDB
}

request.send()



