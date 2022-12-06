let product1 = document.querySelector('#textPos1')
let product2 = document.querySelector('#textPos2')
let product3 = document.querySelector('#textPos3')
let product4 = document.querySelector('#textPos4')
let product5 = document.querySelector('#textPos5')
let product6 = document.querySelector('#textPos6')
let product7 = document.querySelector('#textPos7')
let product8 = document.querySelector('#textPos8')
let product9 = document.querySelector('#textPos9')
let product10 = document.querySelector('#textPos10')
let product11 = document.querySelector('#textPos11')
let product12 = document.querySelector('#textPos12')
let product13 = document.querySelector('#textPos13')
let product14 = document.querySelector('#textPos14')
let product15 = document.querySelector('#textPos15')
let product16 = document.querySelector('#textPos16')
let product17 = document.querySelector('#textPos17')
let product18 = document.querySelector('#textPos18')
let product19 = document.querySelector('#textPos19')
let product20 = document.querySelector('#textPos20')
let product21 = document.querySelector('#textPos21')
let product22 = document.querySelector('#textPos22')
let product23 = document.querySelector('#textPos23')
let product24 = document.querySelector('#textPos24')
let product25 = document.querySelector('#textPos25')
let product26 = document.querySelector('#textPos26')
let product27 = document.querySelector('#textPos27')
let product28 = document.querySelector('#textPos28')
let product29 = document.querySelector('#textPos29')
let product30 = document.querySelector('#textPos30')
let product31 = document.querySelector('#textPos31')
let product32 = document.querySelector('#textPos32')
let product33 = document.querySelector('#textPos33')
let product34 = document.querySelector('#textPos34')
let product35 = document.querySelector('#textPos35')
let product36 = document.querySelector('#textPos36')
let product37 = document.querySelector('#textPos37')
let product38 = document.querySelector('#textPos38')
let product39 = document.querySelector('#textPos39')
let product40 = document.querySelector('#textPos40')
let product41 = document.querySelector('#textPos41')
let product42 = document.querySelector('#textPos42')
let product43 = document.querySelector('#textPos43')
let product44 = document.querySelector('#textPos44')
let product45 = document.querySelector('#textPos45')
let product46 = document.querySelector('#textPos46')
let product47 = document.querySelector('#textPos47')
let product48 = document.querySelector('#textPos48')
let product49 = document.querySelector('#textPos49')
let product50 = document.querySelector('#textPos50')
let product51 = document.querySelector('#textPos51')
let product52 = document.querySelector('#textPos52')
let product53 = document.querySelector('#textPos53')
let product54 = document.querySelector('#textPos54')
let product55 = document.querySelector('#textPos55')
let product56 = document.querySelector('#textPos56')
let product57 = document.querySelector('#textPos57')
let product58 = document.querySelector('#textPos58')
let product59 = document.querySelector('#textPos59')
let product60 = document.querySelector('#textPos60')
let product61 = document.querySelector('#textPos61')
let product62 = document.querySelector('#textPos62')
let product63 = document.querySelector('#textPos63')
let product64 = document.querySelector('#textPos64')
let product65 = document.querySelector('#textPos65')
let product66 = document.querySelector('#textPos66')
let product67 = document.querySelector('#textPos67')
let product68 = document.querySelector('#textPos68')
let product69 = document.querySelector('#textPos69')
let product70 = document.querySelector('#textPos70')
let product71 = document.querySelector('#textPos71')
let product72 = document.querySelector('#textPos72')
let product73 = document.querySelector('#textPos73')
let product74 = document.querySelector('#textPos74')
let product75 = document.querySelector('#textPos75')
let product76 = document.querySelector('#textPos76')
let product77 = document.querySelector('#textPos77')
let product78 = document.querySelector('#textPos78')
let product79 = document.querySelector('#textPos79')
let product80 = document.querySelector('#textPos80')
let product81 = document.querySelector('#textPos81')
let product82 = document.querySelector('#textPos82')
let product83 = document.querySelector('#textPos83')
let product84 = document.querySelector('#textPos84')

var products = [product1, product2, product3, product4, product5, product6, product7, product8, product9,
    product10, product11, product12, product13, product14, product15, product16, product17, product18,
    product19, product20, product21, product22, product23, product24, product25, product26, product27,
    product28, product29, product30, product31, product32, product33, product34, product35, product36,
    product37, product38, product39, product40, product41, product42, product43, product44, product45,
    product46, product47, product48, product49, product50, product51, product52, product53, product54,
    product55, product56, product57, product58, product59, product60, product61, product62, product63,
    product64, product65, product66, product67, product68, product69, product70, product71, product72,
    product73, product74, product75, product76, product77, product78, product79, product80, product81,
    product82, product83, product84]

// var priceText = document.querySelectorAll('.textPrice')
// console.log(priceText.innerText)

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

async function pr1(data){
    var dataProduct = data.split(',')
    var mas = []
    for(let i = 0; i < dataProduct.length; i++){
        let masEl = dataProduct[i].split(' ')
        mas.push(masEl)
    }
    console.log(mas)
    for(let i = 0; i < products.length; i++){
        if(mas[i].length === 5){
            products[i].innerHTML = mas[i][1].replace('_',' ') + '<br/>' + 'Бренд: ' + mas[i][2] + '<br/>' + 'Цвет: ' + mas[i][3] + '<br/>' + 'Тип: ' + mas[i][4].replace('"', '').replace('}', '')
        } 
        else if(mas[i].length === 4){
            products[i].innerHTML = mas[i][1].replace('_', ' ') + '<br/>' + 'Бренд: ' + mas[i][2] + '<br/>' + 'Тип: ' + mas[i][3].replace('"', '')
        }
    }
    
}

request.send()




