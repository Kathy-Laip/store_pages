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

window.products = [product1, product2, product3, product4, product5, product6, product7, product8, product9,
    product10, product11, product12, product13, product14, product15, product16, product17, product18,
    product19, product20, product21, product22, product23, product24, product25, product26, product27,
    product28, product29, product30, product31, product32, product33, product34, product35, product36,
    product37, product38, product39, product40, product41, product42, product43, product44, product45,
    product46, product47, product48, product49, product50, product51, product52, product53, product54,
    product55, product56, product57, product58, product59, product60, product61, product62, product63,
    product64, product65, product66, product67, product68, product69, product70, product71, product72,
    product73, product74, product75, product76, product77, product78, product79, product80, product81,
    product82, product83, product84]

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
    var pricesText = document.querySelectorAll('.textPrice')

    var dataProduct = data.split(',')
    var mas = []
    for(let i = 0; i < dataProduct.length; i++){
        let masEl = dataProduct[i].split(' ')
        mas.push(masEl)
    }

    for(let i = 0; i < products.length; i++){
        if(mas[i].length === 6){
            products[i].innerHTML = mas[i][1].replace('_',' ') + '<br/>' + 'Бренд: ' + mas[i][2] + '<br/>' + 'Цвет: ' + mas[i][4] + '<br/>' + 'Тип: ' + mas[i][5].replace('"', '').replace('}', '')
        } 
        else if(mas[i].length === 5){
            products[i].innerHTML = mas[i][1].replace('_', ' ') + '<br/>' + 'Бренд: ' + mas[i][2] + '<br/>' + 'Тип: ' + mas[i][4].replace('"', '')
        }
        pricesText[i].innerHTML = 'Цена: ' + mas[i][3] + ' p.'
    }
}

var p1 = 0;var pr2 = 0;var pr3 = 0;var pr4 = 0;var pr5 = 0;var pr6 = 0;var pr7 = 0;var pr8 = 0;var pr9 = 0;var pr10 = 0;var pr11 = 0;var pr12 = 0;
var pr13 = 0;var pr14 = 0;var pr15 = 0;var pr16 = 0;var pr17 = 0;var pr18 = 0;var pr19 = 0;var pr20 = 0;var pr21 = 0;var pr22 = 0;var pr23 = 0;
var pr24 = 0;var pr25 = 0;var pr26 = 0;var pr27 = 0;var pr28 = 0;var pr29 = 0;var pr30 = 0;var pr31 = 0;var pr32 = 0;var pr33 = 0;var pr34 = 0;
var pr35 = 0;var pr36 = 0;var pr37 = 0;var pr38 = 0;var pr39 = 0;var pr40 = 0;var pr41 = 0;var pr42 = 0;var pr43 = 0;var pr44 = 0;var pr45 = 0;
var pr46 = 0;var pr47 = 0;var pr48 = 0;var pr49 = 0;
var pr51 = 0;var pr52 = 0;var pr53 = 0;var pr54 = 0;var pr55 = 0;var pr56 = 0;var pr57 = 0;var pr58 = 0;var pr59 = 0;
var pr60 = 0;var pr61 = 0;var pr62 = 0;var pr63 = 0;var pr64 = 0;var pr65 = 0;var pr66 = 0;var pr67 = 0;var pr68 = 0;var pr69 = 0;
var pr70 = 0;var pr71 = 0;var pr72 = 0;var pr73= 0;var pr74 = 0;var pr75 = 0;var pr76 = 0;var pr77 = 0;var pr78= 0;var pr79 = 0;
var pr80 = 0; var pr81 = 0; var pr82 = 0; var pr83= 0; var pr84 = 0;

document.querySelector('#p2').onclick = async function(){
    pr2 = 2
    aj()
}

document.querySelector('#p1').onclick = async function(){
    p1 = 1
    aj2()
}

document.querySelector('#p3').onclick = async function(){
    pr3 = 3
    aj3()
}

document.querySelector('#p4').onclick = async function(){
    pr4 = 4
    aj4()
}
document.querySelector('#p5').onclick = async function(){
    pr5 = 5
    aj5()
}

