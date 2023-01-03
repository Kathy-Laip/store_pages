let express = require('express') // экспресс модуль, библиотека node express
var bodyParser = require('body-parser') // парсер строк, приходящих с клиентской стороны
const axios = require('axios') // для перехода между post - запросами
let app = express() // переменная для использования express
var jsonParser = bodyParser.json() // преобразование json -  строк

let mysql = require('mysql') // mysql модуль

let con = mysql.createConnection({ // создание подключения к базе данных
    host: '127.0.0.1',
    user: 'root',
    password: 'regopi09',
    database: 'shop1'
});

con.connect(function(err){ // попытка подключение к базе данных
    if(err) throw err
    console.log('Connected!')
})

app.use(express.json()) // использование json
app.use(express.static('public')) //использование папки public, в котором хранятся html, css документы
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.set('view engine', 'html') // работа с html через pug

app.listen(3306, function(){ // подклчюение к порту
    console.log('node express work on 3000')
});

app.get('/online-shop.html', async function(req, res){ // подключение к странице online-shop
    res.sendFile('online-shop.html', {root : __dirname + '/public'}) // отсылка html страниц
});

con.query( // запрос на взятие данных о продуктах
    'SELECT product.id as id, product_type.type as type, brand.brand, price, discription FROM product INNER JOIN product_type ON product.id_product_type = product_type.id INNER JOIN charactiristic ON product.id = charactiristic.id_product INNER JOIN brand ON product.id_brand = brand.id ORDER BY id;',
    async function(error, result){
        if (error) throw error;
        let dataOfProducts = {}
        for (let i = 0; i < result.length; i ++){
            dataOfProducts[result[i]['id']] = `${result[i]['id']} ${result[i]['type']} ${result[i]['brand']} ${result[i]['price']} ${result[i]['discription']}`;
        }
        //console.log(dataOfProducts)
        app.post('/catalog.html', (req,res) => { // отправка данных о продуктах на страницу каталога
            res.send(dataOfProducts)
        })
    }
)

con.query( // взятие данных о пользователях
    'SELECT id, login, password, name_user FROM account',
    async function(error, result){
        if(error) throw error;
        let dataUsers = {}
        for(let i = 0; i < result.length; i++){
            dataUsers[result[i]['id']] = `${result[i]['id']} ${result[i]['login']} ${result[i]['password']} ${result[i]['name_user']}`
        }
        console.log(dataUsers)
        app.post('/entrance.html', (req,res) => { // отсылка данных на страницу входа
            res.send(dataUsers)
        })
    }

)

var curUser
var body

app.post('/getcurUser', function(req1, res1){ // принятие данных о пользователе при входе на сайт
    curUser = ''
    req1.on('data', chunk =>{
        curUser += chunk.toString()
    });
    req1.on('end', () => {
        console.log(curUser)
    });
    curUser = curUser.slice(1, -1)
})


app.post('/getpr', jsonParser, function(req, res){ // принятие данных о продукте при нажатии на кнопку добавления в корзину
    body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    });
    req.on('end', () => {
        console.log(body);
        const d = [curUser, body, '1']
        console.log(d)
        con.query(
                    'INSERT INTO products_in_order (order_id, product_id, count) VALUES ('+curUser+', '+body+', '+1+')',
                    async function(error, result){
                        if(error) throw error;
                            console.log('okey')
                    }
                )
    });
    res.redirect(307, '/bascket.html') // переопределение post-запроса на страницу корзины
    app.post('/bascket.html', (req1, res1) => {
        con.query( // взятие данных о товарах в заказе и отправка на страницу корзины
            'select product.id, brand.brand as brand, product_type.type, charactiristic.discription as dicription, price from product INNER JOIN product_type ON product.id_product_type = product_type.id INNER JOIN charactiristic ON product.id = charactiristic.id_product INNER JOIN brand ON product.id_brand = brand.id inner join products_in_order on product.id = products_in_order.product_id where order_id = '+curUser+'',
            async function(error, result){
                if(error) throw error;
                console.log('ok2')
                let resss = {}
                for(let i = 0; i < result.length; i++){
                    resss[result[i]['id']] = `${result[i]['id']} ${result[i]['brand']} ${result[i]['type']} ${result[i]['dicription']} ${result[i]['price']}`
                }
                console.log(resss)
                res1.send(resss)
            }
        )
    
    })
})

app.post('/getpr1', jsonParser, function(req, res){
    body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    });
    req.on('end', () => {
        console.log(body);
        const d = [curUser, body, '1']
        console.log(d)
        con.query(
                    'INSERT INTO products_in_order (order_id, product_id, count) VALUES ('+curUser+', '+body+', '+1+')',
                    async function(error, result){
                        if(error) throw error;
                            console.log('okey')
                    }
                )
    });
    res.redirect(307, '/bascket.html')
    app.post('/bascket.html', (req1, res1) => {
        con.query(
            'select product.id, brand.brand as brand, product_type.type, charactiristic.discription as dicription, price from product INNER JOIN product_type ON product.id_product_type = product_type.id INNER JOIN charactiristic ON product.id = charactiristic.id_product INNER JOIN brand ON product.id_brand = brand.id inner join products_in_order on product.id = products_in_order.product_id where order_id = '+curUser+'',
            async function(error, result){
                if(error) throw error;
                console.log('ok2')
                let resss = {}
                for(let i = 0; i < result.length; i++){
                    resss[result[i]['id']] = `${result[i]['id']} ${result[i]['brand']} ${result[i]['type']} ${result[i]['dicription']} ${result[i]['price']}`
                }
                console.log(resss)
                res1.send(resss)
            }
        )
    
    })
})

app.post('/getpr2', jsonParser, function(req, res){
    body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    });
    req.on('end', () => {
        console.log(body);
        const d = [curUser, body, '1']
        console.log(d)
        con.query(
                    'INSERT INTO products_in_order (order_id, product_id, count) VALUES ('+curUser+', '+body+', '+1+')',
                    async function(error, result){
                        if(error) throw error;
                            console.log('okey')
                    }
                )
    });
    res.redirect(307, '/bascket.html')
    app.post('/bascket.html', (req1, res1) => {
        con.query(
            'select product.id, brand.brand as brand, product_type.type, charactiristic.discription as dicription, price from product INNER JOIN product_type ON product.id_product_type = product_type.id INNER JOIN charactiristic ON product.id = charactiristic.id_product INNER JOIN brand ON product.id_brand = brand.id inner join products_in_order on product.id = products_in_order.product_id where order_id = '+curUser+'',
            async function(error, result){
                if(error) throw error;
                console.log('ok2')
                let resss = {}
                for(let i = 0; i < result.length; i++){
                    resss[result[i]['id']] = `${result[i]['id']} ${result[i]['brand']} ${result[i]['type']} ${result[i]['dicription']} ${result[i]['price']}`
                }
                console.log(resss)
                res1.send(resss)
            }
        )
    
    })
})

app.post('/getpr3', jsonParser, function(req, res){
    body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    });
    req.on('end', () => {
        console.log(body);
        const d = [curUser, body, '1']
        console.log(d)
        con.query(
                    'INSERT INTO products_in_order (order_id, product_id, count) VALUES ('+curUser+', '+body+', '+1+')',
                    async function(error, result){
                        if(error) throw error;
                            console.log('okey')
                    }
                )
    });
    res.redirect(307, '/bascket.html')
    app.post('/bascket.html', (req1, res1) => {
        con.query(
            'select product.id, brand.brand as brand, product_type.type, charactiristic.discription as dicription, price from product INNER JOIN product_type ON product.id_product_type = product_type.id INNER JOIN charactiristic ON product.id = charactiristic.id_product INNER JOIN brand ON product.id_brand = brand.id inner join products_in_order on product.id = products_in_order.product_id where order_id = '+curUser+'',
            async function(error, result){
                if(error) throw error;
                console.log('ok2')
                let resss = {}
                for(let i = 0; i < result.length; i++){
                    resss[result[i]['id']] = `${result[i]['id']} ${result[i]['brand']} ${result[i]['type']} ${result[i]['dicription']} ${result[i]['price']}`
                }
                console.log(resss)
                res1.send(resss)
            }
        )
    
    })
})

app.post('/getpr4', jsonParser, function(req, res){
    body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    });
    req.on('end', () => {
        console.log(body);
        const d = [curUser, body, '1']
        console.log(d)
        con.query(
                    'INSERT INTO products_in_order (order_id, product_id, count) VALUES ('+curUser+', '+body+', '+1+')',
                    async function(error, result){
                        if(error) throw error;
                            console.log('okey')
                    }
                )
    });
    res.redirect(307, '/bascket.html')
    app.post('/bascket.html', (req1, res1) => {
        con.query(
            'select product.id, brand.brand as brand, product_type.type, charactiristic.discription as dicription, price from product INNER JOIN product_type ON product.id_product_type = product_type.id INNER JOIN charactiristic ON product.id = charactiristic.id_product INNER JOIN brand ON product.id_brand = brand.id inner join products_in_order on product.id = products_in_order.product_id where order_id = '+curUser+'',
            async function(error, result){
                if(error) throw error;
                console.log('ok2')
                let resss = {}
                for(let i = 0; i < result.length; i++){
                    resss[result[i]['id']] = `${result[i]['id']} ${result[i]['brand']} ${result[i]['type']} ${result[i]['dicription']} ${result[i]['price']}`
                }
                console.log(resss)
                res1.send(resss)
            }
        )
    
    })
})

app.post('/getpr5', jsonParser, function(req, res){
    body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    });
    req.on('end', () => {
        console.log(body);
        const d = [curUser, body, '1']
        console.log(d)
        con.query(
                    'INSERT INTO products_in_order (order_id, product_id, count) VALUES ('+curUser+', '+body+', '+1+')',
                    async function(error, result){
                        if(error) throw error;
                            console.log('okey')
                    }
                )
    });
    res.redirect(307, '/bascket.html')
    app.post('/bascket.html', (req1, res1) => {
        con.query(
            'select product.id, brand.brand as brand, product_type.type, charactiristic.discription as dicription, price from product INNER JOIN product_type ON product.id_product_type = product_type.id INNER JOIN charactiristic ON product.id = charactiristic.id_product INNER JOIN brand ON product.id_brand = brand.id inner join products_in_order on product.id = products_in_order.product_id where order_id = '+curUser+'',
            async function(error, result){
                if(error) throw error;
                console.log('ok2')
                let resss = {}
                for(let i = 0; i < result.length; i++){
                    resss[result[i]['id']] = `${result[i]['id']} ${result[i]['brand']} ${result[i]['type']} ${result[i]['dicription']} ${result[i]['price']}`
                }
                console.log(resss)
                res1.send(resss)
            }
        )
    
    })
})

app.post('/getpr6', jsonParser, function(req, res){
    body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    });
    req.on('end', () => {
        console.log(body);
        const d = [curUser, body, '1']
        console.log(d)
        con.query(
                    'INSERT INTO products_in_order (order_id, product_id, count) VALUES ('+curUser+', '+body+', '+1+')',
                    async function(error, result){
                        if(error) throw error;
                            console.log('okey')
                    }
                )
    });
    res.redirect(307, '/bascket.html')
    app.post('/bascket.html', (req1, res1) => {
        con.query(
            'select product.id, brand.brand as brand, product_type.type, charactiristic.discription as dicription, price from product INNER JOIN product_type ON product.id_product_type = product_type.id INNER JOIN charactiristic ON product.id = charactiristic.id_product INNER JOIN brand ON product.id_brand = brand.id inner join products_in_order on product.id = products_in_order.product_id where order_id = '+curUser+'',
            async function(error, result){
                if(error) throw error;
                console.log('ok2')
                let resss = {}
                for(let i = 0; i < result.length; i++){
                    resss[result[i]['id']] = `${result[i]['id']} ${result[i]['brand']} ${result[i]['type']} ${result[i]['dicription']} ${result[i]['price']}`
                }
                console.log(resss)
                res1.send(resss)
            }
        )
    
    })
})

app.post('/getpr7', jsonParser, function(req, res){
    body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    });
    req.on('end', () => {
        console.log(body);
        const d = [curUser, body, '1']
        console.log(d)
        con.query(
                    'INSERT INTO products_in_order (order_id, product_id, count) VALUES ('+curUser+', '+body+', '+1+')',
                    async function(error, result){
                        if(error) throw error;
                            console.log('okey')
                    }
                )
    });
    res.redirect(307, '/bascket.html')
    app.post('/bascket.html', (req1, res1) => {
        con.query(
            'select product.id, brand.brand as brand, product_type.type, charactiristic.discription as dicription, price from product INNER JOIN product_type ON product.id_product_type = product_type.id INNER JOIN charactiristic ON product.id = charactiristic.id_product INNER JOIN brand ON product.id_brand = brand.id inner join products_in_order on product.id = products_in_order.product_id where order_id = '+curUser+'',
            async function(error, result){
                if(error) throw error;
                console.log('ok2')
                let resss = {}
                for(let i = 0; i < result.length; i++){
                    resss[result[i]['id']] = `${result[i]['id']} ${result[i]['brand']} ${result[i]['type']} ${result[i]['dicription']} ${result[i]['price']}`
                }
                console.log(resss)
                res1.send(resss)
            }
        )
    
    })
})


app.post('/getpr8', jsonParser, function(req, res){
    body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    });
    req.on('end', () => {
        console.log(body);
        const d = [curUser, body, '1']
        console.log(d)
        con.query(
                    'INSERT INTO products_in_order (order_id, product_id, count) VALUES ('+curUser+', '+body+', '+1+')',
                    async function(error, result){
                        if(error) throw error;
                            console.log('okey')
                    }
                )
    });
    res.redirect(307, '/bascket.html')
    app.post('/bascket.html', (req1, res1) => {
        con.query(
            'select product.id, brand.brand as brand, product_type.type, charactiristic.discription as dicription, price from product INNER JOIN product_type ON product.id_product_type = product_type.id INNER JOIN charactiristic ON product.id = charactiristic.id_product INNER JOIN brand ON product.id_brand = brand.id inner join products_in_order on product.id = products_in_order.product_id where order_id = '+curUser+'',
            async function(error, result){
                if(error) throw error;
                console.log('ok2')
                let resss = {}
                for(let i = 0; i < result.length; i++){
                    resss[result[i]['id']] = `${result[i]['id']} ${result[i]['brand']} ${result[i]['type']} ${result[i]['dicription']} ${result[i]['price']}`
                }
                console.log(resss)
                res1.send(resss)
            }
        )
    
    })
})

