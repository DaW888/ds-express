var express = require("express")
var app = express()
const PORT = 3000
var hbs = require('express-handlebars');

var path = require("path")
app.use(express.static("static"))

app.set('views', path.join(__dirname, 'views')); // ustalamy katalog views
app.engine('hbs', hbs({ defaultLayout: 'main.hbs' })); // domyślny layout, potem można go zmienić
app.set('view engine', 'hbs'); // określenie silnika szablonów

app.listen(PORT, function(){
    console.log("start servera na porcie "+ PORT)
})

app.get("/index", function (req, res) { 
    res.render('index.hbs');   // nie podajemy ścieżki tylko nazwę pliku
    //res.render('index.hbs', { layout: "main.hbs" }); // opcjonalnie podajemy konkretny layout dla tego widoku
})

app.get('/login', (req, res) => {
    res.render("login.hbs")
});
