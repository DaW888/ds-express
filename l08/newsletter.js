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
    res.sendFile(path.join(__dirname + "/static/newsletter.html"))
})
var maile = []
app.post("/addUser", function(req, res){
    //console.log(req.body)
    console.log(req.body.nick)
    console.log(req.body.email)
    var mailIstnieje = false
    for(let i = 0; i < maile.length; i++){
        if(maile[i].mail == req.body.email){
            res.send("Przykro nam ale taki adres email jest już w bazie");
            mailIstnieje = true
        }
    }
    if(!mailIstnieje){
        maile.push({nick: req.body.nick, mail: req.body.email})
        res.send("zostałeś zapisany do newslettera !!!");
    }
    //res.send("<html><body style = 'background-color:"+req.body.kolor+"'></body></html>")
    console.log(maile)
})

app.get('/removeUser1', (req, res) => {
    var opcje = '<option value = "'+0+'">'+maile[0].mail+"</option>"
    for(let i = 1; i < maile.length; i++){
        opcje+= '<option value = "'+i+'">'+maile[i].mail+"</option>"
    }
    res.send('<form action="/removeUser2" method="post"><select>'+opcje+'</select><br><input type="submit" value="usun z bazy"></form>');
    console.log(req.body)
});

app.post('/removeUser2', (req, res) => {
    res.send("test");
    maile = []
});