app.post('/getpr9', jsonParser, function(req, res){
    body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    });
    req.on('end', () => {
        console.log(body);
        const d = [curUser, body, '1']
        console.log(d)
        con.query(
                    'INSERT INTO products_in_order (order_id, product_id, count) VALUES ('+curUser+', '+body+', '+1+')',
                    async function(error, result){
                        if(error) throw error;
                            console.log('okey')
                    }
                )
    });
    res.redirect(307, '/bascket.html')
    app.post('/bascket.html', (req1, res1) => {
        con.query(
            'select product.id, brand.brand as brand, product_type.type, charactiristic.discription as dicription, price from product INNER JOIN product_type ON product.id_product_type = product_type.id INNER JOIN charactiristic ON product.id = charactiristic.id_product INNER JOIN brand ON product.id_brand = brand.id inner join products_in_order on product.id = products_in_order.product_id where order_id = '+curUser+'',
            async function(error, result){
                if(error) throw error;
                console.log('ok2')
                let resss = {}
                for(let i = 0; i < result.length; i++){
                    resss[result[i]['id']] = `${result[i]['id']} ${result[i]['brand']} ${result[i]['type']} ${result[i]['dicription']} ${result[i]['price']}`
                }
                console.log(resss)
                res1.send(resss)
            }
        )
    
    })
})

app.post('/getpr10', jsonParser, function(req, res){
    body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    });
    req.on('end', () => {
        console.log(body);
        const d = [curUser, body, '1']
        console.log(d)
        con.query(
                    'INSERT INTO products_in_order (order_id, product_id, count) VALUES ('+curUser+', '+body+', '+1+')',
                    async function(error, result){
                        if(error) throw error;
                            console.log('okey')
                    }
                )
    });
    res.redirect(307, '/bascket.html')
    app.post('/bascket.html', (req1, res1) => {
        con.query(
            'select product.id, brand.brand as brand, product_type.type, charactiristic.discription as dicription, price from product INNER JOIN product_type ON product.id_product_type = product_type.id INNER JOIN charactiristic ON product.id = charactiristic.id_product INNER JOIN brand ON product.id_brand = brand.id inner join products_in_order on product.id = products_in_order.product_id where order_id = '+curUser+'',
            async function(error, result){
                if(error) throw error;
                console.log('ok2')
                let resss = {}
                for(let i = 0; i < result.length; i++){
                    resss[result[i]['id']] = `${result[i]['id']} ${result[i]['brand']} ${result[i]['type']} ${result[i]['dicription']} ${result[i]['price']}`
                }
                console.log(resss)
                res1.send(resss)
            }
        )
    
    })
})

app.post('/getpr11', jsonParser, function(req, res){
    body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    });
    req.on('end', () => {
        console.log(body);
        const d = [curUser, body, '1']
        console.log(d)
        con.query(
                    'INSERT INTO products_in_order (order_id, product_id, count) VALUES ('+curUser+', '+body+', '+1+')',
                    async function(error, result){
                        if(error) throw error;
                            console.log('okey')
                    }
                )
    });
    res.redirect(307, '/bascket.html')
    app.post('/bascket.html', (req1, res1) => {
        con.query(
            'select product.id, brand.brand as brand, product_type.type, charactiristic.discription as dicription, price from product INNER JOIN product_type ON product.id_product_type = product_type.id INNER JOIN charactiristic ON product.id = charactiristic.id_product INNER JOIN brand ON product.id_brand = brand.id inner join products_in_order on product.id = products_in_order.product_id where order_id = '+curUser+'',
            async function(error, result){
                if(error) throw error;
                console.log('ok2')
                let resss = {}
                for(let i = 0; i < result.length; i++){
                    resss[result[i]['id']] = `${result[i]['id']} ${result[i]['brand']} ${result[i]['type']} ${result[i]['dicription']} ${result[i]['price']}`
                }
                console.log(resss)
                res1.send(resss)
            }
        )
    
    })
})

app.post('/getpr12', jsonParser, function(req, res){
    body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    });
    req.on('end', () => {
        console.log(body);
        const d = [curUser, body, '1']
        console.log(d)
        con.query(
                    'INSERT INTO products_in_order (order_id, product_id, count) VALUES ('+curUser+', '+body+', '+1+')',
                    async function(error, result){
                        if(error) throw error;
                            console.log('okey')
                    }
                )
    });
    res.redirect(307, '/bascket.html')
    app.post('/bascket.html', (req1, res1) => {
        con.query(
            'select product.id, brand.brand as brand, product_type.type, charactiristic.discription as dicription, price from product INNER JOIN product_type ON product.id_product_type = product_type.id INNER JOIN charactiristic ON product.id = charactiristic.id_product INNER JOIN brand ON product.id_brand = brand.id inner join products_in_order on product.id = products_in_order.product_id where order_id = '+curUser+'',
            async function(error, result){
                if(error) throw error;
                console.log('ok2')
                let resss = {}
                for(let i = 0; i < result.length; i++){
                    resss[result[i]['id']] = `${result[i]['id']} ${result[i]['brand']} ${result[i]['type']} ${result[i]['dicription']} ${result[i]['price']}`
                }
                console.log(resss)
                res1.send(resss)
            }
        )
    
    })
})

app.post('/getpr13', jsonParser, function(req, res){
    body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    });
    req.on('end', () => {
        console.log(body);
        const d = [curUser, body, '1']
        console.log(d)
        con.query(
                    'INSERT INTO products_in_order (order_id, product_id, count) VALUES ('+curUser+', '+body+', '+1+')',
                    async function(error, result){
                        if(error) throw error;
                            console.log('okey')
                    }
                )
    });
    res.redirect(307, '/bascket.html')
    app.post('/bascket.html', (req1, res1) => {
        con.query(
            'select product.id, brand.brand as brand, product_type.type, charactiristic.discription as dicription, price from product INNER JOIN product_type ON product.id_product_type = product_type.id INNER JOIN charactiristic ON product.id = charactiristic.id_product INNER JOIN brand ON product.id_brand = brand.id inner join products_in_order on product.id = products_in_order.product_id where order_id = '+curUser+'',
            async function(error, result){
                if(error) throw error;
                console.log('ok2')
                let resss = {}
                for(let i = 0; i < result.length; i++){
                    resss[result[i]['id']] = `${result[i]['id']} ${result[i]['brand']} ${result[i]['type']} ${result[i]['dicription']} ${result[i]['price']}`
                }
                console.log(resss)
                res1.send(resss)
            }
        )
    
    })
})

app.post('/getpr14', jsonParser, function(req, res){
    body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    });
    req.on('end', () => {
        console.log(body);
        const d = [curUser, body, '1']
        console.log(d)
        con.query(
                    'INSERT INTO products_in_order (order_id, product_id, count) VALUES ('+curUser+', '+body+', '+1+')',
                    async function(error, result){
                        if(error) throw error;
                            console.log('okey')
                    }
                )
    });
    res.redirect(307, '/bascket.html')
    app.post('/bascket.html', (req1, res1) => {
        con.query(
            'select product.id, brand.brand as brand, product_type.type, charactiristic.discription as dicription, price from product INNER JOIN product_type ON product.id_product_type = product_type.id INNER JOIN charactiristic ON product.id = charactiristic.id_product INNER JOIN brand ON product.id_brand = brand.id inner join products_in_order on product.id = products_in_order.product_id where order_id = '+curUser+'',
            async function(error, result){
                if(error) throw error;
                console.log('ok2')
                let resss = {}
                for(let i = 0; i < result.length; i++){
                    resss[result[i]['id']] = `${result[i]['id']} ${result[i]['brand']} ${result[i]['type']} ${result[i]['dicription']} ${result[i]['price']}`
                }
                console.log(resss)
                res1.send(resss)
            }
        )
    
    })
})

app.post('/getpr15', jsonParser, function(req, res){
    body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    });
    req.on('end', () => {
        console.log(body);
        const d = [curUser, body, '1']
        console.log(d)
        con.query(
                    'INSERT INTO products_in_order (order_id, product_id, count) VALUES ('+curUser+', '+body+', '+1+')',
                    async function(error, result){
                        if(error) throw error;
                            console.log('okey')
                    }
                )
    });
    res.redirect(307, '/bascket.html')
    app.post('/bascket.html', (req1, res1) => {
        con.query(
            'select product.id, brand.brand as brand, product_type.type, charactiristic.discription as dicription, price from product INNER JOIN product_type ON product.id_product_type = product_type.id INNER JOIN charactiristic ON product.id = charactiristic.id_product INNER JOIN brand ON product.id_brand = brand.id inner join products_in_order on product.id = products_in_order.product_id where order_id = '+curUser+'',
            async function(error, result){
                if(error) throw error;
                console.log('ok2')
                let resss = {}
                for(let i = 0; i < result.length; i++){
                    resss[result[i]['id']] = `${result[i]['id']} ${result[i]['brand']} ${result[i]['type']} ${result[i]['dicription']} ${result[i]['price']}`
                }
                console.log(resss)
                res1.send(resss)
            }
        )
    
    })
})

app.post('/getpr16', jsonParser, function(req, res){
    body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    });
    req.on('end', () => {
        console.log(body);
        const d = [curUser, body, '1']
        console.log(d)
        con.query(
                    'INSERT INTO products_in_order (order_id, product_id, count) VALUES ('+curUser+', '+body+', '+1+')',
                    async function(error, result){
                        if(error) throw error;
                            console.log('okey')
                    }
                )
    });
    res.redirect(307, '/bascket.html')
    app.post('/bascket.html', (req1, res1) => {
        con.query(
            'select product.id, brand.brand as brand, product_type.type, charactiristic.discription as dicription, price from product INNER JOIN product_type ON product.id_product_type = product_type.id INNER JOIN charactiristic ON product.id = charactiristic.id_product INNER JOIN brand ON product.id_brand = brand.id inner join products_in_order on product.id = products_in_order.product_id where order_id = '+curUser+'',
            async function(error, result){
                if(error) throw error;
                console.log('ok2')
                let resss = {}
                for(let i = 0; i < result.length; i++){
                    resss[result[i]['id']] = `${result[i]['id']} ${result[i]['brand']} ${result[i]['type']} ${result[i]['dicription']} ${result[i]['price']}`
                }
                console.log(resss)
                res1.send(resss)
            }
        )
    
    })
})

app.post('/getpr17', jsonParser, function(req, res){
    body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    });
    req.on('end', () => {
        console.log(body);
        const d = [curUser, body, '1']
        console.log(d)
        con.query(
                    'INSERT INTO products_in_order (order_id, product_id, count) VALUES ('+curUser+', '+body+', '+1+')',
                    async function(error, result){
                        if(error) throw error;
                            console.log('okey')
                    }
                )
    });
    res.redirect(307, '/bascket.html')
    app.post('/bascket.html', (req1, res1) => {
        con.query(
            'select product.id, brand.brand as brand, product_type.type, charactiristic.discription as dicription, price from product INNER JOIN product_type ON product.id_product_type = product_type.id INNER JOIN charactiristic ON product.id = charactiristic.id_product INNER JOIN brand ON product.id_brand = brand.id inner join products_in_order on product.id = products_in_order.product_id where order_id = '+curUser+'',
            async function(error, result){
                if(error) throw error;
                console.log('ok2')
                let resss = {}
                for(let i = 0; i < result.length; i++){
                    resss[result[i]['id']] = `${result[i]['id']} ${result[i]['brand']} ${result[i]['type']} ${result[i]['dicription']} ${result[i]['price']}`
                }
                console.log(resss)
                res1.send(resss)
            }
        )
    
    })
})

app.post('/getpr18', jsonParser, function(req, res){
    body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    });
    req.on('end', () => {
        console.log(body);
        const d = [curUser, body, '1']
        console.log(d)
        con.query(
                    'INSERT INTO products_in_order (order_id, product_id, count) VALUES ('+curUser+', '+body+', '+1+')',
                    async function(error, result){
                        if(error) throw error;
                            console.log('okey')
                    }
                )
    });
    res.redirect(307, '/bascket.html')
    app.post('/bascket.html', (req1, res1) => {
        con.query(
            'select product.id, brand.brand as brand, product_type.type, charactiristic.discription as dicription, price from product INNER JOIN product_type ON product.id_product_type = product_type.id INNER JOIN charactiristic ON product.id = charactiristic.id_product INNER JOIN brand ON product.id_brand = brand.id inner join products_in_order on product.id = products_in_order.product_id where order_id = '+curUser+'',
            async function(error, result){
                if(error) throw error;
                console.log('ok2')
                let resss = {}
                for(let i = 0; i < result.length; i++){
                    resss[result[i]['id']] = `${result[i]['id']} ${result[i]['brand']} ${result[i]['type']} ${result[i]['dicription']} ${result[i]['price']}`
                }
                console.log(resss)
                res1.send(resss)
            }
        )
    
    })
})

app.post('/getpr19', jsonParser, function(req, res){
    body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    });
    req.on('end', () => {
        console.log(body);
        const d = [curUser, body, '1']
        console.log(d)
        con.query(
                    'INSERT INTO products_in_order (order_id, product_id, count) VALUES ('+curUser+', '+body+', '+1+')',
                    async function(error, result){
                        if(error) throw error;
                            console.log('okey')
                    }
                )
    });
    res.redirect(307, '/bascket.html')
    app.post('/bascket.html', (req1, res1) => {
        con.query(
            'select product.id, brand.brand as brand, product_type.type, charactiristic.discription as dicription, price from product INNER JOIN product_type ON product.id_product_type = product_type.id INNER JOIN charactiristic ON product.id = charactiristic.id_product INNER JOIN brand ON product.id_brand = brand.id inner join products_in_order on product.id = products_in_order.product_id where order_id = '+curUser+'',
            async function(error, result){
                if(error) throw error;
                console.log('ok2')
                let resss = {}
                for(let i = 0; i < result.length; i++){
                    resss[result[i]['id']] = `${result[i]['id']} ${result[i]['brand']} ${result[i]['type']} ${result[i]['dicription']} ${result[i]['price']}`
                }
                console.log(resss)
                res1.send(resss)
            }
        )
    
    })
})

