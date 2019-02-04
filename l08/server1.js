var express = require("express")
var app = express()
const PORT = 3000

app.use(express.static("static"))


app.listen(PORT, function(){
    console.log("start servera na porcie "+ PORT)
})

var path = require("path")

app.get("/", function(req,res){
    res.sendFile(path.join(__dirname + "/static/formularz.html"))
})

app.get("/handleForm", function(req, res){
    console.log(req.query.kolor)
    res.send("<html><body style = 'background-color:"+req.query.kolor+"'></body></html>")
})
