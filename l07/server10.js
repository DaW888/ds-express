var express = require("express")
var app = express()
const PORT = 3000;

app.get('/', function (req, res) {   
    console.log(req.query)    
    console.log(req.query.value)
    console.log(req.query.toRad)
    var value = req.query.value
    var wynik = 0
    
    if(req.query.toRad == "true") var toRad = true
    else var toRad = false


    if(toRad){
        //res.send("na rady")
        wynik = value * 0.0174532925
        wynik = wynik.toFixed(2)
        res.send(value+" stopni = " + wynik + " radianow")

    }else{
        wynik = value * 57.2957795
        wynik = wynik.toFixed(2)
        res.send(value+ " radian = "+ wynik+ " stopni")
    } 

});


app.listen(PORT, function () { 
    console.log("start serwera na porcie " + PORT )
})