app.post('/getpr20', jsonParser, function(req, res){
    body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    });
    req.on('end', () => {
        console.log(body);
        const d = [curUser, body, '1']
        console.log(d)
        con.query(
                    'INSERT INTO products_in_order (order_id, product_id, count) VALUES ('+curUser+', '+body+', '+1+')',
                    async function(error, result){
                        if(error) throw error;
                            console.log('okey')
                    }
                )
    });
    res.redirect(307, '/bascket.html')
    app.post('/bascket.html', (req1, res1) => {
        con.query(
            'select product.id, brand.brand as brand, product_type.type, charactiristic.discription as dicription, price from product INNER JOIN product_type ON product.id_product_type = product_type.id INNER JOIN charactiristic ON product.id = charactiristic.id_product INNER JOIN brand ON product.id_brand = brand.id inner join products_in_order on product.id = products_in_order.product_id where order_id = '+curUser+'',
            async function(error, result){
                if(error) throw error;
                console.log('ok2')
                let resss = {}
                for(let i = 0; i < result.length; i++){
                    resss[result[i]['id']] = `${result[i]['id']} ${result[i]['brand']} ${result[i]['type']} ${result[i]['dicription']} ${result[i]['price']}`
                }
                console.log(resss)
                res1.send(resss)
            }
        )
    
    })
})


app.post('/getpr21', jsonParser, function(req, res){
    body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    });
    req.on('end', () => {
        console.log(body);
        const d = [curUser, body, '1']
        console.log(d)
        con.query(
                    'INSERT INTO products_in_order (order_id, product_id, count) VALUES ('+curUser+', '+body+', '+1+')',
                    async function(error, result){
                        if(error) throw error;
                            console.log('okey')
                    }
                )
    });
    res.redirect(307, '/bascket.html')
    app.post('/bascket.html', (req1, res1) => {
        con.query(
            'select product.id, brand.brand as brand, product_type.type, charactiristic.discription as dicription, price from product INNER JOIN product_type ON product.id_product_type = product_type.id INNER JOIN charactiristic ON product.id = charactiristic.id_product INNER JOIN brand ON product.id_brand = brand.id inner join products_in_order on product.id = products_in_order.product_id where order_id = '+curUser+'',
            async function(error, result){
                if(error) throw error;
                console.log('ok2')
                let resss = {}
                for(let i = 0; i < result.length; i++){
                    resss[result[i]['id']] = `${result[i]['id']} ${result[i]['brand']} ${result[i]['type']} ${result[i]['dicription']} ${result[i]['price']}`
                }
                console.log(resss)
                res1.send(resss)
            }
        )
    
    })
})


app.post('/getpr22', jsonParser, function(req, res){
    body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    });
    req.on('end', () => {
        console.log(body);
        const d = [curUser, body, '1']
        console.log(d)
        con.query(
                    'INSERT INTO products_in_order (order_id, product_id, count) VALUES ('+curUser+', '+body+', '+1+')',
                    async function(error, result){
                        if(error) throw error;
                            console.log('okey')
                    }
                )
    });
    res.redirect(307, '/bascket.html')
    app.post('/bascket.html', (req1, res1) => {
        con.query(
            'select product.id, brand.brand as brand, product_type.type, charactiristic.discription as dicription, price from product INNER JOIN product_type ON product.id_product_type = product_type.id INNER JOIN charactiristic ON product.id = charactiristic.id_product INNER JOIN brand ON product.id_brand = brand.id inner join products_in_order on product.id = products_in_order.product_id where order_id = '+curUser+'',
            async function(error, result){
                if(error) throw error;
                console.log('ok2')
                let resss = {}
                for(let i = 0; i < result.length; i++){
                    resss[result[i]['id']] = `${result[i]['id']} ${result[i]['brand']} ${result[i]['type']} ${result[i]['dicription']} ${result[i]['price']}`
                }
                console.log(resss)
                res1.send(resss)
            }
        )
    
    })
})


app.post('/getpr23', jsonParser, function(req, res){
    body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    });
    req.on('end', () => {
        console.log(body);
        const d = [curUser, body, '1']
        console.log(d)
        con.query(
                    'INSERT INTO products_in_order (order_id, product_id, count) VALUES ('+curUser+', '+body+', '+1+')',
                    async function(error, result){
                        if(error) throw error;
                            console.log('okey')
                    }
                )
    });
    res.redirect(307, '/bascket.html')
    app.post('/bascket.html', (req1, res1) => {
        con.query(
            'select product.id, brand.brand as brand, product_type.type, charactiristic.discription as dicription, price from product INNER JOIN product_type ON product.id_product_type = product_type.id INNER JOIN charactiristic ON product.id = charactiristic.id_product INNER JOIN brand ON product.id_brand = brand.id inner join products_in_order on product.id = products_in_order.product_id where order_id = '+curUser+'',
            async function(error, result){
                if(error) throw error;
                console.log('ok2')
                let resss = {}
                for(let i = 0; i < result.length; i++){
                    resss[result[i]['id']] = `${result[i]['id']} ${result[i]['brand']} ${result[i]['type']} ${result[i]['dicription']} ${result[i]['price']}`
                }
                console.log(resss)
                res1.send(resss)
            }
        )
    
    })
})


app.post('/getpr24', jsonParser, function(req, res){
    body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    });
    req.on('end', () => {
        console.log(body);
        const d = [curUser, body, '1']
        console.log(d)
        con.query(
                    'INSERT INTO products_in_order (order_id, product_id, count) VALUES ('+curUser+', '+body+', '+1+')',
                    async function(error, result){
                        if(error) throw error;
                            console.log('okey')
                    }
                )
    });
    res.redirect(307, '/bascket.html')
    app.post('/bascket.html', (req1, res1) => {
        con.query(
            'select product.id, brand.brand as brand, product_type.type, charactiristic.discription as dicription, price from product INNER JOIN product_type ON product.id_product_type = product_type.id INNER JOIN charactiristic ON product.id = charactiristic.id_product INNER JOIN brand ON product.id_brand = brand.id inner join products_in_order on product.id = products_in_order.product_id where order_id = '+curUser+'',
            async function(error, result){
                if(error) throw error;
                console.log('ok2')
                let resss = {}
                for(let i = 0; i < result.length; i++){
                    resss[result[i]['id']] = `${result[i]['id']} ${result[i]['brand']} ${result[i]['type']} ${result[i]['dicription']} ${result[i]['price']}`
                }
                console.log(resss)
                res1.send(resss)
            }
        )
    
    })
})



app.post('/getpr25', jsonParser, function(req, res){
    body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    });
    req.on('end', () => {
        console.log(body);
        const d = [curUser, body, '1']
        console.log(d)
        con.query(
                    'INSERT INTO products_in_order (order_id, product_id, count) VALUES ('+curUser+', '+body+', '+1+')',
                    async function(error, result){
                        if(error) throw error;
                            console.log('okey')
                    }
                )
    });
    res.redirect(307, '/bascket.html')
    app.post('/bascket.html', (req1, res1) => {
        con.query(
            'select product.id, brand.brand as brand, product_type.type, charactiristic.discription as dicription, price from product INNER JOIN product_type ON product.id_product_type = product_type.id INNER JOIN charactiristic ON product.id = charactiristic.id_product INNER JOIN brand ON product.id_brand = brand.id inner join products_in_order on product.id = products_in_order.product_id where order_id = '+curUser+'',
            async function(error, result){
                if(error) throw error;
                console.log('ok2')
                let resss = {}
                for(let i = 0; i < result.length; i++){
                    resss[result[i]['id']] = `${result[i]['id']} ${result[i]['brand']} ${result[i]['type']} ${result[i]['dicription']} ${result[i]['price']}`
                }
                console.log(resss)
                res1.send(resss)
            }
        )
    
    })
})


app.post('/getpr26', jsonParser, function(req, res){
    body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    });
    req.on('end', () => {
        console.log(body);
        const d = [curUser, body, '1']
        console.log(d)
        con.query(
                    'INSERT INTO products_in_order (order_id, product_id, count) VALUES ('+curUser+', '+body+', '+1+')',
                    async function(error, result){
                        if(error) throw error;
                            console.log('okey')
                    }
                )
    });
    res.redirect(307, '/bascket.html')
    app.post('/bascket.html', (req1, res1) => {
        con.query(
            'select product.id, brand.brand as brand, product_type.type, charactiristic.discription as dicription, price from product INNER JOIN product_type ON product.id_product_type = product_type.id INNER JOIN charactiristic ON product.id = charactiristic.id_product INNER JOIN brand ON product.id_brand = brand.id inner join products_in_order on product.id = products_in_order.product_id where order_id = '+curUser+'',
            async function(error, result){
                if(error) throw error;
                console.log('ok2')
                let resss = {}
                for(let i = 0; i < result.length; i++){
                    resss[result[i]['id']] = `${result[i]['id']} ${result[i]['brand']} ${result[i]['type']} ${result[i]['dicription']} ${result[i]['price']}`
                }
                console.log(resss)
                res1.send(resss)
            }
        )
    
    })
})


app.post('/getpr27', jsonParser, function(req, res){
    body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    });
    req.on('end', () => {
        console.log(body);
        const d = [curUser, body, '1']
        console.log(d)
        con.query(
                    'INSERT INTO products_in_order (order_id, product_id, count) VALUES ('+curUser+', '+body+', '+1+')',
                    async function(error, result){
                        if(error) throw error;
                            console.log('okey')
                    }
                )
    });
    res.redirect(307, '/bascket.html')
    app.post('/bascket.html', (req1, res1) => {
        con.query(
            'select product.id, brand.brand as brand, product_type.type, charactiristic.discription as dicription, price from product INNER JOIN product_type ON product.id_product_type = product_type.id INNER JOIN charactiristic ON product.id = charactiristic.id_product INNER JOIN brand ON product.id_brand = brand.id inner join products_in_order on product.id = products_in_order.product_id where order_id = '+curUser+'',
            async function(error, result){
                if(error) throw error;
                console.log('ok2')
                let resss = {}
                for(let i = 0; i < result.length; i++){
                    resss[result[i]['id']] = `${result[i]['id']} ${result[i]['brand']} ${result[i]['type']} ${result[i]['dicription']} ${result[i]['price']}`
                }
                console.log(resss)
                res1.send(resss)
            }
        )
    
    })
})

app.post('/getpr28', jsonParser, function(req, res){
    body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    });
    req.on('end', () => {
        console.log(body);
        const d = [curUser, body, '1']
        console.log(d)
        con.query(
                    'INSERT INTO products_in_order (order_id, product_id, count) VALUES ('+curUser+', '+body+', '+1+')',
                    async function(error, result){
                        if(error) throw error;
                            console.log('okey')
                    }
                )
    });
    res.redirect(307, '/bascket.html')
    app.post('/bascket.html', (req1, res1) => {
        con.query(
            'select product.id, brand.brand as brand, product_type.type, charactiristic.discription as dicription, price from product INNER JOIN product_type ON product.id_product_type = product_type.id INNER JOIN charactiristic ON product.id = charactiristic.id_product INNER JOIN brand ON product.id_brand = brand.id inner join products_in_order on product.id = products_in_order.product_id where order_id = '+curUser+'',
            async function(error, result){
                if(error) throw error;
                console.log('ok2')
                let resss = {}
                for(let i = 0; i < result.length; i++){
                    resss[result[i]['id']] = `${result[i]['id']} ${result[i]['brand']} ${result[i]['type']} ${result[i]['dicription']} ${result[i]['price']}`
                }
                console.log(resss)
                res1.send(resss)
            }
        )
    
    })
})

app.post('/getpr29', jsonParser, function(req, res){
    body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    });
    req.on('end', () => {
        console.log(body);
        const d = [curUser, body, '1']
        console.log(d)
        con.query(
                    'INSERT INTO products_in_order (order_id, product_id, count) VALUES ('+curUser+', '+body+', '+1+')',
                    async function(error, result){
                        if(error) throw error;
                            console.log('okey')
                    }
                )
    });
    res.redirect(307, '/bascket.html')
    app.post('/bascket.html', (req1, res1) => {
        con.query(
            'select product.id, brand.brand as brand, product_type.type, charactiristic.discription as dicription, price from product INNER JOIN product_type ON product.id_product_type = product_type.id INNER JOIN charactiristic ON product.id = charactiristic.id_product INNER JOIN brand ON product.id_brand = brand.id inner join products_in_order on product.id = products_in_order.product_id where order_id = '+curUser+'',
            async function(error, result){
                if(error) throw error;
                console.log('ok2')
                let resss = {}
                for(let i = 0; i < result.length; i++){
                    resss[result[i]['id']] = `${result[i]['id']} ${result[i]['brand']} ${result[i]['type']} ${result[i]['dicription']} ${result[i]['price']}`
                }
                console.log(resss)
                res1.send(resss)
            }
        )
    
    })
})


app.post('/getpr30', jsonParser, function(req, res){
    body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    });
    req.on('end', () => {
        console.log(body);
        const d = [curUser, body, '1']
        console.log(d)
        con.query(
                    'INSERT INTO products_in_order (order_id, product_id, count) VALUES ('+curUser+', '+body+', '+1+')',
                    async function(error, result){
                        if(error) throw error;
                            console.log('okey')
                    }
                )
    });
    res.redirect(307, '/bascket.html')
    app.post('/bascket.html', (req1, res1) => {
        con.query(
            'select product.id, brand.brand as brand, product_type.type, charactiristic.discription as dicription, price from product INNER JOIN product_type ON product.id_product_type = product_type.id INNER JOIN charactiristic ON product.id = charactiristic.id_product INNER JOIN brand ON product.id_brand = brand.id inner join products_in_order on product.id = products_in_order.product_id where order_id = '+curUser+'',
            async function(error, result){
                if(error) throw error;
                console.log('ok2')
                let resss = {}
                for(let i = 0; i < result.length; i++){
                    resss[result[i]['id']] = `${result[i]['id']} ${result[i]['brand']} ${result[i]['type']} ${result[i]['dicription']} ${result[i]['price']}`
                }
                console.log(resss)
                res1.send(resss)
            }
        )
    
    })
})

