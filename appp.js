let express = require('express')
let app = express()
app.use(express.static('public'))
app.set('view engine', 'pug')

app.listen(3000, function(){
    console.log('node express work on 3000')
});

app.get('/online-shop.html', function(req, res){
    console.log('/ load')
    res.sendFile('online-shop.html', {root : __dirname + '/public'})
});