document.querySelector('#p6').onclick = async function(){
    pr6 = 6
    aj6()
}

document.querySelector('#p7').onclick = async function(){
    pr7 = 7
    aj7()
}

document.querySelector('#p8').onclick = async function(){
    pr8 = 8
    aj8()
}

document.querySelector('#p9').onclick = async function(){
    pr9 = 9
    aj9()
}

document.querySelector('#p10').onclick = async function(){
    pr10 = 10
    aj10()
}

document.querySelector('#p11').onclick = async function(){
    pr11 = 11
    aj11()
}

document.querySelector('#p12').onclick = async function(){
    pr12 = 12
    aj12()
}

document.querySelector('#p13').onclick = async function(){
    pr13 = 13
    aj13()
}

document.querySelector('#p14').onclick = async function(){
    pr14 = 14
    aj14()
}

document.querySelector('#p15').onclick = async function(){
    pr15 = 15
    aj15()
}

document.querySelector('#p16').onclick = async function(){
    pr16 = 16
    aj16()
}

document.querySelector('#p17').onclick = async function(){
    pr17 = 17
    aj17()
}

document.querySelector('#p18').onclick = async function(){
    pr18 = 18
    aj18()
}

document.querySelector('#p19').onclick = async function(){
    pr19 = 19
    aj19()
}

document.querySelector('#p20').onclick = async function(){
    pr20 = 20
    aj20()
}

document.querySelector('#p21').onclick = async function(){
    pr21 = 21
    aj21()
}

document.querySelector('#p22').onclick = async function(){
    pr22 = 22
    aj22()
}

document.querySelector('#p23').onclick = async function(){
    pr23 = 23
    aj23()
}

document.querySelector('#p24').onclick = async function(){
    pr24 = 24
    aj24()
}

document.querySelector('#p25').onclick = async function(){
    pr25 = 25
    aj25()
}

document.querySelector('#p26').onclick = async function(){
    pr26 = 26
    aj26()
}

document.querySelector('#p27').onclick = async function(){
    pr27 = 27
    aj27()
}

document.querySelector('#p28').onclick = async function(){
    pr28 = 28
    aj28()
}

document.querySelector('#p29').onclick = async function(){
    pr29 = 29
    aj29()
}

document.querySelector('#p30').onclick = async function(){
    pr30 = 30
    aj30()
}

document.querySelector('#p31').onclick = async function(){
    pr31 = 31
    aj31()
}

document.querySelector('#p32').onclick = async function(){
    pr32 = 32
    aj32()
}

document.querySelector('#p33').onclick = async function(){
    pr33 = 33
    aj33()
}

document.querySelector('#p34').onclick = async function(){
    pr34 = 34
    aj34()
}

document.querySelector('#p35').onclick = async function(){
    pr35 = 35
    aj35()
}

document.querySelector('#p36').onclick = async function(){
    pr36 = 36
    aj36()
}

document.querySelector('#p37').onclick = async function(){
    pr37 = 37
    aj37()
}

document.querySelector('#p38').onclick = async function(){
    pr38 = 38
    aj38()
}

document.querySelector('#p39').onclick = async function(){
    pr39 = 39
    aj39()
}

document.querySelector('#p40').onclick = async function(){
    pr40 = 40
    aj40()
}

document.querySelector('#p41').onclick = async function(){
    pr41 = 41
    aj41()
}

document.querySelector('#p42').onclick = async function(){
    pr24 = 42
    aj42()
}

document.querySelector('#p43').onclick = async function(){
    pr43 = 43
    aj43()
}

document.querySelector('#p44').onclick = async function(){
    pr44 = 44
    aj44()
}

document.querySelector('#p45').onclick = async function(){
    pr45 = 45
    aj45()
}

document.querySelector('#p46').onclick = async function(){
    pr46 = 46
    aj46()
}

document.querySelector('#p47').onclick = async function(){
    pr47 = 47
    aj47()
}

document.querySelector('#p48').onclick = async function(){
    pr48 = 48
    aj48()
}