app.post('/getpr31', jsonParser, function(req, res){
    body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    });
    req.on('end', () => {
        console.log(body);
        const d = [curUser, body, '1']
        console.log(d)
        con.query(
                    'INSERT INTO products_in_order (order_id, product_id, count) VALUES ('+curUser+', '+body+', '+1+')',
                    async function(error, result){
                        if(error) throw error;
                            console.log('okey')
                    }
                )
    });
    res.redirect(307, '/bascket.html')
    app.post('/bascket.html', (req1, res1) => {
        con.query(
            'select product.id, brand.brand as brand, product_type.type, charactiristic.discription as dicription, price from product INNER JOIN product_type ON product.id_product_type = product_type.id INNER JOIN charactiristic ON product.id = charactiristic.id_product INNER JOIN brand ON product.id_brand = brand.id inner join products_in_order on product.id = products_in_order.product_id where order_id = '+curUser+'',
            async function(error, result){
                if(error) throw error;
                console.log('ok2')
                let resss = {}
                for(let i = 0; i < result.length; i++){
                    resss[result[i]['id']] = `${result[i]['id']} ${result[i]['brand']} ${result[i]['type']} ${result[i]['dicription']} ${result[i]['price']}`
                }
                console.log(resss)
                res1.send(resss)
            }
        )
    
    })
})

app.post('/getpr32', jsonParser, function(req, res){
    body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    });
    req.on('end', () => {
        console.log(body);
        const d = [curUser, body, '1']
        console.log(d)
        con.query(
                    'INSERT INTO products_in_order (order_id, product_id, count) VALUES ('+curUser+', '+body+', '+1+')',
                    async function(error, result){
                        if(error) throw error;
                            console.log('okey')
                    }
                )
    });
    res.redirect(307, '/bascket.html')
    app.post('/bascket.html', (req1, res1) => {
        con.query(
            'select product.id, brand.brand as brand, product_type.type, charactiristic.discription as dicription, price from product INNER JOIN product_type ON product.id_product_type = product_type.id INNER JOIN charactiristic ON product.id = charactiristic.id_product INNER JOIN brand ON product.id_brand = brand.id inner join products_in_order on product.id = products_in_order.product_id where order_id = '+curUser+'',
            async function(error, result){
                if(error) throw error;
                console.log('ok2')
                let resss = {}
                for(let i = 0; i < result.length; i++){
                    resss[result[i]['id']] = `${result[i]['id']} ${result[i]['brand']} ${result[i]['type']} ${result[i]['dicription']} ${result[i]['price']}`
                }
                console.log(resss)
                res1.send(resss)
            }
        )
    
    })
})

app.post('/getpr33', jsonParser, function(req, res){
    body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    });
    req.on('end', () => {
        console.log(body);
        const d = [curUser, body, '1']
        console.log(d)
        con.query(
                    'INSERT INTO products_in_order (order_id, product_id, count) VALUES ('+curUser+', '+body+', '+1+')',
                    async function(error, result){
                        if(error) throw error;
                            console.log('okey')
                    }
                )
    });
    res.redirect(307, '/bascket.html')
    app.post('/bascket.html', (req1, res1) => {
        con.query(
            'select product.id, brand.brand as brand, product_type.type, charactiristic.discription as dicription, price from product INNER JOIN product_type ON product.id_product_type = product_type.id INNER JOIN charactiristic ON product.id = charactiristic.id_product INNER JOIN brand ON product.id_brand = brand.id inner join products_in_order on product.id = products_in_order.product_id where order_id = '+curUser+'',
            async function(error, result){
                if(error) throw error;
                console.log('ok2')
                let resss = {}
                for(let i = 0; i < result.length; i++){
                    resss[result[i]['id']] = `${result[i]['id']} ${result[i]['brand']} ${result[i]['type']} ${result[i]['dicription']} ${result[i]['price']}`
                }
                console.log(resss)
                res1.send(resss)
            }
        )
    
    })
})

app.post('/getpr34', jsonParser, function(req, res){
    body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    });
    req.on('end', () => {
        console.log(body);
        const d = [curUser, body, '1']
        console.log(d)
        con.query(
                    'INSERT INTO products_in_order (order_id, product_id, count) VALUES ('+curUser+', '+body+', '+1+')',
                    async function(error, result){
                        if(error) throw error;
                            console.log('okey')
                    }
                )
    });
    res.redirect(307, '/bascket.html')
    app.post('/bascket.html', (req1, res1) => {
        con.query(
            'select product.id, brand.brand as brand, product_type.type, charactiristic.discription as dicription, price from product INNER JOIN product_type ON product.id_product_type = product_type.id INNER JOIN charactiristic ON product.id = charactiristic.id_product INNER JOIN brand ON product.id_brand = brand.id inner join products_in_order on product.id = products_in_order.product_id where order_id = '+curUser+'',
            async function(error, result){
                if(error) throw error;
                console.log('ok2')
                let resss = {}
                for(let i = 0; i < result.length; i++){
                    resss[result[i]['id']] = `${result[i]['id']} ${result[i]['brand']} ${result[i]['type']} ${result[i]['dicription']} ${result[i]['price']}`
                }
                console.log(resss)
                res1.send(resss)
            }
        )
    
    })
})

app.post('/getpr35', jsonParser, function(req, res){
    body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    });
    req.on('end', () => {
        console.log(body);
        const d = [curUser, body, '1']
        console.log(d)
        con.query(
                    'INSERT INTO products_in_order (order_id, product_id, count) VALUES ('+curUser+', '+body+', '+1+')',
                    async function(error, result){
                        if(error) throw error;
                            console.log('okey')
                    }
                )
    });
    res.redirect(307, '/bascket.html')
    app.post('/bascket.html', (req1, res1) => {
        con.query(
            'select product.id, brand.brand as brand, product_type.type, charactiristic.discription as dicription, price from product INNER JOIN product_type ON product.id_product_type = product_type.id INNER JOIN charactiristic ON product.id = charactiristic.id_product INNER JOIN brand ON product.id_brand = brand.id inner join products_in_order on product.id = products_in_order.product_id where order_id = '+curUser+'',
            async function(error, result){
                if(error) throw error;
                console.log('ok2')
                let resss = {}
                for(let i = 0; i < result.length; i++){
                    resss[result[i]['id']] = `${result[i]['id']} ${result[i]['brand']} ${result[i]['type']} ${result[i]['dicription']} ${result[i]['price']}`
                }
                console.log(resss)
                res1.send(resss)
            }
        )
    
    })
})


app.post('/getpr36', jsonParser, function(req, res){
    body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    });
    req.on('end', () => {
        console.log(body);
        const d = [curUser, body, '1']
        console.log(d)
        con.query(
                    'INSERT INTO products_in_order (order_id, product_id, count) VALUES ('+curUser+', '+body+', '+1+')',
                    async function(error, result){
                        if(error) throw error;
                            console.log('okey')
                    }
                )
    });
    res.redirect(307, '/bascket.html')
    app.post('/bascket.html', (req1, res1) => {
        con.query(
            'select product.id, brand.brand as brand, product_type.type, charactiristic.discription as dicription, price from product INNER JOIN product_type ON product.id_product_type = product_type.id INNER JOIN charactiristic ON product.id = charactiristic.id_product INNER JOIN brand ON product.id_brand = brand.id inner join products_in_order on product.id = products_in_order.product_id where order_id = '+curUser+'',
            async function(error, result){
                if(error) throw error;
                console.log('ok2')
                let resss = {}
                for(let i = 0; i < result.length; i++){
                    resss[result[i]['id']] = `${result[i]['id']} ${result[i]['brand']} ${result[i]['type']} ${result[i]['dicription']} ${result[i]['price']}`
                }
                console.log(resss)
                res1.send(resss)
            }
        )
    
    })
})

app.post('/getpr37', jsonParser, function(req, res){
    body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    });
    req.on('end', () => {
        console.log(body);
        const d = [curUser, body, '1']
        console.log(d)
        con.query(
                    'INSERT INTO products_in_order (order_id, product_id, count) VALUES ('+curUser+', '+body+', '+1+')',
                    async function(error, result){
                        if(error) throw error;
                            console.log('okey')
                    }
                )
    });
    res.redirect(307, '/bascket.html')
    app.post('/bascket.html', (req1, res1) => {
        con.query(
            'select product.id, brand.brand as brand, product_type.type, charactiristic.discription as dicription, price from product INNER JOIN product_type ON product.id_product_type = product_type.id INNER JOIN charactiristic ON product.id = charactiristic.id_product INNER JOIN brand ON product.id_brand = brand.id inner join products_in_order on product.id = products_in_order.product_id where order_id = '+curUser+'',
            async function(error, result){
                if(error) throw error;
                console.log('ok2')
                let resss = {}
                for(let i = 0; i < result.length; i++){
                    resss[result[i]['id']] = `${result[i]['id']} ${result[i]['brand']} ${result[i]['type']} ${result[i]['dicription']} ${result[i]['price']}`
                }
                console.log(resss)
                res1.send(resss)
            }
        )
    
    })
})

app.post('/getpr38', jsonParser, function(req, res){
    body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    });
    req.on('end', () => {
        console.log(body);
        const d = [curUser, body, '1']
        console.log(d)
        con.query(
                    'INSERT INTO products_in_order (order_id, product_id, count) VALUES ('+curUser+', '+body+', '+1+')',
                    async function(error, result){
                        if(error) throw error;
                            console.log('okey')
                    }
                )
    });
    res.redirect(307, '/bascket.html')
    app.post('/bascket.html', (req1, res1) => {
        con.query(
            'select product.id, brand.brand as brand, product_type.type, charactiristic.discription as dicription, price from product INNER JOIN product_type ON product.id_product_type = product_type.id INNER JOIN charactiristic ON product.id = charactiristic.id_product INNER JOIN brand ON product.id_brand = brand.id inner join products_in_order on product.id = products_in_order.product_id where order_id = '+curUser+'',
            async function(error, result){
                if(error) throw error;
                console.log('ok2')
                let resss = {}
                for(let i = 0; i < result.length; i++){
                    resss[result[i]['id']] = `${result[i]['id']} ${result[i]['brand']} ${result[i]['type']} ${result[i]['dicription']} ${result[i]['price']}`
                }
                console.log(resss)
                res1.send(resss)
            }
        )
    
    })
})

app.post('/getpr39', jsonParser, function(req, res){
    body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    });
    req.on('end', () => {
        console.log(body);
        const d = [curUser, body, '1']
        console.log(d)
        con.query(
                    'INSERT INTO products_in_order (order_id, product_id, count) VALUES ('+curUser+', '+body+', '+1+')',
                    async function(error, result){
                        if(error) throw error;
                            console.log('okey')
                    }
                )
    });
    res.redirect(307, '/bascket.html')
    app.post('/bascket.html', (req1, res1) => {
        con.query(
            'select product.id, brand.brand as brand, product_type.type, charactiristic.discription as dicription, price from product INNER JOIN product_type ON product.id_product_type = product_type.id INNER JOIN charactiristic ON product.id = charactiristic.id_product INNER JOIN brand ON product.id_brand = brand.id inner join products_in_order on product.id = products_in_order.product_id where order_id = '+curUser+'',
            async function(error, result){
                if(error) throw error;
                console.log('ok2')
                let resss = {}
                for(let i = 0; i < result.length; i++){
                    resss[result[i]['id']] = `${result[i]['id']} ${result[i]['brand']} ${result[i]['type']} ${result[i]['dicription']} ${result[i]['price']}`
                }
                console.log(resss)
                res1.send(resss)
            }
        )
    
    })
})

app.post('/getpr40', jsonParser, function(req, res){
    body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    });
    req.on('end', () => {
        console.log(body);
        const d = [curUser, body, '1']
        console.log(d)
        con.query(
                    'INSERT INTO products_in_order (order_id, product_id, count) VALUES ('+curUser+', '+body+', '+1+')',
                    async function(error, result){
                        if(error) throw error;
                            console.log('okey')
                    }
                )
    });
    res.redirect(307, '/bascket.html')
    app.post('/bascket.html', (req1, res1) => {
        con.query(
            'select product.id, brand.brand as brand, product_type.type, charactiristic.discription as dicription, price from product INNER JOIN product_type ON product.id_product_type = product_type.id INNER JOIN charactiristic ON product.id = charactiristic.id_product INNER JOIN brand ON product.id_brand = brand.id inner join products_in_order on product.id = products_in_order.product_id where order_id = '+curUser+'',
            async function(error, result){
                if(error) throw error;
                console.log('ok2')
                let resss = {}
                for(let i = 0; i < result.length; i++){
                    resss[result[i]['id']] = `${result[i]['id']} ${result[i]['brand']} ${result[i]['type']} ${result[i]['dicription']} ${result[i]['price']}`
                }
                console.log(resss)
                res1.send(resss)
            }
        )
    
    })
})

