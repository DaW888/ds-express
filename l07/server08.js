var express = require("express")
var app = express()
const PORT = 3000;

var path = require("path")


app.get("/strona1", function (_req, res) {
    res.sendFile(path.join(__dirname + "/static/pages/strona1.html"))
    console.log(__dirname)
})

app.get("/strona2", function (_req, res) {
    res.sendFile(path.join(__dirname + "/static/pages/strona2.html"))
    console.log(__dirname)
})

app.get("/strona3", function (_req, res) {
    res.sendFile(path.join(__dirname + "/static/pages/strona3.html"))
    console.log(__dirname)
})

app.listen(PORT, function () { 
    console.log("start serwera na porcie " + PORT )
})