document.querySelector('#p49').onclick = async function(){
    pr49 = 49
    aj49()
}

document.querySelector('#p50').onclick = async function(){
    pr50 = 50
    aj50()
}

document.querySelector('#p51').onclick = async function(){
    pr51 = 51
    aj51()
}

document.querySelector('#p52').onclick = async function(){
    pr52 = 52
    aj52()
}

document.querySelector('#p53').onclick = async function(){
    pr53 = 53
    aj53()
}

document.querySelector('#p54').onclick = async function(){
    pr54 = 54
    aj54()
}

document.querySelector('#p55').onclick = async function(){
    pr55 = 55
    aj55()
}

document.querySelector('#p56').onclick = async function(){
    pr56 = 56
    aj56()
}

document.querySelector('#p57').onclick = async function(){
    pr57 = 57
    aj57()
}

document.querySelector('#p58').onclick = async function(){
    pr58 = 58
    aj58()
}

document.querySelector('#p59').onclick = async function(){
    pr59 = 59
    aj59()
}

document.querySelector('#p60').onclick = async function(){
    pr60 = 60
    aj60()
}

document.querySelector('#p61').onclick = async function(){
    pr61 = 61
    aj61()
}

document.querySelector('#p62').onclick = async function(){
    pr62 = 62
    aj62()
}

document.querySelector('#p63').onclick = async function(){
    pr63 = 63
    aj63()
}

document.querySelector('#p64').onclick = async function(){
    pr64 = 64
    aj65()
}

document.querySelector('#p65').onclick = async function(){
    pr65 = 65
    aj65()
}

document.querySelector('#p66').onclick = async function(){
    pr66 = 66
    aj66()
}

document.querySelector('#p67').onclick = async function(){
    pr67 = 67
    aj67()
}

document.querySelector('#p68').onclick = async function(){
    pr68 = 68
    aj68()
}

document.querySelector('#p69').onclick = async function(){
    pr69 = 69
    aj69()
}

document.querySelector('#p70').onclick = async function(){
    pr70 = 70
    aj70()
}

document.querySelector('#p46').onclick = async function(){
    pr71 = 71
    aj71()
}

document.querySelector('#p72').onclick = async function(){
    pr72 = 72
    aj72()
}

document.querySelector('#p73').onclick = async function(){
    pr73 = 73
    aj73()
}

document.querySelector('#p74').onclick = async function(){
    pr74 = 74
    aj74()
}

document.querySelector('#p75').onclick = async function(){
    pr75 = 75
    aj75()
}

document.querySelector('#p76').onclick = async function(){
    pr76 = 76
    aj76()
}

document.querySelector('#p77').onclick = async function(){
    pr77 = 77
    aj77()
}

document.querySelector('#p78').onclick = async function(){
    pr78 = 78
    aj78()
}

document.querySelector('#p79').onclick = async function(){
    pr79 = 79
    aj79()
}

document.querySelector('#p80').onclick = async function(){
    pr80 = 80
    aj80()
}

document.querySelector('#p81').onclick = async function(){
    pr81 = 81
    aj81()
}

document.querySelector('#p82').onclick = async function(){
    pr82 = 82
    aj82()
}

document.querySelector('#p83').onclick = async function(){
    pr83 = 83
    aj46()
}

document.querySelector('#p84').onclick = async function(){
    pr84 = 84
    aj84()
}





function aj(){
    fetch('/getpr', {
        method: 'POST',
        body: JSON.stringify(pr2),
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'appliction/json'
        }
    })
    .then(function(response){

    })
    .then(function(body){
        console.log(body.pr2)
    })
}


function aj2(){
    fetch('/getpr1', {
        method: 'POST',
        body: JSON.stringify(p1),
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'appliction/json'
        }
    })
    .then(function(response){

    })
    .then(function(body){
        console.log(body.p1)
    })
}

function aj3(){
    fetch('/getpr3', {
        method: 'POST',
        body: JSON.stringify(pr3),
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'appliction/json'
        }
    })
    .then(function(response){

    })
    .then(function(body){
        console.log(body.pr3)
    })
}