app.post('/getpr41', jsonParser, function(req, res){
    body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    });
    req.on('end', () => {
        console.log(body);
        const d = [curUser, body, '1']
        console.log(d)
        con.query(
                    'INSERT INTO products_in_order (order_id, product_id, count) VALUES ('+curUser+', '+body+', '+1+')',
                    async function(error, result){
                        if(error) throw error;
                            console.log('okey')
                    }
                )
    });
    res.redirect(307, '/bascket.html')
    app.post('/bascket.html', (req1, res1) => {
        con.query(
            'select product.id, brand.brand as brand, product_type.type, charactiristic.discription as dicription, price from product INNER JOIN product_type ON product.id_product_type = product_type.id INNER JOIN charactiristic ON product.id = charactiristic.id_product INNER JOIN brand ON product.id_brand = brand.id inner join products_in_order on product.id = products_in_order.product_id where order_id = '+curUser+'',
            async function(error, result){
                if(error) throw error;
                console.log('ok2')
                let resss = {}
                for(let i = 0; i < result.length; i++){
                    resss[result[i]['id']] = `${result[i]['id']} ${result[i]['brand']} ${result[i]['type']} ${result[i]['dicription']} ${result[i]['price']}`
                }
                console.log(resss)
                res1.send(resss)
            }
        )
    
    })
})

app.post('/getpr42', jsonParser, function(req, res){
    body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    });
    req.on('end', () => {
        console.log(body);
        const d = [curUser, body, '1']
        console.log(d)
        con.query(
                    'INSERT INTO products_in_order (order_id, product_id, count) VALUES ('+curUser+', '+body+', '+1+')',
                    async function(error, result){
                        if(error) throw error;
                            console.log('okey')
                    }
                )
    });
    res.redirect(307, '/bascket.html')
    app.post('/bascket.html', (req1, res1) => {
        con.query(
            'select product.id, brand.brand as brand, product_type.type, charactiristic.discription as dicription, price from product INNER JOIN product_type ON product.id_product_type = product_type.id INNER JOIN charactiristic ON product.id = charactiristic.id_product INNER JOIN brand ON product.id_brand = brand.id inner join products_in_order on product.id = products_in_order.product_id where order_id = '+curUser+'',
            async function(error, result){
                if(error) throw error;
                console.log('ok2')
                let resss = {}
                for(let i = 0; i < result.length; i++){
                    resss[result[i]['id']] = `${result[i]['id']} ${result[i]['brand']} ${result[i]['type']} ${result[i]['dicription']} ${result[i]['price']}`
                }
                console.log(resss)
                res1.send(resss)
            }
        )
    
    })
})

app.post('/getpr43', jsonParser, function(req, res){
    body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    });
    req.on('end', () => {
        console.log(body);
        const d = [curUser, body, '1']
        console.log(d)
        con.query(
                    'INSERT INTO products_in_order (order_id, product_id, count) VALUES ('+curUser+', '+body+', '+1+')',
                    async function(error, result){
                        if(error) throw error;
                            console.log('okey')
                    }
                )
    });
    res.redirect(307, '/bascket.html')
    app.post('/bascket.html', (req1, res1) => {
        con.query(
            'select product.id, brand.brand as brand, product_type.type, charactiristic.discription as dicription, price from product INNER JOIN product_type ON product.id_product_type = product_type.id INNER JOIN charactiristic ON product.id = charactiristic.id_product INNER JOIN brand ON product.id_brand = brand.id inner join products_in_order on product.id = products_in_order.product_id where order_id = '+curUser+'',
            async function(error, result){
                if(error) throw error;
                console.log('ok2')
                let resss = {}
                for(let i = 0; i < result.length; i++){
                    resss[result[i]['id']] = `${result[i]['id']} ${result[i]['brand']} ${result[i]['type']} ${result[i]['dicription']} ${result[i]['price']}`
                }
                console.log(resss)
                res1.send(resss)
            }
        )
    
    })
})

app.post('/getpr44', jsonParser, function(req, res){
    body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    });
    req.on('end', () => {
        console.log(body);
        const d = [curUser, body, '1']
        console.log(d)
        con.query(
                    'INSERT INTO products_in_order (order_id, product_id, count) VALUES ('+curUser+', '+body+', '+1+')',
                    async function(error, result){
                        if(error) throw error;
                            console.log('okey')
                    }
                )
    });
    res.redirect(307, '/bascket.html')
    app.post('/bascket.html', (req1, res1) => {
        con.query(
            'select product.id, brand.brand as brand, product_type.type, charactiristic.discription as dicription, price from product INNER JOIN product_type ON product.id_product_type = product_type.id INNER JOIN charactiristic ON product.id = charactiristic.id_product INNER JOIN brand ON product.id_brand = brand.id inner join products_in_order on product.id = products_in_order.product_id where order_id = '+curUser+'',
            async function(error, result){
                if(error) throw error;
                console.log('ok2')
                let resss = {}
                for(let i = 0; i < result.length; i++){
                    resss[result[i]['id']] = `${result[i]['id']} ${result[i]['brand']} ${result[i]['type']} ${result[i]['dicription']} ${result[i]['price']}`
                }
                console.log(resss)
                res1.send(resss)
            }
        )
    
    })
})

app.post('/getpr45', jsonParser, function(req, res){
    body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    });
    req.on('end', () => {
        console.log(body);
        const d = [curUser, body, '1']
        console.log(d)
        con.query(
                    'INSERT INTO products_in_order (order_id, product_id, count) VALUES ('+curUser+', '+body+', '+1+')',
                    async function(error, result){
                        if(error) throw error;
                            console.log('okey')
                    }
                )
    });
    res.redirect(307, '/bascket.html')
    app.post('/bascket.html', (req1, res1) => {
        con.query(
            'select product.id, brand.brand as brand, product_type.type, charactiristic.discription as dicription, price from product INNER JOIN product_type ON product.id_product_type = product_type.id INNER JOIN charactiristic ON product.id = charactiristic.id_product INNER JOIN brand ON product.id_brand = brand.id inner join products_in_order on product.id = products_in_order.product_id where order_id = '+curUser+'',
            async function(error, result){
                if(error) throw error;
                console.log('ok2')
                let resss = {}
                for(let i = 0; i < result.length; i++){
                    resss[result[i]['id']] = `${result[i]['id']} ${result[i]['brand']} ${result[i]['type']} ${result[i]['dicription']} ${result[i]['price']}`
                }
                console.log(resss)
                res1.send(resss)
            }
        )
    
    })
})

app.post('/getpr46', jsonParser, function(req, res){
    body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    });
    req.on('end', () => {
        console.log(body);
        const d = [curUser, body, '1']
        console.log(d)
        con.query(
                    'INSERT INTO products_in_order (order_id, product_id, count) VALUES ('+curUser+', '+body+', '+1+')',
                    async function(error, result){
                        if(error) throw error;
                            console.log('okey')
                    }
                )
    });
    res.redirect(307, '/bascket.html')
    app.post('/bascket.html', (req1, res1) => {
        con.query(
            'select product.id, brand.brand as brand, product_type.type, charactiristic.discription as dicription, price from product INNER JOIN product_type ON product.id_product_type = product_type.id INNER JOIN charactiristic ON product.id = charactiristic.id_product INNER JOIN brand ON product.id_brand = brand.id inner join products_in_order on product.id = products_in_order.product_id where order_id = '+curUser+'',
            async function(error, result){
                if(error) throw error;
                console.log('ok2')
                let resss = {}
                for(let i = 0; i < result.length; i++){
                    resss[result[i]['id']] = `${result[i]['id']} ${result[i]['brand']} ${result[i]['type']} ${result[i]['dicription']} ${result[i]['price']}`
                }
                console.log(resss)
                res1.send(resss)
            }
        )
    
    })
})

app.post('/getpr47', jsonParser, function(req, res){
    body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    });
    req.on('end', () => {
        console.log(body);
        const d = [curUser, body, '1']
        console.log(d)
        con.query(
                    'INSERT INTO products_in_order (order_id, product_id, count) VALUES ('+curUser+', '+body+', '+1+')',
                    async function(error, result){
                        if(error) throw error;
                            console.log('okey')
                    }
                )
    });
    res.redirect(307, '/bascket.html')
    app.post('/bascket.html', (req1, res1) => {
        con.query(
            'select product.id, brand.brand as brand, product_type.type, charactiristic.discription as dicription, price from product INNER JOIN product_type ON product.id_product_type = product_type.id INNER JOIN charactiristic ON product.id = charactiristic.id_product INNER JOIN brand ON product.id_brand = brand.id inner join products_in_order on product.id = products_in_order.product_id where order_id = '+curUser+'',
            async function(error, result){
                if(error) throw error;
                console.log('ok2')
                let resss = {}
                for(let i = 0; i < result.length; i++){
                    resss[result[i]['id']] = `${result[i]['id']} ${result[i]['brand']} ${result[i]['type']} ${result[i]['dicription']} ${result[i]['price']}`
                }
                console.log(resss)
                res1.send(resss)
            }
        )
    
    })
})

app.post('/getpr48', jsonParser, function(req, res){
    body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    });
    req.on('end', () => {
        console.log(body);
        const d = [curUser, body, '1']
        console.log(d)
        con.query(
                    'INSERT INTO products_in_order (order_id, product_id, count) VALUES ('+curUser+', '+body+', '+1+')',
                    async function(error, result){
                        if(error) throw error;
                            console.log('okey')
                    }
                )
    });
    res.redirect(307, '/bascket.html')
    app.post('/bascket.html', (req1, res1) => {
        con.query(
            'select product.id, brand.brand as brand, product_type.type, charactiristic.discription as dicription, price from product INNER JOIN product_type ON product.id_product_type = product_type.id INNER JOIN charactiristic ON product.id = charactiristic.id_product INNER JOIN brand ON product.id_brand = brand.id inner join products_in_order on product.id = products_in_order.product_id where order_id = '+curUser+'',
            async function(error, result){
                if(error) throw error;
                console.log('ok2')
                let resss = {}
                for(let i = 0; i < result.length; i++){
                    resss[result[i]['id']] = `${result[i]['id']} ${result[i]['brand']} ${result[i]['type']} ${result[i]['dicription']} ${result[i]['price']}`
                }
                console.log(resss)
                res1.send(resss)
            }
        )
    
    })
})

app.post('/getpr49', jsonParser, function(req, res){
    body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    });
    req.on('end', () => {
        console.log(body);
        const d = [curUser, body, '1']
        console.log(d)
        con.query(
                    'INSERT INTO products_in_order (order_id, product_id, count) VALUES ('+curUser+', '+body+', '+1+')',
                    async function(error, result){
                        if(error) throw error;
                            console.log('okey')
                    }
                )
    });
    res.redirect(307, '/bascket.html')
    app.post('/bascket.html', (req1, res1) => {
        con.query(
            'select product.id, brand.brand as brand, product_type.type, charactiristic.discription as dicription, price from product INNER JOIN product_type ON product.id_product_type = product_type.id INNER JOIN charactiristic ON product.id = charactiristic.id_product INNER JOIN brand ON product.id_brand = brand.id inner join products_in_order on product.id = products_in_order.product_id where order_id = '+curUser+'',
            async function(error, result){
                if(error) throw error;
                console.log('ok2')
                let resss = {}
                for(let i = 0; i < result.length; i++){
                    resss[result[i]['id']] = `${result[i]['id']} ${result[i]['brand']} ${result[i]['type']} ${result[i]['dicription']} ${result[i]['price']}`
                }
                console.log(resss)
                res1.send(resss)
            }
        )
    
    })
})

app.post('/getpr50', jsonParser, function(req, res){
    body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    });
    req.on('end', () => {
        console.log(body);
        const d = [curUser, body, '1']
        console.log(d)
        con.query(
                    'INSERT INTO products_in_order (order_id, product_id, count) VALUES ('+curUser+', '+body+', '+1+')',
                    async function(error, result){
                        if(error) throw error;
                            console.log('okey')
                    }
                )
    });
    res.redirect(307, '/bascket.html')
    app.post('/bascket.html', (req1, res1) => {
        con.query(
            'select product.id, brand.brand as brand, product_type.type, charactiristic.discription as dicription, price from product INNER JOIN product_type ON product.id_product_type = product_type.id INNER JOIN charactiristic ON product.id = charactiristic.id_product INNER JOIN brand ON product.id_brand = brand.id inner join products_in_order on product.id = products_in_order.product_id where order_id = '+curUser+'',
            async function(error, result){
                if(error) throw error;
                console.log('ok2')
                let resss = {}
                for(let i = 0; i < result.length; i++){
                    resss[result[i]['id']] = `${result[i]['id']} ${result[i]['brand']} ${result[i]['type']} ${result[i]['dicription']} ${result[i]['price']}`
                }
                console.log(resss)
                res1.send(resss)
            }
        )
    
    })
})

app.post('/getpr51', jsonParser, function(req, res){
    body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    });
    req.on('end', () => {
        console.log(body);
        const d = [curUser, body, '1']
        console.log(d)
        con.query(
                    'INSERT INTO products_in_order (order_id, product_id, count) VALUES ('+curUser+', '+body+', '+1+')',
                    async function(error, result){
                        if(error) throw error;
                            console.log('okey')
                    }
                )
    });
    res.redirect(307, '/bascket.html')
    app.post('/bascket.html', (req1, res1) => {
        con.query(
            'select product.id, brand.brand as brand, product_type.type, charactiristic.discription as dicription, price from product INNER JOIN product_type ON product.id_product_type = product_type.id INNER JOIN charactiristic ON product.id = charactiristic.id_product INNER JOIN brand ON product.id_brand = brand.id inner join products_in_order on product.id = products_in_order.product_id where order_id = '+curUser+'',
            async function(error, result){
                if(error) throw error;
                console.log('ok2')
                let resss = {}
                for(let i = 0; i < result.length; i++){
                    resss[result[i]['id']] = `${result[i]['id']} ${result[i]['brand']} ${result[i]['type']} ${result[i]['dicription']} ${result[i]['price']}`
                }
                console.log(resss)
                res1.send(resss)
            }
        )
    
    })
})

