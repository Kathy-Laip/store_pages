let productOne = document.querySelector('#textPos')

var request = new XMLHttpRequest()
request.open('POST', '/catalog.html', true)

const p = new Promise((resolve, reject) => {
    request.onload = function(){
        var dataFromDB = request.responseText
        resolve(dataFromDB)
    }
}).then(dataProducts => {
    // console.log(dataProducts)
    pr1(dataProducts)
})

function pr1(data){
    var dataProduct = data.split(',')
    dataProduct[0] = dataProduct[0].slice(8, dataProduct[0].length - 1)
    var mas = dataProduct[0].split(' ')
    console.log(mas)
    productOne.innerHTML = mas[0] + '<br/>' + 'Бренд: ' + mas[1] + '<br/>' + 'Цвет: ' + mas[2] + '<br/>' + 'Тип: ' + mas[3]
}

request.send()