function aj4(){
    fetch('/getpr4', {
        method: 'POST',
        body: JSON.stringify(pr4),
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'appliction/json'
        }
    })
    .then(function(response){

    })
    .then(function(body){
        console.log(body.pr4)
    })
}

function aj5(){
    fetch('/getpr5', {
        method: 'POST',
        body: JSON.stringify(pr5),
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'appliction/json'
        }
    })
    .then(function(response){

    })
    .then(function(body){
        console.log(body.pr5)
    })
}

function aj6(){
    fetch('/getpr6', {
        method: 'POST',
        body: JSON.stringify(pr6),
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'appliction/json'
        }
    })
    .then(function(response){

    })
    .then(function(body){
        console.log(body.pr6)
    })
}

function aj7(){
    fetch('/getpr7', {
        method: 'POST',
        body: JSON.stringify(pr7),
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'appliction/json'
        }
    })
    .then(function(response){

    })
    .then(function(body){
        console.log(body.pr7)
    })
}

function aj8(){
    fetch('/getpr8', {
        method: 'POST',
        body: JSON.stringify(pr8),
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'appliction/json'
        }
    })
    .then(function(response){

    })
    .then(function(body){
        console.log(body.pr8)
    })
}

function aj9(){
    fetch('/getpr9', {
        method: 'POST',
        body: JSON.stringify(pr9),
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'appliction/json'
        }
    })
    .then(function(response){

    })
    .then(function(body){
        console.log(body.pr9)
    })
}

function aj10(){
    fetch('/getpr10', {
        method: 'POST',
        body: JSON.stringify(pr10),
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'appliction/json'
        }
    })
    .then(function(response){

    })
    .then(function(body){
        console.log(body.pr10)
    })
}

function aj11(){
    fetch('/getpr11', {
        method: 'POST',
        body: JSON.stringify(pr11),
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'appliction/json'
        }
    })
    .then(function(response){

    })
    .then(function(body){
        console.log(body.pr11)
    })
}

function aj12(){
    fetch('/getpr12', {
        method: 'POST',
        body: JSON.stringify(pr12),
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'appliction/json'
        }
    })
    .then(function(response){

    })
    .then(function(body){
        console.log(body.pr12)
    })
}

function aj13(){
    fetch('/getpr13', {
        method: 'POST',
        body: JSON.stringify(pr13),
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'appliction/json'
        }
    })
    .then(function(response){

    })
    .then(function(body){
        console.log(body.pr13)
    })
}

function aj14(){
    fetch('/getpr14', {
        method: 'POST',
        body: JSON.stringify(pr14),
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'appliction/json'
        }
    })
    .then(function(response){

    })
    .then(function(body){
        console.log(body.pr14)
    })
}

function aj15(){
    fetch('/getpr15', {
        method: 'POST',
        body: JSON.stringify(pr15),
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'appliction/json'
        }
    })
    .then(function(response){

    })
    .then(function(body){
        console.log(body.pr15)
    })
}

function aj16(){
    fetch('/getpr16', {
        method: 'POST',
        body: JSON.stringify(pr16),
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'appliction/json'
        }
    })
    .then(function(response){

    })
    .then(function(body){
        console.log(body.pr16)
    })
}

function aj17(){
    fetch('/getpr17', {
        method: 'POST',
        body: JSON.stringify(pr17),
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'appliction/json'
        }
    })
    .then(function(response){

    })
    .then(function(body){
        console.log(body.pr17)
    })
}

function aj18(){
    fetch('/getpr18', {
        method: 'POST',
        body: JSON.stringify(pr18),
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'appliction/json'
        }
    })
    .then(function(response){

    })
    .then(function(body){
        console.log(body.pr18)
    })
}

function aj19(){
    fetch('/getpr19', {
        method: 'POST',
        body: JSON.stringify(pr19),
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'appliction/json'
        }
    })
    .then(function(response){

    })
    .then(function(body){
        console.log(body.pr19)
    })
}

