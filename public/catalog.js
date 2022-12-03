let productOne = document.querySelector('#textProduct1')

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
    productOne.innerHTML = mas[0] + '<br/>' + 'Бренд: ' + mas[1] + '<br/>' + 'Тип: ' + mas[2]
}

request.send()




