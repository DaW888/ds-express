var express = require("express")
var app = express()
const PORT = 3000
var bodyParser = require("body-parser")

app.use(express.static("static"))

app.use(bodyParser.urlencoded({extended: true}))

app.listen(PORT, function(){
    console.log("start servera na porcie "+ PORT)
})

var path = require("path")

app.get("/", function(req,res){
    res.sendFile(path.join(__dirname + "/static/addUser.html"))
})

app.post("/addUser", function(req, res){
    console.log(req.body)
    res.send("<html><body style = 'background-color:"+req.body.kolor+"'></body></html>")
})

app.post('/removeUser1', (req, res) => {
    
});

app.post('/removeUser2', (req, res) => {
    
});
