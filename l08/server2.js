var express = require("express")
var app = express()
const PORT = 3000
var bodyParser = require("body-parser")
var formidable = require("formidable")
app.use(express.static("static"))

app.use(bodyParser.urlencoded({extended: true}))

app.listen(PORT, function(){
    console.log("start servera na porcie "+ PORT)
})

var path = require("path")

app.get("/", function(req,res){
    res.sendFile(path.join(__dirname + "/static/formularz.html"))
})

app.post("/handleForm", function(req, res){
    console.log(req.body)
    res.send("<html><body style = 'background-color:"+req.body.kolor+"'></body></html>")
})

app.post('/handleUpload', (req, res) => {
    var form = new formidable.IncomingForm()
    form.uploadDir = __dirname + '/static/upload/'
    form.parse(req, function(err, fields, files){
        console.log(fields)
        console.log(files)
        console.log(fields.data)
        console.log(fields.nazwaZdj)
        res.send(/*files +*/ "<br> nazwa zdjęcia: "+ fields.nazwaZdj + "<br> data zdjęcia: " + fields.data)
    })
});
