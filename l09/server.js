var express = require("express")
// npm install body-parser
// npm install express
var app = express()
const PORT = 3000
var bodyParser = require("body-parser")

app.use(express.static("static"))

app.use(bodyParser.urlencoded({extended: true}))

app.listen(PORT, function(){
    console.log("start servera na porcie "+ PORT)
})

var path = require("path")

tabUsers =[{ login: 'aaa', password: 'aaa', wiek: '15', plec: 'M', uczen: 'on'},
            { login: 'aasa', password: 'aasa', wiek: '13', plec: 'K', uczen: 'off'},
            { login: 'aawa', password: 'aawa', wiek: '25', plec: 'M', uczen: 'on'}]

app.get("/", function(req,res){
    res.sendFile(path.join(__dirname + "/static/main.html"))
})

app.get("/register", function(req,res){
    res.sendFile(path.join(__dirname + "/static/register.html"))
})

app.get('/main', (req, res) => {
    res.sendFile(path.join(__dirname + "/static/main.html"))
});

app.post('/login', (req, res) => {
    var moznaLogowac = false
    for(let i = 0; i<tabUsers.length; i++){
        if(tabUsers[i].login ==req.body.login && tabUsers[i].password ==req.body.password){
            moznaLogowac = true
        }
    }
    if(moznaLogowac){
        res.send("Zalogowano");
    }else{
        res.send("Nie można zalogować !!!")
    }
});
app.get("/login", function(req,res){
    res.sendFile(path.join(__dirname + "/static/login.html"))
})

app.post('/register', (req, res) => {
    var juzIstnieje = false
    for(let i = 0; i<tabUsers.length; i++){
        if(tabUsers[i].login==req.body.login){
            juzIstnieje = true
        }
    }
    if(!juzIstnieje){
        if(req.body.uczen != "on")
            req.body.uczen = "off"
        tabUsers.push(req.body)
        res.send("Użytkownik został zarejestrowany");
    }else{
        res.send("Taki Login już istnieje !!!");
    }
    console.log(tabUsers)
});

app.get("/register", function(req,res){
    res.sendFile(path.join(__dirname + "/static/register.html"))
})
tabela = ''
tabUsersOld = tabUsers

function rysowanieTabeli(Users){
    tabela += '<table border="1">'
        for(i = -1; i < Users.length; i++){
            tabela += '<tr>'
            if(i == -1){
                for(e=0; e < Object.keys(Users[0]).length; e++){
                    tabela += "<th>"+String(Object.keys(Users[0])[e])+"</th>"
                }
            }else{

                console.log(Users[i].length)
                for(e=0; e < Object.keys(Users[i]).length; e++){
                    a= Object.keys(Users[i])
                    a= a[e]
                    console.log(a)
                    console.log(Users[i][a])
                    tabela += "<td>"+String(Users[i][a])+"</td>"
                }
            }
            tabela += '</tr>'
        }
        tabela += '</table>'
        return tabela
}
app.get('/admin', (req, res) => {
    header = '<form action="/admin" method="get">\
     <input type="submit" name="wybor" value="sort"></input>\
    <input type="submit" name="wybor" value="gender">\
    <input type="submit" name="wybor" value="show"><br><br>\
    <label><input type="radio" name="sortowanie" value="malejaco">malejaco</label>\
    <label><input type="radio" name="sortowanie" value="rosnaco">rosnaco</label>\
    </form>'

    console.log(req.query)
    console.log(Object.keys(tabUsers[0])[0])
    console.log(tabUsers[0]["login"])
    if(req.query.wybor == "show"){
        rysowanieTabeli(tabUsersOld)
    }

    if(req.query.wybor == "sort"){
        console.log("sortowanie start")
        console.log(tabUsers)

        tabUsers.sort(function (a, b) {
            console.log(parseFloat(a.wiek) - parseFloat(b.wiek))
            return parseFloat(a.wiek) - parseFloat(b.wiek);
        })
        if(req.query.sortowanie == "malejaco"){
            console.log(tabUsers)
            tabUsers = tabUsers.reverse()
            console.log(tabUsers)
            console.log("malejaco")
        }
        console.log(tabUsers)
        rysowanieTabeli(tabUsers)
           
    }
    if(req.query.wybor == "gender"){
        men = []
        women = []
        for(i=0; i<tabUsers.length; i++){
            if(tabUsers[i].plec == "M"){
                men.push(tabUsers[i])
            }else if (tabUsers[i].plec == "K"){
                women.push(tabUsers[i])
            }
        }
        console.log(women)
        aa = rysowanieTabeli(men)
        ab = rysowanieTabeli(women)
        console.log(ab + "KONIECCCCC")
        tabela = aa+ab
    }
    console.log(tabela)
    res.send(header+tabela)
    tabela = ''
});

app.post('/main', (req, res) => {
    res.sendFile(path.join(__dirname + "/static/main.html"))
});