app.post('/getpr52', jsonParser, function(req, res){
    body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    });
    req.on('end', () => {
        console.log(body);
        const d = [curUser, body, '1']
        console.log(d)
        con.query(
                    'INSERT INTO products_in_order (order_id, product_id, count) VALUES ('+curUser+', '+body+', '+1+')',
                    async function(error, result){
                        if(error) throw error;
                            console.log('okey')
                    }
                )
    });
    res.redirect(307, '/bascket.html')
    app.post('/bascket.html', (req1, res1) => {
        con.query(
            'select product.id, brand.brand as brand, product_type.type, charactiristic.discription as dicription, price from product INNER JOIN product_type ON product.id_product_type = product_type.id INNER JOIN charactiristic ON product.id = charactiristic.id_product INNER JOIN brand ON product.id_brand = brand.id inner join products_in_order on product.id = products_in_order.product_id where order_id = '+curUser+'',
            async function(error, result){
                if(error) throw error;
                console.log('ok2')
                let resss = {}
                for(let i = 0; i < result.length; i++){
                    resss[result[i]['id']] = `${result[i]['id']} ${result[i]['brand']} ${result[i]['type']} ${result[i]['dicription']} ${result[i]['price']}`
                }
                console.log(resss)
                res1.send(resss)
            }
        )
    
    })
})

app.post('/getpr53', jsonParser, function(req, res){
    body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    });
    req.on('end', () => {
        console.log(body);
        const d = [curUser, body, '1']
        console.log(d)
        con.query(
                    'INSERT INTO products_in_order (order_id, product_id, count) VALUES ('+curUser+', '+body+', '+1+')',
                    async function(error, result){
                        if(error) throw error;
                            console.log('okey')
                    }
                )
    });
    res.redirect(307, '/bascket.html')
    app.post('/bascket.html', (req1, res1) => {
        con.query(
            'select product.id, brand.brand as brand, product_type.type, charactiristic.discription as dicription, price from product INNER JOIN product_type ON product.id_product_type = product_type.id INNER JOIN charactiristic ON product.id = charactiristic.id_product INNER JOIN brand ON product.id_brand = brand.id inner join products_in_order on product.id = products_in_order.product_id where order_id = '+curUser+'',
            async function(error, result){
                if(error) throw error;
                console.log('ok2')
                let resss = {}
                for(let i = 0; i < result.length; i++){
                    resss[result[i]['id']] = `${result[i]['id']} ${result[i]['brand']} ${result[i]['type']} ${result[i]['dicription']} ${result[i]['price']}`
                }
                console.log(resss)
                res1.send(resss)
            }
        )
    
    })
})

app.post('/getpr54', jsonParser, function(req, res){
    body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    });
    req.on('end', () => {
        console.log(body);
        const d = [curUser, body, '1']
        console.log(d)
        con.query(
                    'INSERT INTO products_in_order (order_id, product_id, count) VALUES ('+curUser+', '+body+', '+1+')',
                    async function(error, result){
                        if(error) throw error;
                            console.log('okey')
                    }
                )
    });
    res.redirect(307, '/bascket.html')
    app.post('/bascket.html', (req1, res1) => {
        con.query(
            'select product.id, brand.brand as brand, product_type.type, charactiristic.discription as dicription, price from product INNER JOIN product_type ON product.id_product_type = product_type.id INNER JOIN charactiristic ON product.id = charactiristic.id_product INNER JOIN brand ON product.id_brand = brand.id inner join products_in_order on product.id = products_in_order.product_id where order_id = '+curUser+'',
            async function(error, result){
                if(error) throw error;
                console.log('ok2')
                let resss = {}
                for(let i = 0; i < result.length; i++){
                    resss[result[i]['id']] = `${result[i]['id']} ${result[i]['brand']} ${result[i]['type']} ${result[i]['dicription']} ${result[i]['price']}`
                }
                console.log(resss)
                res1.send(resss)
            }
        )
    
    })
})


app.post('/getpr55', jsonParser, function(req, res){
    body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    });
    req.on('end', () => {
        console.log(body);
        const d = [curUser, body, '1']
        console.log(d)
        con.query(
                    'INSERT INTO products_in_order (order_id, product_id, count) VALUES ('+curUser+', '+body+', '+1+')',
                    async function(error, result){
                        if(error) throw error;
                            console.log('okey')
                    }
                )
    });
    res.redirect(307, '/bascket.html')
    app.post('/bascket.html', (req1, res1) => {
        con.query(
            'select product.id, brand.brand as brand, product_type.type, charactiristic.discription as dicription, price from product INNER JOIN product_type ON product.id_product_type = product_type.id INNER JOIN charactiristic ON product.id = charactiristic.id_product INNER JOIN brand ON product.id_brand = brand.id inner join products_in_order on product.id = products_in_order.product_id where order_id = '+curUser+'',
            async function(error, result){
                if(error) throw error;
                console.log('ok2')
                let resss = {}
                for(let i = 0; i < result.length; i++){
                    resss[result[i]['id']] = `${result[i]['id']} ${result[i]['brand']} ${result[i]['type']} ${result[i]['dicription']} ${result[i]['price']}`
                }
                console.log(resss)
                res1.send(resss)
            }
        )
    
    })
})

app.post('/getpr56', jsonParser, function(req, res){
    body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    });
    req.on('end', () => {
        console.log(body);
        const d = [curUser, body, '1']
        console.log(d)
        con.query(
                    'INSERT INTO products_in_order (order_id, product_id, count) VALUES ('+curUser+', '+body+', '+1+')',
                    async function(error, result){
                        if(error) throw error;
                            console.log('okey')
                    }
                )
    });
    res.redirect(307, '/bascket.html')
    app.post('/bascket.html', (req1, res1) => {
        con.query(
            'select product.id, brand.brand as brand, product_type.type, charactiristic.discription as dicription, price from product INNER JOIN product_type ON product.id_product_type = product_type.id INNER JOIN charactiristic ON product.id = charactiristic.id_product INNER JOIN brand ON product.id_brand = brand.id inner join products_in_order on product.id = products_in_order.product_id where order_id = '+curUser+'',
            async function(error, result){
                if(error) throw error;
                console.log('ok2')
                let resss = {}
                for(let i = 0; i < result.length; i++){
                    resss[result[i]['id']] = `${result[i]['id']} ${result[i]['brand']} ${result[i]['type']} ${result[i]['dicription']} ${result[i]['price']}`
                }
                console.log(resss)
                res1.send(resss)
            }
        )
    
    })
})

app.post('/getpr57', jsonParser, function(req, res){
    body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    });
    req.on('end', () => {
        console.log(body);
        const d = [curUser, body, '1']
        console.log(d)
        con.query(
                    'INSERT INTO products_in_order (order_id, product_id, count) VALUES ('+curUser+', '+body+', '+1+')',
                    async function(error, result){
                        if(error) throw error;
                            console.log('okey')
                    }
                )
    });
    res.redirect(307, '/bascket.html')
    app.post('/bascket.html', (req1, res1) => {
        con.query(
            'select product.id, brand.brand as brand, product_type.type, charactiristic.discription as dicription, price from product INNER JOIN product_type ON product.id_product_type = product_type.id INNER JOIN charactiristic ON product.id = charactiristic.id_product INNER JOIN brand ON product.id_brand = brand.id inner join products_in_order on product.id = products_in_order.product_id where order_id = '+curUser+'',
            async function(error, result){
                if(error) throw error;
                console.log('ok2')
                let resss = {}
                for(let i = 0; i < result.length; i++){
                    resss[result[i]['id']] = `${result[i]['id']} ${result[i]['brand']} ${result[i]['type']} ${result[i]['dicription']} ${result[i]['price']}`
                }
                console.log(resss)
                res1.send(resss)
            }
        )
    
    })
})

app.post('/getpr58', jsonParser, function(req, res){
    body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    });
    req.on('end', () => {
        console.log(body);
        const d = [curUser, body, '1']
        console.log(d)
        con.query(
                    'INSERT INTO products_in_order (order_id, product_id, count) VALUES ('+curUser+', '+body+', '+1+')',
                    async function(error, result){
                        if(error) throw error;
                            console.log('okey')
                    }
                )
    });
    res.redirect(307, '/bascket.html')
    app.post('/bascket.html', (req1, res1) => {
        con.query(
            'select product.id, brand.brand as brand, product_type.type, charactiristic.discription as dicription, price from product INNER JOIN product_type ON product.id_product_type = product_type.id INNER JOIN charactiristic ON product.id = charactiristic.id_product INNER JOIN brand ON product.id_brand = brand.id inner join products_in_order on product.id = products_in_order.product_id where order_id = '+curUser+'',
            async function(error, result){
                if(error) throw error;
                console.log('ok2')
                let resss = {}
                for(let i = 0; i < result.length; i++){
                    resss[result[i]['id']] = `${result[i]['id']} ${result[i]['brand']} ${result[i]['type']} ${result[i]['dicription']} ${result[i]['price']}`
                }
                console.log(resss)
                res1.send(resss)
            }
        )
    
    })
})

app.post('/getpr59', jsonParser, function(req, res){
    body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    });
    req.on('end', () => {
        console.log(body);
        const d = [curUser, body, '1']
        console.log(d)
        con.query(
                    'INSERT INTO products_in_order (order_id, product_id, count) VALUES ('+curUser+', '+body+', '+1+')',
                    async function(error, result){
                        if(error) throw error;
                            console.log('okey')
                    }
                )
    });
    res.redirect(307, '/bascket.html')
    app.post('/bascket.html', (req1, res1) => {
        con.query(
            'select product.id, brand.brand as brand, product_type.type, charactiristic.discription as dicription, price from product INNER JOIN product_type ON product.id_product_type = product_type.id INNER JOIN charactiristic ON product.id = charactiristic.id_product INNER JOIN brand ON product.id_brand = brand.id inner join products_in_order on product.id = products_in_order.product_id where order_id = '+curUser+'',
            async function(error, result){
                if(error) throw error;
                console.log('ok2')
                let resss = {}
                for(let i = 0; i < result.length; i++){
                    resss[result[i]['id']] = `${result[i]['id']} ${result[i]['brand']} ${result[i]['type']} ${result[i]['dicription']} ${result[i]['price']}`
                }
                console.log(resss)
                res1.send(resss)
            }
        )
    
    })
})

app.post('/getpr60', jsonParser, function(req, res){
    body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    });
    req.on('end', () => {
        console.log(body);
        const d = [curUser, body, '1']
        console.log(d)
        con.query(
                    'INSERT INTO products_in_order (order_id, product_id, count) VALUES ('+curUser+', '+body+', '+1+')',
                    async function(error, result){
                        if(error) throw error;
                            console.log('okey')
                    }
                )
    });
    res.redirect(307, '/bascket.html')
    app.post('/bascket.html', (req1, res1) => {
        con.query(
            'select product.id, brand.brand as brand, product_type.type, charactiristic.discription as dicription, price from product INNER JOIN product_type ON product.id_product_type = product_type.id INNER JOIN charactiristic ON product.id = charactiristic.id_product INNER JOIN brand ON product.id_brand = brand.id inner join products_in_order on product.id = products_in_order.product_id where order_id = '+curUser+'',
            async function(error, result){
                if(error) throw error;
                console.log('ok2')
                let resss = {}
                for(let i = 0; i < result.length; i++){
                    resss[result[i]['id']] = `${result[i]['id']} ${result[i]['brand']} ${result[i]['type']} ${result[i]['dicription']} ${result[i]['price']}`
                }
                console.log(resss)
                res1.send(resss)
            }
        )
    
    })
})

app.post('/getpr61', jsonParser, function(req, res){
    body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    });
    req.on('end', () => {
        console.log(body);
        const d = [curUser, body, '1']
        console.log(d)
        con.query(
                    'INSERT INTO products_in_order (order_id, product_id, count) VALUES ('+curUser+', '+body+', '+1+')',
                    async function(error, result){
                        if(error) throw error;
                            console.log('okey')
                    }
                )
    });
    res.redirect(307, '/bascket.html')
    app.post('/bascket.html', (req1, res1) => {
        con.query(
            'select product.id, brand.brand as brand, product_type.type, charactiristic.discription as dicription, price from product INNER JOIN product_type ON product.id_product_type = product_type.id INNER JOIN charactiristic ON product.id = charactiristic.id_product INNER JOIN brand ON product.id_brand = brand.id inner join products_in_order on product.id = products_in_order.product_id where order_id = '+curUser+'',
            async function(error, result){
                if(error) throw error;
                console.log('ok2')
                let resss = {}
                for(let i = 0; i < result.length; i++){
                    resss[result[i]['id']] = `${result[i]['id']} ${result[i]['brand']} ${result[i]['type']} ${result[i]['dicription']} ${result[i]['price']}`
                }
                console.log(resss)
                res1.send(resss)
            }
        )
    
    })
})

app.post('/getpr62', jsonParser, function(req, res){
    body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    });
    req.on('end', () => {
        console.log(body);
        const d = [curUser, body, '1']
        console.log(d)
        con.query(
                    'INSERT INTO products_in_order (order_id, product_id, count) VALUES ('+curUser+', '+body+', '+1+')',
                    async function(error, result){
                        if(error) throw error;
                            console.log('okey')
                    }
                )
    });
    res.redirect(307, '/bascket.html')
    app.post('/bascket.html', (req1, res1) => {
        con.query(
            'select product.id, brand.brand as brand, product_type.type, charactiristic.discription as dicription, price from product INNER JOIN product_type ON product.id_product_type = product_type.id INNER JOIN charactiristic ON product.id = charactiristic.id_product INNER JOIN brand ON product.id_brand = brand.id inner join products_in_order on product.id = products_in_order.product_id where order_id = '+curUser+'',
            async function(error, result){
                if(error) throw error;
                console.log('ok2')
                let resss = {}
                for(let i = 0; i < result.length; i++){
                    resss[result[i]['id']] = `${result[i]['id']} ${result[i]['brand']} ${result[i]['type']} ${result[i]['dicription']} ${result[i]['price']}`
                }
                console.log(resss)
                res1.send(resss)
            }
        )
    
    })
})

