let express = require('express') // экспресс модуль
let app = express() // переменная для использования express

let mysql = require('mysql') // mysql модуль
let con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'regopi09',
    database: 'shop1'
});

con.connect(function(err){
    if(err) throw err
    console.log('Connected!')
})

app.use(express.static('public')) //использование папки public

app.set('view engine', 'pug') // работа с html через pug

app.listen(3000, function(){
    console.log('node express work on 3000')
});

app.get('/online-shop.html', function(req, res){
    con.query(
        'SELECT * FROM category',
        function(error, result){
            console.log('Hi')
            if (error) 
            {
                throw error;
            }
            console.log(result)
            // let us = {}
            // for(let i = 0; i < result.length; i++){
            //     us[result[i]['id']] = result[i];
            // }
            // console.log(us)
        }
    );
    con.end()
    res.sendFile('online-shop.html', {root : __dirname + '/public'})
});

con.query(
    'SELECT * FROM product',
    function(error, result){
        console.log('Hi')
        if (error) 
        {
            throw error;
        }
        console.log(result)
        // let us = {}
        // for(let i = 0; i < result.length; i++){
        //     us[result[i]['id']] = result[i];
        // }
        // console.log(us)
    }
);
con.end()


// con.end()
