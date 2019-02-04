var express = require("express")
var app = express()
const PORT = 3000
var hbs = require('express-handlebars');

var path = require("path")
app.use(express.static("static"))

app.set('views', path.join(__dirname, 'views')); // ustalamy katalog views
app.engine('hbs', hbs({
    defaultLayout: 'main.hbs',
    extname: '.hbs', 
    partialsDir: "views/partials",
}));
app.set('view engine', 'hbs'); // określenie silnika szablonów

app.listen(PORT, function(){
    console.log("start servera na porcie "+ PORT)
})

var context = require("./data/data05.json")
console.log(context)

app.get("/", function (req, res) { 
    res.render('index05.hbs', context);
})