app.post('/getpr63', jsonParser, function(req, res){
    body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    });
    req.on('end', () => {
        console.log(body);
        const d = [curUser, body, '1']
        console.log(d)
        con.query(
                    'INSERT INTO products_in_order (order_id, product_id, count) VALUES ('+curUser+', '+body+', '+1+')',
                    async function(error, result){
                        if(error) throw error;
                            console.log('okey')
                    }
                )
    });
    res.redirect(307, '/bascket.html')
    app.post('/bascket.html', (req1, res1) => {
        con.query(
            'select product.id, brand.brand as brand, product_type.type, charactiristic.discription as dicription, price from product INNER JOIN product_type ON product.id_product_type = product_type.id INNER JOIN charactiristic ON product.id = charactiristic.id_product INNER JOIN brand ON product.id_brand = brand.id inner join products_in_order on product.id = products_in_order.product_id where order_id = '+curUser+'',
            async function(error, result){
                if(error) throw error;
                console.log('ok2')
                let resss = {}
                for(let i = 0; i < result.length; i++){
                    resss[result[i]['id']] = `${result[i]['id']} ${result[i]['brand']} ${result[i]['type']} ${result[i]['dicription']} ${result[i]['price']}`
                }
                console.log(resss)
                res1.send(resss)
            }
        )
    
    })
})

app.post('/getpr64', jsonParser, function(req, res){
    body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    });
    req.on('end', () => {
        console.log(body);
        const d = [curUser, body, '1']
        console.log(d)
        con.query(
                    'INSERT INTO products_in_order (order_id, product_id, count) VALUES ('+curUser+', '+body+', '+1+')',
                    async function(error, result){
                        if(error) throw error;
                            console.log('okey')
                    }
                )
    });
    res.redirect(307, '/bascket.html')
    app.post('/bascket.html', (req1, res1) => {
        con.query(
            'select product.id, brand.brand as brand, product_type.type, charactiristic.discription as dicription, price from product INNER JOIN product_type ON product.id_product_type = product_type.id INNER JOIN charactiristic ON product.id = charactiristic.id_product INNER JOIN brand ON product.id_brand = brand.id inner join products_in_order on product.id = products_in_order.product_id where order_id = '+curUser+'',
            async function(error, result){
                if(error) throw error;
                console.log('ok2')
                let resss = {}
                for(let i = 0; i < result.length; i++){
                    resss[result[i]['id']] = `${result[i]['id']} ${result[i]['brand']} ${result[i]['type']} ${result[i]['dicription']} ${result[i]['price']}`
                }
                console.log(resss)
                res1.send(resss)
            }
        )
    
    })
})

app.post('/getpr65', jsonParser, function(req, res){
    body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    });
    req.on('end', () => {
        console.log(body);
        const d = [curUser, body, '1']
        console.log(d)
        con.query(
                    'INSERT INTO products_in_order (order_id, product_id, count) VALUES ('+curUser+', '+body+', '+1+')',
                    async function(error, result){
                        if(error) throw error;
                            console.log('okey')
                    }
                )
    });
    res.redirect(307, '/bascket.html')
    app.post('/bascket.html', (req1, res1) => {
        con.query(
            'select product.id, brand.brand as brand, product_type.type, charactiristic.discription as dicription, price from product INNER JOIN product_type ON product.id_product_type = product_type.id INNER JOIN charactiristic ON product.id = charactiristic.id_product INNER JOIN brand ON product.id_brand = brand.id inner join products_in_order on product.id = products_in_order.product_id where order_id = '+curUser+'',
            async function(error, result){
                if(error) throw error;
                console.log('ok2')
                let resss = {}
                for(let i = 0; i < result.length; i++){
                    resss[result[i]['id']] = `${result[i]['id']} ${result[i]['brand']} ${result[i]['type']} ${result[i]['dicription']} ${result[i]['price']}`
                }
                console.log(resss)
                res1.send(resss)
            }
        )
    
    })
})

app.post('/getpr66', jsonParser, function(req, res){
    body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    });
    req.on('end', () => {
        console.log(body);
        const d = [curUser, body, '1']
        console.log(d)
        con.query(
                    'INSERT INTO products_in_order (order_id, product_id, count) VALUES ('+curUser+', '+body+', '+1+')',
                    async function(error, result){
                        if(error) throw error;
                            console.log('okey')
                    }
                )
    });
    res.redirect(307, '/bascket.html')
    app.post('/bascket.html', (req1, res1) => {
        con.query(
            'select product.id, brand.brand as brand, product_type.type, charactiristic.discription as dicription, price from product INNER JOIN product_type ON product.id_product_type = product_type.id INNER JOIN charactiristic ON product.id = charactiristic.id_product INNER JOIN brand ON product.id_brand = brand.id inner join products_in_order on product.id = products_in_order.product_id where order_id = '+curUser+'',
            async function(error, result){
                if(error) throw error;
                console.log('ok2')
                let resss = {}
                for(let i = 0; i < result.length; i++){
                    resss[result[i]['id']] = `${result[i]['id']} ${result[i]['brand']} ${result[i]['type']} ${result[i]['dicription']} ${result[i]['price']}`
                }
                console.log(resss)
                res1.send(resss)
            }
        )
    
    })
})

app.post('/getpr67', jsonParser, function(req, res){
    body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    });
    req.on('end', () => {
        console.log(body);
        const d = [curUser, body, '1']
        console.log(d)
        con.query(
                    'INSERT INTO products_in_order (order_id, product_id, count) VALUES ('+curUser+', '+body+', '+1+')',
                    async function(error, result){
                        if(error) throw error;
                            console.log('okey')
                    }
                )
    });
    res.redirect(307, '/bascket.html')
    app.post('/bascket.html', (req1, res1) => {
        con.query(
            'select product.id, brand.brand as brand, product_type.type, charactiristic.discription as dicription, price from product INNER JOIN product_type ON product.id_product_type = product_type.id INNER JOIN charactiristic ON product.id = charactiristic.id_product INNER JOIN brand ON product.id_brand = brand.id inner join products_in_order on product.id = products_in_order.product_id where order_id = '+curUser+'',
            async function(error, result){
                if(error) throw error;
                console.log('ok2')
                let resss = {}
                for(let i = 0; i < result.length; i++){
                    resss[result[i]['id']] = `${result[i]['id']} ${result[i]['brand']} ${result[i]['type']} ${result[i]['dicription']} ${result[i]['price']}`
                }
                console.log(resss)
                res1.send(resss)
            }
        )
    
    })
})

app.post('/getpr68', jsonParser, function(req, res){
    body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    });
    req.on('end', () => {
        console.log(body);
        const d = [curUser, body, '1']
        console.log(d)
        con.query(
                    'INSERT INTO products_in_order (order_id, product_id, count) VALUES ('+curUser+', '+body+', '+1+')',
                    async function(error, result){
                        if(error) throw error;
                            console.log('okey')
                    }
                )
    });
    res.redirect(307, '/bascket.html')
    app.post('/bascket.html', (req1, res1) => {
        con.query(
            'select product.id, brand.brand as brand, product_type.type, charactiristic.discription as dicription, price from product INNER JOIN product_type ON product.id_product_type = product_type.id INNER JOIN charactiristic ON product.id = charactiristic.id_product INNER JOIN brand ON product.id_brand = brand.id inner join products_in_order on product.id = products_in_order.product_id where order_id = '+curUser+'',
            async function(error, result){
                if(error) throw error;
                console.log('ok2')
                let resss = {}
                for(let i = 0; i < result.length; i++){
                    resss[result[i]['id']] = `${result[i]['id']} ${result[i]['brand']} ${result[i]['type']} ${result[i]['dicription']} ${result[i]['price']}`
                }
                console.log(resss)
                res1.send(resss)
            }
        )
    
    })
})

app.post('/getpr69', jsonParser, function(req, res){
    body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    });
    req.on('end', () => {
        console.log(body);
        const d = [curUser, body, '1']
        console.log(d)
        con.query(
                    'INSERT INTO products_in_order (order_id, product_id, count) VALUES ('+curUser+', '+body+', '+1+')',
                    async function(error, result){
                        if(error) throw error;
                            console.log('okey')
                    }
                )
    });
    res.redirect(307, '/bascket.html')
    app.post('/bascket.html', (req1, res1) => {
        con.query(
            'select product.id, brand.brand as brand, product_type.type, charactiristic.discription as dicription, price from product INNER JOIN product_type ON product.id_product_type = product_type.id INNER JOIN charactiristic ON product.id = charactiristic.id_product INNER JOIN brand ON product.id_brand = brand.id inner join products_in_order on product.id = products_in_order.product_id where order_id = '+curUser+'',
            async function(error, result){
                if(error) throw error;
                console.log('ok2')
                let resss = {}
                for(let i = 0; i < result.length; i++){
                    resss[result[i]['id']] = `${result[i]['id']} ${result[i]['brand']} ${result[i]['type']} ${result[i]['dicription']} ${result[i]['price']}`
                }
                console.log(resss)
                res1.send(resss)
            }
        )
    
    })
})

app.post('/getpr70', jsonParser, function(req, res){
    body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    });
    req.on('end', () => {
        console.log(body);
        const d = [curUser, body, '1']
        console.log(d)
        con.query(
                    'INSERT INTO products_in_order (order_id, product_id, count) VALUES ('+curUser+', '+body+', '+1+')',
                    async function(error, result){
                        if(error) throw error;
                            console.log('okey')
                    }
                )
    });
    res.redirect(307, '/bascket.html')
    app.post('/bascket.html', (req1, res1) => {
        con.query(
            'select product.id, brand.brand as brand, product_type.type, charactiristic.discription as dicription, price from product INNER JOIN product_type ON product.id_product_type = product_type.id INNER JOIN charactiristic ON product.id = charactiristic.id_product INNER JOIN brand ON product.id_brand = brand.id inner join products_in_order on product.id = products_in_order.product_id where order_id = '+curUser+'',
            async function(error, result){
                if(error) throw error;
                console.log('ok2')
                let resss = {}
                for(let i = 0; i < result.length; i++){
                    resss[result[i]['id']] = `${result[i]['id']} ${result[i]['brand']} ${result[i]['type']} ${result[i]['dicription']} ${result[i]['price']}`
                }
                console.log(resss)
                res1.send(resss)
            }
        )
    
    })
})

app.post('/getpr71', jsonParser, function(req, res){
    body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    });
    req.on('end', () => {
        console.log(body);
        const d = [curUser, body, '1']
        console.log(d)
        con.query(
                    'INSERT INTO products_in_order (order_id, product_id, count) VALUES ('+curUser+', '+body+', '+1+')',
                    async function(error, result){
                        if(error) throw error;
                            console.log('okey')
                    }
                )
    });
    res.redirect(307, '/bascket.html')
    app.post('/bascket.html', (req1, res1) => {
        con.query(
            'select product.id, brand.brand as brand, product_type.type, charactiristic.discription as dicription, price from product INNER JOIN product_type ON product.id_product_type = product_type.id INNER JOIN charactiristic ON product.id = charactiristic.id_product INNER JOIN brand ON product.id_brand = brand.id inner join products_in_order on product.id = products_in_order.product_id where order_id = '+curUser+'',
            async function(error, result){
                if(error) throw error;
                console.log('ok2')
                let resss = {}
                for(let i = 0; i < result.length; i++){
                    resss[result[i]['id']] = `${result[i]['id']} ${result[i]['brand']} ${result[i]['type']} ${result[i]['dicription']} ${result[i]['price']}`
                }
                console.log(resss)
                res1.send(resss)
            }
        )
    
    })
})

app.post('/getpr72', jsonParser, function(req, res){
    body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    });
    req.on('end', () => {
        console.log(body);
        const d = [curUser, body, '1']
        console.log(d)
        con.query(
                    'INSERT INTO products_in_order (order_id, product_id, count) VALUES ('+curUser+', '+body+', '+1+')',
                    async function(error, result){
                        if(error) throw error;
                            console.log('okey')
                    }
                )
    });
    res.redirect(307, '/bascket.html')
    app.post('/bascket.html', (req1, res1) => {
        con.query(
            'select product.id, brand.brand as brand, product_type.type, charactiristic.discription as dicription, price from product INNER JOIN product_type ON product.id_product_type = product_type.id INNER JOIN charactiristic ON product.id = charactiristic.id_product INNER JOIN brand ON product.id_brand = brand.id inner join products_in_order on product.id = products_in_order.product_id where order_id = '+curUser+'',
            async function(error, result){
                if(error) throw error;
                console.log('ok2')
                let resss = {}
                for(let i = 0; i < result.length; i++){
                    resss[result[i]['id']] = `${result[i]['id']} ${result[i]['brand']} ${result[i]['type']} ${result[i]['dicription']} ${result[i]['price']}`
                }
                console.log(resss)
                res1.send(resss)
            }
        )
    
    })
})

app.post('/getpr73', jsonParser, function(req, res){
    body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    });
    req.on('end', () => {
        console.log(body);
        const d = [curUser, body, '1']
        console.log(d)
        con.query(
                    'INSERT INTO products_in_order (order_id, product_id, count) VALUES ('+curUser+', '+body+', '+1+')',
                    async function(error, result){
                        if(error) throw error;
                            console.log('okey')
                    }
                )
    });
    res.redirect(307, '/bascket.html')
    app.post('/bascket.html', (req1, res1) => {
        con.query(
            'select product.id, brand.brand as brand, product_type.type, charactiristic.discription as dicription, price from product INNER JOIN product_type ON product.id_product_type = product_type.id INNER JOIN charactiristic ON product.id = charactiristic.id_product INNER JOIN brand ON product.id_brand = brand.id inner join products_in_order on product.id = products_in_order.product_id where order_id = '+curUser+'',
            async function(error, result){
                if(error) throw error;
                console.log('ok2')
                let resss = {}
                for(let i = 0; i < result.length; i++){
                    resss[result[i]['id']] = `${result[i]['id']} ${result[i]['brand']} ${result[i]['type']} ${result[i]['dicription']} ${result[i]['price']}`
                }
                console.log(resss)
                res1.send(resss)
            }
        )
    
    })
})

