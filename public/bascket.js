var request = new XMLHttpRequest()
request.open('POST', '/bascket.html', true)

const pic = new Promise((resolve, reject) => {
    request.onload = function(){
        var dataFromDBOne = request.responseText
        resolve(dataFromDBOne)
    }
}).then(dataProductsss => {
    // console.log(dataProducts)
    der(dataProductsss)
})

async function der(data){
    //var total = document.getElementById('total')
    const listProducts = []
    var masData = data.split(',')
    var masOfMas = []
    for(let i = 0; i < masData.length; i++){
            var masElem = masData[i].split(' ')
            masElem[0] = masElem[0].slice(-1)
            listProducts.push(masElem[0])
            masElem[2] = masElem[2].replace('_','').replace('}','')
            masElem[masElem.length - 1] = masElem[masElem.length - 1].replace('"','').replace('}','')
            //masElem[5] = masElem[5].replace('"','').replace('}','')
            masOfMas.push(masElem)
    }
    console.log(masOfMas)
    for(let i = 0; i < masOfMas.length; i++){
        if(listProducts.includes(masOfMas[i][0])){
                var main = document.querySelector('#main')
                var str = `<div class="cl"><div class="text" class="p">${masOfMas[i][1]}, ${masOfMas[i][2]}, ${masOfMas[i][3]}, ${masOfMas[i][4]}, </div><div class="text3" class="pr">${masOfMas[i][5]} рублей</div></div>`
                //var str1 = `${masOfMas[i][5]}`
                main.innerHTML += str 
        }
    }
}

request.send()
// var main = document.querySelector('#main')
//     var str = '<div class="cl"><div class="text" class="p"></div><div class="text3" class="pr"></div></div>'
//     main.innerHTML += str 

// let response = await fetch('http://localhost/bascket.html')

// if (responce.ok){
//     let json= await response.json()
// } else {
//     alert('ошибка' + response.status)
// }