function aj20(){
    fetch('/getpr20', {
        method: 'POST',
        body: JSON.stringify(pr20),
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'appliction/json'
        }
    })
    .then(function(response){

    })
    .then(function(body){
        console.log(body.pr20)
    })
}

function aj21(){
    fetch('/getpr21', {
        method: 'POST',
        body: JSON.stringify(pr21),
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'appliction/json'
        }
    })
    .then(function(response){

    })
    .then(function(body){
        console.log(body.pr21)
    })
}

function aj22(){
    fetch('/getpr22', {
        method: 'POST',
        body: JSON.stringify(pr22),
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'appliction/json'
        }
    })
    .then(function(response){

    })
    .then(function(body){
        console.log(body.pr22)
    })
}

function aj23(){
    fetch('/getpr23', {
        method: 'POST',
        body: JSON.stringify(pr23),
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'appliction/json'
        }
    })
    .then(function(response){

    })
    .then(function(body){
        console.log(body.pr23)
    })
}

function aj24(){
    fetch('/getpr24', {
        method: 'POST',
        body: JSON.stringify(pr24),
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'appliction/json'
        }
    })
    .then(function(response){

    })
    .then(function(body){
        console.log(body.pr24)
    })
}

function aj25(){
    fetch('/getpr25', {
        method: 'POST',
        body: JSON.stringify(pr25),
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'appliction/json'
        }
    })
    .then(function(response){

    })
    .then(function(body){
        console.log(body.pr25)
    })
}