app.post('/getpr74', jsonParser, function(req, res){
    body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    });
    req.on('end', () => {
        console.log(body);
        const d = [curUser, body, '1']
        console.log(d)
        con.query(
                    'INSERT INTO products_in_order (order_id, product_id, count) VALUES ('+curUser+', '+body+', '+1+')',
                    async function(error, result){
                        if(error) throw error;
                            console.log('okey')
                    }
                )
    });
    res.redirect(307, '/bascket.html')
    app.post('/bascket.html', (req1, res1) => {
        con.query(
            'select product.id, brand.brand as brand, product_type.type, charactiristic.discription as dicription, price from product INNER JOIN product_type ON product.id_product_type = product_type.id INNER JOIN charactiristic ON product.id = charactiristic.id_product INNER JOIN brand ON product.id_brand = brand.id inner join products_in_order on product.id = products_in_order.product_id where order_id = '+curUser+'',
            async function(error, result){
                if(error) throw error;
                console.log('ok2')
                let resss = {}
                for(let i = 0; i < result.length; i++){
                    resss[result[i]['id']] = `${result[i]['id']} ${result[i]['brand']} ${result[i]['type']} ${result[i]['dicription']} ${result[i]['price']}`
                }
                console.log(resss)
                res1.send(resss)
            }
        )
    
    })
})

app.post('/getpr75', jsonParser, function(req, res){
    body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    });
    req.on('end', () => {
        console.log(body);
        const d = [curUser, body, '1']
        console.log(d)
        con.query(
                    'INSERT INTO products_in_order (order_id, product_id, count) VALUES ('+curUser+', '+body+', '+1+')',
                    async function(error, result){
                        if(error) throw error;
                            console.log('okey')
                    }
                )
    });
    res.redirect(307, '/bascket.html')
    app.post('/bascket.html', (req1, res1) => {
        con.query(
            'select product.id, brand.brand as brand, product_type.type, charactiristic.discription as dicription, price from product INNER JOIN product_type ON product.id_product_type = product_type.id INNER JOIN charactiristic ON product.id = charactiristic.id_product INNER JOIN brand ON product.id_brand = brand.id inner join products_in_order on product.id = products_in_order.product_id where order_id = '+curUser+'',
            async function(error, result){
                if(error) throw error;
                console.log('ok2')
                let resss = {}
                for(let i = 0; i < result.length; i++){
                    resss[result[i]['id']] = `${result[i]['id']} ${result[i]['brand']} ${result[i]['type']} ${result[i]['dicription']} ${result[i]['price']}`
                }
                console.log(resss)
                res1.send(resss)
            }
        )
    
    })
})

app.post('/getpr76', jsonParser, function(req, res){
    body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    });
    req.on('end', () => {
        console.log(body);
        const d = [curUser, body, '1']
        console.log(d)
        con.query(
                    'INSERT INTO products_in_order (order_id, product_id, count) VALUES ('+curUser+', '+body+', '+1+')',
                    async function(error, result){
                        if(error) throw error;
                            console.log('okey')
                    }
                )
    });
    res.redirect(307, '/bascket.html')
    app.post('/bascket.html', (req1, res1) => {
        con.query(
            'select product.id, brand.brand as brand, product_type.type, charactiristic.discription as dicription, price from product INNER JOIN product_type ON product.id_product_type = product_type.id INNER JOIN charactiristic ON product.id = charactiristic.id_product INNER JOIN brand ON product.id_brand = brand.id inner join products_in_order on product.id = products_in_order.product_id where order_id = '+curUser+'',
            async function(error, result){
                if(error) throw error;
                console.log('ok2')
                let resss = {}
                for(let i = 0; i < result.length; i++){
                    resss[result[i]['id']] = `${result[i]['id']} ${result[i]['brand']} ${result[i]['type']} ${result[i]['dicription']} ${result[i]['price']}`
                }
                console.log(resss)
                res1.send(resss)
            }
        )
    
    })
})

app.post('/getpr77', jsonParser, function(req, res){
    body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    });
    req.on('end', () => {
        console.log(body);
        const d = [curUser, body, '1']
        console.log(d)
        con.query(
                    'INSERT INTO products_in_order (order_id, product_id, count) VALUES ('+curUser+', '+body+', '+1+')',
                    async function(error, result){
                        if(error) throw error;
                            console.log('okey')
                    }
                )
    });
    res.redirect(307, '/bascket.html')
    app.post('/bascket.html', (req1, res1) => {
        con.query(
            'select product.id, brand.brand as brand, product_type.type, charactiristic.discription as dicription, price from product INNER JOIN product_type ON product.id_product_type = product_type.id INNER JOIN charactiristic ON product.id = charactiristic.id_product INNER JOIN brand ON product.id_brand = brand.id inner join products_in_order on product.id = products_in_order.product_id where order_id = '+curUser+'',
            async function(error, result){
                if(error) throw error;
                console.log('ok2')
                let resss = {}
                for(let i = 0; i < result.length; i++){
                    resss[result[i]['id']] = `${result[i]['id']} ${result[i]['brand']} ${result[i]['type']} ${result[i]['dicription']} ${result[i]['price']}`
                }
                console.log(resss)
                res1.send(resss)
            }
        )
    
    })
})

app.post('/getpr78', jsonParser, function(req, res){
    body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    });
    req.on('end', () => {
        console.log(body);
        const d = [curUser, body, '1']
        console.log(d)
        con.query(
                    'INSERT INTO products_in_order (order_id, product_id, count) VALUES ('+curUser+', '+body+', '+1+')',
                    async function(error, result){
                        if(error) throw error;
                            console.log('okey')
                    }
                )
    });
    res.redirect(307, '/bascket.html')
    app.post('/bascket.html', (req1, res1) => {
        con.query(
            'select product.id, brand.brand as brand, product_type.type, charactiristic.discription as dicription, price from product INNER JOIN product_type ON product.id_product_type = product_type.id INNER JOIN charactiristic ON product.id = charactiristic.id_product INNER JOIN brand ON product.id_brand = brand.id inner join products_in_order on product.id = products_in_order.product_id where order_id = '+curUser+'',
            async function(error, result){
                if(error) throw error;
                console.log('ok2')
                let resss = {}
                for(let i = 0; i < result.length; i++){
                    resss[result[i]['id']] = `${result[i]['id']} ${result[i]['brand']} ${result[i]['type']} ${result[i]['dicription']} ${result[i]['price']}`
                }
                console.log(resss)
                res1.send(resss)
            }
        )
    
    })
})

app.post('/getpr79', jsonParser, function(req, res){
    body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    });
    req.on('end', () => {
        console.log(body);
        const d = [curUser, body, '1']
        console.log(d)
        con.query(
                    'INSERT INTO products_in_order (order_id, product_id, count) VALUES ('+curUser+', '+body+', '+1+')',
                    async function(error, result){
                        if(error) throw error;
                            console.log('okey')
                    }
                )
    });
    res.redirect(307, '/bascket.html')
    app.post('/bascket.html', (req1, res1) => {
        con.query(
            'select product.id, brand.brand as brand, product_type.type, charactiristic.discription as dicription, price from product INNER JOIN product_type ON product.id_product_type = product_type.id INNER JOIN charactiristic ON product.id = charactiristic.id_product INNER JOIN brand ON product.id_brand = brand.id inner join products_in_order on product.id = products_in_order.product_id where order_id = '+curUser+'',
            async function(error, result){
                if(error) throw error;
                console.log('ok2')
                let resss = {}
                for(let i = 0; i < result.length; i++){
                    resss[result[i]['id']] = `${result[i]['id']} ${result[i]['brand']} ${result[i]['type']} ${result[i]['dicription']} ${result[i]['price']}`
                }
                console.log(resss)
                res1.send(resss)
            }
        )
    
    })
})

app.post('/getpr80', jsonParser, function(req, res){
    body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    });
    req.on('end', () => {
        console.log(body);
        const d = [curUser, body, '1']
        console.log(d)
        con.query(
                    'INSERT INTO products_in_order (order_id, product_id, count) VALUES ('+curUser+', '+body+', '+1+')',
                    async function(error, result){
                        if(error) throw error;
                            console.log('okey')
                    }
                )
    });
    res.redirect(307, '/bascket.html')
    app.post('/bascket.html', (req1, res1) => {
        con.query(
            'select product.id, brand.brand as brand, product_type.type, charactiristic.discription as dicription, price from product INNER JOIN product_type ON product.id_product_type = product_type.id INNER JOIN charactiristic ON product.id = charactiristic.id_product INNER JOIN brand ON product.id_brand = brand.id inner join products_in_order on product.id = products_in_order.product_id where order_id = '+curUser+'',
            async function(error, result){
                if(error) throw error;
                console.log('ok2')
                let resss = {}
                for(let i = 0; i < result.length; i++){
                    resss[result[i]['id']] = `${result[i]['id']} ${result[i]['brand']} ${result[i]['type']} ${result[i]['dicription']} ${result[i]['price']}`
                }
                console.log(resss)
                res1.send(resss)
            }
        )
    
    })
})

app.post('/getpr81', jsonParser, function(req, res){
    body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    });
    req.on('end', () => {
        console.log(body);
        const d = [curUser, body, '1']
        console.log(d)
        con.query(
                    'INSERT INTO products_in_order (order_id, product_id, count) VALUES ('+curUser+', '+body+', '+1+')',
                    async function(error, result){
                        if(error) throw error;
                            console.log('okey')
                    }
                )
    });
    res.redirect(307, '/bascket.html')
    app.post('/bascket.html', (req1, res1) => {
        con.query(
            'select product.id, brand.brand as brand, product_type.type, charactiristic.discription as dicription, price from product INNER JOIN product_type ON product.id_product_type = product_type.id INNER JOIN charactiristic ON product.id = charactiristic.id_product INNER JOIN brand ON product.id_brand = brand.id inner join products_in_order on product.id = products_in_order.product_id where order_id = '+curUser+'',
            async function(error, result){
                if(error) throw error;
                console.log('ok2')
                let resss = {}
                for(let i = 0; i < result.length; i++){
                    resss[result[i]['id']] = `${result[i]['id']} ${result[i]['brand']} ${result[i]['type']} ${result[i]['dicription']} ${result[i]['price']}`
                }
                console.log(resss)
                res1.send(resss)
            }
        )
    
    })
})

app.post('/getpr82', jsonParser, function(req, res){
    body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    });
    req.on('end', () => {
        console.log(body);
        const d = [curUser, body, '1']
        console.log(d)
        con.query(
                    'INSERT INTO products_in_order (order_id, product_id, count) VALUES ('+curUser+', '+body+', '+1+')',
                    async function(error, result){
                        if(error) throw error;
                            console.log('okey')
                    }
                )
    });
    res.redirect(307, '/bascket.html')
    app.post('/bascket.html', (req1, res1) => {
        con.query(
            'select product.id, brand.brand as brand, product_type.type, charactiristic.discription as dicription, price from product INNER JOIN product_type ON product.id_product_type = product_type.id INNER JOIN charactiristic ON product.id = charactiristic.id_product INNER JOIN brand ON product.id_brand = brand.id inner join products_in_order on product.id = products_in_order.product_id where order_id = '+curUser+'',
            async function(error, result){
                if(error) throw error;
                console.log('ok2')
                let resss = {}
                for(let i = 0; i < result.length; i++){
                    resss[result[i]['id']] = `${result[i]['id']} ${result[i]['brand']} ${result[i]['type']} ${result[i]['dicription']} ${result[i]['price']}`
                }
                console.log(resss)
                res1.send(resss)
            }
        )
    
    })
})

app.post('/getpr83', jsonParser, function(req, res){
    body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    });
    req.on('end', () => {
        console.log(body);
        const d = [curUser, body, '1']
        console.log(d)
        con.query(
                    'INSERT INTO products_in_order (order_id, product_id, count) VALUES ('+curUser+', '+body+', '+1+')',
                    async function(error, result){
                        if(error) throw error;
                            console.log('okey')
                    }
                )
    });
    res.redirect(307, '/bascket.html')
    app.post('/bascket.html', (req1, res1) => {
        con.query(
            'select product.id, brand.brand as brand, product_type.type, charactiristic.discription as dicription, price from product INNER JOIN product_type ON product.id_product_type = product_type.id INNER JOIN charactiristic ON product.id = charactiristic.id_product INNER JOIN brand ON product.id_brand = brand.id inner join products_in_order on product.id = products_in_order.product_id where order_id = '+curUser+'',
            async function(error, result){
                if(error) throw error;
                console.log('ok2')
                let resss = {}
                for(let i = 0; i < result.length; i++){
                    resss[result[i]['id']] = `${result[i]['id']} ${result[i]['brand']} ${result[i]['type']} ${result[i]['dicription']} ${result[i]['price']}`
                }
                console.log(resss)
                res1.send(resss)
            }
        )
    
    })
})

app.post('/getpr84', jsonParser, function(req, res){
    body = ''
    req.on('data', chunk => {
        body += chunk.toString()
    });
    req.on('end', () => {
        console.log(body);
        const d = [curUser, body, '1']
        console.log(d)
        con.query(
                    'INSERT INTO products_in_order (order_id, product_id, count) VALUES ('+curUser+', '+body+', '+1+')',
                    async function(error, result){
                        if(error) throw error;
                            console.log('okey')
                    }
                )
    });
    res.redirect(307, '/bascket.html')
    app.post('/bascket.html', (req1, res1) => {
        con.query(
            'select product.id, brand.brand as brand, product_type.type, charactiristic.discription as dicription, price from product INNER JOIN product_type ON product.id_product_type = product_type.id INNER JOIN charactiristic ON product.id = charactiristic.id_product INNER JOIN brand ON product.id_brand = brand.id inner join products_in_order on product.id = products_in_order.product_id where order_id = '+curUser+'',
            async function(error, result){
                if(error) throw error;
                console.log('ok2')
                let resss = {}
                for(let i = 0; i < result.length; i++){
                    resss[result[i]['id']] = `${result[i]['id']} ${result[i]['brand']} ${result[i]['type']} ${result[i]['dicription']} ${result[i]['price']}`
                }
                console.log(resss)
                res1.send(resss)
            }
        )
    
    })
})


// const d = [curUser, body, 1]
//     console.log(d)
//     con.query(
//         'INSERT INTO products_in_order (order_id, product_id, count) VALUES (?, ?, ?)', d,
//         async function(error, result){
//             if(error) throw error;
//                 console.log('okey')
//         }
//     )

// con.end()    
