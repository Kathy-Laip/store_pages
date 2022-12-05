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
    console.log(data)
}

request.send()
