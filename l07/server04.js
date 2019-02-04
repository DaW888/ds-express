var express = require("express")
var app = express()
const PORT = 3000;

app.get('/', function (req, res) {   
    console.log(req.query)    
    console.log(req.query.p1)  
    res.send(req.query)   
});

app.use(express.static('static'))

app.listen(PORT, function () { 
    console.log("start serwera na porcie " + PORT )
})