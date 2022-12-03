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

app.set('view engine', 'html') // работа с html через pug

app.listen(3000, function(){
    console.log('node express work on 3000')
});

app.get('/online-shop.html', async function(req, res){
    res.sendFile('online-shop.html', {root : __dirname + '/public'})
});

con.query(
    'SELECT product.id as id, product_type.type as type, brand.brand, discription FROM product INNER JOIN product_type ON product.id_product_type = product_type.id INNER JOIN charactiristic ON product.id = charactiristic.id_product INNER JOIN brand ON product.id_brand = brand.id ORDER BY id;',
    async function(error, result){
        if (error) throw error;
        let dataOfProducts = {}
        for (let i = 1; i < result.length; i ++){
            dataOfProducts[result[i]['id']] = `${result[i]['id']} ${result[i]['type']} ${result[i]['brand']} ${result[i]['discription']}`;
        }
        app.post('/catalog.html', (req,res) => {
            res.send(dataOfProducts)
        })
    }
)

con.end()    