function aj26(){
    fetch('/getpr26', {
        method: 'POST',
        body: JSON.stringify(pr26),
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'appliction/json'
        }
    })
    .then(function(response){

    })
    .then(function(body){
        console.log(body.pr26)
    })
}
function aj27(){
    fetch('/getpr27', {
        method: 'POST',
        body: JSON.stringify(pr27),
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'appliction/json'
        }
    })
    .then(function(response){

    })
    .then(function(body){
        console.log(body.pr27)
    })
}
function aj28(){
    fetch('/getpr28', {
        method: 'POST',
        body: JSON.stringify(pr28),
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'appliction/json'
        }
    })
    .then(function(response){

    })
    .then(function(body){
        console.log(body.pr28)
    })
}
function aj29(){
    fetch('/getpr29', {
        method: 'POST',
        body: JSON.stringify(pr29),
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'appliction/json'
        }
    })
    .then(function(response){

    })
    .then(function(body){
        console.log(body.pr29)
    })
}
function aj30(){
    fetch('/getpr30', {
        method: 'POST',
        body: JSON.stringify(pr30),
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'appliction/json'
        }
    })
    .then(function(response){

    })
    .then(function(body){
        console.log(body.pr30)
    })
}
function aj31(){
    fetch('/getpr31', {
        method: 'POST',
        body: JSON.stringify(pr31),
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'appliction/json'
        }
    })
    .then(function(response){

    })
    .then(function(body){
        console.log(body.pr31)
    })
}
function aj32(){
    fetch('/getpr32', {
        method: 'POST',
        body: JSON.stringify(pr32),
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'appliction/json'
        }
    })
    .then(function(response){

    })
    .then(function(body){
        console.log(body.pr32)
    })
}
function aj33(){
    fetch('/getpr33', {
        method: 'POST',
        body: JSON.stringify(pr33),
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'appliction/json'
        }
    })
    .then(function(response){

    })
    .then(function(body){
        console.log(body.pr33)
    })
}
function aj34(){
    fetch('/getpr34', {
        method: 'POST',
        body: JSON.stringify(pr34),
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'appliction/json'
        }
    })
    .then(function(response){

    })
    .then(function(body){
        console.log(body.pr34)
    })
}
function aj35(){
    fetch('/getpr35', {
        method: 'POST',
        body: JSON.stringify(pr35),
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'appliction/json'
        }
    })
    .then(function(response){

    })
    .then(function(body){
        console.log(body.pr35)
    })
}
function aj36(){
    fetch('/getpr36', {
        method: 'POST',
        body: JSON.stringify(pr36),
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'appliction/json'
        }
    })
    .then(function(response){

    })
    .then(function(body){
        console.log(body.pr36)
    })
}
function aj37(){
    fetch('/getpr37', {
        method: 'POST',
        body: JSON.stringify(pr37),
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'appliction/json'
        }
    })
    .then(function(response){

    })
    .then(function(body){
        console.log(body.pr37)
    })
}
function aj38(){
    fetch('/getpr38', {
        method: 'POST',
        body: JSON.stringify(pr38),
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'appliction/json'
        }
    })
    .then(function(response){

    })
    .then(function(body){
        console.log(body.pr38)
    })
}
function aj39(){
    fetch('/getpr39', {
        method: 'POST',
        body: JSON.stringify(pr39),
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'appliction/json'
        }
    })
    .then(function(response){

    })
    .then(function(body){
        console.log(body.pr39)
    })
}
function aj40(){
    fetch('/getpr40', {
        method: 'POST',
        body: JSON.stringify(pr40),
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'appliction/json'
        }
    })
    .then(function(response){

    })
    .then(function(body){
        console.log(body.pr40)
    })
}
function aj41(){
    fetch('/getpr41', {
        method: 'POST',
        body: JSON.stringify(pr41),
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'appliction/json'
        }
    })
    .then(function(response){

    })
    .then(function(body){
        console.log(body.pr41)
    })
}
function aj42(){
    fetch('/getpr42', {
        method: 'POST',
        body: JSON.stringify(pr42),
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'appliction/json'
        }
    })
    .then(function(response){

    })
    .then(function(body){
        console.log(body.pr42)
    })
}
function aj43(){
    fetch('/getpr43', {
        method: 'POST',
        body: JSON.stringify(pr43),
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'appliction/json'
        }
    })
    .then(function(response){

    })
    .then(function(body){
        console.log(body.pr43)
    })
}
function aj44(){
    fetch('/getpr44', {
        method: 'POST',
        body: JSON.stringify(pr44),
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'appliction/json'
        }
    })
    .then(function(response){

    })
    .then(function(body){
        console.log(body.pr44)
    })
}
function aj45(){
    fetch('/getpr45', {
        method: 'POST',
        body: JSON.stringify(pr45),
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'appliction/json'
        }
    })
    .then(function(response){

    })
    .then(function(body){
        console.log(body.pr45)
    })
}
function aj46(){
    fetch('/getpr46', {
        method: 'POST',
        body: JSON.stringify(pr46),
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'appliction/json'
        }
    })
    .then(function(response){

    })
    .then(function(body){
        console.log(body.pr46)
    })
}
function aj47(){
    fetch('/getpr47', {
        method: 'POST',
        body: JSON.stringify(pr47),
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'appliction/json'
        }
    })
    .then(function(response){

    })
    .then(function(body){
        console.log(body.pr47)
    })
}
function aj48(){
    fetch('/getpr48', {
        method: 'POST',
        body: JSON.stringify(pr48),
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'appliction/json'
        }
    })
    .then(function(response){

    })
    .then(function(body){
        console.log(body.pr48)
    })
}
function aj49(){
    fetch('/getpr49', {
        method: 'POST',
        body: JSON.stringify(pr49),
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'appliction/json'
        }
    })
    .then(function(response){

    })
    .then(function(body){
        console.log(body.pr49)
    })
}
function aj50(){
    fetch('/getpr50', {
        method: 'POST',
        body: JSON.stringify(pr50),
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'appliction/json'
        }
    })
    .then(function(response){

    })
    .then(function(body){
        console.log(body.pr50)
    })
}
function aj51(){
    fetch('/getpr51', {
        method: 'POST',
        body: JSON.stringify(pr51),
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'appliction/json'
        }
    })
    .then(function(response){

    })
    .then(function(body){
        console.log(body.pr51)
    })
}

function aj52(){
    fetch('/getpr52', {
        method: 'POST',
        body: JSON.stringify(pr52),
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'appliction/json'
        }
    })
    .then(function(response){

    })
    .then(function(body){
        console.log(body.pr52)
    })
}

