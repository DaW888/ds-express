var express = require("express")
var app = express()
const PORT = 3000;

app.get('/', function (req, res) {   
    console.log(req.query)    
    
    var as = '<div style="background-color:'+req.query.p2+'; height:70px; float:left; margin:5px; width:70px;">'+1+'</div>'
    for(let i=2; i<=req.query.p1; i++){
        //var dv = document.createElement("div").id=i
        //dv = dv.width(50).height(50).backgroundColor(req.query.p2).html(i)
        as += '<div style="background-color:'+req.query.p2+'; height:70px; float:left; margin:5px; width:70px;">'+i+'</div>'
    }
    res.send(as)
    //res.send(req.query)   
});


app.listen(PORT, function () { 
    console.log("start serwera na porcie " + PORT )
})