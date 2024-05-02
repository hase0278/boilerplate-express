let express = require('express'); 
require('dotenv').config(); 
let app = express(); 
const customMiddleware = function(req, res, next){ 
    console.log(`${req.method} ${req.path} - ${req.ip}`) 
    next(); 
}; 
app.use(customMiddleware); 
app.use('/public', express.static(__dirname + '/public')); 
app.get('/', function(req, res) { 
    const path = __dirname + '/views/index.html'; res.sendFile(path); 
}); 
app.get('/json', function(req, res){ 
    let message = 'Hello json'; 
    if(process.env.MESSAGE_STYLE == 'uppercase'){ 
        message = message.toUpperCase(); 
    } 
    res.send({"message": message}); 
}); 
app.get('/now', function(req, res, next){ 
    req.time = new Date().toString(); 
    next(); 
}, function(req, res){ 
    res.send({time: req.time}); 
});

app.get('/:word/echo', function(req, res){
    res.send({echo: req.params.word});
});



































 module.exports = app;