function aj53(){
    fetch('/getpr53', {
        method: 'POST',
        body: JSON.stringify(pr53),
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'appliction/json'
        }
    })
    .then(function(response){

    })
    .then(function(body){
        console.log(body.pr53)
    })
}

function aj54(){
    fetch('/getpr54', {
        method: 'POST',
        body: JSON.stringify(pr54),
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'appliction/json'
        }
    })
    .then(function(response){

    })
    .then(function(body){
        console.log(body.pr54)
    })
}

function aj55(){
    fetch('/getpr55', {
        method: 'POST',
        body: JSON.stringify(pr55),
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'appliction/json'
        }
    })
    .then(function(response){

    })
    .then(function(body){
        console.log(body.pr55)
    })
}

function aj56(){
    fetch('/getpr56', {
        method: 'POST',
        body: JSON.stringify(pr56),
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'appliction/json'
        }
    })
    .then(function(response){

    })
    .then(function(body){
        console.log(body.pr56)
    })
}

function aj57(){
    fetch('/getpr57', {
        method: 'POST',
        body: JSON.stringify(pr57),
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'appliction/json'
        }
    })
    .then(function(response){

    })
    .then(function(body){
        console.log(body.pr57)
    })
}

function aj58(){
    fetch('/getpr58', {
        method: 'POST',
        body: JSON.stringify(pr58),
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'appliction/json'
        }
    })
    .then(function(response){

    })
    .then(function(body){
        console.log(body.pr58)
    })
}

function aj59(){
    fetch('/getpr59', {
        method: 'POST',
        body: JSON.stringify(pr59),
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'appliction/json'
        }
    })
    .then(function(response){

    })
    .then(function(body){
        console.log(body.pr59)
    })
}

function aj60(){
    fetch('/getpr60', {
        method: 'POST',
        body: JSON.stringify(pr60),
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'appliction/json'
        }
    })
    .then(function(response){

    })
    .then(function(body){
        console.log(body.pr60)
    })
}

function aj61(){
    fetch('/getpr61', {
        method: 'POST',
        body: JSON.stringify(pr61),
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'appliction/json'
        }
    })
    .then(function(response){

    })
    .then(function(body){
        console.log(body.pr61)
    })
}

function aj62(){
    fetch('/getpr62', {
        method: 'POST',
        body: JSON.stringify(pr62),
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'appliction/json'
        }
    })
    .then(function(response){

    })
    .then(function(body){
        console.log(body.pr62)
    })
}

function aj63(){
    fetch('/getpr63', {
        method: 'POST',
        body: JSON.stringify(pr63),
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'appliction/json'
        }
    })
    .then(function(response){

    })
    .then(function(body){
        console.log(body.pr63)
    })
}

function aj64(){
    fetch('/getpr64', {
        method: 'POST',
        body: JSON.stringify(pr64),
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'appliction/json'
        }
    })
    .then(function(response){

    })
    .then(function(body){
        console.log(body.pr64)
    })
}

function aj65(){
    fetch('/getpr65', {
        method: 'POST',
        body: JSON.stringify(pr65),
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'appliction/json'
        }
    })
    .then(function(response){

    })
    .then(function(body){
        console.log(body.pr65)
    })
}

function aj66(){
    fetch('/getpr66', {
        method: 'POST',
        body: JSON.stringify(pr66),
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'appliction/json'
        }
    })
    .then(function(response){

    })
    .then(function(body){
        console.log(body.pr66)
    })
}

function aj67(){
    fetch('/getpr67', {
        method: 'POST',
        body: JSON.stringify(pr67),
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'appliction/json'
        }
    })
    .then(function(response){

    })
    .then(function(body){
        console.log(body.pr67)
    })
}

function aj68(){
    fetch('/getpr68', {
        method: 'POST',
        body: JSON.stringify(pr68),
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'appliction/json'
        }
    })
    .then(function(response){

    })
    .then(function(body){
        console.log(body.pr68)
    })
}

