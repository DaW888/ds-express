var express = require("express")
var app = express()
const PORT = 3000;

app.get("/", function (_req, res) {
    res.send("Witamy w sklepie, wpisz nr produktu w pasku URL : http://localhost:3000/product/1")   
})

var path = require("path")

app.get('/product/:id', function (req, res) {  //http://localhost:3000/user/1
    
    var id = req.params.id
    if (id < 4)
        res.sendFile(path.join(__dirname + '/static/products/product'+id+'.html'))
    else
        res.status(404).send("NIEMA TAKIEGO PRODUKTU !!! ")
});

app.listen(PORT, function () { 
    console.log("start serwera na porcie " + PORT )
})