var request = new XMLHttpRequest()
request.open('POST', '/entrance.html', true)

const p = new Promise((resolve, reject) =>{
    request.onload = function(){
        var dataUser = request.responseText
        resolve(dataUser)
    }
}).then(dataUsers =>{
    proc(dataUsers)
})

async function proc(data){
    var masData = data.split(',')
    var masOfMas = []
    for(let i = 0; i < masData.length; i++){
        var masElem = masData[i].split(' ')
        masElem[0] = masElem[0].slice(5,7)
        masElem[3] = masElem[3].replace('"','').replace('}','')
        masOfMas.push(masElem)
    }
    masOfMas[0][0] = masOfMas[0][0].slice(1,2) 
    masOfMas[masOfMas.length - 1][3].replace('}', '')
    document.querySelector('#exit').onclick = async function(){
        const login = document.querySelector('#login').value
        const pas = document.querySelector('#pas').value
        const surname = document.querySelector('#surname').value

        var curUser = null
        let flag = false

        for(let i = 0; i < masOfMas.length; i++){
            if(login === masOfMas[i][1] && pas === masOfMas[i][2] && surname === masOfMas[i][3]){
                curUser = masOfMas[i][0]
                flag = true
            }
        }
        flag ? alert(`Вы вошли, все впорядке) Ваш аккаунт номер ${curUser}`) : alert('Неверные данные простите(')
    }
}

request.send()
