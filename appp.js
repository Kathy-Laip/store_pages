let express = require('express') // экспресс модуль
let app = express() // переменная для использования express

let mysql = require('mysql') // mysql модуль
let con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'shop1'
});

app.use(express.static('public')) //использование папки public

app.set('view engine', 'pug') // работа с html через pug

app.listen(3000, function(){
    console.log('node express work on 3000')
});

app.get('/online-shop.html', function(req, res){
    console.log('/ load')
    res.sendFile('online-shop.html', {root : __dirname + '/public'})
});