function aj69(){
    fetch('/getpr69', {
        method: 'POST',
        body: JSON.stringify(pr69),
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'appliction/json'
        }
    })
    .then(function(response){

    })
    .then(function(body){
        console.log(body.pr69)
    })
}

function aj70(){
    fetch('/getpr70', {
        method: 'POST',
        body: JSON.stringify(pr70),
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'appliction/json'
        }
    })
    .then(function(response){

    })
    .then(function(body){
        console.log(body.pr70)
    })
}

function aj71(){
    fetch('/getpr51', {
        method: 'POST',
        body: JSON.stringify(pr71),
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'appliction/json'
        }
    })
    .then(function(response){

    })
    .then(function(body){
        console.log(body.pr71)
    })
}

function aj72(){
    fetch('/getpr72', {
        method: 'POST',
        body: JSON.stringify(pr72),
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'appliction/json'
        }
    })
    .then(function(response){

    })
    .then(function(body){
        console.log(body.pr72)
    })
}

function aj73(){
    fetch('/getpr51', {
        method: 'POST',
        body: JSON.stringify(pr73),
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'appliction/json'
        }
    })
    .then(function(response){

    })
    .then(function(body){
        console.log(body.pr73)
    })
}

function aj74(){
    fetch('/getpr51', {
        method: 'POST',
        body: JSON.stringify(pr74),
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'appliction/json'
        }
    })
    .then(function(response){

    })
    .then(function(body){
        console.log(body.pr74)
    })
}

function aj75(){
    fetch('/getpr51', {
        method: 'POST',
        body: JSON.stringify(pr75),
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'appliction/json'
        }
    })
    .then(function(response){

    })
    .then(function(body){
        console.log(body.pr75)
    })
}

function aj76(){
    fetch('/getpr76', {
        method: 'POST',
        body: JSON.stringify(pr76),
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'appliction/json'
        }
    })
    .then(function(response){

    })
    .then(function(body){
        console.log(body.pr76)
    })
}

function aj77(){
    fetch('/getpr77', {
        method: 'POST',
        body: JSON.stringify(pr77),
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'appliction/json'
        }
    })
    .then(function(response){

    })
    .then(function(body){
        console.log(body.pr77)
    })
}

function aj78(){
    fetch('/getpr78', {
        method: 'POST',
        body: JSON.stringify(pr78),
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'appliction/json'
        }
    })
    .then(function(response){

    })
    .then(function(body){
        console.log(body.pr78)
    })
}

function aj79(){
    fetch('/getpr79', {
        method: 'POST',
        body: JSON.stringify(pr79),
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'appliction/json'
        }
    })
    .then(function(response){

    })
    .then(function(body){
        console.log(body.pr79)
    })
}

function aj80(){
    fetch('/getpr80', {
        method: 'POST',
        body: JSON.stringify(pr80),
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'appliction/json'
        }
    })
    .then(function(response){

    })
    .then(function(body){
        console.log(body.pr80)
    })
}

function aj81(){
    fetch('/getpr81', {
        method: 'POST',
        body: JSON.stringify(pr81),
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'appliction/json'
        }
    })
    .then(function(response){

    })
    .then(function(body){
        console.log(body.pr81)
    })
}

function aj82(){
    fetch('/getpr82', {
        method: 'POST',
        body: JSON.stringify(pr82),
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'appliction/json'
        }
    })
    .then(function(response){

    })
    .then(function(body){
        console.log(body.pr82)
    })
}

function aj83(){
    fetch('/getpr83', {
        method: 'POST',
        body: JSON.stringify(pr83),
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'appliction/json'
        }
    })
    .then(function(response){

    })
    .then(function(body){
        console.log(body.pr83)
    })
}

function aj84(){
    fetch('/getpr84', {
        method: 'POST',
        body: JSON.stringify(pr84),
        headers: {
            'Accept' : 'application/json',
            'Content-Type' : 'appliction/json'
        }
    })
    .then(function(response){

    })
    .then(function(body){
        console.log(body.pr84)
    })
}










request.send()




