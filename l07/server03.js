var express = require("express")
var app = express()
const PORT = 3000;

app.get("/", function (_req, res) {
    res.send("dane html odesłane z serwera do przeglądarki")   
})

var path = require("path")

app.get("/strona", function (_req, res) {
    res.sendFile(path.join(__dirname + "/static/index1.html"))
    console.log(__dirname)
})

app.use(express.static('static'))

app.listen(PORT, function () { 
    console.log("start serwera na porcie " + PORT )
})