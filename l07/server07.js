var express = require("express")
var app = express()
const PORT = 3000;

var path = require("path")

app.get('/', function (_req, res) {
    res.status(404).send("brak strony takiego produktu")
})

app.listen(PORT, function () { 
    console.log("start serwera na porcie " + PORT )
})